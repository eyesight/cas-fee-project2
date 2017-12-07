#TODO
- TODO: FOUT einbinden für das Laden eines Webfonts (=auf Folien unterricht), https://css-tricks.com/fout-foit-foft/
-> AW+CF

- TODO: Autoprefixer für Angular?
-> CF: 

- TODO: Profile erstellen (inkl. Avatar)
-> CF(+AW)

- TODO: Klassenliste erstellen
-> AW(+CF)

- TODO: Styleguide erstellen aus Prototype (niedrige Prio)
-> CF (+AW) 

- TODO: UI für Chat prüfen/korrigieren
-> CF

- TODO: Dashboard überarbeiten UI, Idee + Umsetzung
-> CF+AW

- TODO: Navigation bereinigen
-> CF+AW

- TODO: Unit tests
-> AW(+CF)

- TODO: Backend für Profile und Klassenliste
-> AW

- TODO: Refactoring
-> AW/CF

- TODO: Registierung
    - CF (+AW) use Promise oder Subscribe
    - CF Registrierungs-Datum einbauen (registriert at 00.00.0000)

- TODO: Login
    - CF: Wenn Eingelogged, darf User nicht mehr auf Seite "Registrierung oder Login" kommen -> Meldung "du bist schon eingeloggt" einbauen
    - CF: Login-Datum einbauen (last login = 00.00.0000)

- TODO: Registrierung mit Admin (Lehrer) berechtigung/Registrierung ist erst abgeschlossen, wenn von Admin geprüft
-> AW (+CF)

- TODO: Klassenliste aus Sicht von Lehrer: einauen von Bestätiung, dass User in Klassenliste gehört
-> AW (+CF) - Prio 1 - DONE

- TODO: Abstände korrigieren, Feinheiten ausarbeiten in Sass/CSS
-> CF: Dezember

- TODO: Bootstrap - nur relevante Imports importieren
-> CF: 

- TODO: Accessability / ARIA / SEO
-> CF/AW:

- TODO: Kontrolle Benennung Klassen und HTML-Struktur
-> AW+CF: Anfang November
https://www.w3schools.com/html/html5_semantic_elements.asp

- TODO: localStorage operationen in separates file: storage.service.ts
-> DONE AW:

- TODO: Background-Style-Changer in Profil einbauen (niedrige Prio)
-> 

- TODO: Kalender umsetzen (niedrige Prio)
-> 

 - TODO: Prüfen in allen Browsern/Export Projekt als Bundle
 ->AW+CF
 
 #in Progress AW
 - TODO: DONE: Chat thematisieren, Umsetzen (inkl. sass)
 -> AW: 31.10. DONE
 
 - TODO:  Chat
     AW: DONE: Textarea autosizing
     AW: DONE: Header shows now, Styling and Menubar
     AW: DONE: Timestamp der Message anstatt Klasse
     AW: DONE: implement userDetails und Klassenamen  etc. im Heade
     CF: Auto Scroll und scrollin innerhalb chat fenster 
   
- Auth: check out - may be better solution:
    AW: https://github.com/auth0/angular2-jwt 
 
#in Progress CF
 - TODO: Error-Message-Handler erstellen, resp. korrigieren (besteht ja schon z.T.)
 -> CF(+AW)

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

#DONE
- DONE: NG-File-Struktur (module,Componente) anlegen
-> AW: 6.10.

- DONE: Prototype fertigstellen übernehmen ins NG (Module Nav, - ohne links soweit, Footer...)
-> CF: 12.10

- DONE: Mockup-Data (Json)
-> AW: 15.10
