import { Platform } from 'react-native';
import { Config } from '../constants/config';

// Expo AV numeric constants defined directly so loading this module
// never triggers requireNativeModule('ExponentAV') in environments where
// the native binary is unlinked (such as Expo Go or Web).
const ANDROID_OUTPUT_FORMAT_MPEG_4 = 2;
const ANDROID_AUDIO_ENCODER_AAC = 3;
const IOS_AUDIO_QUALITY_HIGH = 96;

const WEB_MIME_TYPES = [
  'audio/webm;codecs=opus',
  'audio/webm',
  'audio/mp4',
  'audio/ogg;codecs=opus',
  'audio/ogg',
];

function webRecordingOptions(): { mimeType: string; bitsPerSecond: number } {
  if (Platform.OS === 'web' && typeof MediaRecorder !== 'undefined') {
    const mimeType =
      WEB_MIME_TYPES.find((type) => MediaRecorder.isTypeSupported(type)) ??
      'audio/webm';
    return { mimeType, bitsPerSecond: Config.AUDIO.BIT_RATE };
  }
  return { mimeType: 'audio/webm', bitsPerSecond: Config.AUDIO.BIT_RATE };
}

export const RecordingOptions = {
  isMeteringEnabled: true,
  android: {
    extension: '.m4a',
    outputFormat: ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: Config.AUDIO.SAMPLE_RATE,
    numberOfChannels: Config.AUDIO.CHANNELS,
    bitRate: Config.AUDIO.BIT_RATE,
  },
  ios: {
    extension: '.m4a',
    audioQuality: IOS_AUDIO_QUALITY_HIGH,
    sampleRate: Config.AUDIO.SAMPLE_RATE,
    numberOfChannels: Config.AUDIO.CHANNELS,
    bitRate: Config.AUDIO.BIT_RATE,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: webRecordingOptions(),
};

export function calculateWaveformHeights(
  meteringValue: number | undefined,
): number[] {
  const normalized =
    meteringValue !== undefined
      ? Math.max(0.1, (meteringValue + 160) / 160)
      : 0.2;
  const bars = [0.2, 0.4, 0.7, 1.0, 0.6, 0.3, 0.8, 0.5];
  return bars.map((base) =>
    Math.min(1.0, Math.max(0.15, base * normalized * 1.5)),
  );
}
