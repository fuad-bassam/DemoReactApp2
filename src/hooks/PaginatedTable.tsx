import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import CircularProgress from "@mui/material/CircularProgress";
import { TableColumnFormat } from "../models/Common/TableColumnFormat";
import { IPaginationInfo } from "../models/Common/Pagination";



interface PaginatedTableProps<T> {
  data: T[];
  columns: TableColumnFormat<T>[];
  totalCount: number;
  paginationInfo: IPaginationInfo;
  handlePaginationChange: (paginationInfo: IPaginationInfo) => void;
  actions?: (row: T) => React.ReactNode;

}

const PaginatedTable = <T,>({
  data,
  columns,
  totalCount,
  paginationInfo,
  handlePaginationChange,
  actions,
}: PaginatedTableProps<T>) => {

  const [loading] = useState<boolean>(false);
  const handleChangePage = (_event: unknown, newPage: number) => {
    handlePaginationChange({ ...paginationInfo, page: newPage });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePaginationChange({ ...paginationInfo, rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };

  const handleSort = (columnId: string) => {
    const isAsc = paginationInfo.sortBy === columnId && paginationInfo.sortOrder === "asc";
    handlePaginationChange({ ...paginationInfo, sortBy: columnId, sortOrder: isAsc ? "desc" : "asc" });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="paginated table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id as string}>
                  <TableSortLabel
                    active={paginationInfo.sortBy === column.id}
                    direction={paginationInfo.sortBy === column.id ? paginationInfo.sortOrder ?? "asc" : undefined}
                    onClick={() => handleSort(column.id as string)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>

            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (

              data.map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {columns.map((column) => {
                    const value = row[column.id];

                    return (
                      <TableCell key={column.id as string}>
                        {column.format ? column.format(value) : String(value)}
                      </TableCell>
                    );
                  })}
                  {actions && (
                    <TableCell>
                      {actions(row)}
                    </TableCell>
                  )}
                </TableRow>
              )))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalCount}
        rowsPerPage={paginationInfo.rowsPerPage}
        page={paginationInfo.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PaginatedTable;
