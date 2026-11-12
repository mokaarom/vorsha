import apiClient from './api';

export interface PolicyQueryPayload {
  query: string;
  language: 'bn' | 'en';
  district?: string;
  conversationId?: string;
}

export const policyService = {
  async queryPolicy(payload: PolicyQueryPayload) {
    const response = await apiClient.post('/policy/query/', payload);
    return response.data;
  },

  async getDocuments(params?: { category?: string; search?: string }) {
    const response = await apiClient.get('/policy/documents/', { params });
    return response.data;
  },

  async getDocumentDetail(id: string) {
    const response = await apiClient.get(`/policy/documents/${id}/`);
    return response.data;
  },
};

