import { AddressCity } from "@/client/contants/DropMenuTitle";
import { SearchColumns, Status } from "@/client/contants/enum";
import { SelectStatusBox } from "@/client/util/DataType";
import { OrderEmployee } from "@/components/columns/OrderEmployee";
import TableMagic from "@/components/forms/TableMagic";
import { GatherPointGetOrderByStatus, GetGatherPoint } from "@/lib/actions/gatherPoint.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
    const user = await currentUser()
    if(!user) return 
    const userInfor = await fetchUser(user.id)

    const gatherpoint = await GetGatherPoint(userInfor.workPlace)
    if(!gatherpoint) return 

    // lay order tho status
    const listorder = await GatherPointGetOrderByStatus(userInfor.workPlace, Status.gatherPassGatherCheck, gatherpoint.address)
    if(!listorder) return 



    const selectBox : SelectStatusBox = {
        title : "Đã nhận hàng về" + gatherpoint.address,
        parentPoint : "none",
        workPlace : gatherpoint.address,
        status : Status.gatherPassGatherCheck,
    }
    return (
        <>
        <div className="m-2 text-dark-1 text-8xl">
            {gatherpoint?.address}
        </div>
        <TableMagic 
            listOrder={listorder}
            columns={OrderEmployee}
            searchColumns={SearchColumns.description}
            dropMenu={AddressCity}
            selectBox={selectBox}
        />
        
        </>
    )
}

export default Page;