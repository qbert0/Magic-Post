import { ClerkProvider, currentUser } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import Topbar from "@/components/Shared/Topbar";
import { Children } from "react";
import {
  LeftbarLinkCustomer,
  RightbarLinkCustomer,
} from "@/client/contants/sidebarlink";
import Leftbar from "@/components/Shared/Leftbar";
import Rightbar from "@/components/Shared/Rightbar";
import Provider from "../(Provider)/NextUiProvider";
import { fetchUser } from "@/lib/actions/user.action";
import { PathRoot } from "@/client/contants/enum";

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
  const career = userInfor.career;

  return (
    <>
      <ClerkProvider>
        <html lang="en">
          <Provider>
            <body className={`${nunito.className} `}>
              <Topbar career={career} pathname={PathRoot.user} />
              <main className="flex flex-row">
                <Leftbar
                  sidebarlink={LeftbarLinkCustomer}
                  pathnameRoot={PathRoot.user}
                />
                <section className="main-container ">
                  <div className="w-full ">{children}</div>
                </section>
                <Rightbar
                  sidebarlink={RightbarLinkCustomer}
                  pathnameRoot={PathRoot.user}
                />
              </main>
            </body>
          </Provider>
        </html>
      </ClerkProvider>
    </>
  );
}

export default RootLayout;
