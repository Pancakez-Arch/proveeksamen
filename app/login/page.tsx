"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/dashboard")
      } else {
        setError("Ugyldig e-post eller passord. Prøv igjen.")
      }
    } catch (err) {
      setError("En feil oppstod. Vennligst prøv igjen senere.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Logg inn</h1>
            <p className="text-muted-foreground">Logg inn for å se din leiehistorikk og administrere din konto</p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  E-post
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Passord
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm">
                    Husk meg
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/forgot-password" className="text-primary hover:underline">
                    Glemt passord?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Logger inn...
                  </>
                ) : (
                  "Logg inn"
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p>
                Har du ikke en konto?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Registrer deg
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>For demonstrasjonsformål, bruk hvilket som helst e-postadresse med passordet "password"</p>
          </div>
        </div>
      </div>
    </main>
  )
}
