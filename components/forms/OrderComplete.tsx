import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import order1 from "@/assets/order1.png";
import order2 from "@/assets/order2.png";
import Image from "next/image";

interface Props {
  setComplete: () => void;
}

const OrderComplete = ({ setComplete }: Props) => {
  const router = useRouter();

  const back = () => {
    router.push("/");
  };

  const go = () => {
    setComplete();
  };
  return (
    <>
      <div>
        <div className="text-heading3-bold text-center text-brand-500">
          Hoàn Thành Đơn Hàng. Đang chờ xử lý
        </div>

        <div className="text-center mt-8 space-x-10">
          <Button onClick={() => back()} className=" bg-red-500 hover:bg-red-300">
            Về Trang Chủ
          </Button>
          <Button onClick={() => go()} className='bg-brand-500 hover:bg-blue-300'>Tạo Đơn mới</Button>
        </div>
      </div>
      <div className="flex mt-10 mx-[70px]">
        <Image src={order1} alt="order" width={500} />
        <Image src={order2} alt="order" width={500} />
      </div>
    </>
  );
};

export default OrderComplete;
