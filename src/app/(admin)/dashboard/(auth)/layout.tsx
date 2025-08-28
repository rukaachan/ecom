import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Only check auth on the server
  if (typeof window === "undefined") {
    const { session, user } = await getUser();

    if (session && user && user.role === "superadmin") {
      return redirect("/dashboard");
    }
  }

  return <div className="flex min-h-screen w-full items-center justify-center">{children}</div>;
}
