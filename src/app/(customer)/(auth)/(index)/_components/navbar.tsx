import Image from "next/image";
import Link from "next/link";
import { getUser } from "@/lib/auth";
import type { UserRole } from "@/type";

export default async function Navbar() {
  const { session, user } = await getUser();

  return (
    <nav className="container max-w-[1130px] mx-auto flex items-center justify-between bg-[#0D5CD7] p-5 rounded-3xl">
      <div className="flex shrink-0">
        <Image
          src="/assets/logos/logo.svg"
          alt="logo"
          width={100}
          height={40}
          priority
          unoptimized
        />
      </div>
      <ul className="flex items-center gap-[30px]">
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 font-bold text-[#FFC736]">
          <Link href="/">Shop</Link>
        </li>
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
          <Link href="">Categories</Link>
        </li>
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
          <Link href="">Testimonials</Link>
        </li>
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
          <Link href="">Rewards</Link>
        </li>
      </ul>
      <div className="flex items-center gap-3">
        <Link href="/cart">
          <div className="w-12 h-12 flex shrink-0">
            <Image
              src="/assets/icons/cart.svg"
              alt="cart"
              width={48}
              height={48}
              priority
              unoptimized
            />
          </div>
        </Link>
        {session && (user as UserRole)?.role === "customer" ? (
          <div className="flex items-center gap-3">
            <p className="text-white">Hi, {(user as UserRole)?.name}</p>
            <div className="relative w-12 h-12 shrink-0 rounded-full p-1 border border-[#E5E5E5] overflow-hidden">
              <Image
                src="/assets/photos/p4.png"
                alt="User photo"
                fill
                className="object-cover rounded-full"
                sizes="48px"
                priority
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className="px-5 py-3 bg-white rounded-full font-semibold"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-5 py-3 bg-white rounded-full font-semibold"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
