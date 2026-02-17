import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Server-side authentication verification for Next.js Server Components
  const { session, user } = await getUser();

  // If user is authenticated and is a superadmin, redirect them away from auth pages
  if (session && user && user.role === "superadmin") {
    return redirect("/dashboard");
  }

  return <div className="flex min-h-screen w-full items-center justify-center">{children}</div>;
}
