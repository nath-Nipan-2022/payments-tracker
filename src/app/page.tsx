import { signIn } from "@/actions";
import { auth } from "@/auth";
import { CreateStudentProfile } from "@/components/student/create-student-profile";
import StudentsTable from "@/components/student/students-table";
import { Button } from "@/components/ui/button";
import { fetchStudents } from "@/db/queries";
import { paths } from "@/paths";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  const hasUserId = user?.id;
  const recentStudents = await fetchStudents(hasUserId || "", true);

  return (
    <main className="flex flex-col px-6 lg:px-24 py-20">
      <article className="pb-10">
        <h1 className="text-3xl md:text-4xl lg:text-7xl text-teal-800 font-bold leading-normal lg:leading-none">
          <span className="text-blue-600">Welcome to EduPurse,</span>
          <br /> Your ultimate payment tracking solution.
        </h1>
        <p className="text-gray-500 mt-2 md:mt-4 md:text-2xl">
          Effortlessly manage and monitor payments
        </p>
        <div className="mt-6">
          {hasUserId ? (
            <CreateStudentProfile />
          ) : (
            <form action={signIn}>
              <Button>Sign in with Google</Button>
            </form>
          )}
        </div>
      </article>

      {hasUserId ? (
        <article className="pt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg lg:text-2xl font-medium text-teal-600">
              Recent Students
            </h2>

            <Button variant="outline">
              <Link href={paths.showAllStudents(`${user?.id}`)}>View All</Link>
            </Button>
          </div>
          <StudentsTable students={recentStudents} />
        </article>
      ) : null}
    </main>
  );
}
