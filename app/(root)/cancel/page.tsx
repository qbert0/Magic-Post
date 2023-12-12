import { SearchColumns, Status } from "@/client/contants/enum";
import { passOrderToClient } from "@/client/util/orderUtil";
import { columns } from "@/components/columns/Order";
import TableMagic from "@/components/forms/TableMagic";
import { GetOrderByStatus } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
    const user = await currentUser()
    if(!user) return 

    const listOrders = await GetOrderByStatus(user.id, Status.cancel)

    const orders = passOrderToClient(listOrders)

    return (
        <>
        <TableMagic 
        listOrder={orders} 
        columns={columns}
        searchColumns={SearchColumns.description}
        dropMenu={null}
        />
          
        </>
    )
}

export default Page;