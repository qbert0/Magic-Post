import { AddressCity } from "@/client/contants/DropMenuTitle";
import { SearchColumns, SelectPoint, Status } from "@/client/contants/enum";
import { SelectStatusBox } from "@/client/util/DataType";
import { OrderEmployee } from "@/components/columns/OrderEmployee";
import TableMagic from "@/components/forms/TableMagic";
import { GatherPointGetOrderByStatus, GetGatherPoint } from "@/lib/actions/gatherPoint.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

const Page = async  () => {
    const user = await currentUser()
    if(!user) return 
    const userInfor = await fetchUser(user.id)

    // lay order theo status 
    const listorder = await GatherPointGetOrderByStatus(userInfor.workPlace, Status.gatherChecked)
    if(!listorder) return 

    const gatherpoint = await GetGatherPoint(userInfor.workPlace)
    if(!gatherpoint) return 

    const selectBox : SelectStatusBox = {
        title : "Đã nhận được đơn hàng về " + gatherpoint.address ,
        parentPoint : "none",
        workPlace : gatherpoint.address,
        status : Status.gatherChecked,
    }

    return (
        <>
        {gatherpoint?.address}
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