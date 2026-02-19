/**
 * API Service Layer
 * Configure API_BASE_URL to point to your backend server.
 * Currently uses mock data as fallback when backend is unavailable.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('civicai_token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('civicai_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('civicai_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string) {
    const result = await this.request<{ success: boolean; data: { token: string; user: any } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (result.data.token) this.setToken(result.data.token);
    return result.data;
  }

  async register(data: { name: string; email: string; password: string; role?: string; assignedZone?: string }) {
    const result = await this.request<{ success: boolean; data: { token: string; user: any } }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (result.data.token) this.setToken(result.data.token);
    return result.data;
  }

  async getMe() {
    return this.request<{ success: boolean; data: any }>('/auth/me');
  }

  // Assets
  async getAssets(params?: { type?: string; riskLevel?: string; zone?: string; page?: number; limit?: number }) {
    const query = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    return this.request<{ success: boolean; data: any[]; pagination: any }>(`/assets${query}`);
  }

  async getAssetById(id: string) {
    return this.request<{ success: boolean; data: any }>(`/assets/${id}`);
  }

  async createAsset(data: any) {
    return this.request<{ success: boolean; data: any }>('/assets', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateAsset(id: string, data: any) {
    return this.request<{ success: boolean; data: any }>(`/assets/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteAsset(id: string) {
    return this.request<{ success: boolean }>(`/assets/${id}`, { method: 'DELETE' });
  }

  // AI Analysis
  async analyzeAsset(assetId: string) {
    return this.request<{ success: boolean; data: any }>('/ai/analyze', { method: 'POST', body: JSON.stringify({ assetId }) });
  }

  async getAnalysisHistory(assetId: string) {
    return this.request<{ success: boolean; data: any[] }>(`/ai/history/${assetId}`);
  }

  // Alerts
  async getAlerts(params?: { status?: string; severity?: string; page?: number; limit?: number }) {
    const query = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    return this.request<{ success: boolean; data: any[]; pagination: any }>(`/alerts${query}`);
  }

  async getCriticalAlerts() {
    return this.request<{ success: boolean; data: any[] }>('/alerts/critical');
  }

  async updateAlertStatus(id: string, status: 'pending' | 'resolved') {
    return this.request<{ success: boolean; data: any }>(`/alerts/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
  }

  // Dashboard
  async getDashboardOverview() {
    return this.request<{ success: boolean; data: any }>('/dashboard/overview');
  }

  async getHeatmapData() {
    return this.request<{ success: boolean; data: any[] }>('/dashboard/heatmap');
  }

  // Reports
  async getReportSummary() {
    return this.request<{ success: boolean; data: any }>('/reports/summary');
  }
}

export const api = new ApiService();
export default api;
