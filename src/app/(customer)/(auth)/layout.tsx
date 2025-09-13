import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../../globalsLanding.css";

const _poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "E-Commerce Admin Dashboard",
  description: "Professional admin dashboard for managing e-commerce operations",
};

export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
