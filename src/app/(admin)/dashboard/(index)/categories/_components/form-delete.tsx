"use client";

import { Trash } from "lucide-react";
import type { ActionResult } from "next/dist/server/app-render/types";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { deleteCategory } from "../lib/actions";
import { Button } from "@/components/ui/button";

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
  const deleteCategoryWithId = (_: unknown, formData: FormData) => deleteCategory(_, formData, id);

  const [_state, formAction] = useActionState(deleteCategoryWithId, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <SubmitButton />
    </form>
  );
}
