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
    <section className="bg-teal-50 rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-nowrap">Name</TableHead>
            <TableHead className="text-nowrap">School</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Admission Date</TableHead>
            <TableHead className="text-right">Phone Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={student.id}>
            <TableCell className="font-medium">{student.name}</TableCell>
            <TableCell className="font-medium">{student.schoolName}</TableCell>
            <TableCell>{student.class}</TableCell>
            <TableCell>{student.admissionDate.toLocaleDateString()}</TableCell>
            <TableCell className="text-right">{student.phoneNumber}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}
