export const paths = {
  newStudent(userSlug: string) {
    return `/users/${userSlug}/students/new`;
  },
  showStudent(userSlug: string, studentId: string) {
    return `/users/${userSlug}/students/${studentId}`;
  },
  showAllStudents(userSlug: string) {
    return `/users/${userSlug}/students`;
  },
};
