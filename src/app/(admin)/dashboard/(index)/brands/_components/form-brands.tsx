"use client";

import type { Brand } from "@prisma/client";
import { AlertCircleIcon, SquareChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getImageUrl } from "@/lib/local-storage";
import type { ActionResult } from "@/type";
import { postBrand, updateBrandWithId } from "../lib/actions";

const initialState: ActionResult = {
  error: "",
};

interface FormBrandsProps {
  type?: "ADD" | "EDIT";
  data?: Brand | null;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Loading" : "Save Brand"}
    </Button>
  );
}

export default function FormBrands({ data, type }: FormBrandsProps) {
  const updateWithId = (_: unknown, formData: FormData) => {
    return updateBrandWithId(_, formData, data?.id ?? 0);
  };

  const enhancedFormAction = async (state: ActionResult, formData: FormData) => {
    return type === "ADD" ? postBrand(state, formData) : updateWithId(state, formData);
  };

  const [state, formAction] = useActionState(enhancedFormAction, initialState);

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
          <Link href="/dashboard/brands" className="flex items-center w-fit">
            <SquareChevronLeft className="mr-2" />
            <span className="text-2xl font-bold mb-1">Back</span>
          </Link>
        </div>
        <form action={formAction}>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Brand Details</CardTitle>
              <CardDescription>Add a new brand to organize your products.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-1">
                {state?.error && !isSchemaError && (
                  <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>Brand Operation Failed</AlertTitle>
                    <AlertDescription>
                      <p>There was an error processing your brand request.</p>
                      <ul className="list-inside list-disc text-sm">
                        <li>Check the brand name</li>
                        <li>Ensure the logo is properly uploaded</li>
                        <li>Verify the brand doesn't already exist</li>
                      </ul>
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
                <Label htmlFor={"name"}>Name</Label>
                <Input
                  id={"name"}
                  name="name"
                  placeholder="Enter brand name"
                  defaultValue={data?.name || ""}
                  required
                />
              </div>
              <div className="grid gap-2 pt-4">
                <Label htmlFor={"image"}>Image</Label>
                <Input
                  id={"image"}
                  name="image"
                  type="file"
                  {...(type === "ADD" && { required: true })}
                />
                {data?.logo && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">Current image:</p>
                    <div className="relative w-32 h-32">
                      <Image
                        src={getImageUrl(data.logo, "brands") || "/placeholder-image.png"}
                        alt="Current brand logo"
                        className="object-cover rounded"
                        width={128}
                        height={128}
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-image.png";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-2 pt-3">
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
