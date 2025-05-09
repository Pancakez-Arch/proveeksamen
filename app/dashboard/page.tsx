"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Package, Clock, User, LogOut } from "lucide-react"

// Mock rental history data
const rentalHistory = [
  {
    id: "rent-1",
    equipment: "Dell XPS 13",
    startDate: "2023-10-15",
    endDate: "2023-10-20",
    status: "Returned",
    cost: 2500,
  },
  {
    id: "rent-2",
    equipment: "Canon EOS R5",
    startDate: "2023-11-05",
    endDate: "2023-11-10",
    status: "Returned",
    cost: 3200,
  },
  {
    id: "rent-3",
    equipment: "iPad Pro 12.9",
    startDate: "2023-12-01",
    endDate: "2023-12-15",
    status: "Active",
    cost: 4500,
  },
]

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <main className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Mitt Dashboard</h1>
            <p className="text-muted-foreground">Velkommen tilbake, {user.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Logg ut
          </Button>
        </div>

        <Tabs defaultValue="rentals" className="space-y-6">
          <TabsList>
            <TabsTrigger value="rentals" className="flex items-center gap-2">
              <Package className="h-4 w-4" /> Mine Leieavtaler
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Min Profil
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rentals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Leiehistorikk</CardTitle>
                <CardDescription>Oversikt over dine tidligere og aktive leieavtaler</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Utstyr</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fra dato</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Til dato</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Kostnad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rentalHistory.map((rental) => (
                        <tr key={rental.id} className="border-b border-border">
                          <td className="py-3 px-4">{rental.equipment}</td>
                          <td className="py-3 px-4">{rental.startDate}</td>
                          <td className="py-3 px-4">{rental.endDate}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                rental.status === "Active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              }`}
                            >
                              {rental.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">{rental.cost} kr</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" /> Kommende Leieavtaler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rentalHistory
                      .filter((rental) => rental.status === "Active")
                      .map((rental) => (
                        <div key={rental.id} className="flex justify-between items-center border-b border-border pb-3">
                          <div>
                            <p className="font-medium">{rental.equipment}</p>
                            <p className="text-sm text-muted-foreground">
                              {rental.startDate} - {rental.endDate}
                            </p>
                          </div>
                          <span className="text-sm font-medium">{rental.cost} kr</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" /> Nylig Aktivitet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 border-b border-border pb-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Package className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Leieavtale opprettet</p>
                        <p className="text-sm text-muted-foreground">iPad Pro 12.9</p>
                        <p className="text-xs text-muted-foreground">1. desember 2023</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border-b border-border pb-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Package className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Utstyr returnert</p>
                        <p className="text-sm text-muted-foreground">Canon EOS R5</p>
                        <p className="text-xs text-muted-foreground">10. november 2023</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Min Profil</CardTitle>
                <CardDescription>Administrer din kontoinformasjon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Navn</label>
                    <input
                      type="text"
                      value={user.name}
                      readOnly
                      className="w-full bg-muted border border-input rounded-md px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">E-post</label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full bg-muted border border-input rounded-md px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Endre passord</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nåværende passord</label>
                      <input
                        type="password"
                        className="w-full bg-background border border-input rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Nytt passord</label>
                      <input
                        type="password"
                        className="w-full bg-background border border-input rounded-md px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Bekreft nytt passord</label>
                      <input
                        type="password"
                        className="w-full bg-background border border-input rounded-md px-3 py-2"
                      />
                    </div>
                    <Button>Oppdater passord</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
