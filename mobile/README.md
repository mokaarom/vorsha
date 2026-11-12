# Vorosha Mobile Client (React Native + Expo)

**ভরসা (Vorosha)** — A unified, bilingual (Bangla & English), voice-first AI assistant empowering Bangladeshi citizens to discover, understand, and complete government services through natural conversation.

---

## 📱 Tech Stack

- **Framework**: React Native 0.88+ (Expo SDK 58+)
- **Router**: Expo Router (File-based navigation)
- **State Management**: Zustand
- **Audio & Voice**: `expo-av`, custom audio waveform visualizer
- **Vision & Media**: `expo-camera`, `expo-image-picker`
- **Geolocation**: `expo-location`
- **Typography & Localization**: Mont (ExtraLight, Heavy), Noto Sans Bengali, `i18next` + `react-i18next` (বাংলা ও English)
- **Networking**: Axios client with JWT interceptors
- **Icons**: `lucide-react-native`, `@expo/vector-icons`

---

## 🗂️ Architecture & Folder Structure

```
mobile/
├── app.json                           # Expo application configuration & permissions
├── package.json
├── tsconfig.json                      # Path aliases (@/components, @/hooks, etc.)
├── babel.config.js
├── app/                               # Expo Router (file-based routes)
│   ├── _layout.tsx                    # Root layout with fonts, safe area & stack
│   ├── index.tsx                      # Home / Voice Hub (Hero logo, interactive mic)
│   ├── (auth)/                        # Authentication flow
│   │   ├── _layout.tsx
│   │   ├── onboarding.tsx             # Language selection & voice intro
│   │   ├── login.tsx                  # Phone + OTP + NID login
│   │   └── register.tsx               # Citizen registration
│   ├── (tabs)/                        # Main 5-tab navigation
│   │   ├── _layout.tsx                # Bottom tab bar with icons & touch targets
│   │   ├── voice.tsx                  # Voice conversation + RAG citations
│   │   ├── forms.tsx                  # Smart form assistant registry
│   │   ├── report.tsx                 # Photo issue reporting with GPS
│   │   ├── legislation.tsx            # Plain-language laws & reading levels
│   │   └── profile.tsx                # Citizen profile, NID status & settings
│   ├── conversation/
│   │   └── [id].tsx                   # Conversation history detail
│   ├── form/
│   │   ├── [templateId].tsx           # Step-by-step voice-to-text form filling
│   │   └── review.tsx                 # Form review & PDF download
│   ├── issue/
│   │   └── [id].tsx                   # Citizen issue tracking & upvotes
│   └── bill/
│       └── [id].tsx                   # Legislation breakdown & AI Q&A
├── components/
│   ├── ui/                            # Design system primitives (≥48dp touch targets)
│   │   ├── Button.tsx, Card.tsx, Input.tsx, Badge.tsx, Modal.tsx, Typography.tsx
│   ├── voice/                         # Voice-specific components
│   │   ├── VoiceButton.tsx            # ≥64dp animated ripple voice button
│   │   ├── Waveform.tsx               # Audio waveform visualization
│   │   ├── TranscriptionBubble.tsx    # Live speech transcription
│   │   └── VoiceStateIndicator.tsx    # Listening/processing/speaking indicator
│   ├── forms/                         # Smart form components
│   │   ├── FormField.tsx, ValidationFeedback.tsx, ProgressBar.tsx
│   ├── map/                           # Geospatial preview components
│   │   ├── MapView.tsx, LocationPicker.tsx
│   └── common/                        # Utility components
│       ├── Citation.tsx, LanguageToggle.tsx, OfflineIndicator.tsx
├── hooks/                             # Custom React hooks
│   ├── useVoice.ts, useAuth.ts, useApi.ts, useLocation.ts, useOffline.ts
├── services/                          # API Service Layer
│   ├── api.ts, auth.ts, voice.ts, policy.ts, forms.ts, issues.ts, legislation.ts
├── store/                             # Zustand Stores
│   ├── authStore.ts, voiceStore.ts, formStore.ts, settingsStore.ts
├── i18n/                              # Localization
│   ├── index.ts, bn.json, en.json
├── constants/                         # Design tokens & config
│   ├── colors.ts, theme.ts, config.ts
├── utils/                             # Helpers
│   ├── audio.ts, formatting.ts, geo.ts, validation.ts
└── assets/                            # Brand Assets
    ├── fonts/                         # Mont-ExtraLight.otf, Mont-Heavy.otf
    └── images/                        # logo.png, logo-white.png, icon.png, splash-icon.png
```

---

## 🚀 How to Run the App

1. Navigate to the `mobile` directory:
   ```bash
   cd mobile
   ```

2. Start the Expo development server:
   ```bash
   npx expo start
   ```

3. Open on your device or browser:
   - **Expo Go**: Scan the QR code with the Expo Go app (Android / iOS).
   - **Web Browser**: Press `w` in terminal or run `npx expo start --web`.
   - **Android Emulator**: Press `a`.
   - **iOS Simulator**: Press `i`.
