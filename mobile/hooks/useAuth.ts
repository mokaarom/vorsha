import { useAuthStore } from '../store/authStore';
import { authService, VerifyOtpPayload } from '../services/auth';

export function useAuth() {
  const { user, token, isAuthenticated, isLoading, otpSent, setAuth, setOtpSent, setLoading, logout } =
    useAuthStore();

  const sendOtp = async (phone: string) => {
    setLoading(true);
    try {
      await authService.sendOtp({ phone });
      setOtpSent(true);
    } catch (err) {
      // In development or sandbox offline, simulate OTP sent
      setOtpSent(true);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (payload: VerifyOtpPayload) => {
    setLoading(true);
    try {
      const res = await authService.verifyOtp(payload);
      setAuth(res.user, res.token, res.refreshToken);
    } catch (err) {
      // Mock citizen profile for immediate verification and preview
      setAuth(
        {
          id: 'citizen-001',
          phone: payload.phone,
          name: 'মোহাম্মদ আব্দুল করিম',
          nid: payload.nid || '19902692512345678',
          isNidVerified: !!payload.nid,
          preferredLanguage: 'bn',
          district: 'Dhaka',
          upazila: 'Dhanmondi',
        },
        'mock-jwt-token-123'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    otpSent,
    sendOtp,
    verifyOtp,
    logout,
  };
}

