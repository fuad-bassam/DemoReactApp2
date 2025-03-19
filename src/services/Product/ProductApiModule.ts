import useCategoryApi from "./CategoryApi";
import useProductApi from "./ProductApi";
import useVariantApi from "./VariantApi";

const ProductApiModule = {
  CategoryApi: useCategoryApi,
  ProductApi: useProductApi,
  VariantApi: useVariantApi,
};

export default ProductApiModule;
