"use client";

import { signIn } from "@/actions";
import Profile from "../profile";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { paths } from "@/paths";

export function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;
  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <div className="flex items-center gap-5">
        <Button asChild variant="link">
          <Link
            href={paths.showAllStudents(session.data?.user?.id || "")}
            className="font-medium"
          >
            Students
          </Link>
        </Button>
        <Profile user={session.data.user} />
      </div>
    );
  } else {
    authContent = (
      <div className="flex gap-4">
        <form action={signIn}>
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
