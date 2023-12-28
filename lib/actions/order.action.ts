'use server'

import { Status } from "@/client/contants/enum";
import Order from "../models/order.model";
import TransPoint from "../models/transPoint.model";
import User from "../models/user.model";
import connectData from "../mongoose"
import { PassOrderToTableStatus } from "@/client/util/orderUtil";

interface Params {
    sender : string,
    email : string
    receiverName: string,
    phone: string,
    description: string,
    typeOrder: string,
    specailService: string,
    // addressSender: string,
    city: string,
    district: string,
    ward: string,
}

// creat new order // done
export async function createNewOrder({
    sender, // nguoi gui 
    email, // email sender 
    receiverName,   // ten nguoi nhan
    city, // thanh pho
    district, // huyen/ quan
    ward,// xa
    phone,// so dien thoai 
    description, // ghi chu 
    // addressSender // dia chi nguoi gui
    typeOrder, // loai hang gui
    specailService,// dich vu dac biet 
}: Params) {
    try{
        connectData();
        const createAt = new Date()

        const newOrder = await Order.create({
            sender,
            receiverName,
            city,
            district,
            ward,
            phone,
            description,
            email ,
            statusDate: createAt,
            statusOption: "don hang duoc tao",
            statusIsDone: Status.wait,
            typeOrder,
            specailService,
        }) 

        // add order into user
        await User.findOneAndUpdate({
            email : email
        },{
            $push : {orders: newOrder._id}
        }) 

    } catch {

    }
}


//fetch order //done
export async function fetchOrder(id:string) {
    try {
    connectData();
    
    const order =  await Order.findOne({_id: id}).populate({
        path : "sender",
        model : User,
    }).lean()
    
    const newOrder = (order as any)

    const orderOver = PassOrderToTableStatus(newOrder)

    return orderOver
    }catch {

    }
    
}

// update status //done
export async function UpdateStatus(id:String, des:String)  {
    connectData();
    const date = new Date();
    await Order.findByIdAndUpdate({_id:id},{
        $push: {
            statusDate: date,
            statusOption: des,
        }
    })
}

// update order to transs or gather over 
export async function UpdatePointDone(
    id: string,
    status : Status) {
    connectData()
    await Order.findByIdAndUpdate({_id:id},{
        $set : {
            statusIsDone : status,
        }
    })
}
//return list date status and list option status // done
export async function fetchStatus(id:String) {
    connectData();

    const status = await Order.findById(id)
    const statusDateArray = Array.from(status.statusDate);
    return {
            date:statusDateArray,
            option: status.statusOption
        };
}





export async function testfetch () {
    connectData();
    const listorder = await Order.find({receiverName: "quyen"}, 
    {
        // id:1, 
        // _id:0,
        receiverName:1,
        description: 1,
        city:1,
        district:1,
        ward:1,
        phone: 1,
        "statusDate.lenght":1
    }).sort({description: "desc"})
        .limit(5);

        return listorder;
}











