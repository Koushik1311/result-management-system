import { NavLinksData } from "@/constants/nav-link";
import Link from "next/link";
import Logo from "../global/Logo";
import { cookies } from "next/headers";

export default function NavBar() {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has("refreshToken");

  return (
    <header className="container flex items-center justify-between py-4">
      {/* Logo or brand name */}
      <Logo />

      {/* Nav links */}
      <ul className="flex items-center justify-center gap-8">
        {NavLinksData.map((link, index) => (
          <li key={index}>
            <Link href={link.uri} className="font-medium hover:text-color1">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* dashboard | account | portal | login/signup */}
      {hasCookie ? (
        <Link
          href="/dashboard/attendance"
          className="bg-violet-600 text-white py-2 px-5 rounded-full hover:bg-violet-500"
        >
          Dashboard
        </Link>
      ) : (
        <Link
          href="/register"
          className="bg-violet-600 text-white py-2 px-5 rounded-full hover:bg-violet-500"
        >
          Sign up
        </Link>
      )}
    </header>
  );
}
