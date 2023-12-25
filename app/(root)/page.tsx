import { columns } from "@/components/columns/Order";

import { fetchListOrderOfUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { SearchColumns } from "@/client/contants/enum";
import { passOrderToClient } from "@/client/util/orderUtil";
import TableMagic from "@/components/forms/TableMagic";

const Page = async () => {
  const user = await currentUser();
  if (!user) return;

  const listOrder = await fetchListOrderOfUser(user.id);

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
