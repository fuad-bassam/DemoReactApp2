import useApiService from "../../Common/apiService";
import Variants from "../../interfaces/Product/Variants";

const useVariantApi = () => {
  const api = useApiService<Variants>("variants");

  return {
    getAll: () => api.getList(),
    getById: (id: string) => api.getItem(`/${id}`),
    getByQuery: (query: string) => api.getList(`/${query}`),
    create: (data: Variants) => api.post(data),
    update: (data: Variants) => api.update(data.id || '', data),
    deleteItem: (id: string) => api.deleteItem(id),
  };
};

export default useVariantApi;


// import { useMemo } from "react";
// import useApiService from "../../Common/apiService";
// import Variants from "../../interfaces/Product/Variants";

// const useVariantApi = () => {
//   const api = useApiService<Variants>("variants");

//   return useMemo(() => ({
//     getAll: () => api.getList(),
//     getById: (id: string) => api.getItem(`/${id}`),
//     getByQuery: (query: string) => api.getList(`/${query}`),
//     create: (data: Variants) => api.post(data),
//     update: (data: Variants) => api.update(data.id || '', data),
//     deleteItem: (id: string) => api.deleteItem(id),
//   }), [api]);
// };

// export default useVariantApi;