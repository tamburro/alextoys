import type { Metadata } from "next";
import { Bricolage_Grotesque, Nunito } from "next/font/google";
import { StoreProvider } from "@/lib/store-context";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Alex Toys! — Um mundo de brinquedos",
  description:
    "Brinquedos clássicos e modernos pra você mergulhar na nostalgia e dar upgrade na sua coleção.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
