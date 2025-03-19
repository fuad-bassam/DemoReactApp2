import { useMemo } from "react";
import useCategoryApi from "./CategoryApi";
import useProductApi from "./ProductApi";
import useVariantApi from "./VariantApi";

const useProductApiModule = () => {
  const CategoryApi = useCategoryApi();
  const ProductApi = useProductApi();
  const VariantApi = useVariantApi();

  // Memoize the entire API module
  return useMemo(() => ({
    CategoryApi,
    ProductApi,
    VariantApi,
  }), [CategoryApi, ProductApi, VariantApi]);
};

export default useProductApiModule;