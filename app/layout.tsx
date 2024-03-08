import { AlertProvider } from "@/global-state/alert/alert.provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../styles/index.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mock SCM App",
  description: "A Mock Supply Chain Management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AlertProvider>
          {children}
        </AlertProvider>
      </body>
    </html>
  );
}
