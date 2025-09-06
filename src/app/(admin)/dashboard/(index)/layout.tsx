import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import type { UserRole } from "@/type";
import Header from "./_components/header";
import Sidebar from "./_components/sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Server-side authentication verification for Next.js Server Components
  const { user, session } = (await getUser()) as { session: any; user: UserRole | null };

  if (!session) {
    return redirect("/sign-in");
  }

  if (user && user.role !== "superadmin") {
    return redirect("/sign-in");
  }

  return (
    <Sidebar>
      <Header />
      <div className="flex h-screen w-full px-4">{children}</div>
    </Sidebar>
  );
}
