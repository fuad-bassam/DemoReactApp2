import useApiService from "../../Common/apiService";
import Product from "../../interfaces/Product/Product";

const useProductApi = () => {
  const api = useApiService<Product>("products");

  return {
    getAll: () => api.getList(),
    getById: (id: string) => api.getItem(`/${id}`),
    getByQuery: (query: string) => api.getList(`/${query}`),

    create: (data: Product) => api.post(data),
    update: (data: Product) => api.update(data.id || '', data),
    deleteItem: (id: string) => api.deleteItem(id),
  };
};

export default useProductApi;
// import { useMemo } from "react";
// import useApiService from "../../Common/apiService";
// import Product from "../../interfaces/Product/Product";

// const useProductApi = () => {
//   const api = useApiService<Product>("products");

//   return useMemo(() => ({
//     getAll: () => api.getList(),
//     getById: (id: string) => api.getItem(`/${id}`),
//     getByQuery: (query: string) => api.getList(`/${query}`),

//     create: (data: Product) => api.post(data),
//     update: (data: Product) => api.update(data.id || '', data),
//     deleteItem: (id: string) => api.deleteItem(id),
//   }),[api]);
// };

// export default useProductApi;
