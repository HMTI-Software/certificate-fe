"use client";
import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

//COMPONENTS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

//ICONS
import { ChevronsLeft, ChevronsRight, Plus } from "lucide-react";
import AddNewParticipantsButton from "../button/AddNewParticipants";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: "event" | "admin";
}

export function GeneralTable<TData, TValue>({
  columns,
  data,
  page,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex flex-row justify-start py-4">
        <div className="flex w-full">
          <Input
            placeholder="Name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="border-black max-w-4xl bordered border-b-4 hover:border-b-1"
          />
        </div>
        {page === "event" ? (
          <AddNewParticipantsButton />
        ) : (
          <Button className="bordered bg-[#59FFAC] hover:bg-[#59FFAC]/90 text-black">
            <span className="hidden md:block">Add Account</span> <Plus />
          </Button>
        )}
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
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
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
      <div className="flex items-center justify-center space-x-2 py-4">
        <div className="space-x-2">
          {(() => {
            const currentPage = table.getState().pagination.pageIndex + 1;
            const totalPages = table.getPageCount();
            const pageNumbers = [];
            if (currentPage > 3) {
              pageNumbers.push(1);
            }
            if (currentPage > 4) {
              pageNumbers.push("...");
            }
            for (
              let i = Math.max(1, currentPage - 1);
              i <= Math.min(totalPages, currentPage + 1);
              i++
            ) {
              pageNumbers.push(i);
            }
            if (currentPage < totalPages - 3) {
              pageNumbers.push("...");
            }
            if (currentPage < totalPages - 2) {
              pageNumbers.push(totalPages);
            }
            return (
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  onClick={() => table.previousPage()}
                  className={`bordered bg-red-400 hover:bg-red/90 text-black ${
                    currentPage === 1 ? "hidden" : ""
                  }`}
                >
                  <ChevronsLeft />
                </Button>
                {pageNumbers.map((page, index) => (
                  <Button
                    key={index}
                    size="sm"
                    onClick={() =>
                      typeof page === "number" && table.setPageIndex(page - 1)
                    }
                    className={`bordered bg-white hover:bg-white/90 text-black ${
                      currentPage === page
                        ? "bg-[#59FFAC] hover:bg-[#59FFAC]/90"
                        : ""
                    }`}
                    disabled={page === "..."}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  size="sm"
                  onClick={() => table.nextPage()}
                  className={`bordered bg-red-400 hover:bg-red/90 text-black ${
                    currentPage === totalPages ? "hidden" : ""
                  }`}
                >
                  <ChevronsRight />
                </Button>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
