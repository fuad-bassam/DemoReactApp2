import { Typography, Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDialog } from "../Context/DialogContext";
import { useSnackbar } from "../Context/SnackbarContext";
import { setOrGetCache, removeCachedItemsByPrefix } from "../helpers/CachingLocalStorageService";
import { getJsonServerQueryBuild } from "../helpers/getJsonServerSearchQuery";
import PaginatedTable from "../hooks/PaginatedTable";
import { usePaginationItem } from "../hooks/usePagination";
import { TableColumnFormat } from "../models/Common/TableColumnFormat";
import Category from "../models/Product/Category";
import { NavRoutesEnum } from "../routes/NavRoutes";
import { SnackbarSeverityEnum } from "../store/CommonEnums";
import CategorySearchForm from "./sections/CategoryPage/CategorySearchForm";
import { InitialStateCategory } from "./store/ProductStoreModule";
import categoryApi from "../services/Product/categoryApi";




const columns: TableColumnFormat<Category>[] = [
    { id: "name", label: "Name" },
    { id: "description", label: "Description" },
];

const CategoryPage = () => {
    const CategoryApi = useMemo(() => categoryApi(), []);
    const [data, setData] = useState<Category[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const { openDialog } = useDialog();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const { paginationInfo, handlePaginationChange } = usePaginationItem();
    const [isResetting, setIsResetting] = useState(false);
    const [SearchFormData, setSearchFormData] = useState<Category>(InitialStateCategory);

    const fetchData = async () => {
        const query = getJsonServerQueryBuild(paginationInfo, SearchFormData);

        try {
            const result: { data: Category[]; totalCount: number } = await setOrGetCache("Category/" + query, () => CategoryApi.getByQuery(query));
            setData(result.data);
            setTotalCount(result.totalCount);
        } catch (error) {
            if (error instanceof Error) {
                showSnackbar(`Error creating Category: ${error.message}`, SnackbarSeverityEnum.Error);
            } else {
                showSnackbar('Unknown error occurred', SnackbarSeverityEnum.Error);
            }
            throw error;
        }
    };

    const handleEdit = (id: string | undefined) => {
        if (id) {
            navigate(`${NavRoutesEnum.CategoryCreateUpdate.replace(':urlId?', id)}`);
        } else {
            showSnackbar('id is missing', SnackbarSeverityEnum.Error);

        }
    };
    const handleCreate = () => {
        navigate(`${NavRoutesEnum.CategoryCreateUpdate.replace(':urlId?', '')}`);
    };
    const handleDeleteClick = (id: string | undefined) => {
        if (id) {
            openDialog('Are you sure you want to delete this item?', () => {
                CategoryApi.deleteItem(id);
                removeCachedItemsByPrefix("Category/");
                setIsResetting(!isResetting);
            });
        } else {
            showSnackbar('id is missing', SnackbarSeverityEnum.Error);
        }
    };

    const handleSearchFormData = (data: Category) => {
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
                Categories Page</Typography>

            <CategorySearchForm
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
export default CategoryPage;