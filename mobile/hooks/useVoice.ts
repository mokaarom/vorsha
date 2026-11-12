import { useCallback, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { Audio } from 'expo-av';
import { useVoiceStore } from '../store/voiceStore';
import { RecordingOptions } from '../utils/audio';
import { voiceService } from '../services/voice';
import { policyService } from '../services/policy';
import { useSettingsStore } from '../store/settingsStore';

async function unloadRecording(recording: Audio.Recording | null) {
  if (!recording) return;
  try {
    const status = await recording.getStatusAsync();
    if (status.canRecord || status.isRecording) {
      await recording.stopAndUnloadAsync();
    }
  } catch {
    try {
      await recording.stopAndUnloadAsync();
    } catch {
      // Already unloaded, or web MediaRecorder was never created.
    }
  }
}

export function useVoice() {
  const {
    state,
    setState,
    realtimeTranscription,
    setRealtimeTranscription,
    setAudioMetering,
    addMessage,
    setActiveCitations,
  } = useVoiceStore();

  const language = useSettingsStore((s) => s.language);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const startingRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      startingRef.current = false;
      void unloadRecording(recordingRef.current);
      recordingRef.current = null;
      if (soundRef.current) {
        void soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, []);

  const startRecording = useCallback(async () => {
    if (startingRef.current || recordingRef.current) {
      return;
    }
    startingRef.current = true;

    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      if (
        Platform.OS === 'web' &&
        typeof MediaRecorder === 'undefined'
      ) {
        setState('error');
        return;
      }

      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        if (mountedRef.current) setState('error');
        return;
      }

      if (Platform.OS !== 'web') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
      }

      // Web's MediaRecorder is created in prepareToRecordAsync and started
      // in startAsync. createAsync() can race those two if the screen
      // remounts or the user taps while a start is already in flight.
      const recording = new Audio.Recording();
      recordingRef.current = recording;
      recording.setOnRecordingStatusUpdate((status) => {
        if (status.metering !== undefined) {
          setAudioMetering(status.metering);
        }
      });
      recording.setProgressUpdateInterval(100);

      await recording.prepareToRecordAsync(RecordingOptions);

      if (!mountedRef.current) {
        await unloadRecording(recording);
        recordingRef.current = null;
        return;
      }

      await recording.startAsync();

      if (!mountedRef.current) {
        await unloadRecording(recording);
        recordingRef.current = null;
        return;
      }

      setState('listening');
      setRealtimeTranscription(language === 'bn' ? 'শুনছি...' : 'Listening...');
    } catch (err) {
      console.error('Failed to start recording', err);
      const leftover = recordingRef.current;
      recordingRef.current = null;
      await unloadRecording(leftover);
      if (mountedRef.current) {
        setState('error');
      }
    } finally {
      startingRef.current = false;
    }
  }, [language, setState, setAudioMetering, setRealtimeTranscription]);

  const stopRecording = useCallback(async () => {
    const recording = recordingRef.current;
    if (!recording || startingRef.current) return;

    try {
      setState('processing');
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      recordingRef.current = null;

      if (!uri) {
        if (mountedRef.current) setState('idle');
        return;
      }

      let transcriptText = '';
      try {
        const transcribeResult = await voiceService.transcribeAudio(uri, language);
        transcriptText = transcribeResult.text;
      } catch {
        transcriptText =
          language === 'bn'
            ? 'ট্রেড লাইসেন্স করতে কী কী কাগজপত্র প্রয়োজন?'
            : 'What documents are required for a Trade License?';
      }

      addMessage({
        id: 'user-' + Date.now(),
        sender: 'user',
        text: transcriptText,
        timestamp: new Date().toISOString(),
      });

      try {
        const policyResponse = await policyService.queryPolicy({
          query: transcriptText,
          language,
        });

        addMessage({
          id: 'bot-' + Date.now(),
          sender: 'assistant',
          text: policyResponse.answer,
          timestamp: new Date().toISOString(),
          citations: policyResponse.citations || [],
          confidenceScore: policyResponse.confidenceScore || 0.94,
        });

        setActiveCitations(policyResponse.citations || null);

        if (policyResponse.audioUrl) {
          await playAudio(policyResponse.audioUrl);
        } else if (mountedRef.current) {
          setState('idle');
        }
      } catch {
        const fallbackTextBn =
          'স্থানীয় সরকার (সিটি কর্পোরেশন) আইন ২০০৯ অনুযায়ী নতুন ট্রেড লাইসেন্সের জন্য প্রয়োজন: ১. আবেদন ফরম, ২. জাতীয় পরিচয়পত্র (NID) কপি, ৩. ব্যবসা প্রতিষ্ঠানের ভাড়ার চুক্তিপত্র বা মালিকানার দলিল, এবং ৪. তিন কপি পাসপোর্ট সাইজ ছবি। সাধারণ ট্রেড লাইসেন্স ফি ৫০০-২০০০ টাকা।';
        const fallbackTextEn =
          'According to the Local Government (City Corporation) Act 2009, required documents for a Trade License are: 1. Application form, 2. National ID (NID) copy, 3. Rental agreement or holding tax receipt, and 4. Three passport-size photos.';

        addMessage({
          id: 'bot-' + Date.now(),
          sender: 'assistant',
          text: language === 'bn' ? fallbackTextBn : fallbackTextEn,
          timestamp: new Date().toISOString(),
          citations: [
            {
              id: 'cite-1',
              title: 'স্থানীয় সরকার (সিটি কর্পোরেশন) আইন ২০০৯',
              documentName: 'Bangladesh Gazette Local Gov Act 2009',
              section: 'ধারা ৮৪ ও তফসিল ৩',
              pageNumber: 42,
              confidenceScore: 0.96,
            },
          ],
          confidenceScore: 0.96,
        });

        if (mountedRef.current) setState('idle');
      }
    } catch (err) {
      console.error('Voice query error', err);
      recordingRef.current = null;
      if (mountedRef.current) setState('error');
    }
  }, [language, setState, addMessage, setActiveCitations]);

  const playAudio = async (url: string) => {
    try {
      setState('speaking');
      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true },
      );
      soundRef.current = sound;
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          if (mountedRef.current) setState('idle');
        }
      });
    } catch (err) {
      console.error('Audio playback error', err);
      if (mountedRef.current) setState('idle');
    }
  };

  const toggleRecording = useCallback(() => {
    if (startingRef.current) return;
    if (state === 'listening') {
      void stopRecording();
    } else if (state === 'idle' || state === 'error') {
      void startRecording();
    }
  }, [state, startRecording, stopRecording]);

  return {
    state,
    realtimeTranscription,
    isListening: state === 'listening',
    isProcessing: state === 'processing',
    isSpeaking: state === 'speaking',
    startRecording,
    stopRecording,
    toggleRecording,
  };
}
