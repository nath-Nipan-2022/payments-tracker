"use client";

import { ReactNode, useState } from "react";

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

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

import { StudentWithData } from "@/db/queries";
import { useSort } from "@/lib/use-sort";

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
      render: ({ payments }) => {
        const isPaid = payments.some(
          ({ payingMonth }) =>
            payingMonth ===
            new Date().toLocaleString("default", { month: "long" })
        );
        return (
          <Badge variant={isPaid ? "success" : "pending"}>
            {isPaid ? "Success" : "Pending"}
          </Badge>
        );
      },
    },
    {
      label: "Name",
      render: ({ id, name, userId }) => (
        <Link
          href={paths.showStudent(userId, `${id}`)}
          className="font-medium hover:text-blue-500"
        >
          {name}
        </Link>
      ),
      sortBy: "name",
    },
    {
      label: "Phone Number",
      render: ({ phoneNumber }) => phoneNumber,
    },
    {
      label: "Class",
      render: (student) => student.class,
      sortBy: "class",
    },
    {
      label: "Admission Date",
      render: ({ admissionDate }) => admissionDate.toDateString(),
    },
  ];

  const { sortedData: sortedStudents, handleSort } = useSort(students);
  const [query, setQuery] = useState("");

  let filteredStudents = sortedStudents;
  if (query.length > 3) {
    filteredStudents = sortedStudents.filter((s) =>
      s.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border shadow">
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
            {filteredStudents.map((student) => {
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
    </div>
  );
}
