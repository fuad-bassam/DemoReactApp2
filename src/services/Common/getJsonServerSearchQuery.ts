export const getJsonServerQuerySearchPart = <T extends Record<string, any>>(formData: T): string => {
    const filteredData = Object.fromEntries(
        Object.entries(formData)
            .filter(([_, value]) => value !== '' && value !== null && value !== "0" && value !== 0)
            .map(([key, value]) => [`${key}_like`, value]) // Append `_like` for JSON Server filtering
    );

    return new URLSearchParams(filteredData).toString();
};

export const getJsonServerQueryBuild = (paginationInfo: any, formData: any): string => {
    const searchQuery = getJsonServerQuerySearchPart(formData);
    return `?${searchQuery ? `${searchQuery}&` : ""}_page=${paginationInfo.page + 1}&_limit=${paginationInfo.rowsPerPage}${paginationInfo.sortBy ? `&_sort=${paginationInfo.sortBy}&_order=${paginationInfo.sortOrder}` : ""}`;
};