import { Typography, Button } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDialog } from "../Context/DialogContext";
import { useSnackbar } from "../Context/SnackbarContext";
import { setOrGetCache, removeCachedItemsByPrefix } from "../helpers/CachingLocalStorageService";
import { getJsonServerQueryBuild } from "../helpers/getJsonServerSearchQuery";
import PaginatedTable from "../hooks/PaginatedTable";
import { usePaginationItem } from "../hooks/usePagination";
import ILOVItem from "../models/Common/ILOVItem";
import { TableColumnFormat } from "../models/Common/TableColumnFormat";
import Variants from "../models/Product/Variants";
import { NavRoutesEnum } from "../routes/NavRoutes";
import { SnackbarSeverityEnum } from "../store/CommonEnums";
import VariantSearchForm from "./sections/VariantPage/VariantSearchForm";
import { InitialStateVariant } from "./store/ProductStoreModule";
import productApi from "../services/Product/productApi";
import variantApi from "../services/Product/variantApi";




const columns: TableColumnFormat<Variants>[] = [
    { id: "name", label: "Name" },
    { id: "productId", label: "Product" },
    { id: "price", label: "Price" },
    { id: "stock", label: "Stock" },

];

const VariantPage = () => {
    const [data, setData] = useState<Variants[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const { openDialog } = useDialog();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const { paginationInfo, handlePaginationChange } = usePaginationItem();
    const [isResetting, setIsResetting] = useState(false);
    const [SearchFormData, setSearchFormData] = useState<Variants>(InitialStateVariant);
    // const { , VariantApi } = useProductApiModule();
    const ProductApi = useMemo(() => productApi(), []);
    const VariantApi = useMemo(() => variantApi(), []);


    const [productLov, setProductLovData] = useState<ILOVItem[]>([]);
    const handleProductApi = useCallback(async (): Promise<ILOVItem[]> => {
        const categories = await ProductApi.getAll();
        return categories.data.map<ILOVItem>((cat: any) => ({ value: cat.id, label: cat.name }));
    }, [ProductApi]);

    useEffect(() => {
        const fetchProductOptions = async () => {
            const options = await handleProductApi();
            setProductLovData(options);
        };

        fetchProductOptions();
    }, [handleProductApi]);
    useEffect(() => {
        if (productLov.length > 0) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationInfo, isResetting, productLov]);

    const fetchAndTransformProducts = async (query: string): Promise<{ data: Variants[]; totalCount: number }> => {
        try {
            const response = await VariantApi.getByQuery(query);
            response.data = response.data.map(itm => {
                const product = productLov.find(p => p.value === itm.productId);
                itm.productId = product ? product.label : "Unknown";
                return itm;
            });

            return response;
        } catch (error) {
            console.error("Error fetching products:", error);
            return { data: [], totalCount: 0 };
        }
    };

    const fetchData = async () => {
        const query = getJsonServerQueryBuild(paginationInfo, SearchFormData);
        try {
            const result: { data: Variants[]; totalCount: number } = await setOrGetCache("Variant/" + query, () => fetchAndTransformProducts(query));
            setData(result.data);
            setTotalCount(result.totalCount);
        } catch (error) {
            if (error instanceof Error) {
                showSnackbar(`Error creating Variant: ${error.message}`, SnackbarSeverityEnum.Error);
            } else {
                showSnackbar('Unknown error occurred', SnackbarSeverityEnum.Error);
            }
            throw error;
        }
    };
    const handleEdit = (id: string | undefined) => {
        if (id) {
            navigate(`${NavRoutesEnum.VariantCreateUpdate.replace(':urlId?', id)}`);
        } else {
            showSnackbar('id is missing', SnackbarSeverityEnum.Error);

        }
    };
    const handleCreate = () => {
        navigate(`${NavRoutesEnum.VariantCreateUpdate.replace(':urlId?', '')}`);
    };
    const handleDeleteClick = (id: string | undefined) => {
        if (id) {
            openDialog('Are you sure you want to delete this item?', () => {
                VariantApi.deleteItem(id);
                removeCachedItemsByPrefix("Variant/");
                setIsResetting(!isResetting);
            });
        } else {
            showSnackbar('id is missing', SnackbarSeverityEnum.Error);
        }
    };
    const handleSearchFormData = (data: Variants) => {
        setSearchFormData(data)
        setIsResetting(!isResetting);

    };
    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Variants Page </Typography>

            <VariantSearchForm
                onSubmit={(formData) => handleSearchFormData(formData)}
                onReset={(formData) => handleSearchFormData(formData)}
                actions={
                    <Button onClick={() => handleCreate()} variant="contained" color="primary" style={{ marginRight: 8 }}>
                        Create
                    </Button>
                }
            />
            <PaginatedTable
                data={data}
                columns={columns}
                totalCount={totalCount}
                paginationInfo={paginationInfo}
                handlePaginationChange={handlePaginationChange}
                actions={(row) => (
                    <>
                        <Button onClick={() => handleEdit(row.id)} variant="outlined" color="primary" style={{ marginRight: 8 }}>
                            Edit
                        </Button>
                        <Button onClick={() => handleDeleteClick(row.id)} variant="outlined" color="secondary">
                            Delete
                        </Button>
                    </>
                )}
            />
        </div>
    );
};
export default VariantPage;