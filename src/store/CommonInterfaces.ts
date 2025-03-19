import { IPaginationInfo } from "../models/Common/Pagination";

export const initialPagination: IPaginationInfo = {
    page: 0,
    rowsPerPage: 10,
    sortBy: null as string | null,
    sortOrder: null as "asc" | "desc" | null,
} 