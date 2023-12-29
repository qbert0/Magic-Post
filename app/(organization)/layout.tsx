import { ClerkProvider, currentUser } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import { fetchUser } from "@/lib/actions/user.action";
import Provider from "../(Provider)/NextUiProvider";

export const metadata: Metadata = {
  title: "Magic Post",
  description: "A Next.js 13 Meta Threads Application",
};

interface Props {
  children: React.ReactNode;
}

const nunito = Nunito({ weight: "400", subsets: ["latin"] });

async function RootLayout({ children }: Props) {
  const user = await currentUser();
  if (!user) return;

  const userInfor = await fetchUser(user.id);
  // if(!userInfor.isPostion) {
  //     return(
  //         <>
  //         trang khong huu hien
  //         </>
  //     )
  // }
  return (
    <>
      <ClerkProvider>
        {/* <Provider> */}
        <html lang="en">
          <body>{children}</body>
        </html>
        {/* </Provider> */}
      </ClerkProvider>
    </>
  );
}

export default RootLayout;
