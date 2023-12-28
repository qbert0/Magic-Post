import { PathRoot } from "@/client/contants/enum";
import { LeftbarLinkManager, RightbarLinkNormal } from "@/client/contants/sidebarlink";
import Leftbar from "@/components/Shared/Leftbar";
import LeftbarManager from "@/components/Shared/Leftbar";
import Rightbar from "@/components/Shared/Rightbar";
import Topbar from "@/components/Shared/Topbar";
import { fetchUser } from "@/lib/actions/user.action";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
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
    const pathnameroot = '/manageGather'
    const user = await currentUser()
    if(!user) return
    const userInfor = await fetchUser(user.id)
    const career = userInfor.career
    return (
        <>
        <html lang="en">
                <body className={`${inter.className} `}>
                    <Topbar career={career} pathname={PathRoot.EmployeeGather}/>
                    <main className="flex flex-row">
                        <Leftbar sidebarlink={LeftbarLinkManager} pathnameRoot={PathRoot.ManangerGather}/>
                        <section className='main-container'>
                            <div className='w-full '>
                                {children}
                            </div>
                        </section>
                        <Rightbar sidebarlink={RightbarLinkNormal} pathnameRoot={PathRoot.ManangerGather}/>
                    </main>
                </body>
            </html>
        </>
    )
}


export default RootLayout;