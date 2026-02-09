"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { usePasswordVisibility } from "@/hooks/use-password-visibility";
import type { ActionResult } from "@/type";
import { signin } from "../lib/actions";

const initialFormState: ActionResult = {
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold text-white"
    >
      {pending ? "Loading..." : "Sign In to My Account"}
    </button>
  );
}

export function SignInForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(signin, initialFormState);
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

  useEffect(() => {
    if (state.success) {
      router.push("/");
    }
  }, [state.success, router]);

  return (
    <form
      action={formAction}
      className="w-[500px] bg-white p-[50px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5]"
    >
      <div className="flex justify-center">
        <Image
          src="/assets/logos/logo-black.svg"
          alt="logo"
          width={150}
          height={60}
          unoptimized={true}
        />
      </div>
      <h1 className="font-bold text-2xl leading-[34px]">Sign In</h1>
      {state.error !== "" && (
        <div className="border border-red-300 text-red-500 p-3 rounded">
          <h4 className="font-semibold">Error</h4>
          <p className="text-sm">{state.error}</p>
        </div>
      )}
      {state.success && (
        <div className="border border-green-300 text-green-500 p-3 rounded">
          <h4 className="font-semibold">Success</h4>
          <p className="text-sm">Redirecting to dashboard...</p>
        </div>
      )}
      <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
        <div className="flex shrink-0">
          <Image src="/assets/icons/sms.svg" alt="icon" width={24} height={24} unoptimized={true} />
        </div>
        <input
          type="email"
          id={"email"}
          name="email"
          className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
          placeholder="Write your email address"
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
          <div className="flex shrink-0">
            <Image
              src="/assets/icons/lock.svg"
              alt="icon"
              width={24}
              height={24}
              unoptimized={true}
            />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            id={"password"}
            name="password"
            className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
            placeholder="Write your password"
          />
          <button
            type="button"
            className="reveal-password flex shrink-0"
            onClick={togglePasswordVisibility}
          >
            <Image
              src={showPassword ? "/assets/icons/eye.svg" : "/assets/icons/lock.svg"}
              alt={showPassword ? "hide password" : "show password"}
              width={24}
              height={24}
              unoptimized={true}
            />
          </button>
        </div>
        <Link
          href="/forgot-password"
          className="text-sm text-[#616369] underline w-fit mr-0 ml-auto"
        >
          Forgot Password
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <SubmitButton />
        <Link
          href="/sign-up"
          className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]"
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
}
