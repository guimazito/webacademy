"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../State/AuthProvider";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { emailUsuario, logout } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/cadastro") return null;

  return (
    <nav className="navbar navbar-expand-md bg-light border-bottom border-body sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Loja WA
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Abrir menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0 ">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/favoritos">
                Lista de Favoritos
              </Link>
            </li>
          </ul>
          {emailUsuario ? (
            <div className="d-flex align-items-center gap-2">
              <span className="me-2 text-primary">{emailUsuario}</span>
              <button type="button" className="btn btn-secondary" onClick={logout}>
                Sair
              </button>
            </div>
          ) : (
            <Link className="nav-link" href="/login">
              <button type="button" className="btn btn-secondary">
                Entrar
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}