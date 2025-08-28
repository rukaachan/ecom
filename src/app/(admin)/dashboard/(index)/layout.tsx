import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import Header from "./_components/header";
import Sidebar from "./_components/sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Only check auth on the server
  if (typeof window === "undefined") {
    const { session } = await getUser();

    if (!session) {
      return redirect("/dashboard/sign-in");
    }
  }

  return (
    <Sidebar>
      <Header />
      <div className="flex h-screen w-full px-4">{children}</div>
    </Sidebar>
  );
}
