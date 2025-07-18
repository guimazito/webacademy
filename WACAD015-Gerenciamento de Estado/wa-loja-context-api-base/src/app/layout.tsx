import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import BootstrapClient from "./components/BootstrapClient";
import AuthProvider from "./components/State/AuthProvider";
import FavoritosProvider from "./components/State/FavoritosProvider";
import { ReactQueryClientProvider } from "./components/ReactQueryClient/ReactQueryClient";

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
        <ReactQueryClientProvider>
          <AuthProvider>
            <FavoritosProvider>
              <Navbar />
                {children}
              <BootstrapClient />
            </FavoritosProvider>
          </AuthProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}