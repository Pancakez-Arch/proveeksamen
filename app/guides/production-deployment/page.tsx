import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Produksjonsdrifting på Ubuntu Server | TechRent",
  description: "Guide for å kjøre TechRent-nettstedet i produksjonsmodus på en Ubuntu-server",
}

export default function ProductionDeploymentPage() {
  return (
    <main className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Kjøre TechRent-nettstedet i produksjonsmodus på Ubuntu Server</h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="lead">
              Denne guiden viser deg hvordan du setter opp og kjører TechRent-nettstedet i produksjonsmodus på en Ubuntu-server, 
              inkludert oppsett av Nginx som reverse proxy og PM2 for prosesshåndtering.
            </p>

            <div className="bg-muted p-4 rounded-lg my-6">
              <h3 className="text-lg font-medium mb-2">Forutsetninger</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>En Ubuntu-server (20.04 LTS eller nyere)</li>
                <li>Tilgang til serveren via SSH (se vår <Link href="/guides/ssh-keys" className="text-primary hover:underline">SSH-nøkkelguide</Link>)</li>
                <li>Grunnleggende kjennskap til kommandolinjen</li>
                <li>Et domenenavn (valgfritt, men anbefalt for produksjon)</li>
              </ul>
            </div>

            <h2>Steg 1: Oppdater systemet</h2>
            <p>
              Start med å oppdatere pakkelisten og oppgradere eksisterende pakker:
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>sudo apt update
sudo apt upgrade -y</code>
            </pre>

            <h2>Steg 2: Installer nødvendige avhengigheter</h2>
            <p>
              Installer Node.js, npm, og andre nødvendige verktøy:
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs nginx git</code>
            </pre>
            <p>
              Verifiser installasjonen:
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>node -v
npm -v</code>
            </pre>
            <p>
              Installer PM2 globalt (for prosesshåndtering):
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>sudo npm install -g pm2</code>
            </pre>

            <h2>Steg 3: Klon prosjektet fra Git</h2>
            <p>
              Opprett en mappe for applikasjonen og klon prosjektet:
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>mkdir -p /var/www
cd /var/www
git clone https://github.com/din-organisasjon/tech-rental.git
cd tech-rental</code>
            </pre>
            <p>
              Hvis du ikke bruker Git, kan du laste opp filene dine via SCP eller SFTP.
            </p>

            <h2>Steg 4: Konfigurer miljøvariabler</h2>
            <p>
              Opprett en .env.local-fil med nødvendige miljøvariabler:
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>nano .env.local</code>
            </pre>
            <p>
              Legg til følgende variabler (erstatt med dine egne verdier):
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>NEXT_PUBLIC_SANITY_PROJECT_ID=ditt-prosjekt-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=ditt-api-token
NEXT_PUBLIC_BASE_URL=https://ditt-domene.no</code>
            </pre>

            <h2>Steg 5: Bygg applikasjonen</h2>
            <p>
              Installer avhengigheter og bygg applikasjonen for produksjon:
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>npm install
npm run build</code>
            </pre>

            <h2>Steg 6: Start applikasjonen med PM2</h2>
            <p>
              Start applikasjonen i produksjonsmodus med PM2:
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>pm2 start npm --name "tech-rental" -- start</code>
            </pre>
            <p>
              Konfigurer PM2 til å starte automatisk ved omstart:
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>pm2 startup
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $(whoami) --hp $(echo $HOME)
pm2 save</code>
            </pre>

            <h2>Steg 7: Konfigurer Nginx som reverse proxy</h2>
            <p>
              Opprett en Nginx-konfigurasjonsfil for nettstedet:
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>sudo nano /etc/nginx/sites-available/tech-rental</code>
            </pre>
            <p>
              Legg til følgende konfigurasjon (erstatt domenenavnet med ditt eget):
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>server {
    listen 80;\
    server_name ditt-domene.no www.ditt-domene.no;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}</code>
            </pre>
            <p>
              Aktiver konfigurasjonen og start Nginx på nytt:
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>sudo ln -s /etc/nginx/sites-available/tech-rental /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx</code>
            </pre>

            <h2>Steg 8: Konfigurer SSL med Let's Encrypt (anbefalt)</h2>
            <p>
              For sikker HTTPS-tilkobling, installer Certbot og konfigurer SSL:
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d ditt-domene.no -d www.ditt-domene.no</code>
            </pre>
            <p>
              Følg instruksjonene på skjermen for å fullføre SSL-oppsettet.
            </p>

            <h2>Steg 9: Konfigurer brannmur</h2>
            <p>
              Konfigurer UFW (Uncomplicated Firewall) for å tillate HTTP, HTTPS og SSH:
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable</code>
            </pre>

            <h2>Steg 10: Overvåk og administrer applikasjonen</h2>
            <p>
              Bruk PM2 til å overvåke og administrere applikasjonen:
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code># Se status for alle applikasjoner
pm2 status

# Se logger
pm2 logs tech-rental

# Start applikasjonen på nytt
pm2 restart tech-rental

# Stopp applikasjonen
pm2 stop tech-rental

# Start applikasjonen
pm2 start tech-rental</code>
            </pre>

            <h2>Steg 11: Oppdatere applikasjonen</h2>
            <p>
              For å oppdatere applikasjonen med nye endringer:
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto border border-border">
              <code>cd /var/www/tech-rental
git pull
npm install
npm run build
pm2 restart tech-rental</code>
            </pre>

            <h2>Feilsøking</h2>
            <div className="bg-muted p-4 rounded-lg my-6">
              <h3 className="text-lg font-medium mb-2">Vanlige problemer</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Applikasjonen starter ikke:</strong> Sjekk loggene med <code>pm2 logs tech-rental</code> for å identifisere problemet.
                </li>
                <li>
                  <strong>Nginx-feil:</strong> Sjekk Nginx-loggene med <code>sudo tail -f /var/log/nginx/error.log</code>.
                </li>
                <li>
                  <strong>Tilgangsproblemer:</strong> Sørg for at filene har riktige tillatelser med <code>sudo chown -R $(whoami):$(whoami) /var/www/tech-rental</code>.
                </li>
                <li>
                  <strong>Port i bruk:</strong> Hvis port 3000 er i bruk, endre porten i Next.js-konfigurasjonen eller i Nginx-konfigurasjonen.
                </li>
              </ul>
            </div>

            <h2>Konklusjon</h2>
            <p>
              Du har nå satt opp TechRent-nettstedet i produksjonsmodus på en Ubuntu-server med Nginx som reverse proxy og PM2 for prosesshåndtering. 
              Nettstedet er nå tilgjengelig på ditt domenenavn med HTTPS-sikkerhet.
            </p>
            <p>
              For ytterligere forbedringer, vurder å sette opp:
            </p>
            <ul>
              <li>Automatisk sikkerhetskopiering av data</li>
              <li>Overvåkingsverktøy som Prometheus eller Grafana</li>
              <li>CDN for raskere levering av statiske ressurser</li>
              <li>CI/CD-pipeline for automatiserte oppdateringer</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
