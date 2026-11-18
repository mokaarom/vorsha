import type { Metadata } from 'next';
import SettingsPage from '@/components/SettingsPage';

export const metadata: Metadata = {
  title: 'Settings — Vorosha Citizen Assistant',
  description: 'Manage language selection, voice permissions, and phone registration.',
};

export default function Page() {
  return <SettingsPage />;
}
