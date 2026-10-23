"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-lg leading-none">E</span>
            </div>
            <span className="font-black text-xl text-gray-900 tracking-tight">
              Edu<span className="text-emerald-600">Gate</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
              Fonctionnalités
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
              Comment ça marche
            </Link>
            <Link href="#search" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
              Écoles disponibles
            </Link>
            <Link href="#modules" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
              Espaces
            </Link>
            <Link href="#profiles" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
              Pour qui ?
            </Link>
            <Link href="#impact" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
              Impact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-900 transition-colors px-4 py-2"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold bg-emerald-600 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
            >
              S&apos;inscrire
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-emerald-600"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <Link href="#features" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium hover:text-emerald-600">Fonctionnalités</Link>
          <Link href="#how-it-works" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium hover:text-emerald-600">Comment ça marche</Link>
          <Link href="#search" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium hover:text-emerald-600">Écoles disponibles</Link>
          <Link href="#modules" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium hover:text-emerald-600">Espaces</Link>
          <Link href="#profiles" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium hover:text-emerald-600">Pour qui ?</Link>
          <Link href="#impact" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium hover:text-emerald-600">Impact</Link>
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
            <Link href="/login" className="text-center text-emerald-700 font-semibold py-2 border border-emerald-600 rounded-lg">Connexion</Link>
            <Link href="/register" className="text-center bg-emerald-600 text-white font-semibold py-2.5 rounded-lg">S&apos;inscrire</Link>
          </div>
        </div>
      )}
    </nav>
  );
}