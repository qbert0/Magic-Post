import { PathRoot } from "@/client/contants/enum";
import { LeftbarLinkEmployeeTrans, RightbarLinkEmployeeTrans } from "@/client/contants/sidebarlink";
import Leftbar from "@/components/Shared/Leftbar";
import Rightbar from "@/components/Shared/Rightbar";
import Topbar from "@/components/Shared/Topbar";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";



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
    const career = userInfor.career
    // if(!userInfor.career) return
    // if(userInfor.isPostion !== "Emtran") return

    return (
        <>
        <html lang="en">
            <body className={`${inter.className} `}>
                <Topbar career={career} pathname={PathRoot.EmployeeTrans}/>
                <main className="flex flex-row">
                    <Leftbar sidebarlink={LeftbarLinkEmployeeTrans} pathnameRoot={PathRoot.EmployeeTrans} />
                    <section className='main-container '>
                        <div className='w-full '>
                            {children}
                        </div>
                    </section>
                    <Rightbar sidebarlink={RightbarLinkEmployeeTrans} pathnameRoot={PathRoot.EmployeeTrans}/>
                </main>
            </body>
        </html>
        </>
    )
}


export default RootLayout;