export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-lumora-cream/30 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-lumora-dark mb-8">
          Privacybeleid
        </h1>

        <div className="bg-white rounded-3xl shadow-soft-lg p-8 border border-lumora-dark/10 space-y-8">
          <section>
            <h2 className="text-2xl font-display font-bold text-lumora-dark mb-4">
              1. Inleiding
            </h2>
            <p className="text-lumora-dark/70 leading-relaxed">
              Lumora Horticulture (KvK: 96669772, BTW: NL005224624B80) respecteert de privacy van
              bezoekers van de website en draagt er zorg voor dat de persoonlijke informatie die u
              ons verschaft vertrouwelijk wordt behandeld.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-lumora-dark mb-4">
              2. Gebruik van verzamelde gegevens
            </h2>
            <p className="text-lumora-dark/70 leading-relaxed mb-4">
              Lumora Horticulture gebruikt uw gegevens voor de volgende doeleinden:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lumora-dark/70">
              <li>Verwerking en verzending van bestellingen</li>
              <li>Communicatie over uw bestelling</li>
              <li>Klantenservice en ondersteuning</li>
              <li>Verbetering van onze dienstverlening</li>
              <li>Facturatie en administratie</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-lumora-dark mb-4">
              3. Welke gegevens verzamelen wij?
            </h2>
            <p className="text-lumora-dark/70 leading-relaxed mb-4">
              Bij het plaatsen van een bestelling verzamelen wij de volgende gegevens:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lumora-dark/70">
              <li>Voor- en achternaam</li>
              <li>E-mailadres</li>
              <li>Telefoonnummer</li>
              <li>Bezorgadres (straat, huisnummer, postcode, plaats, land)</li>
              <li>Factuuradres (indien afwijkend van bezorgadres)</li>
              <li>Betalingsgegevens (via beveiligde betaalprovider Mollie)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-lumora-dark mb-4">
              4. Beveiliging
            </h2>
            <p className="text-lumora-dark/70 leading-relaxed">
              Lumora Horticulture neemt passende technische en organisatorische maatregelen om uw
              persoonlijke gegevens te beschermen tegen verlies of onrechtmatige verwerking. Wij
              maken gebruik van beveiligde verbindingen (SSL) en werken samen met betrouwbare
              betaalproviders zoals Mollie.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-lumora-dark mb-4">
              5. Bewaartermijn
            </h2>
            <p className="text-lumora-dark/70 leading-relaxed">
              Uw gegevens worden niet langer bewaard dan noodzakelijk voor de doeleinden waarvoor zij
              zijn verzameld, tenzij wij op grond van een wettelijke regeling gegevens langer moeten
              bewaren (bijvoorbeeld voor fiscale doeleinden).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-lumora-dark mb-4">
              6. Uw rechten
            </h2>
            <p className="text-lumora-dark/70 leading-relaxed mb-4">
              U heeft het recht om:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lumora-dark/70">
              <li>Inzage te vragen in de gegevens die wij van u verwerken</li>
              <li>Correctie te vragen van onjuiste gegevens</li>
              <li>Verwijdering van uw gegevens te verzoeken</li>
              <li>Bezwaar te maken tegen verwerking van uw gegevens</li>
              <li>Uw gegevens over te dragen aan een andere partij</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-lumora-dark mb-4">
              7. Cookies
            </h2>
            <p className="text-lumora-dark/70 leading-relaxed">
              Onze website maakt gebruik van functionele cookies om de website goed te laten werken.
              Deze cookies hebben geen of nauwelijks gevolgen voor uw privacy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-lumora-dark mb-4">
              8. Wijzigingen
            </h2>
            <p className="text-lumora-dark/70 leading-relaxed">
              Lumora Horticulture behoudt zich het recht voor om wijzigingen aan te brengen in dit
              privacybeleid. Wij adviseren u om dit privacybeleid regelmatig te raadplegen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-lumora-dark mb-4">
              9. Contact
            </h2>
            <p className="text-lumora-dark/70 leading-relaxed">
              Voor vragen over ons privacybeleid kunt u contact met ons opnemen via:
            </p>
            <div className="mt-4 space-y-2 text-lumora-dark/70">
              <p>
                <strong>Lumora Horticulture</strong>
              </p>
              <p>Aan de Bogen 11</p>
              <p>6118 AS Nieuwstadt</p>
              <p>Nederland</p>
              <p className="mt-4">KvK: 96669772</p>
              <p>BTW: NL005224624B80</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
