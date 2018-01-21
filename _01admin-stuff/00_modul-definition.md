<h1>Module: Definitionen</h1>

<h2>Modul Authentifizierung/Security</h2>
- Login/Logout<br>
- Eltern erfassen ihre Daten, plus die Daten des Kindes<br>
- Sie wählen eine Klasse aus bestehender Liste (wurden vorgängig von Admin (=Schulhaus) erfasst. Admin von der Gruppe, Klasse ist der Lehrer. Danach sind sie via E-Mail und Passwort registriert<br>
- User wählt Klasse aus<br>
- User wird bestätigt von Admin<br>
- Solange User nicht bestätigt ist, hat er eingeschränkte Rechte. D.h. er kann  nur sein Profil bearbeiten<br>

<h2>Modul Profil-Verwaltung</h2>
- User kann seine Daten bearbeiten<br>

<h3>noch nicht umgesetzt</h3>
- Wenn User Admin ist, kann er Klassen erfassen <br>

<h2>Modul Profilbild</h2>
- User kann sein Profilbild hochladen/wechseln<br>

<h2>Modul Klassenliste</h2>
- Liste der Klasse wird angezeigt; Möglichkeit die (freigegebenen) Daten jedes einzelnen zu lesen<br>
- Daten können Sortiert werden<br>
- User sieht nur die bestätigten User, die der gleichen Klassen zugeordnet sind<br>
- Seine eigenen Daten sind in der Liste optisch ausgezeichnet<br>
- Wenn User Admin ist, sieht er alle (bestätigte und unbestätigte) und hat die Möglichkeiten User zu aktivieren/deaktiviern und löschen<br>

<h2>Modul Chat</h2>
Der Chat ist ein general-Channel. Jede/r sieht den gleichen Inhalt. Es gibt nur ein Chat-Menu (im Hauptmenu). 
Alle können alles sehen.
Zeitpunkt bei jedem Chat anzeigen.
fakultativ: <br>
- Laden bisheriger Chat
- Input für neue Chat-Message
- Implementieren Com over WebSockets

<h3>noch nicht umgesetzt</h3>
- im Hauptmenu: Punkt Chat: Batch (anzahl unread messages). <br>
- Auswahl Chat-Partner 
- ev. Mit vorgefertigen Antworten, ev. Themenorientiert -> Auswahl treffen vor Chat, Vorgefertigte Antworten vorschlagen welche matchen könnten? (Elasticmatch)





<h1>Module für nächste Sprints, noch nicht umgesetzt</h1>

<h2>Modul Chat: alter Verlauf nachladen (Optional)</h2>
- Im Chat sieht man nur die letzten (3-10: tbd) Tage sofort. Sonst muss man weiterscrollen. 

<h2>Modul Kalender (optional)</h2>
 1) Setzen eines Termines auf Kalender<br>
 2) Termindetails: Name, Properties: Zeitpunkt/Ganztätig/Ganze Klasse/Schulferien (Generellster Termin - Broadcast)<br>
 3) Einzeltermine gezielt an eltern, Kind: Entsprechende Personen einladen (Prio2)<br>
 4) Termine für Gruppe rot / blau / Knaben oder Mädchen<br>
 5) Push/EMailversand durch Server (Brauchts das schon?)<br>
 6) Aendern / löschen / ev. Benachrichtigen<br>
 7) Absage von Teilnehmern mit Begründung (Absenzenproblematik in der Schule- es sollte nicht dazu führen, dass Absenzen noch gefördert werden dürfen weder durch Kind noch durch Eltern.<br>
 8) Auswählen eines Termines um ihn zu bearbeiten/löschen<br>
 7) Reminder funktion (auch noch nicht nötig)<br>
 9) Eltern können sich an oder abmelden, sehen Teilnehmerliste nicht (es muss an oder abgemeldet werden)<br>
 10) Kinder können nicht an oder abmelden, sehen Teilnehmerliste nicht<br>
 11) Lehrer können nicht an oder abemelden, sehen Teilnehmerliste, inkl. status "an- oder abgemeldet"<br>
 11) Eltern- und Schüler können nichts eintragen<br>
 12) Prio 2: möglichkeit die Termine als Outlook- oder ios-Termine erfassen<br>

<h2>Modul Stundenplan (optional)</h2>
- Kalender in Wochenübersicht (gleiche Ansicht, wie Termine)-<br>
- Jede Woche sieht gleich aus<br>
- Lehrer erfasst Stundenplan, mit Fächer und Lehrer in Farbe<br>
- Möglich zum Ausdrucken (Print-CSS)<br>
- Schüler und Eltern können nicht editieren, nur lesen<br>
- Prio 2: möglichkeit die Termine als Outlook- oder ios-Termine erfassen<br>

<h2>Modul Abwesenheitsliste (optional)</h2>
- Wenn Massnahme ergriffen; Zählung wieder zurücksetzen, Verlauf wird nie gelöscht<br>
- Vorschläge für Interaktion (falkutativ) -> Möglichkeit Erfassung, was Passiert ist (was wurde unternommen, was ist Ergebnis)<br>
- Detailansicht, wann war SchülerIn abwesend<br>
- Auswertung der Daten der Schüler: wenn Schüler mehrfach fehlt, wird angezeigt<br>
- Liste der Klasse zum Abhaken, wer anwesend ist<br>
