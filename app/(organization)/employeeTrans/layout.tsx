import { LeftbarLinkEmployeeTrans, RightbarLinkEmployeeTrans } from "@/client/contants/sidebarlink";
import Leftbar from "@/components/Shared/Leftbar";
import Rightbar from "@/components/Shared/Rightbar";
import Topbar from "@/components/Shared/Topbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";



export const metadata : Metadata = {
    title: 'Magic Post',
    description: 'A Next.js 13 Meta Threads Application',
}

interface Props {
    children : React.ReactNode;
}

const inter = Inter({subsets:["latin"]})


function RootLayout({children}: Props) {
    const pathnameRoot = '/employeeTrans'
    return (
        <>
        <html lang="en">
            <body className={`${inter.className} `}>
                <Topbar/>
                <main className="flex flex-row">
                    <Leftbar sidebarlink={LeftbarLinkEmployeeTrans} pathnameRoot={pathnameRoot} />
                    <section className='main-container '>
                        <div className='w-full '>
                            {children}
                        </div>
                    </section>
                    <Rightbar sidebarlink={RightbarLinkEmployeeTrans} pathnameRoot={pathnameRoot}/>
                </main>
            </body>
        </html>
        </>
    )
}


export default RootLayout;