"use client";

import { Trash } from "lucide-react";
import type { ActionResult } from "next/dist/server/app-render/types";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { deleteLocation } from "../lib/actions";

const initialState: ActionResult = {
  error: "",
};

interface FormDeleteProps {
  id: number;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant={"destructive"} size={"sm"} disabled={pending} type="submit">
      <Trash className="w-4 h-4 mr-1" />
      {pending ? "Deleting..." : "Delete"}
    </Button>
  );
}

export default function FormDelete({ id }: FormDeleteProps) {
  const deleteLocationWithId = (_: unknown, formData: FormData) => deleteLocation(_, formData, id);

  const [_state, formAction] = useActionState(deleteLocationWithId, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <SubmitButton />
    </form>
  );
}
