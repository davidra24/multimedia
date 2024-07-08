import axios from 'axios';
import { API_GATEWAY } from '../utils/constants';

export const getContents = async (category?: string, topic?: string) => {
  try {
    const token = localStorage.getItem('token');
    return await axios.get(`${API_GATEWAY}/content`, {
      params: {
        category,
        topic,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    return error.response.data?.message;
  }
};
export const createContent = async (body: FormData) => {
  try {
    const token = localStorage.getItem('token');
    return await axios.post(`${API_GATEWAY}/content`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    return error.response.data?.message;
  }
};
export const getCategories = async () => {
  try {
    const token = localStorage.getItem('token');
    return await axios.get(API_GATEWAY + '/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    return error.response.data?.message;
  }
};
export const getTopics = async () => {
  try {
    const token = localStorage.getItem('token');
    return await axios.get(API_GATEWAY + '/topic', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    return error.response.data?.message;
  }
};
