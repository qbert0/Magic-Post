import { UpdatePointDone, UpdateStatus } from "@/lib/actions/order.action";
import { Button } from "../ui/button";
import { AddOrderToGatherPoint, FindGatherAndAddOrder, FindTransPointAndAddOrder } from "@/lib/actions/gatherPoint.action";
import {  Status } from "@/client/contants/enum";
import { SelectStatusBox } from "@/client/util/DataType";
import { useRouter } from "next/navigation";

interface Props {
    table : any,
    select : SelectStatusBox,
}



const SelectBox = ({table, select}: Props) => {
    const router = useRouter()

    const pass  = async () => {
        table.getFilteredSelectedRowModel().flatRows.map(async (item  : any) => {
            console.log("pass")
            if(select.status === Status.inventoryted) {
                if(!select.parentPoint) return console.log("loi phan select pass inventory")
                if(CheckAddress(item.original.district)) {
                    await UpdateStatus(item.original.id, select.title)
                    await UpdatePointDone(item.original.id, Status.transSendUser)
                    console.log("transSendUser")
                } else {
                    await UpdateStatus(item.original.id, select.title)
                    await AddOrderToGatherPoint(item.original.id, select.parentPoint)
                    await UpdatePointDone(item.original.id, Status.gatherChecked)
                    console.log("gatherChecked")
                }
            } else if (select.status === Status.gatherChecked) {
                await UpdateStatus(item.original.id, select.title)
                await UpdatePointDone(item.original.id, Status.gatherSend)
                console.log("gatherSend")
            } else if (select.status === Status.gatherSend) {
                if(CheckAddress(item.original.city)) {
                    await UpdateStatus(item.original.id, select.title)
                    await FindTransPointAndAddOrder(item.original.id, item.original.district, select.workPlace)
                    await UpdatePointDone(item.original.item, Status.gatherPassTransCheck)
                    console.log("gatherPassTransCheck")
                } else {
                    await UpdateStatus(item.original.id, select.title)
                    await FindGatherAndAddOrder(item.original.id, item.original.city)
                    await UpdatePointDone(item.original.id, Status.gatherPassGatherCheck)
                    console.log("gatherPassGatherCheck")
                }
            } else if (select.status === Status.gatherPassGatherCheck) {
                await UpdateStatus(item.original.id, select.title)
                await UpdatePointDone(item.original.id, Status.gatherSendTrans)
                console.log("gatherSendTrans")
            } else if (select.status === Status.gatherSendTrans) {
                await UpdateStatus(item.original.id, select.title)
                await FindTransPointAndAddOrder(item.original.id, item.original.district,select.workPlace)
                await UpdatePointDone(item.original.id, Status.gatherPassTransCheck)
                console.log("gatherPassTransCheck")
            } else if (select.status === Status.gatherPassTransCheck) {
                await UpdateStatus(item.original.id,select.title)
                await UpdatePointDone(item.original.id, Status.transSendUser)
                console.log("transSendUser")
            } else if (select.status === Status.transSendUser) {
                await UpdateStatus(item.original.id, select.title)
                await UpdatePointDone(item.original.id, Status.done)
            }
        })

        router.refresh()
    }
    const CheckAddress = (address : string) => {
        if(address === select.workPlace) {
            return true
        }
        else return false
    }


    return (
        <>
        <div className="flex items-center justify-end space-x-2 py-4 ">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} Trên{" "}
                {table.getFilteredRowModel().rows.length} hàng 
            </div>

            <div>
                <Button onClick={()=> pass()}
                disabled={table.getFilteredSelectedRowModel().rows.length === 0}
                className="space-x-2"
                >
                    Hoàn Tất
                </Button>
            </div>
        </div>
        
        </>
    )
}

export default SelectBox;