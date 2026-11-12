import apiClient from './api';

export const legislationService = {
  async getBills(params?: { status?: string; search?: string }) {
    const response = await apiClient.get('/legislation/bills/', { params });
    return response.data;
  },

  async getBillDetail(id: string) {
    const response = await apiClient.get(`/legislation/bills/${id}/`);
    return response.data;
  },

  async getSummary(id: string, readingLevel: 'basic' | 'intermediate' | 'advanced' = 'basic') {
    const response = await apiClient.get(`/legislation/bills/${id}/summary/`, {
      params: { level: readingLevel },
    });
    return response.data;
  },

  async askQuestion(billId: string, question: string) {
    const response = await apiClient.post(`/legislation/bills/${billId}/ask/`, { question });
    return response.data;
  },
};

