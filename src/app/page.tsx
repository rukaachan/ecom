import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

export default async function Home() {
  const { session } = await getUser();

  if (session) {
    return redirect("/dashboard");
  }

  return redirect("/sign-in");
}
