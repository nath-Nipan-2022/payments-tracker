"use client";

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

import { Input } from "@/components/ui/input";
import { DatePicker } from "../date-picker";

import { CreateStudentState } from "@/actions/create-student";
import { classFieldsData } from "@/lib/data";
import { StudentSchemaType, studentSchema } from "@/schemas/student-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

interface StudentFormProps {
  defaultValues?: StudentSchemaType;
  formAction: (values: StudentSchemaType) => Promise<CreateStudentState>;
  onSuccess: () => void;
}

export default function StudentForm({
  defaultValues,
  formAction,
  onSuccess,
}: StudentFormProps) {
  const [error, setError] = useState<string[] | undefined>();

  const form = useForm<StudentSchemaType>({
    resolver: zodResolver(studentSchema),
    defaultValues: defaultValues || {
      name: "",
      class: "",
      schoolName: "",
      phoneNumber: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: StudentSchemaType) {
    const data = await formAction(values);
    if (data?.errors._form) {
      return setError(data.errors._form);
    }
    onSuccess();
    form.reset();
    setError(undefined);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="schoolName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School</FormLabel>
                <FormControl>
                  <Input placeholder="Enter school name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="class"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="select..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper">
                    {classFieldsData.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="admissionDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admission Date</FormLabel>
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
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
          {error && (
            <div className="text-red-600 font-medium text-center">
              {error.join(",")}
            </div>
          )}
        </form>
      </Form>
    </>
  );
}
