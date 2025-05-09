import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SSH Nøkkelgenerering Guide | TechRent",
  description: "Steg-for-steg guide for å generere SSH nøkkelpar for Ubuntu server",
}

export default function SSHKeyGuidePage() {
  return (
    <main className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Steg-for-steg guide: Generere SSH nøkkelpar for Ubuntu server</h1>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="lead">
              SSH-nøkler gir en sikker måte å logge på en server uten å bruke passord. Denne guiden viser deg hvordan du
              genererer et SSH-nøkkelpar og konfigurerer det for bruk med en Ubuntu-server.
            </p>

            <h2>Hva er SSH-nøkler?</h2>
            <p>
              SSH-nøkler er et par med kryptografiske nøkler som kan brukes til å autentisere til en SSH-server i stedet
              for å bruke passord. De består av en privat nøkkel (som du beholder på din maskin) og en offentlig nøkkel
              (som du legger til på serveren).
            </p>

            <div className="bg-muted p-4 rounded-lg my-6">
              <h3 className="text-lg font-medium mb-2">Fordeler med SSH-nøkler</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Mer sikker enn passordautentisering</li>
                <li>Eliminerer behovet for å skrive inn passord hver gang</li>
                <li>Reduserer risikoen for brute force-angrep</li>
                <li>Gir bedre kontroll over hvem som har tilgang til serveren</li>
              </ul>
            </div>

            <h2>Steg 1: Sjekk om du allerede har SSH-nøkler</h2>
            <p>Før du genererer nye nøkler, bør du sjekke om du allerede har eksisterende nøkler:</p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>ls -la ~/.ssh</code>
            </pre>
            <p>
              Se etter filer som heter <code>id_rsa</code> (privat nøkkel) og <code>id_rsa.pub</code> (offentlig nøkkel)
              eller <code>id_ed25519</code> og <code>id_ed25519.pub</code> for nyere nøkkeltyper.
            </p>

            <h2>Steg 2: Generer et nytt SSH-nøkkelpar</h2>
            <p>Hvis du ikke har eksisterende nøkler eller ønsker å lage nye, bruk følgende kommando:</p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>ssh-keygen -t ed25519 -C "din_epost@eksempel.no"</code>
            </pre>
            <p>
              Erstatt "din_epost@eksempel.no" med din egen e-postadresse. Dette blir brukt som en etikett for nøkkelen.
            </p>
            <p>For eldre systemer som ikke støtter ED25519-algoritmen, kan du bruke RSA:</p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>ssh-keygen -t rsa -b 4096 -C "din_epost@eksempel.no"</code>
            </pre>

            <h2>Steg 3: Angi filplassering og passord</h2>
            <p>Etter å ha kjørt kommandoen, vil du bli bedt om å angi hvor nøklene skal lagres:</p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>Enter file in which to save the key (/home/brukernavn/.ssh/id_ed25519):</code>
            </pre>
            <p>Trykk Enter for å akseptere standardplasseringen, eller angi en annen plassering hvis du ønsker det.</p>
            <p>Deretter vil du bli bedt om å angi et passord for nøkkelen:</p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>Enter passphrase (empty for no passphrase):</code>
            </pre>
            <p>
              Det anbefales å bruke et sterkt passord for å beskytte nøkkelen din. Dette passordet vil bli brukt hver
              gang du bruker nøkkelen.
            </p>

            <h2>Steg 4: Start SSH-agenten</h2>
            <p>SSH-agenten lar deg lagre passordet ditt slik at du ikke trenger å skrive det inn hver gang:</p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>eval "$(ssh-agent -s)"</code>
            </pre>
            <p>Legg til din private nøkkel til agenten:</p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>ssh-add ~/.ssh/id_ed25519</code>
            </pre>
            <p>Hvis du brukte en annen filplassering eller nøkkeltype, juster kommandoen tilsvarende.</p>

            <h2>Steg 5: Kopier den offentlige nøkkelen til Ubuntu-serveren</h2>
            <p>Nå må du legge til den offentlige nøkkelen på serveren. Først, vis og kopier nøkkelen:</p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>cat ~/.ssh/id_ed25519.pub</code>
            </pre>
            <p>Kopier hele utdataen, som starter med "ssh-ed25519" og slutter med din e-postadresse.</p>
            <p>Deretter, logg på serveren med ditt eksisterende passord:</p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>ssh brukernavn@server-ip</code>
            </pre>
            <p>
              På serveren, opprett eller åpne filen <code>~/.ssh/authorized_keys</code>:
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>mkdir -p ~/.ssh chmod 700 ~/.ssh nano ~/.ssh/authorized_keys</code>
            </pre>
            <p>Lim inn den offentlige nøkkelen i denne filen, lagre og avslutt (i nano: Ctrl+O, Enter, Ctrl+X).</p>
            <p>Sett riktige tillatelser på filen:</p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>chmod 600 ~/.ssh/authorized_keys</code>
            </pre>

            <h2>Steg 6: Test SSH-tilkoblingen</h2>
            <p>Logg av serveren og prøv å logge på igjen med SSH-nøkkelen:</p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>ssh brukernavn@server-ip</code>
            </pre>
            <p>
              Hvis du har satt opp alt riktig, skal du nå kunne logge på uten å skrive inn serverpassordet (men du kan
              bli bedt om å skrive inn passordet for SSH-nøkkelen hvis du satte et).
            </p>

            <h2>Steg 7: Deaktiver passordautentisering (valgfritt, men anbefalt)</h2>
            <p>
              For ekstra sikkerhet kan du deaktivere passordautentisering på serveren slik at bare SSH-nøkler kan
              brukes:
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>sudo nano /etc/ssh/sshd_config</code>
            </pre>
            <p>Finn og endre følgende linjer (eller legg dem til hvis de ikke finnes):</p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>PasswordAuthentication no ChallengeResponseAuthentication no UsePAM no</code>
            </pre>
            <p>Lagre filen og start SSH-tjenesten på nytt:</p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>sudo systemctl restart sshd</code>
            </pre>
            <p>
              <strong>Viktig:</strong> Ikke logg av den nåværende SSH-økten før du har bekreftet at du kan logge på med
              den nye nøkkelen i en annen økt!
            </p>

            <h2>Feilsøking</h2>
            <div className="bg-muted p-4 rounded-lg my-6">
              <h3 className="text-lg font-medium mb-2">Vanlige problemer</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Tillatelser for strenge eller for løse:</strong> SSH er veldig nøye med filrettigheter. Sørg
                  for at <code>~/.ssh</code> har 700 (drwx------) og <code>~/.ssh/authorized_keys</code> har 600
                  (-rw-------).
                </li>
                <li>
                  <strong>SSH-agent kjører ikke:</strong> Kjør <code>eval "$(ssh-agent -s)"</code> for å starte agenten.
                </li>
                <li>
                  <strong>Feil nøkkelformat:</strong> Sørg for at du kopierer hele den offentlige nøkkelen uten ekstra
                  mellomrom eller linjeskift.
                </li>
              </ul>
            </div>

            <h2>Konklusjon</h2>
            <p>
              Du har nå generert et SSH-nøkkelpar og konfigurert det for bruk med en Ubuntu-server. Dette gir en sikrere
              og mer praktisk måte å logge på serveren din på, uten å måtte huske og skrive inn passord hver gang.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
