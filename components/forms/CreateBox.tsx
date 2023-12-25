"use client";
import { useState } from "react";
import CreateOrder from "./CreateOrder";
import OrderComplete from "./OrderComplete";
import FindUser from "./FindUser";

interface user {
  id: string;
  email: string;
}

interface Props {
  user: user | "0";
  findUser: boolean;
}

const CreateBox = ({ user, findUser }: Props) => {
  const [complete, setComplete] = useState(false);
  const [userData, setUserData] = useState<user>();

  const Complete = () => {
    setComplete(true);
  };

  const NoComplete = () => {
    setComplete(false);
  };

  const finduser = (user: user) => {
    setUserData(user);
  };

  return (
    <>
      {user === "0" ? (
        <>
          <FindUser finduser={finduser} />
          {complete ? (
            <OrderComplete setComplete={NoComplete} />
          ) : (
            <>
              {userData ? (
                <CreateOrder user={userData} setcomplete={Complete} />
              ) : (
                <></>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {complete ? (
            <OrderComplete setComplete={NoComplete} />
          ) : (
            <CreateOrder user={user} setcomplete={Complete} />
          )}
        </>
      )}
    </>
  );
};

export default CreateBox;
