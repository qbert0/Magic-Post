"use client";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

interface Props {
  sidebarlink: Link[];
  pathnameRoot: string;
}

interface Link {
  label: string;
  value: string;
  link: string;
}

const Rightbar = ({ sidebarlink, pathnameRoot }: Props) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <>
      <section className="custome-scrollbar rightsidebar ">
        <div className="flex w-full flex-1 flex-col gap-6 px-6">
          {sidebarlink.map((link) => {
            return (
              <>
                <Link href={`${pathnameRoot}${link.link}`}>
                  <Button
                    className="bg-brand-500 md hover:bg-brand-500 hover:text-white"
                    size={"sm"}
                  >
                    {link.label}
                  </Button>
                </Link>
              </>
            );
          })}
        </div>

        <div className="">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className=" text-pink-1"
            classNames={{
              day_selected:
                "bg-brand-500 text-white hover:bg-brand-500 hover:text-white focus:bg-brand-500 focus:text-white",
              day_today: "bg-brand-500  text-accent-foreground",
            }}
          />
        </div>
      </section>
    </>
  );
};

export default Rightbar;
