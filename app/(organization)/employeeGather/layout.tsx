import { LeftbarLinkEmployeeGather, RightbarLinkNormal } from "@/client/contants/sidebarlink";
import Leftbar from "@/components/Shared/Leftbar";
import LeftbarManager from "@/components/Shared/Leftbar";
import Rightbar from "@/components/Shared/Rightbar";
import Topbar from "@/components/Shared/Topbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { Active, Career, PathRoot } from "@/client/contants/enum";
import { redirect } from "next/navigation";
// import "@/a"



export const metadata : Metadata = {
    title: 'Magic Post',
    description: 'A Next.js 13 Meta Threads Application',
}

interface Props {
    children : React.ReactNode;
}

const inter = Inter({subsets:["latin"]})


async function RootLayout({children}: Props) {
    const user = await currentUser()
    if(!user) return 
    const userInfor = await fetchUser(user.id)
    if(userInfor.career !== Career.employeeGather) redirect("/")
    const career = userInfor.career
    return (
        <>
        <html lang="en">
                <body className={`${inter.className} `}>
                    <Topbar career={career} pathname={PathRoot.EmployeeGather}/>
                    <main className="flex flex-row">
                        <Leftbar sidebarlink={LeftbarLinkEmployeeGather} pathnameRoot={PathRoot.EmployeeGather}/>
                        <section className='main-container'>
                            <div className='w-full '>
                            {
                            userInfor.active === Active.lock ? 
                            <div className="w-full mt-10 ">Bạn đang bị khóa truy cập</div>
                            : 
                            <>{children}
                            </>
                            }
                            </div>
                        </section>
                        <Rightbar sidebarlink={RightbarLinkNormal} pathnameRoot={PathRoot.EmployeeGather}/>
                    </main>
                </body>
            </html>
        </>
    )
}


export default RootLayout;