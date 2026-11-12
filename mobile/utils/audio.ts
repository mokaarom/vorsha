import { Audio } from 'expo-av';

export const RecordingOptions = {
  android: {
    extension: '.m4a',
    outputFormat: Audio.AndroidOutputFormat.MPEG_4,
    audioEncoder: Audio.AndroidAudioEncoder.AAC,
    sampleRate: 16000,
    numberOfChannels: 1,
    bitRate: 128000,
  },
  ios: {
    extension: '.m4a',
    audioQuality: Audio.IOSAudioQuality.HIGH,
    sampleRate: 16000,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: {
    mimeType: 'audio/webm',
    bitsPerSecond: 128000,
  },
};

export function calculateWaveformHeights(meteringValue: number | undefined): number[] {
  // Normalize metering value (-160dB to 0dB) to an array of relative heights (0.1 to 1.0)
  const normalized = meteringValue !== undefined ? Math.max(0.1, (meteringValue + 160) / 160) : 0.2;
  const bars = [0.2, 0.4, 0.7, 1.0, 0.6, 0.3, 0.8, 0.5];
  return bars.map((base) => Math.min(1.0, Math.max(0.15, base * normalized * 1.5)));
}

