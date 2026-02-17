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
  const { user, session } = (await getUser()) as { user: UserRole | null; session: unknown };

  if (!session) {
    return redirect("/dashboard/sign-in");
  }

  if (user && user.role !== "superadmin") {
    return redirect("/dashboard/sign-in");
  }

  return (
    <Sidebar>
      <Header />
      <div className="flex h-screen w-full px-4">{children}</div>
    </Sidebar>
  );
}
