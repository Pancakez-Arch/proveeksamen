import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Personvernerklæring | TechRent",
  description: "Personvernerklæring og informasjon om cookies for TechRent",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Personvernerklæring</h1>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="lead">
              Denne personvernerklæringen forklarer hvordan TechRent samler inn, bruker og beskytter personopplysninger
              når du bruker nettstedet vårt og tjenestene våre.
            </p>

            <h2>Informasjon vi samler inn</h2>
            <p>Vi kan samle inn følgende typer informasjon:</p>
            <ul>
              <li>
                Personopplysninger som navn, e-postadresse, telefonnummer og adresse når du registrerer deg eller leier
                utstyr
              </li>
              <li>Betalingsinformasjon når du gjennomfører en transaksjon</li>
              <li>Informasjon om enheten din, inkludert IP-adresse, nettlesertype og operativsystem</li>
              <li>Informasjonskapsler (cookies) og lignende sporingsteknologier</li>
            </ul>

            <h2>Hvordan vi bruker informasjonen</h2>
            <p>Vi bruker informasjonen vi samler inn til følgende formål:</p>
            <ul>
              <li>For å levere og administrere tjenestene våre</li>
              <li>For å behandle bestillinger og betalinger</li>
              <li>For å kommunisere med deg om bestillinger, produkter og tjenester</li>
              <li>For å forbedre nettstedet og brukeropplevelsen</li>
              <li>For å sende deg markedsføring og promotering hvis du har samtykket til det</li>
              <li>For å overholde juridiske forpliktelser</li>
            </ul>

            <h2>Informasjonskapsler (cookies)</h2>
            <p>
              Nettstedet vårt bruker informasjonskapsler for å forbedre brukeropplevelsen. Informasjonskapsler er små
              tekstfiler som lagres på enheten din når du besøker nettstedet vårt.
            </p>
            <p>Vi bruker følgende typer informasjonskapsler:</p>
            <ul>
              <li>
                <strong>Nødvendige cookies:</strong> Disse er nødvendige for at nettstedet skal fungere og kan ikke
                deaktiveres.
              </li>
              <li>
                <strong>Preferansecookies:</strong> Disse gjør det mulig for nettstedet å huske valg du har gjort og gi
                forbedret funksjonalitet.
              </li>
              <li>
                <strong>Statistikkcookies:</strong> Disse hjelper oss å forstå hvordan besøkende bruker nettstedet ved å
                samle inn anonym informasjon.
              </li>
              <li>
                <strong>Markedsføringscookies:</strong> Disse brukes til å spore besøkende på tvers av nettsteder for å
                vise relevante annonser.
              </li>
            </ul>
            <p>
              Du kan kontrollere og administrere informasjonskapsler i nettleseren din. Vær oppmerksom på at
              deaktivering av informasjonskapsler kan påvirke funksjonaliteten på nettstedet.
            </p>

            <h2>Deling av informasjon</h2>
            <p>Vi deler ikke personopplysningene dine med tredjeparter, unntatt i følgende tilfeller:</p>
            <ul>
              <li>Med tjenesteleverandører som hjelper oss med å drive nettstedet og levere tjenester</li>
              <li>Når det er nødvendig for å overholde loven eller beskytte våre rettigheter</li>
              <li>Med ditt uttrykkelige samtykke</li>
            </ul>

            <h2>Datalagring og sikkerhet</h2>
            <p>
              Vi oppbevarer personopplysningene dine så lenge det er nødvendig for å oppfylle formålene beskrevet i
              denne personvernerklæringen, med mindre en lengre oppbevaringsperiode er påkrevd eller tillatt ved lov.
            </p>
            <p>
              Vi implementerer passende tekniske og organisatoriske tiltak for å beskytte personopplysningene dine mot
              uautorisert tilgang, tap eller skade.
            </p>

            <h2>Dine rettigheter</h2>
            <p>I henhold til GDPR har du følgende rettigheter:</p>
            <ul>
              <li>Rett til innsyn i personopplysningene vi har om deg</li>
              <li>Rett til å korrigere unøyaktige personopplysninger</li>
              <li>Rett til å slette personopplysningene dine under visse omstendigheter</li>
              <li>Rett til å begrense behandlingen av personopplysningene dine</li>
              <li>Rett til dataportabilitet</li>
              <li>Rett til å protestere mot behandling av personopplysningene dine</li>
            </ul>
            <p>For å utøve disse rettighetene, vennligst kontakt oss på info@techrent.com.</p>

            <h2>Endringer i personvernerklæringen</h2>
            <p>
              Vi kan oppdatere denne personvernerklæringen fra tid til annen. Vi vil varsle deg om vesentlige endringer
              ved å publisere den nye personvernerklæringen på denne siden.
            </p>

            <h2>Kontakt oss</h2>
            <p>Hvis du har spørsmål om denne personvernerklæringen, vennligst kontakt oss på:</p>
            <p>
              E-post: info@techrent.com
              <br />
              Telefon: +47 123 45 678
              <br />
              Adresse: Tech Street 123, Oslo
            </p>

            <p className="text-sm text-muted-foreground mt-8">Sist oppdatert: 9. mai 2025</p>
          </div>
        </div>
      </div>
    </main>
  )
}
