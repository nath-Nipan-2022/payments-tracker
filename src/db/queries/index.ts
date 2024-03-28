import { db } from "..";

export type StudentWithData = Awaited<ReturnType<typeof fetchStudents>>[number];

export function fetchStudents(userId: string, fetchRecent: boolean = false) {
  const query = {
    where: { userId },
    include: {
      user: { select: { name: true } },
      payments: {
        where: {
          payingMonth: new Date().toLocaleString("default", { month: "long" }),
        },
      },
    },
  };

  if (fetchRecent) {
    return db.student.findMany({
      ...query,
      orderBy: { admissionDate: "desc" },
      take: 10,
    });
  } else {
    return db.student.findMany(query);
  }
}

export function fetchStudentWithPayments(studentId: string, userId: string) {
  return db.student.findFirst({
    where: { id: parseInt(studentId), userId },
    include: {
      payments: true,
    },
  });
}
