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
  const { user, session } = (await getUser()) as {
    session: any;
    user: UserRole | null;
  };

  // Debug logging
  console.log("Dashboard auth check:", { user, session });

  if (!session) {
    console.log("No session found, redirecting to sign-in");
    return redirect("/sign-in");
  }

  // Allow both customer and superadmin roles to access the dashboard
  if (user && user.role !== "customer" && user.role !== "superadmin") {
    console.log(
      "User role not authorized for dashboard, redirecting to sign-in. User role:",
      user?.role
    );
    return redirect("/sign-in");
  }

  return (
    <Sidebar>
      <Header />
      <div className="flex h-screen w-full px-4">{children}</div>
    </Sidebar>
  );
}
