'use client'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from "../ui/button"
import { useState } from "react"
import { Career, PathRoot } from "@/client/contants/enum"
import Link from "next/link"

interface Props {
    career : string,
    pathname: string,
}

const Switch = ({career, pathname} : Props) => {
    const [open, setOpen] = useState(false)


    const convertOg = (career: string) => {
        if(career === Career.employeeTrans) {
            return "Nhân viên giao dịch"
        } else if (career === Career.employeeGather) {
            return "Nhân viên tập kết"
        } else if (career === Career.managerTrans) {
            return "Quản lý giao dịch"
        } else if (career === Career.magegerGather) {
            return "Quản lý tập kết"
        } else {
            return "Quản lý cấp cao"
        }
    }

    const convertPathname = (career : string) => {
        if(career === Career.employeeTrans) {
            return PathRoot.EmployeeTrans
        } else if (career === Career.employeeGather) {
            return PathRoot.EmployeeGather
        } else if (career === Career.managerTrans) {
            return PathRoot.ManagerTrans
        } else if (career === Career.magegerGather) {
            return PathRoot.ManangerGather
        } else {
            return PathRoot.Owner
        }
    }

   

    return (
        <>
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
            >
            { pathname === '' ?  
            <>Người dùng</>
            :
            <>{convertOg(career)}</>  // ten to chuc 
            }
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {pathname === "" ?
            <Link href={convertPathname(career)}>
            <CommandItem
                onSelect={() => {
                  setOpen(false)
                }}
                >
                    {convertOg(career)}
            </CommandItem></Link>
            :
            <Link href={"/"}>
            <CommandItem
                onSelect={() => {
                  setOpen(false)
                }}
                >
                    Người dùng
            </CommandItem></Link>
            }
            
              
            
          </CommandGroup>
        </Command>
        </PopoverContent>
        </Popover>
        
        </>
    )
}

export default Switch ;