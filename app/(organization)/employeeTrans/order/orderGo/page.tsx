import { AddressCity } from "@/client/contants/DropMenuTitle";
import { SearchColumns,  Status } from "@/client/contants/enum";
import { SelectStatusBox } from "@/client/util/DataType";
import { OrderEmployee } from "@/components/columns/OrderEmployee";
import TableMagic from "@/components/forms/TableMagic";
import { GetTransPoint, TransPointGetOrderByStatus } from "@/lib/actions/transformPoint.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
    const user = await currentUser()
    if(!user) return 
    const userInfor = await fetchUser(user.id)


    // lay order theo status
    const listOrder = await TransPointGetOrderByStatus(userInfor.workPlace,Status.inventoryted)
    if(!listOrder) return 


    const transpoint = await GetTransPoint(userInfor.workPlace)
    if(!transpoint) return 


    const selectBox : SelectStatusBox = {
        title : "Đã được gửi đi",
        parentPoint : transpoint.gatherPoint,// id cua diem 
        workPlace : transpoint.address,  // dia chi cua diem 
        status : Status.inventoryted,  
    }

    return (
        <>
        <div className="m-2 text-dark-1 text-8xl">
            {transpoint.address}
        </div>
         
        <TableMagic 
            listOrder={listOrder}
            columns={OrderEmployee}
            searchColumns={SearchColumns.description}
            dropMenu={AddressCity}
            selectBox={selectBox}
        />
        
        </>
    )
}

export default Page;