import { useState } from "react";
import { initialPagination } from "../../src/store/Common";
import { IPaginationInfo } from "../Services/interfaces/Common/Pagination";

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
