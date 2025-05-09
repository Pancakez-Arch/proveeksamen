import Services from '@/app/components/Services'
import Partners from '@/app/components/Partners'
import Approach from '@/app/components/Approach'
import Works from '@/app/components/Works'
import Hero from './components/Hero'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Partners />
      <Services />
      <Approach />
      <Works />
    </main>
  )
}