import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

/*
Este é uma server component, não possui o 'use client' no início do arquivo.
Layout é uma interface de usuário compartilhada entre todas as páginas.
*/
