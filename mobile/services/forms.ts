import apiClient from './api';

export const formsService = {
  async getTemplates(category?: string) {
    const response = await apiClient.get('/forms/templates/', { params: { category } });
    return response.data;
  },

  async getTemplateDetail(id: string) {
    const response = await apiClient.get(`/forms/templates/${id}/`);
    return response.data;
  },

  async submitForm(templateId: string, data: Record<string, any>) {
    const response = await apiClient.post('/forms/submissions/', {
      templateId,
      data,
    });
    return response.data;
  },

  async saveDraft(submissionId: string, data: Record<string, any>) {
    const response = await apiClient.patch(`/forms/submissions/${submissionId}/`, { data });
    return response.data;
  },

  async validateFields(submissionId: string, data: Record<string, any>) {
    const response = await apiClient.post(`/forms/submissions/${submissionId}/validate/`, { data });
    return response.data;
  },

  getPdfUrl(submissionId: string): string {
    return `${apiClient.defaults.baseURL}/forms/submissions/${submissionId}/pdf/`;
  },
};

