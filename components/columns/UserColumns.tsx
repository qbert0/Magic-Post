'use client'

import * as React from "react"
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
} from "@tanstack/react-table"

import { employeeTableTitle, employeeTableValue } from "@/client/contants/ColumnsTitle"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react';
import { employee } from "@/client/util/ColumnsType"
import { Career } from "@/client/contants/enum"


const convertCarrer = (career : string ) => {
  if(career === Career.employeeTrans) {
      return "Nhân viên"
  } else if (career === Career.employeeGather) {
      return "Nhân viên"
  } else if (career === Career.managerTrans) {
      return "Quản lý"
  } else if (career === Career.magegerGather) {
      return "Quản lý"
  } else {
      return "Quản lý cấp cao"
  }
}



export const UserColumns: ColumnDef<employee>[] = [
    { // ho va ten 
      accessorKey: employeeTableValue.name,
      header: ({ column }) => {
          // phan dau
        return (
          <div>
            {employeeTableTitle.name}
          </div>
        )
      },
      cell: ({ row }) => {
          // cac cot phia duoi
          return (
              <div className="lowercase">
                  {row.getValue(employeeTableValue.name)}
              </div>
          )
      },
    },{ // chuc vu
      accessorKey: employeeTableValue.career,
      header: () => {
          // phan dau
          return (
              <>
              {employeeTableTitle.career}
              </>
          )
      },
      cell: ({ row }) => {
          // cac cot phia duoi
          return (
              <div className="capitalize">
                  {convertCarrer(row.getValue(employeeTableValue.career))}
              </div>
          )
      }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const employee = row.original
     
          return (
            <div>
                <Button 
                variant="ghost" 
                className="bg-white"
                onClick={() => console.log(employee.id)}
                >
                 <Trash2 className="h-5 w-5"/>   
                </Button>
                
            </div>
          )
        },
      },
    
  ]
  