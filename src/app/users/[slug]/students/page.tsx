import StudentsTable from "@/components/student/students-table";
import { fetchStudentsByUserId } from "@/db/queries";

export default async function StudentsShowPage({
  params,
}: {
  params: { slug: string };
}) {
  const students = await fetchStudentsByUserId(params.slug);
  return (
    <main className="flex min-h-screen flex-col px-24">
      <article className="py-10">
        <h2 className="text-2xl mb-4 font-medium text-teal-600">
          Recent Students
        </h2>

        <StudentsTable students={students} />
      </article>
    </main>
  );
}
