import Leftbar from "@/components/Shared/Leftbar";
import LeftbarManager from "@/components/Shared/Leftbar";
import Topbar from "@/components/Shared/Topbar";
import { LeftbarLinkEmployeeGather } from "@/contants/client/sidebarlink";
import { ClerkProvider } from "@clerk/nextjs";
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


function RootLayout({children}: Props) {
    const pathnameroot = '/employeeGather'
    return (
        <>
        <html lang="en">
                <body className={`${inter.className} `}>
                    <Topbar/>
                    <main className="flex flex-row">
                        <Leftbar sidebarlink={LeftbarLinkEmployeeGather} pathnameRoot={pathnameroot}/>
                        <section className='main-container'>
                            <div className='w-full '>
                                {children}
                            </div>
                        </section>
                        {/* <RightbarCustomer/> */}
                    </main>
                </body>
            </html>
        </>
    )
}


export default RootLayout;