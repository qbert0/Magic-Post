import { AddressCity } from "@/client/contants/DropMenuTitle";
import { SearchColumns, Status } from "@/client/contants/enum";
import { SelectStatusBox } from "@/client/util/DataType";
import { OrderEmployee } from "@/components/columns/OrderEmployee";
import { OrderSpecail } from "@/components/columns/OrderSpecail";
import TableMagic from "@/components/forms/TableMagic";
import { GetTransPoint, TransPointGetOrderByStatus } from "@/lib/actions/transformPoint.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
    const user = await currentUser()
    if(!user) return
    const userInfor = await fetchUser(user.id)


    // lay order theo status 
    const listorder = await TransPointGetOrderByStatus(userInfor.workPlace, Status.transSendUser)
    if(!listorder) return 

    const transpoint = await GetTransPoint(userInfor.workPlace)
    if(!transpoint) return 

    const selectBox : SelectStatusBox = {
        title : "Đơn đã được gửi tới người nhận",
        parentPoint: null,
        workPlace : transpoint.address,
        status : Status.transSendUser,
    }
    return (
        <>
        <div className="m-2 text-dark-1 text-8xl">
            {transpoint.address}
        </div>
        <TableMagic
            listOrder={listorder}
            columns={OrderSpecail}
            searchColumns={SearchColumns.description}
            dropMenu={AddressCity}
            selectBox={selectBox}
        />
        </>
    )
}

export default Page;