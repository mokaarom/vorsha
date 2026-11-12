import apiClient from './api';

export interface SubmitIssuePayload {
  imageUri: string;
  category: string;
  latitude: number;
  longitude: number;
  description?: string;
  severity?: 'minor' | 'moderate' | 'severe' | 'critical';
}

export const issuesService = {
  async submitReport(payload: SubmitIssuePayload) {
    const formData = new FormData();
    const filename = payload.imageUri.split('/').pop() || 'report.jpg';

    // @ts-ignore
    formData.append('photo', {
      uri: payload.imageUri,
      name: filename,
      type: 'image/jpeg',
    });
    formData.append('category', payload.category);
    formData.append('latitude', payload.latitude.toString());
    formData.append('longitude', payload.longitude.toString());
    if (payload.description) formData.append('description', payload.description);
    if (payload.severity) formData.append('severity', payload.severity);

    const response = await apiClient.post('/issues/reports/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getReports(params?: { category?: string; status?: string }) {
    const response = await apiClient.get('/issues/reports/', { params });
    return response.data;
  },

  async getReportDetail(id: string) {
    const response = await apiClient.get(`/issues/reports/${id}/`);
    return response.data;
  },

  async upvoteReport(id: string) {
    const response = await apiClient.post(`/issues/reports/${id}/upvote/`);
    return response.data;
  },

  async getHeatmap() {
    const response = await apiClient.get('/issues/reports/heatmap/');
    return response.data;
  },
};

