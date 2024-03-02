"use client";

import { useState } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";

import { createPayment } from "@/actions";
import { payingMonthData } from "@/lib/data";
import { paymentSchema } from "@/schemas/payment-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker } from "../date-picker";

export default function MakePaymentForm({ studentId }: { studentId: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string[] | undefined>();

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof paymentSchema>) {
    const data = await createPayment(studentId, values);
    if (data?.errors._form) {
      return setError(data.errors._form);
    }
    setOpen(false);
    form.reset();
    setError(undefined);
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Make Payment</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Payment Easily</DrawerTitle>
            <DrawerDescription>
              Track payments by simply tapping submit.
            </DrawerDescription>
          </DrawerHeader>

          <Form {...form}>
            <form
              className="space-y-4 p-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="₹ 500" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="payingMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paying Month</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pick a month" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        {payingMonthData.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onChange={field.onChange}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
              {error && (
                <div className="text-red-600 font-medium text-center">
                  {error.join(",")}
                </div>
              )}
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
