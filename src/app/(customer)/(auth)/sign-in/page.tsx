import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignInForm } from "./_components/form-sign-in";

export default function SignInPage() {
  return (
    <div id="signin" className="bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-col">
      <div className="container max-w-[1130px] mx-auto flex flex-1 items-center justify-center py-5">
        <SignInForm />
      </div>
    </div>
  );
}
