"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { OrderValidation } from "@/lib/validations/order";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewOrder } from "@/lib/actions/order.action";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Address, city, district } from "@/client/contants/Address";
import { ListDescription, ListOrderType } from "@/client/contants/OrderOption";
import { useRouter } from "next/navigation";

interface Props {
  user: {
    email: string;
    id: string;
  };
  setcomplete: () => void;
}

const address = Address;

const CreateOrder = ({ user, setcomplete }: Props) => {
  const [city, setCity] = useState(false);
  const [district, setDistrict] = useState(false);
  const [ward, setWard] = useState(false);
  const [disValue, setDisValue] = useState<city>();
  const [disAble, setDisAble] = useState(false);
  const [wardValue, setWardValue] = useState<district>();
  const [wardAble, setWardAble] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof OrderValidation>>({
    resolver: zodResolver(OrderValidation),
    defaultValues: {
      typeOrder: "Hang hoa",
      specialService: "1",
    },
  });
  const onSubmit = async (values: z.infer<typeof OrderValidation>) => {
    await createNewOrder({
      email: user.email,
      sender: user.id,
      receiverName: values.receiverName,
      phone: values.phone,
      description: values.description,
      typeOrder: values.typeOrder,
      specailService: values.specialService,
      city: values.address.city,
      district: values.address.district,
      ward: values.address.ward,
    });
    setcomplete();
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col justify-start gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* //  nguoi gui */}
          {/* <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
                <FormLabel className=''>
                {email}
                </FormLabel>
                <FormControl>
                <Input
                    {...field}
                    value={user? user.name : ""}
                />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        /> */}
          {/* //  name rêciver */}
          <div className="grid grid-cols-2 itemx-center">
            <FormField
              name="receiverName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex center-item max-w-50">
                  <FormLabel className="w-56 p-4">Người nhận</FormLabel>
                  <FormControl>
                    <Input type="text" className="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*  phone */}
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex center-item  max-w-full">
                  <FormLabel className="w-56 p-4">Số điện thoại</FormLabel>
                  <FormControl>
                    <Input type="text" className="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* address  */}
          <FormField
            name="address.city"
            control={form.control}
            render={({ field }) => (
              <>
                <FormItem className="flex center-item">
                  <FormLabel className="w-40 p-4">Thành phố</FormLabel>
                  <Popover open={city} onOpenChange={setCity}>
                    <PopoverTrigger asChild>
                      <FormControl className="">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between w-full",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? address.find((city) => city.value === field.value)
                                ?.label
                            : "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {address.map((city) => (
                            <CommandItem
                              value={city.label}
                              key={city.value}
                              onSelect={() => {
                                form.setValue("address.city", city.value);
                                setCity(false);
                                setDisValue(
                                  address.find(
                                    (address) => address.value === city.value
                                  )
                                );
                                setDisAble(false);
                                setWardAble(false);
                              }}
                            >
                              {city.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              </>
            )}
          />
          <FormField
            name="address.district"
            control={form.control}
            render={({ field }) => (
              <>
                <FormItem className="flex center-item">
                  <FormLabel className="w-40 p-4">Quận/Huyện</FormLabel>
                  <Popover open={district} onOpenChange={setDistrict}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between w-full",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {disAble
                            ? disValue?.district.find(
                                (value) => value.value === field.value
                              )?.label
                            : "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {disValue?.district.map((dis) => (
                            <CommandItem
                              value={dis.value}
                              key={dis.value}
                              onSelect={() => {
                                form.setValue("address.district", dis.value);
                                setDistrict(false);
                                setWardValue(
                                  disValue.district.find(
                                    (item) => item.value === dis.value
                                  )
                                );
                                setDisAble(true);
                                setWardAble(false);
                              }}
                            >
                              {dis.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              </>
            )}
          />
          <FormField
            name="address.ward"
            control={form.control}
            render={({ field }) => (
              <>
                <FormItem className="flex center-item">
                  <FormLabel className="w-40 p-4">Xã/Phường</FormLabel>
                  <Popover open={ward} onOpenChange={setWard}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between w-full",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {wardAble
                            ? wardValue?.ward.find(
                                (value) => value.value === field.value
                              )?.label
                            : "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {wardValue?.ward.map((item) => (
                            <CommandItem
                              value={item.value}
                              key={item.value}
                              onSelect={() => {
                                form.setValue("address.ward", item.value);
                                setWard(false);
                                setWardAble(true);
                              }}
                            >
                              {item.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              </>
            )}
          />
          {/* description  */}
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex center-item">
                <FormLabel className="w-40 p-4">Ghi chú</FormLabel>
                <FormControl>
                  <Input type="text" className="w-full" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {/* type order  */}
          <FormField
            control={form.control}
            name="typeOrder"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Loại hàng gửi</FormLabel>
                <FormControl className="flex center-item">
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={"hang hoa"}
                    className="flex space-x-32"
                  >
                    {ListOrderType.map((type) => {
                      return (
                        <FormItem
                          key={type.value}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={type.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {type.label}
                          </FormLabel>
                        </FormItem>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* specialService  */}
          <FormField
            control={form.control}
            name="specialService"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  Chỉ dẫn người gửi khi không phát được bưu gửi
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={"1"}
                    className=""
                  >
                    {ListDescription.map((type) => {
                      return (
                        <FormItem
                          key={type.value}
                          className="flex items-center space-x-3 space-y-1"
                        >
                          <FormControl>
                            <RadioGroupItem value={type.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {type.label}
                          </FormLabel>
                        </FormItem>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-primary-500">
            Hoàn Thành Gửi Đơn
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateOrder;
