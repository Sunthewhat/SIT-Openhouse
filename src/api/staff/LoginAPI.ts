import { Axios } from '@/utils/axios';

const StaffLoginAPI = async (
  username: string,
  password: string
): Promise<{ success: boolean; data: string }> => {
  try {
    const response = await Axios.public.post<string>('/login', { username, password });
    return {
      success: response.status === 200,
      data: response.data,
    };
  } catch (e) {
    return {
      success: false,
      data: e + '',
    };
  }
};

export { StaffLoginAPI };
