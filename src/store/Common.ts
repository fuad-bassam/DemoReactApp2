import { IPaginationInfo } from "../../src3/Services/interfaces/Common/Pagination";

export const initialPagination: IPaginationInfo = {
    page: 0,
    rowsPerPage: 10,
    sortBy: null as string | null,
    sortOrder: null as "asc" | "desc" | null,
} 