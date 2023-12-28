"use client";

import { link } from "@/client/util/DataType";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import HomeBar from "../cards/Home";
import { Disclosure } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";
import Setting from "../cards/Setting";

interface Props {
  sidebarlink: link[];
  pathnameRoot: string;
}

const Leftbar = ({ sidebarlink, pathnameRoot }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const { userId } = useAuth();

  return (
    <>
      <section className="custom-scrollbar leftsidebar">
        <div className="flex  flex-1 flex-col gap-1 px-2">
          <HomeBar />

          {/* side bar link  */}
          {sidebarlink.map((link) => {
            // khi khong co link sub
            if (link.sub.length === 0) {
              const isActive =
                (pathname.includes(link.link) && link.link.length > 1) ||
                pathname === link.link;

              return (
                <Link
                  href={`${pathnameRoot}${link.link}`}
                  className={`${
                    isActive && "link_active"
                  } flex w-full items-center space-x-4 rounded-xl px-3 ${
                    isActive ? "text-white" : "text-brand-500"
                  } text-heading4-medium py-2 text-left 
              link_focus group`}
                >
                  {link.icon}
                  <p className="pt-1">{link.label}</p>
                </Link>
              );
            }

            // khi co link sub
            else {
              return (
                <Disclosure key={link.value}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className="flex w-full items-center space-x-4 rounded-xl px-3 text-brand-500 text-heading4-medium py-2 text-left 
                  focus:outline-none focus-visible:ring hover:bg-brand-500  hover:text-white cursor-pointer group"
                      >
                        <div className="flex items-center space-x-3">
                          {link.icon}
                          <p className="pt-1">{link.label}</p>
                        </div>
                        <BsChevronDown
                          size="15"
                          className={`${
                            open ? "rotate-180 transform" : ""
                          }  text-brand-500 group-hover:text-white`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="pl-5 pt-2 text-brand-500">
                        <div className="space-y-2 text-base-semibold">
                          {link.sub.map((sub) => {
                            const isActive =
                              (pathname.includes(sub.link) &&
                                sub.link.length > 1) ||
                              pathname === sub.link;
                            return (
                              <Link
                                href={`${pathnameRoot}${sub.link}`}
                                key={sub.value}
                                className={`${
                                  isActive && "link_active"
                                } flex w-full items-center space-x-4 rounded-xl px-3 ${
                                  isActive ? "text-white" : "text-brand-500"
                                } text-heading4-medium py-2 text-left 
                            link_focus group`}
                              >
                                {sub.label}
                              </Link>
                            );
                          })}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              );
            }
          })}

          {/* setting */}
          <Setting />
        </div>
      </section>
    </>
  );
};

export default Leftbar;
