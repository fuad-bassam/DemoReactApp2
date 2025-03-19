import { useState } from "react";
import { initialPagination } from "../store/CommonInterfaces";
import { IPaginationInfo } from "../models/Common/Pagination";

export const usePaginationItem = () => {
    const [paginationInfo, setPaginationInfo] = useState(initialPagination);

    const handlePaginationChange = (newPaginationInfo: Partial<IPaginationInfo>) => {
        setPaginationInfo((prev) => ({
            ...prev,
            ...newPaginationInfo,
        }));
    };
    return { paginationInfo, handlePaginationChange };
};
