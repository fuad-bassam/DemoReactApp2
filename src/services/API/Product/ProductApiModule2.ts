import useCategoryApi from "./CategoryApi";
import useProductApi from "./ProductApi";
import useVariantApi from "./VariantApi";

const ProductApiModule2 = {
  CategoryApi: useCategoryApi,
  ProductApi: useProductApi,
  VariantApi: useVariantApi,
};

export default ProductApiModule2;
