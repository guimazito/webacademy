"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/cadastro") return null;

  return (
    <nav className="navbar navbar-expand-md bg-light border-bottom border-body sticky-top">
      <div className="container-fluid">
          <Link className="navbar-brand" href="/produtos">
            Loja WA
          </Link>
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
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
              <Link className="nav-link" href="/produtos">
                  Início
              </Link>
              </li>
              <li className="nav-item">
              <a className="nav-link" href="/favoritos">
                  Favoritos
              </a>
              </li>
              <li className="nav-item">
              <a className="nav-link" href="/carrinho">
                  Carrinho
              </a>
              </li>
          </ul>

          <button
            className="btn btn-dark"
            onClick={() => router.push("/login")}
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}