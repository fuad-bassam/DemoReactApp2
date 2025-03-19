export interface IPaginationInfo {
    page: number;
    rowsPerPage: number;
    sortBy: string | null;
    sortOrder: "asc" | "desc" | null;
}