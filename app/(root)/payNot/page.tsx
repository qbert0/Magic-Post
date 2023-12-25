import { SearchColumns, Status } from "@/client/contants/enum";
import { passOrderToClient } from "@/client/util/orderUtil";
import { columns } from "@/components/columns/Order";
import TableMagic from "@/components/forms/TableMagic";
import { GetOrderByStatus } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
  const user = await currentUser();
  if (!user) return;

  const listOrder = await GetOrderByStatus(user.id, Status.paynot);

  const orders = passOrderToClient(listOrder);
  return (
    <>
      <TableMagic
        listOrder={orders}
        columns={columns}
        searchColumns={SearchColumns.description}
        dropMenu={null}
        selectBox={null}
      />
    </>
  );
};

export default Page;
