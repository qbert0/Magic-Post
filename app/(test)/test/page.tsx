import Test from "@/components/Shared/Test";
import Test2 from "@/components/Shared/Test2";
import { fetchUser } from "@/lib/actions/user.action";
import { UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();
  if (!user) return;
  const userInfor = await fetchUser(user.id);
  let username = "chua phai chinh chu";
  // if(userInfor.firstName == ' qbert') {
  //   username= userInfor.firstName
  // } else {
  //   return
  // }

  const userdata = {
    id: userInfor._id.toString(),
    // workPlace : userInfor.workPlace.toString()
    // order: userInfor
  };
  console.log(userInfor);
  return (
    <div>
      <Link href={"/sign-in"}>this is {username} </Link>
      <UserButton afterSignOutUrl="/" />

      {user.id}

      <div>{userInfor.firstName}</div>

      <section className="mt-9 bg-dark-2 p-10">
        <Test2 />
      </section>
    </div>
  );
}
