import React, { useEffect, useMemo, useState } from "react";
import Product from "../../../../Services/interfaces/Product/Product";
import PaginatedTable from "../../../../hooks/PaginatedTable";
import { TableColumnFormat } from "../../../../Services/interfaces/Common/TableColumnFormat";
import { Button, Typography } from "@mui/material";
import { useDialog } from "../../../../hooks/DialogContext";
import { getJsonServerQueryBuild } from "../../../../Services/Common/getJsonServerSearchQuery";
import { useNavigate } from "react-router-dom";
import { NavRoutesEnum } from "../../../../Services/Common/NavRoutes";
import { removeCachedItemsByPrefix, setOrGetCache } from "../../../../Services/Common/CachingSessionService";
import { InitialStateProduct } from "../../../../../src/(moduleProducts)/store/ProductStoreModule";
import { usePaginationItem } from "../../../../hooks/usePagination";
import ProductSearchForm from "./sections/ProductPage/ProductSearchForm";
import { useSnackbar } from "../../../../hooks/SnackbarContext";
import { SnackbarSeverityEnum } from "../../../../../src/store/CommonEnums";
import ILOVItem from "../../../../Services/interfaces/Common/LOVs";
import useProductApiModule from "../../../../Services/API/Product/ProductApiModule";



const columns: TableColumnFormat<Product>[] = [
    { id: "name", label: "Name" },
    { id: "categoryId", label: "Category ID" },
    { id: "description", label: "Description" },
    { id: "notes", label: "Notes" },
    {
        id: "createdAt",
        label: "Created At",
        format: (value: string) => new Date(value).toLocaleDateString(),
    },
];

const ProductPage = () => {
    const { ProductApi, CategoryApi } = useProductApiModule();

    const [data, setData] = useState<Product[]>([]);
    const [totalCount, setTotalCount] = useState(0);

    const { openDialog } = useDialog();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const { paginationInfo, handlePaginationChange } = usePaginationItem();
    const [isResetting, setIsResetting] = useState(false);
    const [SearchFormData, setSearchFormData] = useState<Product>(InitialStateProduct);

    console.log("p")

    const handleCategoryApi = useMemo(async () => {
        try {
            const Category = await CategoryApi.getAll();
            return Category.data.map<ILOVItem>((cat: any) => ({ value: cat.id, label: cat.name }));
        } catch (error) {
            console.error("Failed to fetch product options:", error);
            return [];
        }
    }, [CategoryApi]);

    // function getCategories(){
    //     try {
    //         const Category = await CategoryApi.getAll();
    //         const mappedCategories = Category.data.map<ILOVItem>((cat: any) => ({ value: cat.id, label: cat.name }))
    //         SetState(categories, mappedCategories );
    //         //return Category.data.map<ILOVItem>((cat: any) => ({ value: cat.id, label: cat.name }));
    //     } catch (error) {
    //         console.error("Failed to fetch product options:", error);
    //         return [];
    //     }
    // }

    // function fetchItems(){
    //     try {
    //         const items = await CategoryApi.getAll();
    //         return Category.data.map<ILOVItem>((cat: any) => ({ value: cat.id, label: cat.name }));
    //     } catch (error) {
    //         console.error("Failed to fetch product options:", error);
    //         return [];
    //     }
    // }


    const fetchData = async () => {
        const query = getJsonServerQueryBuild(paginationInfo, SearchFormData);
        let _categoryLov = await handleCategoryApi;
        console.log("p1")

        try {
            const result: { data: Product[]; totalCount: number } = await setOrGetCache("Product/" + query, () => ProductApi.getByQuery(query));

            setData(result.data);
            setTotalCount(result.totalCount);
        } catch (error) {
            if (error instanceof Error) {
                showSnackbar(`Error creating product: ${error.message}`, SnackbarSeverityEnum.Error);
            } else {
                showSnackbar('Unknown error occurred', SnackbarSeverityEnum.Error);
            }
            throw error;
        }
    };

    const handleEdit = (id: string | undefined) => {
        if (id) {
            navigate(`${NavRoutesEnum.ProductCreateUpdate.replace(':urlId?', id)}`);
        } else {
            showSnackbar('id is missing', SnackbarSeverityEnum.Error);

        }
    };
    const handleCreate = () => {
        navigate(`${NavRoutesEnum.ProductCreateUpdate.replace(':urlId?', '')}`);
    };
    const handleDeleteClick = (id: string | undefined) => {
        if (id) {
            openDialog('Are you sure you want to delete this item?', () => {
                ProductApi.deleteItem(id);
                removeCachedItemsByPrefix("Product/");
                setIsResetting(!isResetting);
            });
        } else {
            showSnackbar('id is missing', SnackbarSeverityEnum.Error);
        }
    };

    const handleSearchFormData = (data: Product) => {
        setSearchFormData(data)
        setIsResetting(!isResetting);

    };
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationInfo, isResetting]);

    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Products </Typography>

            <ProductSearchForm
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
export default ProductPage;