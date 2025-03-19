import useApiService from "../../helpers/apiService";
import { IUser } from "../../models/User/IUser";


const useUserApi = () => {
  const api = useApiService<IUser>("users");

  return {
    getAll: () => api.getList(),
    getById: (id: string) => api.getItem(`/${id}`),
    create: (data: IUser) => api.post(data),
    update: (data: IUser) => api.update(data.id || '', data),
    deleteItem: (id: string) => api.deleteItem(id),
  };
};

export default useUserApi;
