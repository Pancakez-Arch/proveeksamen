export default function SSHKeysGuide() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Guide: Generere SSH-nøkler på Ubuntu
        </h1>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Sjekk eksisterende SSH-nøkler
            </h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                ls -la ~/.ssh
              </code>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Dette vil vise eventuelle eksisterende SSH-nøkler. Filene vil vanligvis ha navn som id_rsa og id_rsa.pub.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Generer ny SSH-nøkkel
            </h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                ssh-keygen -t ed25519 -C "din.epost@eksempel.com"
              </code>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Dette vil generere en ny ED25519 SSH-nøkkel. Du vil bli bedt om å:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Velge hvor nøkkelen skal lagres (trykk Enter for standardplassering)</li>
              <li>Oppgi et passord (anbefalt, men valgfritt)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Start SSH-agent
            </h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                eval "$(ssh-agent -s)"<br />
                ssh-add ~/.ssh/id_ed25519
              </code>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Dette starter SSH-agent og legger til din nye nøkkel.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Kopier den offentlige nøkkelen
            </h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                cat ~/.ssh/id_ed25519.pub
              </code>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Dette vil vise din offentlige nøkkel. Kopier hele utskriften.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Legg til nøkkelen på serveren
            </h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                ssh-copy-id brukernavn@server-ip
              </code>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Erstatt "brukernavn" og "server-ip" med dine serverdetaljer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Test tilkoblingen
            </h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                ssh brukernavn@server-ip
              </code>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Du bør nå kunne koble til serveren uten å måtte oppgi passord.
            </p>
          </section>

          <div className="bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-md p-4 mt-8">
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">
              Sikkerhetstips
            </h3>
            <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-2">
              <li>Hold din private nøkkel (id_ed25519) hemmelig</li>
              <li>Bruk alltid et sterkt passord når du genererer nøkler</li>
              <li>Oppdater nøkler regelmessig</li>
              <li>Bruk forskjellige nøkler for forskjellige servere</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 