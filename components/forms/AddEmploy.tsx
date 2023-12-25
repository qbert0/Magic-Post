"use client";

import { EmployeeValidation } from "@/lib/validations/employee";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { addEmployeetoOzigation } from "@/lib/actions/user.action";

interface Props {
  workPlace: string;
  career: string;
  type: number;
}

const AddEmploy = ({ workPlace, career, type }: Props) => {
  const router = useRouter();
  const pathname = usePathname;

  const form = useForm<z.infer<typeof EmployeeValidation>>({
    resolver: zodResolver(EmployeeValidation),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof EmployeeValidation>) => {
    const sub = await addEmployeetoOzigation({
      id: values.id,
      carrer: career,
      workPlace: workPlace,
    });
    if (!sub) {
    }
    router.refresh();
  };

  return (
    <>
      <Form {...form}>
        <form className="" onSubmit={form.handleSubmit(onSubmit)}>
          {/* id  */}
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">carrer</FormLabel>
                <FormControl>
                  <Input type="text" className="" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default AddEmploy;
