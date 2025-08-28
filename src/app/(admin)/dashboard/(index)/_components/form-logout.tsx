"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { Logout } from "@/app/(admin)/dashboard/(index)/lib/actions";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import type { ActionResult } from "@/type";

const initialState: ActionResult & { success?: boolean } = {
  error: "",
  success: false,
};

export function FormLogout() {
  const [state, formAction, isPending] = useActionState(Logout, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      // Redirect to sign-in page after successful logout
      router.push("/dashboard/sign-in");
      router.refresh(); // Refresh the page to ensure the user is logged out
    }
  }, [state.success, router]);

  return (
    <Tooltip>
      <TooltipTrigger asChild className="px-2 py-5">
        <form action={formAction}>
          <button
            type="submit"
            disabled={isPending}
            className="flex h-8 items-center gap-2 rounded-md px-2 text-left text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full"
          >
            <LogOut className="h-4 w-4" />
            <span>{isPending ? "Logging out..." : "Logout"}</span>
          </button>
        </form>
      </TooltipTrigger>
    </Tooltip>
  );
}
