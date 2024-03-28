import StudentsTable from "@/components/student/students-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchStudents } from "@/db/queries";
import { paths } from "@/paths";
import Link from "next/link";

export default async function StudentsShowPage({
  params,
}: {
  params: { slug: string };
}) {
  const students = await fetchStudents(params.slug);
  return (
    <main className="flex min-h-screen flex-col px-6 lg:px-24">
      <article className="pb-10">
        <div className="flex pt-10 pb-6 items-center justify-between">
          <h2 className="text-lg lg:text-2xl font-medium text-teal-600">
            All Students
          </h2>
          <Button asChild>
            <Link href={paths.newStudent(params.slug)}>Add New Student</Link>
          </Button>
        </div>
        <StudentsTable students={students} />
      </article>
    </main>
  );
}
