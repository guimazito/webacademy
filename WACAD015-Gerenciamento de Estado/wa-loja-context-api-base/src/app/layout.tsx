import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import BootstrapClient from "./components/BootstrapClient";
import AuthProvider from "./components/State/AuthProvider";
import FavoritosProvider from "./components/State/FavoritosProvider";

export const metadata: Metadata = {
  title: "WA Loja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <AuthProvider>
          <FavoritosProvider>
            <Navbar />
              {children}
            <BootstrapClient />
          </FavoritosProvider>
        </AuthProvider>
      </body>
    </html>
  );
}