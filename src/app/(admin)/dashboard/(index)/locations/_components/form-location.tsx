"use client";

import type { Location } from "@prisma/client";
import { AlertCircleIcon, SquareChevronLeft } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionResult } from "@/type";
import { postLocation, updateLocation } from "../lib/actions";

const initialState: ActionResult = {
  error: "",
};

interface FormLocationProps {
  type?: "ADD" | "EDIT";
  data?: Location | null;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Loading" : "Save Location"}
    </Button>
  );
}

export default function FormLocation({ data = null, type = "ADD" }: FormLocationProps) {
  const updateLocationWithId = (_: unknown, formData: FormData) =>
    updateLocation(_, formData, data?.id);

  const [state, formAction] = useActionState(
    type === "ADD" ? postLocation : updateLocationWithId,
    initialState
  );

  const isSchemaError =
    state?.error &&
    (state.error.includes("required") ||
      state.error.includes("min") ||
      state.error.includes("max") ||
      state.error.includes("invalid"));

  return (
    <div className="flex justify-center w-full my-5">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-5">
          <Link href="/dashboard/locations" className="flex items-center w-fit">
            <SquareChevronLeft className="mr-2" />
            <span className="text-2xl font-bold mb-1">Back</span>
          </Link>
        </div>
        <form action={formAction}>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Location Details</CardTitle>
              <CardDescription>Add a new location to organize your products.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-3">
                {state?.error && !isSchemaError && (
                  <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      <p>There was an error processing your request.</p>
                    </AlertDescription>
                  </Alert>
                )}
                {state?.error && isSchemaError && (
                  <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{state?.error}</AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter location name"
                  defaultValue={data?.name}
                  required
                />
              </div>
              <div className="flex space-x-1 mt-6">
                <Button type="submit" variant="outline">
                  Discard
                </Button>
                <SubmitButton />
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
