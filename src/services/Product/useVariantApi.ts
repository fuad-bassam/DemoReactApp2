import { useMemo } from "react";
import useApiService from "../../helpers/apiService";
import Variants from "../../models/Product/Variants";

const useVariantApi = () => {
  const api = useApiService<Variants>("variants");

  return useMemo(() => ({
    getAll: () => api.getList(),
    getById: (id: string) => api.getItem(`/${id}`),
    getByQuery: (query: string) => api.getList(`/${query}`),
    getByQuery2: (query: string) => api.getList(`api/${query}/`),

    create: (data: Variants) => api.post(data),
    update: (data: Variants) => api.update(data.id || '', data),
    deleteItem: (id: string) => api.deleteItem(id),
  }), [api]);
};

export default useVariantApi;
