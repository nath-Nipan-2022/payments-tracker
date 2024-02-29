import { Payment } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface PaymentsTableProps {
  payments: Payment[];
}

export default function PaymentsTable({ payments }: PaymentsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead className="text-nowrap">Paying Month</TableHead>
          <TableHead>Payment Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => {
          const paymentDate = payment.paymentDate.toLocaleDateString();

          return (
            <TableRow key={payment.id}>
              <TableCell>{paymentDate ? "Paid" : "Unpaid"}</TableCell>
              <TableCell>{payment.payingMonth}</TableCell>
              <TableCell>{paymentDate}</TableCell>
              <TableCell className="text-right">
                {payment.paymentAmount}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
