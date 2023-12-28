import { status } from "@/client/contants/DropMenuTitle";
import { SearchColumns } from "@/client/contants/enum";
import { passOrderToClient } from "@/client/util/orderUtil";
import { orderWork } from "@/components/columns/OrderWork";
import TableMagic from "@/components/forms/TableMagic";
import { ManagerTransGetOrder } from "@/lib/actions/transformPoint.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
    const user = await currentUser()  
    if(!user) return 
    const userInfor = await fetchUser(user.id)

    // lay order

    const orders = await ManagerTransGetOrder(userInfor.workPlace)

    const listOrder = passOrderToClient(orders)

    return (
        <>
        <TableMagic 
            listOrder={listOrder}
            columns={orderWork}
            searchColumns={SearchColumns.description}
            dropMenu={status}
            selectBox={null}
        />
        </>
    )
}

export default Page;

