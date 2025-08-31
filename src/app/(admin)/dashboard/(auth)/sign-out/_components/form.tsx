"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { logout } from "../lib/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Logging out..." : "Logout"}
    </Button>
  );
}

export function LogoutForm() {
  const [, formAction] = useFormState(logout, null);

  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
}
