import { link } from "@/client/util/DataType";
import { BsPeopleFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { PiShoppingCartBold } from "react-icons/pi";


export const LeftbarLinkCustomer : link[] = [
    {
        label: "Tất cả",
        value: "all",
        icon: <></>,
        link:'/',
        sub:[],
    },
    {
        label: "Chưa thanh toán",
        value: "payNot",
        icon: <></>,
        link:'/payNot',
        sub:[],
    },
    {
        label: "Đang vận chuyển",
        value: "transport",
        icon: <></>,
        link: '/transport',
        sub:[],
    },
    {
        label: "Chờ vận chuyển",
        value: "wait",
        icon: <></>,
        link: "/wait",
        sub: [],
    },
    {
        label: "Hoàn Thành",
        value: "done",
        icon: <></>,
        link:'/done',
        sub:[],
    },
    {
        label: "Trả hàng",
        value: "cancel",
        icon: <></>,
        link:'/cancel',
        sub:[],
    }
]


export const LeftbarLinkManager : link[] = [
    {
        label: "Nhân Viên",
        link: "/employees",
        icon: <BsPeopleFill size="24" />,
        value: "employees",
        sub: [],

    },
    {
        label: "Thống Kê",
        link: "/statistics",
        icon: <MdLocationOn size="24" />,
        value: "statistics",
        sub:[]
    }
]

export const LeftbarLinkEmployeeTrans : link[] = [
    {
        label: "Đặt Hàng",
        icon: <PiShoppingCartBold size="24" /> ,
        value: "order",
        link: "/order/orderTo",
        sub: [
            {
                label: "Đơn",
                value: "orderTo",
                link: "/order/orderTo",
            },
            {
                label: "Đơn Gửi",
                value: "orderGo",
                link: "/order/orderGo",
            }
        ]
    },
    {
        label: "Chuyển Phát",
        value: "shiper",
        icon: <CiDeliveryTruck size="24" />,
        link: "/shiper/shipGo",
        sub: [
            {
                label: "Giao Hàng",
                value: "shipGo",
                link: "/shiper/shipGo",
            },
            {
                label: "Thống Kê",
                value: "shipOver",
                link: "/shiper/shipOver"
            }
        ]
    }
]

export const LeftbarLinkEmployeeGather :link[] = [
    {
        label: "Điểm Giao Dịch",
        value: "neighPoints",
        icon: <></>,
        link: "/neighPoints/receive",
        sub: [
            {
                label: "Hàng Đến",
                value: "receive",
                link: "/neighPoints/receive",
            },
            {
                label: "Hàng Gửi",
                value: "send",
                link: "/neighPoints/send",
            }
        ]
    },
    {
        label: "Điểm Tập Kết",
        value: "finalPoint",
        icon: <></>,
        link: "/finalPoint/receive",
        sub: [
            {
                label: "Hàng Đến",
                value: "receive",
                link: "/finalPoint/receive",
            },
            {
                label: "Hàng Gửi",
                value: "send",
                link: "/finalPoint/send",
            }
        ]
    }
]

export const LeftbarLinkOwner : link[] =[
    {
        label: "Nhân Viên",
        value: "employee",
        icon : <></>,
        link: "/employees/gather",
        sub: [
            {
                label: "Giao Dịch",
                value: "employeeTrans",
                link: "/employees/transform",
            },
            {
                label: "Tập Kết",
                value: "employGarther",
                link:"/employees/gather",
            },
        ]
    },
    {
        label: "Thống Kê",
        value : "statistics",
        icon: <></>,
        link: "/statistics",
        sub: [
            {
                label: "Giao Dịch",
                value: "trans",
                link: "/statistics/transform"
            },
            {
                label:"Tập Kết",
                value: "gather",
                link: "/statistics/gather",
            },
            
        ]
    }
]

export const RightbarLinkCustomer =[
    {
        label: "Tạo Đơn",
        value: "add",
        link: "/add",
    }
]

export const RightbarLinkNormal = [
    {
        label: "Thêm Nhân Viên",
        value : "add employee",
        link: "/addEmployee",
    }
]

export const RightbarLinkEmployeeTrans = [
    {
        label: "Tạo Đơn",
        value: "addOrder",
        link: "/new",
    }
]
  