import { signIn } from "@/actions";
import { auth } from "@/auth";
import StudentsTable from "@/components/student/students-table";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { fetchStudentsByUserId } from "@/db/queries";
import { paths } from "@/paths";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  const students = await fetchStudentsByUserId(user?.id || "");
  const recentStudents = students.filter(
    (student) => new Date().getMonth() - student.admissionDate.getMonth() <= 2
  );

  return (
    <main className="flex min-h-screen flex-col p-24">
      <article className="py-10">
        <h1 className="text-4xl md:text-7xl text-teal-800 font-bold lg:leading-none">
          Welcome <span className="text-blue-600">{user?.name}</span>, Track
          students payments details in a sec.
        </h1>
        <p className="text-gray-500 mt-8 text-lg">
          No need to wait and write down in notebook...
        </p>
        <div className="mt-4 flex gap-4">
          <Button variant="secondary">See Demo!</Button>
          {user?.id ? (
            <Button asChild>
              <Link href={paths.newStudent(user?.id)}>Add New Student</Link>
            </Button>
          ) : (
            <Button asChild onClick={() => signIn()}>
              Add New Student
            </Button>
          )}
        </div>
      </article>

      <article className="mt-10">
        <div className="flex justify-between">
          <h2 className="text-2xl mb-4 font-medium text-teal-600">
            Recent Students
          </h2>

          <Button variant="outline">
            <Link href={paths.showAllStudents(`${user?.id}`)}>View All</Link>
          </Button>
        </div>
        <StudentsTable students={recentStudents} />
      </article>
    </main>
  );
}
