import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './global.css';
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "J-U-L-O-G",
  description: "라이프 발자국 남기기",
  icons: {
    icon: "/images/png/35658-8-rap.png"
  },
  openGraph: {
    type: "website",
    url: "https://julog.site",
    title: "J-U-L-O-G",
    description: "라이프 발자국 남기기",
    images: "/images/png/Kkobi.JPG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col items-center">
          <div className="w-full flex flex-col items-center ">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
