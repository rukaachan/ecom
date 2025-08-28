"use client";

import { AlertCircle } from "lucide-react";
import * as React from "react";
import { useFormState } from "react-dom";
import { authenticate } from "@/app/(admin)/dashboard/(auth)/sign-in/_actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionResult } from "@/type";

const _initialState: ActionResult = {
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Loading..." : "Sign In"}
    </Button>
  );
}

export function Form() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const emailId = React.useId();
  const passwordId = React.useId();

  return (
    <form action={dispatch}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor={emailId}>Email</Label>
              <Input id={emailId} type="email" name="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor={passwordId}>Password</Label>
                <a
                  href="/dashboard/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id={passwordId} type="password" name="password" required />
            </div>
            <SubmitButton />
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/dashboard/sign-up" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {errorMessage && (
        <Alert variant="destructive" className="mt-4 max-w-sm mx-auto">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
