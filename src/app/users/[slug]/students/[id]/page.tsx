import MakePaymentForm from "@/components/payment/make-payment-form";
import PaymentsTable from "@/components/payment/payments-table";
import RemoveStudentProfile from "@/components/student/remove-student-profile";
import StudentShow from "@/components/student/student-show";
import { UpdateStudentProfile } from "@/components/student/update-student-profile";

import { fetchPayments, fetchStudent } from "@/db/queries";
import { notFound } from "next/navigation";

interface StudentPageParams {
  params: {
    slug: string;
    id: string;
  };
}

export default async function StudentPage({ params }: StudentPageParams) {
  const student = await fetchStudent(params.id, params.slug);

  if (!student) {
    return notFound();
  }

  const payments = await fetchPayments(params.slug, params.id);

  return (
    <main className="min-h-screen">
      <div className="flex py-10 px-6 lg:px-24 items-center justify-between gap-10 border-b">
        <h2 className="text-3xl font-bold text-slate-800">{student.name}</h2>
        <UpdateStudentProfile student={student} />
      </div>

      <div className="px-6 lg:px-24 pb-24">
        <section className="py-10">
          <h3 className="pb-10 text-2xl font-semibold text-slate-800">
            Profile Information
          </h3>
          <StudentShow student={student} />
        </section>

        <section className="py-10">
          <div className="flex items-center justify-between gap-10">
            <h3 className="text-2xl font-semibold text-slate-800">
              Payment Details
            </h3>
            <MakePaymentForm studentId={student.id.toString()} />
          </div>
          <p className="text-gray-500 mt-3">
            This includes all the information about payments.
          </p>

          {payments.length < 1 ? (
            <h4 className="py-10 text-center text-lg font-semibold text-gray-600">
              Student has not started any payments yet
            </h4>
          ) : (
            <div className="py-10">
              <PaymentsTable payments={payments} studentId={params.id} />
            </div>
          )}
        </section>

        <section className="flex flex-wrap justify-between gap-10 py-10 items-center px-10 border rounded-xl border-red-400">
          <div>
            <h3 className="text-2xl font-semibold text-slate-800">
              Delete this profile
            </h3>
            <p className="text-gray-500 mt-4 max-w-[35ch]">
              The profile will be permanently deleted. This action is
              irreversible and can not be undone.
            </p>
          </div>

          <RemoveStudentProfile id={params.id} />
        </section>
      </div>
    </main>
  );
}
