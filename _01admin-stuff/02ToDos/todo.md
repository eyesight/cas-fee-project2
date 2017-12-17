#TODO
- TODO: CSV-Datei erstellen in Klassenliste -> User-Details
(Prio2)
AW+CF

-TODO: erstellen "default Profilbild", wenn User noch kein Avatar hat
CF

 - TODO: Error-Message-Handler erstellen, resp. korrigieren (besteht ja schon z.T.)
 -> Errors in Console auslesen/Überschreiben
 -> CF(+AW)
  
-TODO: Profilbild in Navigation aus DB lesen
  Done mit CSS/Sass korrigieren (rund machen)

- TODO: Profile fertigstellen (inkl. Avatar)
  ->: Upload Profilbild
    -> AW/CF: Bild richtig in Server einbauen und auslesen
    -> CF: Styling/UI responsive machen 
    -> CF+AW

- TODO: FOUT einbinden für das Laden eines Webfonts (=auf Folien unterricht), https://css-tricks.com/fout-foit-foft/
-> AW+CF 

- TODO: Dashboard überarbeiten UI, Idee + Umsetzung
-> CF+AW

- TODO: Unit tests
-> AW/CF

- TODO: Refactoring
-> AW/CF

- TODO: Login
    - CF: Login-Datum einbauen (last login = 00.00.0000)

- TODO: Abstände korrigieren, Feinheiten ausarbeiten in Sass/CSS
-> CF: Dezember

- TODO: Bootstrap - nur relevante Imports importieren
-> CF: 

- TODO: Accessability / ARIA / SEO
-> CF/AW:

- TODO: Kontrolle Benennung Klassen und HTML-Struktur
-> AW+CF:
https://www.w3schools.com/html/html5_semantic_elements.asp

 - TODO: Prüfen in allen Browsern/Export Projekt als Bundle
 ->AW+CF
  
-TODO: Loading-Spinner einbauen; animieren (Prio2)

- TODO: Send-Email einfügen: http://tphangout.com/angular-2-sending-mails-from-your-app/ + https://www.emailjs.com/
(niedrige Prio)
  - Registrierung
  - Profile (antrag Username ändern)
  - Classlist - Mail an Lehrer
  -> CF+AW
  
- TODO: Styleguide erstellen aus Prototype (niedrige Prio)
-> CF (+AW) 

- TODO: Kalender umsetzen (niedrige Prio)
-> 
 
 #in Progress AW
- Auth: check out - may be better solution:
    AW: https://github.com/auth0/angular2-jwt 

#TO CHECK
- TODO: Login, Registrierung
-> CF: 31.10
  - DONE: Formular für Registrierung
  -> CF: 25.10
  
  - DONE: Mock-Data für Klassenliste (und Registrierung und Profil)
  (cas-fee-project2 -> src -> assets -> mock)
    -> CF: 25.10
 
 - DONE: Pop-up erstellen für Klassenliste und für Text-Seiten auf Registrierung
  - Polyfill for i.e. und safari
 -> CF
 
 - DONE: UI für Klassenliste fertigstellen/durchdenken
  -> CF
  
 - TODO: UI für Profil-Seite fertigstellen/durchdenken
  -> CF
  
- TODO: Autoprefixer für Angular?
  Angular uses Autoprefixes: https://github.com/angular/angular-cli/wiki/stories-autoprefixer
-> CF:

#DONE
- DONE: NG-File-Struktur (module,Componente) anlegen
-> AW: 6.10.

- DONE: Prototype fertigstellen übernehmen ins NG (Module Nav, - ohne links soweit, Footer...)
-> CF: 12.10

- DONE: Mockup-Data (Json)
-> AW: 15.10

- DONE: localStorage operationen in separates file: storage.service.ts
-> DONE AW:

- DONE: Backend für Profile und Klassenliste
-> AW

- DONE: Navigation bereinigen
-> CF+AW

-DONE: Komponente erstellen für "Passwort vergessen -> meldung an Admin"

-DONE: Komponente für Personal-Detail-Box

- DONE: UI für Chat prüfen/korrigieren
-> CF

- DONE: Registierung
    DONE CF (+AW) use Promise oder Subscribe
    DONE CF: Registrierungs-Datum einbauen (registriert at 00.00.0000)
    DONE CF: Wenn Eingelogged, darf User nicht mehr auf Seite "Registrierung oder Login" kommen -> Meldung "du bist schon eingeloggt" einbauen
    DONE CF: Registrierungs-Button nicht auf disabled setzen -> bei klick auf Button, werden alle nicht angezeigten felder angezeigt
    DONE DO: alle obligatorischen felder entsprechend markieren

- DONE: Registrierung mit Admin (Lehrer) berechtigung/Registrierung ist erst abgeschlossen, wenn von Admin geprüft
-> AW (+CF)


- TODO: Klassenliste aus Sicht von Lehrer: einauen von Bestätiung, dass User in Klassenliste gehört
-> AW (+CF) - Prio 1 - DONE

 - TODO: DONE: Chat thematisieren, Umsetzen (inkl. sass)
 -> AW: 31.10. DONE
 
 - TODO:  Chat
     AW: DONE: Textarea autosizing
     AW: DONE: Header shows now, Styling and Menubar
     AW: DONE: Timestamp der Message anstatt Klasse
     AW: DONE: implement userDetails und Klassenamen  etc. im Heade
     CF: Auto Scroll und scrollin innerhalb chat fenster 

- TODO: Klassenliste erstellen
-> AW(+CF) - almost done
  Probleme mit Routing (Detail öffnen)

-DONE: Personal-Detail-Box soll in Profil upgedatet werden, wenn Vorname angepasst wird
CF

-DONE: Alert (Error-Message) korrigieren, UI ändern
  -> Anzeige soll überall ausgegeben werden
  -> Style soll unserem CI/CD entsprechen
  -> evt. animieren (niedrige Prio)
  CF

-TODO: User-Details Profilbild mit CSS rund machen
CF
