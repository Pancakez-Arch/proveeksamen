export default function ProductionDeploymentGuide() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Guide: Deploye nettsiden i produksjon
        </h1>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Forberedelser
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  sudo apt update && sudo apt upgrade -y
                </code>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Oppdater systemet først for å sikre at alt er oppdatert.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Installer Node.js og npm
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -<br />
                  sudo apt install -y nodejs
                </code>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Installer Node.js og npm for å kjøre Next.js-applikasjonen.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Installer PM2
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  sudo npm install -g pm2
                </code>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                PM2 vil hjelpe oss med å kjøre applikasjonen i bakgrunnen og automatisk starte den på nytt ved feil.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Klon prosjektet
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  cd /var/www<br />
                  sudo git clone [ditt-repo-url] proveeksamen<br />
                  cd proveeksamen
                </code>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Klon prosjektet til en passende mappe.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Installer avhengigheter og bygg prosjektet
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  npm install<br />
                  npm run build
                </code>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Installer alle nødvendige pakker og bygg prosjektet for produksjon.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Konfigurer miljøvariabler
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  nano .env
                </code>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Opprett en .env-fil med følgende variabler:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  MONGODB_URI=din_mongodb_uri<br />
                  NEXTAUTH_URL=http://din_domene.no<br />
                  NEXTAUTH_SECRET=din_hemmelige_nøkkel
                </code>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Start applikasjonen med PM2
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  pm2 start npm --name "proveeksamen" -- start<br />
                  pm2 save<br />
                  pm2 startup
                </code>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Dette starter applikasjonen og konfigurerer den til å starte automatisk ved oppstart.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Konfigurer Nginx
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  sudo nano /etc/nginx/sites-available/proveeksamen
                </code>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Opprett en ny Nginx-konfigurasjon:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  server {<br />
                  &nbsp;&nbsp;listen 80;<br />
                  &nbsp;&nbsp;server_name din_domene.no;<br />
                  <br />
                  &nbsp;&nbsp;location / {<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;proxy_pass http://localhost:3000;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;proxy_http_version 1.1;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;proxy_set_header Upgrade $http_upgrade;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;proxy_set_header Connection 'upgrade';<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;proxy_set_header Host $host;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;proxy_cache_bypass $http_upgrade;<br />
                  &nbsp;&nbsp;}<br />
                  }
                </code>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  sudo ln -s /etc/nginx/sites-available/proveeksamen /etc/nginx/sites-enabled/<br />
                  sudo nginx -t<br />
                  sudo systemctl restart nginx
                </code>
              </div>
            </div>
          </section>

          <div className="bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-md p-4 mt-8">
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">
              Vedlikeholdstips
            </h3>
            <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-2">
              <li>Kjør `pm2 logs` for å se applikasjonslogger</li>
              <li>Bruk `pm2 monit` for å overvåke applikasjonen</li>
              <li>Oppdater applikasjonen med `git pull && npm install && npm run build`</li>
              <li>Start applikasjonen på nytt med `pm2 restart proveeksamen`</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 