"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PostValidation } from "@/lib/validations/post";
import { Divide } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { UpdatePointDone, UpdateStatus } from "@/lib/actions/order.action";
import { AddOrderToTranPoint } from "@/lib/actions/transformPoint.action";
import { Status } from "@/client/contants/enum";
import { classNames } from "uploadthing/client";

interface Props {
  fullname: string;
  phone: string;
  receiver: string;
  address: string;
  typeOrder: string;
  id: string;
  workPlace: string;
  pageDone: (page: number) => void;
  page: number;
  done: boolean;
  // service : string,
}

const InventoryOrder = ({
  id,
  fullname,
  phone,
  receiver,
  address,
  typeOrder,
  workPlace,
  pageDone,
  page,
  done,
}: Props) => {
  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      fullNameAndAdd: "",
      phone: "",
      code: "",
      goods: "",
      receiver: "",
      content: "",
      service: "",
      contract: "",
      instruction: ".",
      commit: "",
      time: "",
      signature: "",
      postage: "",
      weight: "",
      cod: "",
      transform: "",
      call: "",
      het_tg: "",
      truocngay: "",
      huy: "",
      thukhac: "",
      tongthu: "",
      chudan: "",
      ngaynhan: "",
      accept: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PostValidation>) => {
    await UpdateStatus(id, "Đơn hàng được xác nhận thành công");
    await UpdatePointDone(id, Status.inventoryted);
    await AddOrderToTranPoint(id, workPlace);

    pageDone(page);
  };

  const date = new Date();

  return (
    <>
      {!done ? (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="border border-black m-8 "
            >
              {/* tren */}
              <div className="grid grid-cols-2 itemx-center">
                {/* 1 */}
                <div className="border border-black">
                  <FormField
                    control={form.control}
                    name="fullNameAndAdd"
                    render={({ field }) => (
                      <FormItem className="itemx-center gap-4 p-2">
                        <FormLabel>1.Họ tên địa chỉ người gửi:</FormLabel>
                        <Textarea
                          rows={2}
                          {...field}
                          value={fullname}
                        ></Textarea>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="flex itemx-center max-w-full p-2 mt-3">
                        <FormLabel className="w-56 my-4">Điện thoại:</FormLabel>
                        <Input type="text w-full" {...field}></Input>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-4 p-2">
                        <div>
                          <FormItem className="max-w-50">
                            <FormLabel className="max-w-full">
                              Mã khách hàng:
                            </FormLabel>
                            <Input type="text" value={123}></Input>
                          </FormItem>
                        </div>
                        <div>
                          <FormItem className="max-w-50">
                            <FormLabel className="max-w-full">
                              Mã bưu chính:
                            </FormLabel>
                            <Input type="text w-full"></Input>
                          </FormItem>
                        </div>
                      </div>
                    )}
                  />
                </div>
                {/* 2 */}
                <div className="border border-black p-2">
                  <FormField
                    control={form.control}
                    name="receiver"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>2.Họ tên địa chỉ người nhận:</FormLabel>
                        <Textarea
                          rows={2}
                          {...field}
                          value={receiver + ", " + address}
                        ></Textarea>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="receiver"
                    render={({ field }) => (
                      <FormItem className="itemx-center py-8">
                        <FormLabel>Mã ĐH:</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="receiver"
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="max-w-full">
                          <FormItem className="mb-3">Điện thoại:</FormItem>
                          <Input type="text" {...field} value={phone}></Input>
                        </div>
                        <div>
                          <FormItem className="mb-3">Mã bưu chính:</FormItem>
                          <Input type="text" value={"01056"}></Input>
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
              {/* div duoi */}
              <div className="grid grid-cols-2">
                {/* trái */}
                <div className="">
                  {/* 3+4 */}
                  <div className="border border-black">
                    {/* 3 */}
                    <FormField
                      control={form.control}
                      name="call"
                      render={({ field }) => (
                        <FormItem className="p-2">
                          <FormLabel>3.Loại hàng gửi:</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onChange={field.onChange}
                              defaultValue={"hanghoa"}
                              className="grid grid-cols-2"
                            >
                              <FormItem>
                                <FormControl>
                                  <RadioGroupItem
                                    value={"tailieu"}
                                    className=""
                                  />
                                </FormControl>
                                <FormLabel className="font-light ">
                                  Tài Liệu
                                </FormLabel>
                              </FormItem>
                              <FormItem className="">
                                <FormControl>
                                  <RadioGroupItem
                                    value={"hanghoa"}
                                    className=""
                                  />
                                </FormControl>
                                <FormLabel className="font-light">
                                  Hàng Hóa
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {/* 4 */}

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem className="itemx-center">
                          <FormLabel className="p-2">
                            4.Nội dung giá trị bưu gửi:
                          </FormLabel>
                          <div className="grid grid-cols-4">
                            <div className="border border-black">Nội dung</div>
                            <div className="border border-black">Số lượng</div>
                            <div className="border border-black"> Giá trị </div>
                            <div className="border border-black">
                              Giấy tờ đính kèm
                            </div>
                            <div className="border border-black">Tổng</div>
                            <div className="border border-black"></div>
                            <div className="border border-black"></div>
                            <div className="border border-black"></div>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* 5 */}
                  <div className="border border-black">
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem className="p-2">
                          <FormLabel>5.Dịch vụ đặc biệt/cộng thêm:</FormLabel>
                          <Input type="text"></Input>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contract"
                      render={({ field }) => (
                        <FormItem className="flex itemx-center">
                          <FormLabel className="font-light m-2">
                            Mã hợp đồng EMSC/PPA
                          </FormLabel>
                          <Input className="mx-4" type="text"></Input>
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* 6 */}
                  <div className="border border-black p-2">
                    <FormField
                      control={form.control}
                      name="instruction"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>
                            6.Chỉ dẫn của người gửi khi không phát được bưu gửi:
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <div>
                      <div className="flex">
                        <FormField
                          control={form.control}
                          name="transform"
                          render={({ field }) => (
                            <div className="flex items-center">
                              <Input
                                type="checkbox"
                                className="w-3 mx-1"
                              ></Input>
                              <FormLabel className="font-light text-subtle-semibold">
                                Chuyển hoàn ngay
                              </FormLabel>
                            </div>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="call"
                          render={({ field }) => (
                            <div className="flex items-center">
                              <Input
                                type="checkbox"
                                className="w-3 mx-1"
                              ></Input>
                              <FormLabel className="font-light text-subtle-semibold">
                                Gọi điện cho người gửi/BC gửi
                              </FormLabel>
                            </div>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="truocngay"
                          render={({ field }) => (
                            <div className="flex items-center">
                              <Input
                                type="checkbox"
                                className="w-3 mx-1"
                              ></Input>
                              <FormLabel className="font-light text-subtle-semibold">
                                Hủy
                              </FormLabel>
                            </div>
                          )}
                        />
                      </div>
                      <div className="flex">
                        <FormField
                          control={form.control}
                          name="truocngay"
                          render={({ field }) => (
                            <div className="flex items-center">
                              <Input
                                type="checkbox"
                                className="w-3 mx-1"
                              ></Input>
                              <FormLabel className="font-light text-subtle-semibold ">
                                Chuyển hoàn trước ngày
                              </FormLabel>
                            </div>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="het_tg"
                          render={({ field }) => (
                            <div className="flex itemx-center">
                              <Input
                                type="checkbox"
                                className="w-3 mx-1 p-0"
                              ></Input>
                              <FormLabel
                                FormLabel
                                className="font-light text-subtle-semibold p-2"
                              >
                                Chuyển hoàn khi hết thời gian lưu trữ
                              </FormLabel>
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  {/* 7 + 8 */}
                  <div className="border border-black p-2">
                    <FormField
                      control={form.control}
                      name="commit"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>7.Cam kết của người gửi:</FormLabel>
                          <Input type="text"></Input>
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 mt-5 mb-4">
                      <div>
                        <FormField
                          control={form.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem className="">
                              <FormLabel>8.Ngày giờ gửi:</FormLabel>
                              <br />
                              <FormLabel>{date.toLocaleDateString()}</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name="signature"
                          render={({ field }) => (
                            <FormItem className="">
                              <FormLabel>Chữ ký người gửi</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* phải */}
                <div className="">
                  {/* tren */}
                  <div className="grid grid-cols-5">
                    {/* 9 + 10 */}
                    <div className="col-span-3">
                      {/* 9 */}
                      <div className="border border-black p-2">
                        <FormField
                          control={form.control}
                          name="postage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>9.Cước:</FormLabel>
                              <div className="flex">
                                <FormLabel className="font-light mt-1">
                                  a.Cước chính:
                                </FormLabel>
                                <div className="flex justify-end flex-1">0</div>
                              </div>
                              <div className="flex">
                                <FormLabel className="font-light mt-1">
                                  b.Phụ phí:
                                </FormLabel>
                                <div className="flex justify-end flex-1">
                                  9,500
                                </div>
                              </div>
                              <div className="flex">
                                <FormLabel className="font-light mt-1">
                                  c.Cước GTGT:
                                </FormLabel>
                                <div className="flex justify-end flex-1">
                                  11,000
                                </div>
                              </div>
                              <div className="flex">
                                <FormLabel className="font-light mt-1">
                                  d.Tổng cước(gồm VAT):
                                </FormLabel>
                                <div className="flex justify-end flex-1">0</div>
                              </div>
                              <div className="flex">
                                <FormLabel className="font-light mt-1">
                                  e.Thu khác:
                                </FormLabel>
                                <div className="flex justify-end flex-1">
                                  12.000
                                </div>
                              </div>
                              <div className="flex">
                                <FormLabel className="font-light mt-1">
                                  f.Tổng thu:
                                </FormLabel>
                                <div className="flex justify-end flex-1">0</div>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* 10 */}
                      <div className="border border-black p-2">
                        <FormLabel>10.Thu của người nhận:</FormLabel>
                        <FormField
                          control={form.control}
                          name="cod"
                          render={({ field }) => (
                            <FormItem className="flex itemx-center gap-4">
                              <div className="flex">
                                <FormLabel className="font-light mt-3">
                                  COD:
                                </FormLabel>
                              </div>
                              <div className="flex justify-end flex-1">0</div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="thukhac"
                          render={({ field }) => (
                            <FormItem className="flex itemx-center gap-4">
                              <div className="flex">
                                <FormLabel className="font-light mt-3">
                                  Thu khác:
                                </FormLabel>
                              </div>
                              <div className="flex justify-end flex-1">0</div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="tongthu"
                          render={({ field }) => (
                            <FormItem className="flex itemx-center gap-4 ">
                              <div className="flex">
                                <FormLabel className="font-light mt-3">
                                  Tổng thu:
                                </FormLabel>
                              </div>
                              <div className="flex justify-end flex-1 m-0">
                                0
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* 11 + 12*/}
                    <div className="col-span-2 flex flex-col">
                      {/* 11 */}
                      <div className="border border-black p-2">
                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem className="itemx-center gap-4">
                              <FormLabel>11.Khối lượng(kg)</FormLabel>
                              <Input type="text"></Input>
                              <div className="flex">
                                <FormLabel className="font-light">
                                  Khối lượng thực tế:
                                </FormLabel>
                                <div className="flex justify-end flex-1">
                                  30
                                </div>
                              </div>
                              <div className="flex">
                                <FormLabel className="font-light">
                                  Khối lượng quy đổi:
                                </FormLabel>
                                <div className="flex justify-end flex-1">0</div>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* 12 */}
                      <div className="border border-black flex-1 p-2">
                        <FormField
                          control={form.control}
                          name="chudan"
                          render={({ field }) => (
                            <FormItem className="itemx-center gap-4">
                              <FormLabel>12.Chú dẫn nghiệp vụ:</FormLabel>
                              <Input type="text"></Input>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  {/* duoi */}
                  {/* 13+14 */}

                  <div className="grid grid-cols-5 border">
                    {/* 13 */}
                    <div className="border border-black p-2 w-full row-span-4 col-span-3">
                      <FormField
                        control={form.control}
                        name="accept"
                        render={({ field }) => (
                          <FormItem className="gap-4">
                            <div className="flex justify-center ">
                              <FormLabel className="">
                                13.Bưu cục chấp nhận
                              </FormLabel>
                            </div>
                            <div>
                              <FormLabel className="flex justify-center font-light">
                                Chữ kí GDV nhận
                              </FormLabel>
                            </div>
                            <div className="center p-10"></div>
                            <div>
                              <FormLabel className="flex justify-center font-light">
                                GDV
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* 14 */}
                    <div className="border border-black col-span-2 p-2">
                      <FormLabel>14.Ngày giờ nhận:</FormLabel>
                      <FormField
                        control={form.control}
                        name="transform"
                        render={({ field }) => (
                          <FormItem className="itemx-center gap-4">
                            <Input type=""></Input>
                            <div className="justify-items-center">
                              Người nhận / Người được
                              <br />
                              Ủy quyền nhận <br />
                              <div className="justify-items-center mb-20">(Ký, ghi rõ họ tên)</div>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </>
      ) : (
        <>
          <div>Hoàn Thành</div>
        </>
      )}
    </>
  );
};

export default InventoryOrder;
