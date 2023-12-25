"use client";
import { useState } from "react";
import FindUser from "./FindUser";
import {
  GetOrderByStatus,
  GetOrderToInventory,
} from "@/lib/actions/user.action";
import PaginationPage from "../Shared/Pagination";
import { Status } from "@/client/contants/enum";

interface user {
  id: string;
  email: string;
}

interface Props {
  user: {
    workPlace: string;
  };
}

const InventoryBox = ({ user }: Props) => {
  const [userData, setUserData] = useState<user>();
  const [listorder, setListorder] = useState<any[]>();

  const finduser = async (user: user) => {
    if (!user) {
      return;
    }
    const listorder = await GetOrderToInventory(user.id);
    console.log(listorder);
    setListorder(listorder);
  };

  return (
    <>
      <FindUser finduser={finduser} />
      {listorder ? (
        <PaginationPage data={listorder} workPlace={user.workPlace} />
      ) : (
        <></>
      )}
    </>
  );
};

export default InventoryBox