import { Student } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StudentShowProps {
  student: Student;
}

export default function StudentShow({ student }: StudentShowProps) {
  return (
    <section className="bg-teal-50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-nowrap">Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Admission Date</TableHead>
            <TableHead className="text-right">Phone Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={student.id}>
            <TableCell className="font-medium">{student.name}</TableCell>
            <TableCell>{student.class}</TableCell>
            <TableCell>{student.admissionDate.toLocaleDateString()}</TableCell>
            <TableCell className="text-right">{student.phone_number}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}
