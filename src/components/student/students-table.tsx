"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { paths } from "@/paths";
import { Student } from "@prisma/client";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useSort } from "@/lib/use-sort";
import { Checkbox } from "../ui/checkbox";
import { StudentWithData } from "@/db/queries";
import { ReactNode } from "react";
import { getMonthsCount } from "@/lib/data";

interface headerType {
  label: string;
  render: (student: StudentWithData) => string | ReactNode;
  sortBy?: keyof Student;
}

export default function StudentsTable({
  students,
}: {
  students: StudentWithData[];
}) {
  const headers: headerType[] = [
    {
      label: "Status",
      render: ({ _count, admissionDate }) => {
        const status =
          _count.payments === getMonthsCount(admissionDate, new Date());
        return (
          <div className="flex items-center gap-3 flex-wrap">
            <Checkbox
              checked={status}
              aria-label="Payment Status"
              className="cursor-default"
            />
            {status ? "Success" : "Pending"}
          </div>
        );
      },
    },
    {
      label: "Name",
      render: ({ id, name, userId }) => (
        <Link
          href={paths.showStudent(userId, `${id}`)}
          className="hover:text-blue-500"
        >
          {name}
        </Link>
      ),
      sortBy: "name",
    },
    {
      label: "Class",
      render: (student) => student.class,
      sortBy: "class",
    },
    {
      label: "Phone Number",
      render: ({ phone_number }) => phone_number,
    },
    {
      label: "Admission Date",
      render: ({ admissionDate }) => admissionDate.toDateString(),
    },
  ];

  const { sortedData: sortedStudents, handleSort } = useSort(students);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map(({ label, sortBy }) => {
              if (sortBy)
                return (
                  <TableHead key={label}>
                    <Button
                      variant="ghost"
                      className="p-0"
                      onClick={() => handleSort(sortBy)}
                    >
                      {label}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                );
              return <TableHead key={label}>{label}</TableHead>;
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStudents.map((student) => {
            const { userId } = student;
            return (
              <TableRow key={student.id}>
                {headers.map((row) => {
                  return (
                    <TableCell key={student.id + row.label}>
                      {row.render(student)}
                    </TableCell>
                  );
                })}

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link
                        href={paths.showStudent(userId, `${student.id}`)}
                        className="hover:text-blue-500"
                      >
                        <DropdownMenuItem>View Student</DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
