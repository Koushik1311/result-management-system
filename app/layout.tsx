import localFont from "next/font/local";
import "./globals.css";

const monaSans = localFont({
  src: "./fonts/MonaSans.woff2",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monaSans.className} antialiased`}>{children}</body>
    </html>
  );
}
