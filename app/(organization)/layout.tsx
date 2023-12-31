import { ClerkProvider, currentUser } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"
import { fetchUser } from "@/lib/actions/user.action";
import Provider from "../(Provider)/NextUiProvider";
import { redirect } from "next/navigation";



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
    if(!userInfor.isPostion) {
        redirect("/")
    }
    return (
        <>
        <ClerkProvider>
            {/* <Provider> */}
            <html lang="en">
                <body>
                    {children}
                </body>
            </html>
            {/* </Provider> */}
        </ClerkProvider>
        </>
    )
}


export default RootLayout;