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
import { MoreHorizontal } from "lucide-react";
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

interface headerType {
  label: string;
  render: (student: Student) => string;
  sortBy?: keyof Student;
}

export default function StudentsTable({ students }: { students: Student[] }) {
  const headers: headerType[] = [
    { label: "Name", render: ({ name }) => name, sortBy: "name" },
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
      render: ({ admissionDate }) => admissionDate.toLocaleDateString(),
      // sortBy: "admissionDate",
    },
  ];

  const { sortedData: sortedStudents, handleSort } = useSort(students);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map(({ label, sortBy }) => {
            if (sortBy)
              return (
                <TableHead
                  key={label}
                  onClick={() => handleSort(sortBy)}
                  className="cursor-pointer"
                >
                  {label}
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
  );
}
