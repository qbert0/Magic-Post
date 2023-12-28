'use client'

import * as React from "react"
import {
  ColumnDef,
  
} from "@tanstack/react-table"
import { orderTableTitle, orderTableValue } from "@/client/contants/ColumnsTitle"
import { order } from "@/client/util/ColumnsType"
import { Status } from "@/client/contants/enum"


const convertStatus = (status : number, transpoint : boolean) => {
    if (transpoint) {
        if(status === Status.inventoryted) {
            return "Tiếp Nhận"
        } else if (status === Status.gatherChecked) {
            return "Đã gửi đi"
        } else if (status === Status.done) {
            return "Đã gửi đi"
        } else if (status === Status.paynot) {
            return "Chưa hoàn tiền"
        } else if (status === Status.cancel) {
            return "Đơn hủy"
        } else {
            return "Đã gửi đi"
        }
    } else {
        if (status === Status.gatherSend) {
            return "Tiếp Nhận"
        } else if (status === Status.gatherPassGatherCheck){
            return "Đã gửi đi"
        } else if (status === Status.gatherSendTrans) {
            return "Tiếp nhận"
        }else if (status === Status.gatherPassTransCheck) {
            return "Đã gửi đi"
        } else if (status === Status.transSendUser) {
            return "Tiếp nhận"
        } else {
            return "Đã gửi đi"
        }
    }
    
}


// cho manager 
export const orderWork: ColumnDef<order>[] = [
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
    },{ // cot nguoi nhan
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
    }, {// cot trang thai
        accessorKey : orderTableValue.status,
        header : () => {
            return (
                <div>
                    {orderTableTitle.status}
                </div>
            )
        },
        cell : ({row}) => {
            const status : string = convertStatus(row.getValue("statusIsDone"), true)
            return (
                <div className="text-center">
                    {status}
                </div>
            )
        }
    }
    
]

export const orderWork1: ColumnDef<order>[] = [
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
    },{ // cot nguoi nhan
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
    }, {// cot trang thai
        accessorKey : orderTableValue.status,
        header : () => {
            return (
                <div>
                    {orderTableTitle.status}
                </div>
            )
        },
        cell : ({row}) => {
            const status : string = convertStatus(row.getValue("statusIsDone"), false)
            return (
                <div className="text-center">
                    {status}
                </div>
            )
        }
    }
    
]
  