import axiosInstance from './axiosInstance';

const apiService = <T>(baseUrl: string) => {
  const getList = async (query: string | null = null): Promise<{ data: T[]; totalCount: number }> => {
    const url = query ? `${baseUrl}${query}` : baseUrl;
    const response = await axiosInstance.get<T[]>(url).catch((error) => {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    });
    const totalCount = Number(response.headers["x-total-count"] || 0);

    return {
      data: response.data,
      totalCount
    };
  };

  const getItem = async (query: string | null = null): Promise<T> => {
    const url = query ? `${baseUrl}${query}` : baseUrl;
    const response = await axiosInstance.get<T>(url).catch((error) => {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    });
    return response.data;

  };

  const post = async (data: T): Promise<T> => {

    const response = await axiosInstance.post<T>(baseUrl, data).catch((error) => {
      console.error(`Error from ${baseUrl}:`, error);
      throw error;
    });
    return response.data;
  };

  const update = async (id: string, data: T): Promise<T> => {
    if (!id || id.trim() === '') {
      throw new Error("ID cannot be empty");
    }
    const url = `${baseUrl}/${id}`;
    const response = await axiosInstance.put<T>(url, data).catch((error) => {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    });
    return response.data;

  };

  const deleteItem = async (id: string): Promise<void> => {
    const url = `${baseUrl}/${id}`;
    await axiosInstance.delete(url).catch((error) => {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    });
  };

  return { getList, getItem, post, update, deleteItem };
};

export default apiService;
