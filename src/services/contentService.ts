// src/services/contentService.ts
import { config } from '../config/env.ts';
import { authService } from './authService.ts'; // Import authService to get the token

//const API_URL = config.API_URL + '/Feed';

export const contentService = {
  fetchVideos: async (pageNumber: number, pageSize: number) => {
    try {
      const { token } = authService.getStoredAuth();
      const response = await fetch(`${config.API_URL}/Feed?PageNumber=${pageNumber}&PageSize=${pageSize}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }

      const data = await response.json();
      return data.data; // Return the video data
    } catch (error) {
      console.error('Error in contentService:', error);
      throw error; // Rethrow the error for handling in the component
    }
  }
};
