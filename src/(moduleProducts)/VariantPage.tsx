import React, { useCallback, useEffect, useMemo, useState } from "react";
import PaginatedTable from "../../../../hooks/PaginatedTable";
import { TableColumnFormat } from "../../../../Services/interfaces/Common/TableColumnFormat";
import { Button, Typography } from "@mui/material";
import { useDialog } from "../../../../hooks/DialogContext";
import { getJsonServerQueryBuild } from "../../../../Services/Common/getJsonServerSearchQuery";
import { useNavigate } from "react-router-dom";
import { NavRoutesEnum } from "../../../../Services/Common/NavRoutes";
import { removeCachedItemsByPrefix, setOrGetCache } from "../../../../Services/Common/CachingSessionService";
import { usePaginationItem } from "../../../../hooks/usePagination";
import VariantSearchForm from "./sections/VariantPage/VariantSearchForm";
import { useSnackbar } from "../../../../hooks/SnackbarContext";
import { SnackbarSeverityEnum } from "../../../../../src/store/CommonEnums";
import Variants from "../../../../Services/interfaces/Product/Variants";
import { InitialStateVariant } from "../../../../../src/(moduleProducts)/store/ProductStoreModule";
import ILOVItem from "../../../../Services/interfaces/Common/LOVs";
import ProductApiModule from "../../../services/Product/ProductApiModule";



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
    // const { ProductApi, VariantApi } = useProductApiModule();
    const ProductApi = useMemo(() => ProductApiModule.ProductApi(), []);
    const VariantApi = useMemo(() => ProductApiModule.VariantApi(), []);


    const [productLovData, setProductLovData] = useState<ILOVItem[]>([]);
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
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationInfo, isResetting]);
    console.log("v")

    const fetchData = async () => {
        console.log("v1")

        const query = getJsonServerQueryBuild(paginationInfo, SearchFormData);
        try {
            const result: { data: Variants[]; totalCount: number } = await setOrGetCache("Variant/" + query, () => VariantApi.getByQuery(query));
            result.data.map(itm => {

                const product = productLovData.find(p => p.value === itm.productId);
                itm.productId = product ? product.label : 'Unknown';
                return itm;
            });
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