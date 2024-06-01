'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ProgressBar
          height="4px"
          color="#f59e0b"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </body>
    </html>
  );
}
