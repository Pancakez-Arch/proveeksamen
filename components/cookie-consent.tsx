"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem("cookieConsent") === "accepted"
    if (!hasAcceptedCookies) {
      setIsVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t border-border shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">Vi bruker informasjonskapsler (cookies)</h3>
            <p className="text-muted-foreground text-sm">
              Vi bruker cookies for å forbedre din brukeropplevelse, tilby personlig tilpasset innhold og annonser, og
              for å analysere trafikken på nettstedet vårt. Ved å klikke "Godta" samtykker du til vår bruk av cookies
              som beskrevet i vår{" "}
              <Link href="/privacy-policy" className="underline hover:text-primary">
                personvernerklæring
              </Link>
              .
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={() => setIsVisible(false)}>
              Avvis
            </Button>
            <Button size="sm" onClick={acceptCookies}>
              Godta
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
