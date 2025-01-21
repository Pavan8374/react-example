// src/services/contentService.ts
import { config } from '../config/env.ts';
import { authService } from './authService.ts'; // Import authService to get the token

//const API_URL = config.API_URL + '/Feed';

export const contentService = {
  fetchVideos: async (pageNumber: number, pageSize: number, contentStatus: number = 0) => {
    try {
      //https://neardekhoapi.azurewebsites.net/v1/Content?ContentStatus=0&PageNumber=1&PageSize=10&UserId
      const { token } = authService.getStoredAuth();

      const response = await fetch(`${config.API_URL}/Content?ContentStatus=${contentStatus}&PageNumber=${pageNumber}&PageSize=${pageSize}`, {
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
  },


  manageVideo: async (contentId: string, contentStatus: number) => {
    try {
      const { token } = authService.getStoredAuth();
      const response = await fetch(
        `${config.API_URL}/Content/manage?Id=${contentId}&ContentStatus=${contentStatus}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update content status');
      }

      return await response.json(); // Optionally return the response data
    } catch (error) {
      console.error('Error managing video:', error);
      throw error; // Rethrow the error for handling in the component
    }
  },
};
