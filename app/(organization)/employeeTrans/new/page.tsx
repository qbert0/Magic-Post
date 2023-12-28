import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateBox from "@/components/forms/CreateBox";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.action";
import { userInfo } from "os";
import InventoryBox from "@/components/forms/InventoryBox";

const Page = async () => {
  const user = await currentUser();
  if (!user) return;

  const userInfor = await fetchUser(user.id);

  const userdata = {
    workPlace: userInfor.workPlace.toString(),
  };

  return (
    <>
      <Tabs defaultValue="addnew" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="addnew">Lên Đơn</TabsTrigger>
          <TabsTrigger value="inventory">Duyệt Đơn</TabsTrigger>
        </TabsList>
        <TabsContent value="addnew">
          <CreateBox user={"0"} findUser={true} />
        </TabsContent>
        <TabsContent value="inventory">
          <InventoryBox user={userdata} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Page;
