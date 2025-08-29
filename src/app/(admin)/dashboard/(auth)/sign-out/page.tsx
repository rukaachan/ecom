import { LogoutForm } from "./_components/form";

export default function SignOutPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <div className="rounded-lg border p-6">
          <h1 className="text-2xl font-bold mb-4">Sign Out</h1>
          <p className="mb-6">Are you sure you want to sign out?</p>
          <LogoutForm />
        </div>
      </div>
    </div>
  );
}