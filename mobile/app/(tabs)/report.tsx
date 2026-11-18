import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Card,
  Button,
  TextField,
  TextArea,
  Label,
  Chip,
  Alert as HeroAlert,
  useThemeColor,
} from 'heroui-native';
import { Spacing, BorderRadius } from '../../constants/theme';
import { Screen } from '../../components/common/Screen';
import { LocationPicker } from '../../components/map/LocationPicker';
import { useLocation } from '../../hooks/useLocation';
import { useSettingsStore } from '../../store/settingsStore';
import { Camera, Image as ImageIcon, Check } from 'lucide-react-native';

const CATEGORIES = [
  { id: 'road', labelBn: 'রাস্তা ও কালভার্ট ক্ষতি', labelEn: 'Road & Culvert Damage' },
  { id: 'waste', labelBn: 'ময়লা ও বর্জ্য অপসারণ', labelEn: 'Waste & Garbage' },
  { id: 'drainage', labelBn: 'ড্রেনেজ ও জলাবদ্ধতা', labelEn: 'Drainage & Waterlogging' },
  { id: 'electric', labelBn: 'বিদ্যুৎ ও তারের ঝুঁকি', labelEn: 'Electrical Hazard' },
  { id: 'water', labelBn: 'পানির পাইপ লিকেজ', labelEn: 'Water Leakage' },
];

export default function ReportScreen() {
  const { t } = useTranslation();
  const language = useSettingsStore((s) => s.language);
  const [accent, accentFg, success] = useThemeColor([
    'accent',
    'accent-foreground',
    'success',
  ]) as string[];
  const { location, refreshLocation, loading: locLoading } = useLocation();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('road');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission required', 'Camera permission is needed to take issue photos.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!imageUri) {
      Alert.alert(
        language === 'bn' ? 'ছবি প্রয়োজন' : 'Photo Required',
        language === 'bn'
          ? 'অনুগ্রহ করে সমস্যার একটি ছবি তুলুন বা নির্বাচন করুন।'
          : 'Please capture or choose a photo of the issue.'
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
      setSubmittedTicket(ticketId);
    }, 1200);
  };

  return (
    <Screen title={t('report.title')}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Typography type="body-sm" color="muted" style={{ marginBottom: Spacing.md }}>
        {t('report.subtitle')}
      </Typography>

      {submittedTicket ? (
        <HeroAlert status="success" style={{ marginBottom: Spacing.md }}>
          <HeroAlert.Indicator>
            <Check size={18} color={success} strokeWidth={1.5} />
          </HeroAlert.Indicator>
          <HeroAlert.Content>
            <HeroAlert.Title>
              {language === 'bn' ? 'অভিযোগ দাখিল হয়েছে' : 'Report submitted'}
            </HeroAlert.Title>
            <HeroAlert.Description>
              {language === 'bn'
                ? `ট্র্যাকিং নম্বর: ${submittedTicket}`
                : `Ticket ID: ${submittedTicket}`}
            </HeroAlert.Description>
          </HeroAlert.Content>
        </HeroAlert>
      ) : null}

      <Card style={styles.photoBox}>
        <Card.Body>
          {imageUri ? (
            <View style={styles.imagePreviewWrapper}>
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
              <Pressable
                onPress={() => setImageUri(null)}
                style={styles.retakeBtn}
                accessibilityRole="button"
              >
                <Typography type="body-xs" style={{ color: '#FFFFFF' }} weight="medium">
                  {language === 'bn' ? 'ছবি পরিবর্তন' : 'Change'}
                </Typography>
              </Pressable>
            </View>
          ) : (
            <View style={styles.photoActions}>
              <Button variant="primary" size="lg" onPress={takePhoto} style={{ alignSelf: 'stretch' }}>
                <Camera size={18} color={accentFg} strokeWidth={1.5} />
                <Button.Label>{t('report.take_photo')}</Button.Label>
              </Button>
              <Button variant="outline" size="lg" onPress={pickImage} style={{ alignSelf: 'stretch' }}>
                <ImageIcon size={18} color={accent} strokeWidth={1.5} />
                <Button.Label>{t('report.choose_photo')}</Button.Label>
              </Button>
            </View>
          )}
        </Card.Body>
      </Card>

      <Typography type="body-sm" weight="medium" style={styles.fieldLabel}>
        {t('report.category')}
      </Typography>
      <View style={styles.categoryPills}>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <Chip
              key={cat.id}
              size="md"
              variant={isSelected ? 'primary' : 'soft'}
              color={isSelected ? 'accent' : 'default'}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Chip.Label>
                {language === 'bn' ? cat.labelBn : cat.labelEn}
              </Chip.Label>
            </Chip>
          );
        })}
      </View>

      <Typography type="body-sm" weight="medium" style={styles.fieldLabel}>
        {t('report.location')}
      </Typography>
      <LocationPicker
        latitude={location?.coords.latitude || 23.8103}
        longitude={location?.coords.longitude || 90.4125}
        onRefreshLocation={refreshLocation}
        loading={locLoading}
      />

      <TextField style={{ marginTop: Spacing.sm }}>
        <Label>{t('report.description')}</Label>
        <TextArea
          placeholder={
            language === 'bn' ? 'সমস্যার বিস্তারিত বিবরণ দিন...' : 'Describe the issue...'
          }
          value={description}
          onChangeText={setDescription}
          numberOfLines={3}
        />
      </TextField>

      <Button
        variant="primary"
        size="lg"
        isDisabled={isSubmitting}
        onPress={handleSubmit}
        style={{ alignSelf: 'stretch', marginTop: Spacing.md }}
      >
        <Button.Label>{t('report.submit_report')}</Button.Label>
      </Button>
    </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  photoBox: {
    marginBottom: Spacing.md,
    minHeight: 160,
  },
  photoActions: {
    gap: 10,
  },
  imagePreviewWrapper: {
    position: 'relative',
    height: 200,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  retakeBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    minHeight: 32,
  },
  fieldLabel: {
    marginBottom: 8,
    marginTop: Spacing.xs,
  },
  categoryPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: Spacing.sm,
  },
});
