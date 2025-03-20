import { useMemo } from "react";
import useCategoryApi from "./useCategoryApi";
import useProductApi from "./useProductApi";
import useVariantApi from "./useVariantApi";

const useProductApiModule = () => {
  const categoryApi = useCategoryApi();
  const productApi = useProductApi();
  const variantApi = useVariantApi();

  return useMemo(() => ({
    CategoryApi: categoryApi,
    ProductApi: productApi,
    VariantApi: variantApi,
  }), [categoryApi, productApi, variantApi]);
};

export default useProductApiModule;
