import { create } from 'zustand';

export interface UserProfile {
  id: string;
  phone: string;
  name?: string;
  nid?: string;
  isNidVerified: boolean;
  preferredLanguage: 'bn' | 'en';
  district?: string;
  upazila?: string;
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  otpSent: boolean;
  setAuth: (user: UserProfile, token: string, refreshToken?: string) => void;
  setUser: (user: Partial<UserProfile>) => void;
  setOtpSent: (status: boolean) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  otpSent: false,
  setAuth: (user, token, refreshToken) =>
    set({
      user,
      token,
      refreshToken: refreshToken || null,
      isAuthenticated: true,
      isLoading: false,
      otpSent: false,
    }),
  setUser: (partial) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...partial } : null,
    })),
  setOtpSent: (status) => set({ otpSent: status }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () =>
    set({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      otpSent: false,
    }),
}));

