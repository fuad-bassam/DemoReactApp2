import useApiService from "../../helpers/apiService";
import Category from "../../models/Product/Category";

const useCategoryApi = () => {
  const api = useApiService<Category>("categories");

  return {
    getAll: () => api.getList(),
    getById: (id: string) => api.getItem(`/${id}`),
    getByQuery: (query: string) => api.getList(`/${query}`),
    create: (data: Category) => api.post(data),
    update: (data: Category) => api.update(data.id || '', data),
    deleteItem: (id: string) => api.deleteItem(id),
  };
};

export default useCategoryApi;
// import { useMemo } from "react";
// import useApiService from "../../Common/apiService";
// import Category from "../../interfaces/Product/Category";

// const useCategoryApi = () => {
//   const api = useApiService<Category>("categories");

//   return useMemo(() => ({
//     getAll: () => api.getList(),
//     getById: (id: string) => api.getItem(`/${id}`),
//     getByQuery: (query: string) => api.getList(`/${query}`),
//     create: (data: Category) => api.post(data),
//     update: (data: Category) => api.update(data.id || '', data),
//     deleteItem: (id: string) => api.deleteItem(id),
//   }), [api]);

// }
// export default useCategoryApi;
