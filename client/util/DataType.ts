import { Date } from "mongoose";
import { Status } from "../contants/enum";

export interface subLink {
    label: string,
    value: string,
    link: string,
  }
  
export interface link {
  label: string,
  icon: React.ReactNode,
  value: string,
  link: string,
  sub: subLink[],
}


export interface MenuDropBox {
  value : string,
  label : string,
}

export interface SelectStatusBox {
  title : string,
  parentPoint : string | null,
  workPlace : string,
  status : Status,
}



  