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
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="JULOG" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content="JULOG"
        /> <meta
          property="og:title"
          content="JULOG"
        />
        <meta property="og:description" content="블로그 놀러와 ~" />
        <meta property="og:image" content="/images/png/Kkobi.JPG" />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col items-center ">
          <div className="w-[50%] flex flex-col items-center  lg:w-[80%] sm:w-[100%]  ">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
