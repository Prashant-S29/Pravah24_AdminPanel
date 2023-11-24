import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import FOOTER from "@/component/footer";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Panel | Pravah",
  description: "Admin Panel of SKIT Pravah 2024",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {children}
        <FOOTER />
      </body>
    </html>
  );
}
