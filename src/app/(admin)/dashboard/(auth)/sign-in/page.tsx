import ForrmSignIn from './_components/form';
export default function LoginForm() {
  return (
    <main className="w-full h-screen overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm ">
        <ForrmSignIn />
      </div>
    </main>
  );
}
