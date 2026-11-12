import apiClient from './api';

export interface SendOtpPayload {
  phone: string;
}

export interface VerifyOtpPayload {
  phone: string;
  otp: string;
  nid?: string;
}

export const authService = {
  async sendOtp(payload: SendOtpPayload) {
    const response = await apiClient.post('/auth/register/', payload);
    return response.data;
  },

  async verifyOtp(payload: VerifyOtpPayload) {
    const response = await apiClient.post('/auth/login/', payload);
    return response.data;
  },

  async verifyNid(nidNumber: string, phone: string) {
    const response = await apiClient.post('/auth/verify-nid/', { nid: nidNumber, phone });
    return response.data;
  },

  async refreshToken(refreshToken: string) {
    const response = await apiClient.post('/auth/token/refresh/', { refresh: refreshToken });
    return response.data;
  },

  async logout() {
    return apiClient.post('/auth/logout/');
  },

  async deleteAccount() {
    return apiClient.delete('/auth/account/');
  },
};

