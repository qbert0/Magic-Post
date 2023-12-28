'use client'
import { Status } from "@/client/contants/enum";
import { Card } from "../ui/card";
import StatusIcon from "../cards/StatusIcon";
import { ClipboardEdit, Truck, Check,ThumbsUp,ArchiveRestore } from 'lucide-react';
import { Progress } from "@nextui-org/react";


interface Props {
    order : any,
}
const processingStatus = (status : number) => {
        if(status === Status.wait) {
            //waiting
            return 1
        } else if (status === Status.inventoryted) {
            //inventoryed
            return 2
        } else if (status === Status.done) {
            // done
            return 5
        }else if (status >= Status.transSendUser) {
            // da nhan duoc hang 
            return 4
        } else  {
            // transport 
            return 3
        }
    }
const HeaderStatus = ({order} : Props) => {
    const iconnum = processingStatus(order.status)
    const color="#19c964"
    const notcolor = "#d8d8d8"


    return (
        <>
        <Card className="flex justify-around relative">
            <Progress 
            value={25 * (iconnum - 1)} 
            color= {"success"}
            style={{
                height :"4px",
                width: "80%",
                
            }}
            aria-setsize={12}
            className="absolute z-0 top-8 bg-hex" />

            <StatusIcon 
            date={order.statusDate[0] }
            option={"Đơn hàng đã được tạo"}
            done = {true}
            > 
                <ClipboardEdit color={color}/>
            </StatusIcon>
            <StatusIcon 
            date={iconnum > 1 ? order.statusDate[1] : null}
            option={iconnum > 1 ? "Đã được kiểm duyệt":null}
            done ={iconnum > 1}
            > 
                <ThumbsUp color={iconnum > 1 ? color : notcolor}/>
            </StatusIcon>
            <StatusIcon 
            date={iconnum > 2 ? order.statusDate[2]: null }
            option={iconnum > 2 ? "Đang vận chuyển": null}
            done = {iconnum > 2}
            > 
                <Truck color={iconnum > 2 ? color : notcolor}/>
            </StatusIcon>
            <StatusIcon 
            date={iconnum > 3 ? order.statusDate[order.statusLength-2] : null}
            option={iconnum > 3 ?"Đã tiếp nhận " : null}
            done ={iconnum > 3}
            > 
                <ArchiveRestore color={iconnum > 3 ? color : notcolor}/>
            </StatusIcon>
            <StatusIcon 
            date={iconnum > 4 ? order.statusDate[order.statusLength-1] : null}
            option={iconnum > 4 ?"Hoàn thành đơn hàng" : null}
            done = {iconnum > 4}
            > 
                <Check color={iconnum > 4 ? color : notcolor}/>
            </StatusIcon>

        </Card>

        </>
    )
}

export default HeaderStatus;