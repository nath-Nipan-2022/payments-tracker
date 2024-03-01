import { db } from "..";

export type StudentWithData = Awaited<
  ReturnType<typeof fetchStudentsByUserId>
>[number];

export function fetchStudentsByUserId(id: string) {
  return db.student.findMany({
    where: {
      userId: id,
    },
    include: {
      user: { select: { name: true } },
      _count: { select: { payments: true } },
    },
  });
}

export function fetchRecentStudents(userId: string) {
  return db.student.findMany({
    where: { userId },
    orderBy: { admissionDate: "desc" },
    include: {
      user: { select: { name: true } },
      _count: { select: { payments: true } },
    },
    take: 5,
  });
}

export function fetchStudent(id: string, userId: string) {
  return db.student.findFirst({
    where: { id: parseInt(id), userId },
  });
}

export function fetchPayments(userId: string, studentId: string) {
  return db.payment.findMany({
    where: {
      student: {
        userId: userId,
        id: parseInt(studentId),
      },
    },
  });
}
