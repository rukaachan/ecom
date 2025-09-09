import { SignUpForm } from "./_components/form-sign-up";

export default function SignUpPage() {
  return (
    <div id="signup" className="bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-col">
      <div className="container max-w-[1130px] mx-auto flex flex-1 items-center justify-center py-5">
        <SignUpForm />
      </div>
    </div>
  );
}
