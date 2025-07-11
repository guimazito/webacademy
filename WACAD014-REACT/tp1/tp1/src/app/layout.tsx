import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import BootstrapClient from "./components/BootstrapClient/BootstrapClient";
import { ReactQueryClientProvider } from "./components/ReactQueryClient/ReactQueryClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ReactQueryClientProvider>
          <Navbar />
          {children}
          <BootstrapClient />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}

/*
Este é uma server component, não possui o 'use client' no início do arquivo.
Layout é uma interface de usuário compartilhada entre todas as páginas.
*/
