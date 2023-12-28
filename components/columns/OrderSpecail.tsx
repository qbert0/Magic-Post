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
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { orderTableTitle, orderTableValue } from "@/client/contants/ColumnsTitle"
import { order } from "@/client/util/ColumnsType"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"
import { UpdatePointDone, UpdateStatus } from "@/lib/actions/order.action"
import { Status } from "@/client/contants/enum"

const convetStatus = (value : number) => {
    if(value === Status.transSendUser) {
        return "Đang gửi"
    } else if (value === Status.cancel) {
        return "Bị hủy"
    } else if (value === Status.paynot) {
        return "Chưa hoàn tiền"
    } else if (value === Status.notdone) {
        return "Chưa được gửi"
    } else {
        return "Trạng thái không hợp lệ"
    }
}


// danh rieng cho employee transport
export const OrderSpecail: ColumnDef<order>[] = [
    { // cot thong tin 
      accessorKey: orderTableValue.description,
      header: ({ column }) => {
          // phan dau
        return (
          <div>
            {orderTableTitle.description}
          </div>
        )
      },
      cell: ({ row }) => {
          // cac cot phia duoi
          return (
              <div className="lowercase">
                  {row.getValue(orderTableValue.description)}
              </div>
          )
      },
    },{ // cot dia chi
      accessorKey: orderTableValue.address,
      header: () => {
          // phan dau
          return (
              <>
              {orderTableTitle.address}
              </>
          )
      },
      cell: ({ row }) => {
          // cac cot phia duoi
          return (
              <div className="capitalize">
                  {row.getValue(orderTableValue.address)}
              </div>
          )
      }
    }, { // cot ngay gui 
        accessorKey: orderTableValue.statusDate,
        header : () => {
            return (
                <div>
                    {orderTableTitle.statusDate}
                </div>
            )
        },
        cell : ({row}) => {
            const formattedDate : Date = row.getValue(orderTableValue.statusDate);
            const s = formattedDate ? formattedDate.toLocaleDateString() : "";
            return (
                <div>
                    {s}
                </div>
            )
        },
    },{ // cot so dien thoai
      accessorKey :orderTableValue.phone,
      header : () => {
          return (
              <div>
                  {orderTableTitle.phone}
              </div>
          )
      },
      cell: ({row}) => {
          return (
              <div>
                  {row.getValue(orderTableValue.phone)}
              </div>
          )
      }
    },
    { // cot nguoi nhan
      accessorKey: orderTableValue.receiverName,
      header: () => {
          // phan dau 
          return (
              <div className="text-right">
                  {orderTableTitle.recieverName}
              </div>
          )
      },
      cell: ({ row }) => {
          // cac cot phia duoi
          return (
              <div className="text-right ">
                  {row.getValue(orderTableValue.receiverName)}
              </div>
          )
      },
    },{// cot trang thai
        accessorKey: "statusIsDone",
        header: () => {
            return (
                <>
                Trạng Thái
                </>
            )
        },
        cell: ({row}) => {
            

            return (
                <>
                    {convetStatus(row.getValue("statusIsDone"))}
                </>
            )
        }
    },
    {  // cot checkbox 
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {// trang thai hoan thanh hay huy don hang
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const [cancel, setCancel] = React.useState(row.original.statusIsDone === Status.cancel)
          const [paynot, setPaynot] = React.useState(row.original.statusIsDone === Status.paynot)
          const updatecancel = async (value : boolean) => {
            if(value === false) {
                setCancel(false)
            }
            setCancel(true)
            if(paynot === true) {
                setPaynot(false)
            }
            await UpdateStatus(row.original.id, "Đơn bị hủy")
            await UpdatePointDone(row.original.id, Status.cancel)
            console.log("cancel")
          }

          const updatepaynot = async (value : boolean) => {
            if(value === false) {
                setPaynot(false)
            }
            setPaynot(true)
            if(cancel === true) {
                setCancel(false)
            }
            await UpdateStatus(row.original.id, "Đơn chưa hoàn tiền")
            await UpdatePointDone(row.original.id, Status.paynot)
            console.log("paynot")
          }

          const forget = async () => {
            await UpdateStatus(row.original.id, "xoa")
            await UpdatePointDone(row.original.id, Status.forget)
          }
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Đơn Xấu</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                checked={cancel}
                onClick={()=>updatecancel(!cancel)}
                >
                    Bị Hủy
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                checked={paynot}
                onClick={()=>updatepaynot(!paynot)}
                >
                    Chưa Trả Tiền
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    onClick={()=> forget()}
                    className="flex-right"
                >
                    Xóa Đơn
                </DropdownMenuCheckboxItem>
                
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
    },
    
  ]
  