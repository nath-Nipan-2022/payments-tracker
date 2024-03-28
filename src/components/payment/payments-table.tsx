"use client";

import { Payment } from "@prisma/client";

import { deletePayment } from "@/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DeleteButton } from "../delete-button";
import { Badge } from "../ui/badge";

interface PaymentsTableProps {
  payments: Payment[];
  studentId: string;
}

export default function PaymentsTable({
  payments,
  studentId,
}: PaymentsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-nowrap">Paying Month</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map(({ id, payingMonth, paymentDate, paymentAmount }) => {
            const isPaid = paymentDate ? true : false;

            const formattedAmount = new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(paymentAmount);

            const action = deletePayment.bind(null, studentId, `${id}`);

            return (
              <TableRow key={id}>
                <TableCell>{payingMonth}</TableCell>
                <TableCell>
                  <Badge variant={isPaid ? "success" : "pending"}>
                    {isPaid ? "Success" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell>{paymentDate.toLocaleDateString()}</TableCell>
                <TableCell className="text-right font-medium">
                  {formattedAmount}
                </TableCell>
                <TableCell className="text-right">
                  <form action={action}>
                    <DeleteButton />
                  </form>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
