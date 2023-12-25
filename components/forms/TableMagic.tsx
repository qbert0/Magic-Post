"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchColumns, Status } from "@/client/contants/enum";
import DropBox from "../cards/DropBox";
import { MenuDropBox, SelectStatusBox } from "@/client/util/DataType";
import Search from "../cards/search";
import SelectBox from "../cards/SelectBox";

interface Props {
  listOrder: any[];
  columns: ColumnDef<any>[];
  searchColumns: SearchColumns;
  dropMenu: MenuDropBox[] | null;
  selectBox: SelectStatusBox | null;
}

const TableMagic = ({
  listOrder,
  columns,
  searchColumns,
  dropMenu,
  selectBox,
}: Props) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const data = listOrder;
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  // bỏ qua đi
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <>
      <div className="w-full">
        <div className="flex items-center py-4">
          {/* thanh search để search theo searchColum là cái cột cần tìm*/}
          {searchColumns !== null && (
            <Search table={table} searchColumns={searchColumns} />
          )}
        </div>

        <div className="flex items-center py-4">
          {
            // thanh drop de duyet cac phan tu
            dropMenu !== null && <DropBox table={table} menu={dropMenu} />
          }
        </div>

        {/* cái bảng thôi*/}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {selectBox != null && <SelectBox table={table} select={selectBox} />}
      </div>
    </>
  );
};

export default TableMagic;
