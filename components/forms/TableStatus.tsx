'use client'

import StatusTitle from "../cards/StatusTitle"
import { Button } from "../ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
  import { ChevronDown } from 'lucide-react';
  

import { Card } from "../ui/card"
import { useState } from "react";


interface Props {
    order : any 
}

const TableStatus = ({order} : Props) => {
    const item = []
    for (let i =0; i< order.statusLength; i++) {
        item.unshift(<StatusTitle 
            children={null} 
            date={order.statusDate[i]}
            option = {order.statusOption[i]}
            start = {i === 0 ? false : true}
        />)
    }
    const itemclose = item.slice(0,4)
    const itemopen = item.slice(4)
    const [open, setOpen] = useState(false)
    
    return (
        <>

        <Card className="flex w-full gap-3 flex-col p-2">
            <div className="basis-1/6 pt-0.5 pl-1">
            <p className="text-9xl font-bold ">Địa Chỉ Người Nhận</p>
            </div>
            <div className="flex">
                
                <div className="basis-1/3 pl-0.5">
                    <p className="">{order.receiverName}</p>
                    <div>
                        <p className="text-xs">{order.phone}</p>
                        <p className="text-xs">{order.description}</p> 
                        <p className="text-xs">{order.address}</p>
                    </div>
                </div>
                <div className="">
                    <Collapsible
                    open={open}
                    onOpenChange={setOpen}
                    >
                    {itemclose}
                    <CollapsibleContent>
                        {itemopen}
                    </CollapsibleContent>

                    <CollapsibleTrigger className="mt-3 flex">
                        Xem thêm
                        <ChevronDown className={`${open && "rotate-180"}`}/>
                    </CollapsibleTrigger>
                        
                    </Collapsible>
                </div>
            </div>
           

        </Card>

        </>
    )
}

export default TableStatus


 
