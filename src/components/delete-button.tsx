import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export const DeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button variant="destructive" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Delete
    </Button>
  );
};
