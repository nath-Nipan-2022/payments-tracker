import { signIn } from "@/actions";
import { auth } from "@/auth";
import StudentsTable from "@/components/student/students-table";
import { Button } from "@/components/ui/button";
import { fetchRecentStudents } from "@/db/queries";
import { paths } from "@/paths";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  const recentStudents = await fetchRecentStudents(user?.id || "");

  const hasUserId = user?.id;

  return (
    <main
      className={`flex min-h-dvh flex-col px-6 lg:px-24 pb-24 ${
        !hasUserId ? "items-center justify-center" : ""
      } text-center md:text-left`}
    >
      <article className="py-10">
        <h1 className="text-2xl md:text-4xl lg:text-7xl text-teal-800 font-bold leading-normal lg:leading-none">
          <span className="text-blue-600">Welcome to EduPurse</span> -
          <br className="hidden md:block" /> Your Ultimate Payment Tracking
          Solution.
        </h1>
        <p className="text-gray-500 mt-4 md:text-xl">
          Effortlessly Manage and Monitor Your Student Payments.
        </p>
        <div className="mt-8 flex justify-center md:justify-start">
          {hasUserId ? (
            <Button asChild>
              <Link href={paths.newStudent(hasUserId)}>Add New Student</Link>
            </Button>
          ) : (
            <form action={signIn}>
              <Button>Sign in with Google</Button>
            </form>
          )}
        </div>
      </article>

      {hasUserId ? (
        <article className="mt-10">
          <div className="flex justify-between items-center pb-4">
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
