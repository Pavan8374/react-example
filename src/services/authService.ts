// src/services/authService.ts
import { config } from '../config/env.ts';

interface LoginResponse {
  token: string;
  id: string;
  expiration: Date;
  // add other response fields as needed
}

interface LoginCredentials {
  identifier: string;
  password: string;
}

const AUTH_KEYS = {
  TOKEN: 'auth_token',
  USER_ID: 'user_id'
};

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${config.API_URL}/Auth/signIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data: LoginResponse = await response.json();
      
      // Store auth data
      localStorage.setItem(AUTH_KEYS.TOKEN, data.token);
      localStorage.setItem(AUTH_KEYS.USER_ID, data.id);

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEYS.TOKEN);
    localStorage.removeItem(AUTH_KEYS.USER_ID);
  },

  getStoredAuth: () => ({
    token: localStorage.getItem(AUTH_KEYS.TOKEN),
    userId: localStorage.getItem(AUTH_KEYS.USER_ID)
  })
};