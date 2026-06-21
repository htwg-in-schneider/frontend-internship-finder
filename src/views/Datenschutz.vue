<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <Navbar />
  <div class="container py-5" style="max-width: 800px;">
    <h2 class="fw-bold mb-4">Datenschutzerklärung</h2>

    <h4 class="fw-bold mt-5">1. Datenschutz auf einen Blick</h4>

    <h5 class="fw-bold mt-3">Allgemeine Hinweise</h5>
    <p class="text-secondary">
      Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
      Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
      denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema
      Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
    </p>

    <h5 class="fw-bold mt-3">Datenerfassung auf dieser Website</h5>
    <p class="text-secondary">
      <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
      Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
      können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung
      entnehmen.
    </p>
    <p class="text-secondary">
      <strong>Wie erfassen wir Ihre Daten?</strong><br />
      Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z. B. über das
      Kontaktformular oder bei der Anmeldung). Andere Daten werden automatisch oder nach Ihrer
      Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst (v. a. technische Daten wie
      Browser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
    </p>
    <p class="text-secondary">
      <strong>Wofür nutzen wir Ihre Daten?</strong><br />
      Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
      Andere Daten werden zur Bereitstellung der angemeldeten Funktionen (z. B. Praktika verwalten,
      Bewerbungen, Bewertungen) verwendet.
    </p>
    <p class="text-secondary">
      <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br />
      Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
      gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung
      oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz
      können Sie sich jederzeit an uns wenden.
    </p>

    <h4 class="fw-bold mt-5">2. Hosting</h4>
    <p class="text-secondary">
      Wir hosten die Inhalte unserer Website bei externen Anbietern. Das Frontend wird als statische
      Website über <strong>GitHub Pages</strong> (GitHub, Inc., USA), das Backend über
      <strong>render.com</strong> (Render Services, Inc., USA) in der Region Frankfurt (EU)
      bereitgestellt. Die Anwendungsdaten werden in einer Datenbank im Rechenzentrum der Hochschule
      (bwCloud) gespeichert. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden
      auf den Servern der Anbieter verarbeitet. Das Hosting erfolgt zum Zwecke der Vertragserfüllung
      gegenüber unseren Nutzern und im Interesse einer sicheren, schnellen und effizienten
      Bereitstellung unseres Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO).
    </p>

    <h4 class="fw-bold mt-5">3. Allgemeine Hinweise und Pflichtinformationen</h4>

    <h5 class="fw-bold mt-3">Datenschutz</h5>
    <p class="text-secondary">
      Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln
      Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
      Datenschutzvorschriften sowie dieser Datenschutzerklärung.
    </p>

    <h5 class="fw-bold mt-3">Hinweis zur verantwortlichen Stelle</h5>
    <p class="text-secondary">
      Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br />
      Till Mühlenberend<br />
      Peterstraße 15<br />
      71069 Sindelfingen<br />
      E-Mail: kontakt@internshipfinder.de
    </p>

    <h5 class="fw-bold mt-3">Speicherdauer</h5>
    <p class="text-secondary">
      Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde,
      verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt
      (z. B. nach Löschung Ihres Benutzerkontos).
    </p>

    <h5 class="fw-bold mt-3">Empfänger und Übermittlung in Drittländer</h5>
    <p class="text-secondary">
      Für die Anmeldung nutzen wir den Authentifizierungsdienst Auth0 (Okta, Inc., USA). Dabei können
      personenbezogene Daten in die USA übermittelt werden. Die Übermittlung erfolgt auf Grundlage der
      Standardvertragsklauseln der EU-Kommission.
    </p>

    <h5 class="fw-bold mt-3">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h5>
    <p class="text-secondary">
      Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie
      können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum
      Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
    </p>

    <h5 class="fw-bold mt-3">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h5>
    <p class="text-secondary">
      Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
      Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres
      Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.
    </p>

    <h5 class="fw-bold mt-3">Auskunft, Berichtigung und Löschung</h5>
    <p class="text-secondary">
      Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
      Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den
      Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten.
    </p>

    <h5 class="fw-bold mt-3">SSL- bzw. TLS-Verschlüsselung</h5>
    <p class="text-secondary">
      Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine
      SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die
      Adresszeile des Browsers von „http://" auf „https://" wechselt.
    </p>

    <h4 class="fw-bold mt-5">4. Datenerfassung auf dieser Website</h4>

    <h5 class="fw-bold mt-3">Server-Log-Dateien</h5>
    <p class="text-secondary">
      Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
      Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und
      Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners,
      Uhrzeit der Serveranfrage und die IP-Adresse. Eine Zusammenführung dieser Daten mit anderen
      Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6
      Abs. 1 lit. f DSGVO zur technisch fehlerfreien Darstellung und Optimierung der Website.
    </p>

    <h5 class="fw-bold mt-3">Anfrage per Kontaktformular oder E-Mail</h5>
    <p class="text-secondary">
      Wenn Sie uns über das Kontaktformular kontaktieren, wird Ihre Anfrage über das auf Ihrem Gerät
      eingerichtete E-Mail-Programm an uns versendet (mailto). Die von Ihnen eingegebenen Daten (Name,
      E-Mail-Adresse, Nachricht) werden dabei nicht auf dieser Website gespeichert, sondern
      ausschließlich per E-Mail übertragen. Die Verarbeitung erfolgt zur Bearbeitung Ihrer Anfrage
      (Art. 6 Abs. 1 lit. b bzw. f DSGVO).
    </p>

    <h5 class="fw-bold mt-3">Registrierung und Authentifizierung über Auth0</h5>
    <p class="text-secondary">
      Für die Nutzung der angemeldeten Bereiche melden Sie sich über den Authentifizierungsdienst Auth0
      an. Dabei werden die zur Authentifizierung erforderlichen Daten (z. B. Name, E-Mail-Adresse)
      verarbeitet. In Ihrem Benutzerkonto können weitere von Ihnen angegebene Daten (z. B. Adresse)
      gespeichert werden, die Sie jederzeit selbst ändern können. Rechtsgrundlage ist die Erfüllung des
      Nutzungsverhältnisses (Art. 6 Abs. 1 lit. b DSGVO).
    </p>

    <p class="text-secondary mt-5"><em>Stand: Juni 2026</em></p>
  </div>
  <Footer />
</template>

<style scoped></style>
