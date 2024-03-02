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
import { Checkbox } from "../ui/checkbox";
import { DeleteButton } from "../delete-button";

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
            <TableHead>Status</TableHead>
            <TableHead className="text-nowrap">Paying Month</TableHead>
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
                <TableCell>
                  {
                    <div className="flex items-center gap-3 flex-wrap">
                      <Checkbox
                        checked={isPaid}
                        aria-label="Payment Status"
                        className="cursor-default"
                      />
                      {isPaid ? "Success" : "Pending"}
                    </div>
                  }
                </TableCell>
                <TableCell>{payingMonth}</TableCell>
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
