import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateNewStudent } from "./create-new-student";

export default function CreateStudentPage() {
  return (
    <main className="grid place-items-center py-10">
      <Card className="w-[350px] bg-white shadow-xl">
        <CardHeader>
          <CardTitle>Create New Student</CardTitle>
          <CardDescription>Add new member in your batch.</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateNewStudent />
        </CardContent>
      </Card>
    </main>
  );
}
