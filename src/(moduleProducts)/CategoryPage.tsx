import React, { useEffect, useState } from "react";
import PaginatedTable from "../../../../hooks/PaginatedTable";
import { TableColumnFormat } from "../../../../Services/interfaces/Common/TableColumnFormat";
import { Button, Typography } from "@mui/material";
import { useDialog } from "../../../../hooks/DialogContext";
import { getJsonServerQueryBuild } from "../../../../Services/Common/getJsonServerSearchQuery";
import { useNavigate } from "react-router-dom";
import { NavRoutesEnum } from "../../../../Services/Common/NavRoutes";
import { removeCachedItemsByPrefix, setOrGetCache } from "../../../../Services/Common/CachingSessionService";
import { usePaginationItem } from "../../../../hooks/usePagination";
import CategorySearchForm from "./sections/CategoryPage/CategorySearchForm";
import { useSnackbar } from "../../../../hooks/SnackbarContext";
import { SnackbarSeverityEnum } from "../../../../../src/store/CommonEnums";
import { InitialStateCategory } from "../../../../../src/(moduleProducts)/store/ProductStoreModule";
import Category from "../../../../Services/interfaces/Product/Category";
import useProductApiModule from "../../../../Services/API/Product/ProductApiModule";



const columns: TableColumnFormat<Category>[] = [
    { id: "name", label: "Name" },
    { id: "description", label: "Description" },
];

const CategoryPage = () => {
    const { CategoryApi } = useProductApiModule();
    const [data, setData] = useState<Category[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const { openDialog } = useDialog();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const { paginationInfo, handlePaginationChange } = usePaginationItem();
    const [isResetting, setIsResetting] = useState(false);
    const [SearchFormData, setSearchFormData] = useState<Category>(InitialStateCategory);
    console.log("c")

    const fetchData = async () => {
        const query = getJsonServerQueryBuild(paginationInfo, SearchFormData);
        console.log("c1")

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