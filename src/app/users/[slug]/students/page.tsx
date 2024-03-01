import StudentsTable from "@/components/student/students-table";
import { Button } from "@/components/ui/button";
import { fetchStudentsByUserId } from "@/db/queries";
import { paths } from "@/paths";
import Link from "next/link";

export default async function StudentsShowPage({
  params,
}: {
  params: { slug: string };
}) {
  const students = await fetchStudentsByUserId(params.slug);
  return (
    <main className="flex min-h-screen flex-col px-24">
      <article className="pb-10">
        <div className="flex py-10 items-center justify-between">
          <h2 className="text-2xl font-medium text-teal-700">All Students</h2>
          <Button asChild>
            <Link href={paths.newStudent(params.slug)}>Add New Student</Link>
          </Button>
        </div>
        <StudentsTable students={students} />
      </article>
    </main>
  );
}
