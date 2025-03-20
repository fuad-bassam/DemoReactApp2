
import apiService from "../../helpers/apiService";
import Product from "../../models/Product/Product";

const productApi = () => {
  const api = apiService<Product>("products");

  return {
    getAll: () => api.getList(),
    getById: (id: string) => api.getItem(`/${id}`),
    getByQuery: (query: string) => api.getList(`/${query}`),

    create: (data: Product) => api.post(data),
    update: (data: Product) => api.update(data.id || '', data),
    deleteItem: (id: string) => api.deleteItem(id),
  };
};

export default productApi;


// import useApiService from "../../helpers/apiService";
// import Product from "../../models/Product/Product";

// const useProductApi = () => {
//   const api = useApiService<Product>("products");

//   return {
//     getAll: () => api.getList(),
//     getById: (id: string) => api.getItem(`/${id}`),
//     getByQuery: (query: string) => api.getList(`/${query}`),
//     create: (data: Product) => api.post(data),
//     update: (data: Product) => api.update(data.id || '', data),
//     deleteItem: (id: string) => api.deleteItem(id),
//   };
// };

// export default useProductApi;
