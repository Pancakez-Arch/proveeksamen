"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, BookOpen, User } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { useAuth } from "@/contexts/auth-context"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth()

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">TechRent</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-muted-foreground hover:text-foreground font-medium">
              Home
            </Link>
            <Link href="/employees" className="text-muted-foreground hover:text-foreground font-medium">
              Employees
            </Link>
            <Link href="/equipment" className="text-muted-foreground hover:text-foreground font-medium">
              Equipment
            </Link>
            <div className="relative group">
              <button className="text-muted-foreground hover:text-foreground font-medium flex items-center gap-1">
                <BookOpen className="h-4 w-4" /> Guides
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-card rounded-md shadow-lg border border-border overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link href="/guides/ssh-keys" className="block px-4 py-2 text-sm hover:bg-accent">
                  SSH Key Generation
                </Link>
                <Link href="/guides/production-deployment" className="block px-4 py-2 text-sm hover:bg-accent">
                  Production Deployment
                </Link>
              </div>
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/contact" className="text-muted-foreground hover:text-foreground font-medium">
              Contact
            </Link>
            {user ? (
              <Link
                href="/dashboard"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1"
              >
                <User className="h-4 w-4" /> Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="border border-input px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            {user && (
              <Link href="/dashboard" className="text-foreground">
                <User className="h-5 w-5" />
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block text-muted-foreground hover:text-foreground font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/employees"
              className="block text-muted-foreground hover:text-foreground font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Employees
            </Link>
            <Link
              href="/equipment"
              className="block text-muted-foreground hover:text-foreground font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Equipment
            </Link>
            <div className="py-1 border-t border-border">
              <p className="text-xs uppercase text-muted-foreground font-semibold mb-2 mt-2">Guides</p>
              <Link
                href="/guides/ssh-keys"
                className="block text-muted-foreground hover:text-foreground pl-2 py-1 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                SSH Key Generation
              </Link>
              <Link
                href="/guides/production-deployment"
                className="block text-muted-foreground hover:text-foreground pl-2 py-1 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Production Deployment
              </Link>
            </div>
            <Link
              href="/contact"
              className="block text-muted-foreground hover:text-foreground font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              {user ? (
                <Link
                  href="/dashboard"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium text-center hover:bg-primary/90 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="border border-input px-4 py-2 rounded-md text-sm font-medium text-center hover:bg-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium text-center hover:bg-primary/90 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
