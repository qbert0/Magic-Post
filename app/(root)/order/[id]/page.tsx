import ButtonRouter from "@/components/cards/ButtonRouter";
import HeaderStatus from "@/components/forms/HeaderStatus";
import TableStatus from "@/components/forms/TableStatus";
import { fetchOrder } from "@/lib/actions/order.action";
import { currentUser } from "@clerk/nextjs";


const Page = async ({params} : {params : {id : string}}) => {
    const order = await fetchOrder(params.id)
    if(!order) return (<>khong kha dung order</>)
    const user = await currentUser()
    if(!user) return 
    if(user.emailAddresses[0].emailAddress !== order.email) {
        return (
            <>
            khong kha dung
            </>
        )
    }


    
    
    return (
        <>
        <div className="mb-2">
            <ButtonRouter link="back" option="Trở về" />
        </div>
        <div className="my-2">
            <HeaderStatus order={order} />
        </div>
        <div className="mt-2 ">
           <TableStatus order={order}/> 
        </div>

        
        
        
        
        </>
    )
}

export default Page;