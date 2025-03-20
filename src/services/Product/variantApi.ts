import apiService from "../../helpers/apiService";
import Variants from "../../models/Product/Variants";

const variantApi = () => {
  const api = apiService<Variants>("variants");

  return {
    getAll: () => api.getList(),
    getById: (id: string) => api.getItem(`/${id}`),
    getByQuery: (query: string) => api.getList(`/${query}`),
    getByQuery2: (query: string) => api.getList(`api/${query}/`),

    create: (data: Variants) => api.post(data),
    update: (data: Variants) => api.update(data.id || '', data),
    deleteItem: (id: string) => api.deleteItem(id),
  }
};

export default variantApi;
