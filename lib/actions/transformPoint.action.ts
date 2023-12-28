'use server'

import TransPoint from "../models/transPoint.model"
import User from "../models/user.model"
import connectData from "../mongoose"
import Order from "../models/order.model"
import { PassOrderForEmployee, passOrderToClient } from "@/client/util/orderUtil"
import { PassTransPointToClient } from "@/client/util/pointUtil"
import { Status } from "@/client/contants/enum"

// tao cac diem giao dich (cai nay phai viet truoc mot obejct luu tung dia danh mot)
export async function createNewTransformPoint(address: string) {
    connectData()
    await TransPoint.create({
        address
    })
}


//lay thong tin cua diem giao dich 
export async function GetTransPoint (id : string) {
    try{
        connectData()
        const transpoint = await TransPoint.findById(id)
        const transpointOver = PassTransPointToClient(transpoint)
        return transpointOver
    }catch {

    }
}

// lay nhan vien cua quan ly
export async function ManagerTransGetEmployee (_id : string) {
    try {
        connectData()
        const transPoint = await TransPoint.findById(_id ).populate ({
            path: "employeer",
            model: User
        }).lean()

        const employees = (transPoint as any).employeer
        return employees

    }catch {

    }
}

// quan ly lay don hang trong diem giao dich
export async function ManagerTransGetOrder (_id: string) {
    try {
        connectData();
        const transPoint = await TransPoint.findById(_id).populate({
            path: "order",
            model: Order
        }).sort({ statusDate: 1 }).lean()

        const orders = (transPoint as any).order

        return orders

    }catch {

    } 
}

// lay order theo trang thai do hang 
export async function TransPointGetOrderByStatus (
    workPlace : string,
    status: Status) {
    try {
        connectData()
        const transPoint = await TransPoint.findOne({_id : workPlace}).populate({
            path : "order",
            model: Order,
        }).lean()

        const orders = (transPoint as any).order
        const newOrders = orders.filter((order:any) => order.statusIsDone === status)

        const orderOver = PassOrderForEmployee(newOrders)
        return orderOver

    } catch {

    }
}

// them don hang vaof trans point 
export async function AddOrderToTranPoint(order : string, transpoint: string) {
    try {
        connectData()
        await TransPoint.findOneAndUpdate({_id: transpoint}, {
            $push : {
                order: order,
            }
        })
    }catch {

    }
}






// lay order tu list
export async function EmployTransGetOrder(_id : string ) {
    try {
        connectData();
        const transPoint = await TransPoint.findById(_id).populate({
            path: "order",
            model: Order
        }).sort({ statusDate: 1 }).lean()

        const orders = (transPoint as any).order
        // const newOrder = orders.filter((order:any) => order.statusDate.length === status)

        return orders

    }catch {

    }

}