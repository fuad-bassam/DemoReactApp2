import axiosInstance from './axiosInstance';

const useApiService = <T>(baseUrl: string) => {
  const getList = async (query: string | null = null): Promise<{ data: T[]; totalCount: number }> => {
    try {
      const url = query ? `${baseUrl}${query}` : baseUrl;
      const response = await axiosInstance.get<T[]>(url);
      const totalCount = Number(response.headers["x-total-count"] || 0);

      return {
        data: response.data,
        totalCount
      };
    } catch (error) {
      //console.error(`Error fetching data from ${baseUrl}:`, error);
      throw error;
    }
  };

  const getItem = async (query: string | null = null): Promise<T> => {
    try {
      const url = query ? `${baseUrl}${query}` : baseUrl;
      const response = await axiosInstance.get<T>(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${baseUrl}:`, error);
      throw error;
    }
  };

  const post = async (data: T): Promise<T> => {
    try {

      const response = await axiosInstance.post<T>(baseUrl, data);
      return response.data;
    } catch (error) {
      //console.error(`Error creating ${baseUrl}:`, error);
      throw error;
    }
  };

  const update = async (id: string, data: T): Promise<T> => {
    try {
      if (!id || id.trim() === '') {
        throw new Error("ID cannot be empty");
      }
      const url = `${baseUrl}/${id}`;
      const response = await axiosInstance.put<T>(url, data);
      return response.data;
    } catch (error) {
      // console.error(`Error updating ${baseUrl} with ID ${id}:`, error);
      throw error;
    }
  };

  const deleteItem = async (id: string): Promise<void> => {
    try {

      const url = `${baseUrl}/${id}`;
      await axiosInstance.delete(url);
    } catch (error) {
      //console.error(`Error deleting ${baseUrl} with ID ${id}:`, error);
      throw error;
    }
  };

  return { getList, getItem, post, update, deleteItem };
};

export default useApiService;
