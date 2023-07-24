import React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cx } from "~/utils/helpers";

export interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T, string>[] | ColumnDef<T, React.ReactNode>[];
  isLoading?: boolean;
  enableSorting?: boolean;
  hideHeaders?: boolean;
  tableclass?: string;
  thclass?: string;
  trclass?: string;
  tdclass?: string;
}

export default function Table<T extends object>(props: TableProps<T>) {
  const table = useReactTable<T>({
    columns: props.columns,
    data: props.data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div className="overflow-x-auto">
      <table
        className={cx(
          "table table-pin-rows table-pin-cols table-md",
          props.tableclass
        )}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={cx(props.thclass, "text-[14px]")}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {props.isLoading ? (
            <tr key={0}>
              <td className="w-full p-4 text-center" colSpan={table.getFlatHeaders().length}>
                <span className="loading loading-spinner"></span>
              </td>
            </tr>
          ) : table.getRowModel().rows.length == 0 ? (
            <tr key={0}>
              <td className="p-4 text-center" colSpan={table.getFlatHeaders().length}>
                No Record Available
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className={cx(props.trclass)}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className={cx(props.tdclass)}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
