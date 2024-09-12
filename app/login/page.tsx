import AuthButton from "@/components/global/AuthButton";
import Logo from "@/components/global/Logo";
import Link from "next/link";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <main className="container flex items-center justify-center">
      <Link
        href="/"
        className="fixed top-0 pt-3 left-0 pl-3 lg:pl-6 w-screen bg-white"
      >
        <Logo />
        <div className="border-b mt-3 -ml-6 border-slate-200" />
      </Link>
      <div className="w-[320px] mt-24">
        <p className="text-xl font-semibold mb-6 flex flex-col">
          <span className="text-slate-700">Manage it. Secure it.</span>
          <span className="text-violet-600">Create your Credify account</span>
        </p>

        <form className="flex flex-col gap-1 w-full">
          <label
            htmlFor="email"
            className="text-xs text-slate-500 font-medium mt-3"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email id"
            required
            className="h-9 px-3 text-sm rounded-[6px] border border-slate-200 focus:outline-violet-400"
          />
          <label
            htmlFor="password"
            className="text-xs text-slate-500 font-medium mt-3"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            className="h-9 px-3 text-sm rounded-[6px] border border-slate-200 focus:outline-violet-400"
          />
          <AuthButton
            className="w-full flex items-center justify-center h-9 rounded-[6px] bg-violet-600 hover:bg-violet-500 transition-all duration-150 text-sm font-semibold text-white mt-6"
            // formAction={logIn}
            pendingText="Logging In..."
          >
            Log In
          </AuthButton>
        </form>

        {searchParams.message === "Could not login user" && (
          <p className="text-xs text-center font-medium mt-5 text-red-500">
            {searchParams.message}
          </p>
        )}

        <p className="text-xs text-center mt-6">
          Don&apos;t have an Account?{" "}
          <Link href="/register" className="text-violet-500 font-medium">
            Sign Up Now
          </Link>
        </p>

        <p className="text-xs text-center mt-12 mb-16">
          By continuing, you acknowledge that you understand and agree to the{" "}
          <Link
            href="/terms&conditions"
            className="text-violet-500 font-medium"
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/terms&conditions"
            className="text-violet-500 font-medium"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </main>
  );
}
