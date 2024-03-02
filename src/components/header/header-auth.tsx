"use client";

import { signIn } from "@/actions";
import Profile from "../profile";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { paths } from "@/paths";
import { Github } from "lucide-react";

export function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;
  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <div className="flex items-center gap-2">
        <Button asChild variant="link">
          <Link
            href={paths.showAllStudents(session.data?.user?.id || "")}
            className="font-medium"
          >
            Students
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link href="https://github.com/nath-Nipan-2022">
            <Github className="mr-2 h-4 w-4" />
          </Link>
        </Button>
        <Profile user={session.data?.user} />
      </div>
    );
  } else {
    authContent = (
      <div className="flex gap-4">
        <form action={signIn} className="hidden md:block">
          <Button variant="secondary" type="submit">
            Sign In
          </Button>
        </form>
        <form action={signIn}>
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    );
  }

  return authContent;
}
