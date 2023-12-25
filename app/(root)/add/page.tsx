import CreateBox from "@/components/forms/CreateBox";
import CreateOrder from "@/components/forms/CreateOrder";
import Post from "@/components/forms/Post";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
const Page = async () => {
  const user = await currentUser();
  if (!user) {
    return;
  }

  const userInfor = await fetchUser(user.id);

  const { email } = userInfor ? userInfor.email : "";
  const id = userInfor ? userInfor._id : "";

  const userData = {
    email,
    id,
  };

  return (
    <>
      <CreateBox user={userData} findUser={false} />
    </>
  );
};

export default Page;
