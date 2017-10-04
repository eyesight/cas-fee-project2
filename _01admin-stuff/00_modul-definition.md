#Security-Module

**Funktionen**:
- Login/Logout
- Eltern erfassen ihre Daten, plus die Daten des Kindes
- Sie wählen eine Klasse aus bestehender Liste (wurden vorgängig von Admin (=Schulhaus) erfasst. Admin von der Gruppe, Klasse ist der Lehrer.
Danach sind sie via E-Mail und Passwort registriert
- User wählt Rolle aus (Lehrer oder Schüler)

#Modul 1 Profil Verwaltung
- User kann seine Daten updaten

#Modul 2 Klassenliste
- Liste der Klasse wird angezeigt; möglichkeit die (freigegebenen) )Daten jedes einzelnen zu lesen

#Modul 3 - Chat
Der Chat ist ein general-Channel. Jede/r sieht den gleichen Inhalt. Es gibt nur ein Chat-Menu (im Hauptmenu). 
Alle können alles sehen.
Zeitpunkt bei jedem Chat anzeigen.
fakultativ: 
- im Hauptmenu: Punkt Chat: Batch (anzahl unread messages). 

1) Auswahl Chat-Partner (optional).
2) Laden bisheriger Chat
3) Input für neue Chat-Message (keine Bilder verwenden)
4) ev. Mit vorgefertigen Antworten, ev. Themenorientiert -> Auswahl treffen vor Chat, Vorgefertigte Antworten vorschlagen welche matchen könnten? (Elasticmatch)(Prio2)
5) Implementieren Com over WebSockets
6) Prio 2: Auswahl eines Icons/Profilbild

#Modul 3.1 Chat: alter Verlauf nachladen (Optional)
- Im Chat sieht man nur die letzten (3-10: tbd) Tage sofort. Sonst muss man weiterscrollen.

#Modul 4 - Kalender (optional)
 1) Setzen eines Termines auf Kalender
 2) Termindetails: Name, Properties: Zeitpunkt/Ganztätig/Ganze Klasse/Schulferien (Generellster Termin - Broadcast)
 3) Einzeltermine gezielt an eltern, Kind: Entsprechende Personen einladen (Prio2)
 4) Termine für Gruppe rot / blau / Knaben oder Mädchen
 5) Push/EMailversand durch Server (Brauchts das schon?)
 6) Aendern / löschen / ev. Benachrichtigen
 7) Absage von Teilnehmern mit Begründung (Absenzenproblematik in der Schule- es sollte nicht dazu führen, dass Absenzen noch gefördert werden dürfen weder durch Kind noch durch Eltern.
 8) Auswählen eines Termines um ihn zu bearbeiten/löschen
 7) Reminder funktion (auch noch nicht nötig)
 9) Eltern können sich an oder abmelden, sehen Teilnehmerliste nicht (es muss an oder abgemeldet werden)
 10) Kinder können nicht an oder abmelden, sehen Teilnehmerliste nicht
 11) Lehrer können nicht an oder abemelden, sehen Teilnehmerliste, inkl. status "an- oder abgemeldet"
 11) Eltern- und Schüler können nichts eintragen
 12) Prio 2: möglichkeit die Termine als Outlook- oder ios-Termine erfassen


#Modul 5 - Stundenplan (optional)
- Kalender in Wochenübersicht (gleiche Ansicht, wie Termine)-
- Jede Woche sieht gleich aus
- Lehrer erfasst Stundenplan, mit Fächer und Lehrer in Farbe
- Möglich zum Ausdrucken (Print-CSS)
- Schüler und Eltern können nicht editieren, nur lesen
- Prio 2: möglichkeit die Termine als Outlook- oder ios-Termine erfassen

#Modul 6 - Abwesenheitsliste (optional)
- Wenn Massnahme ergriffen; Zählung wieder zurücksetzen, Verlauf wird nie gelöscht
- Vorschläge für Interaktion (falkutativ) -> Möglichkeit Erfassung, was Passiert ist (was wurde unternommen, was ist Ergebnis)
- Detailansicht, wann war SchülerIn abwesend
- Auswertung der Daten der Schüler: wenn Schüler mehrfach fehlt, wird angezeigt
- Liste der Klasse zum Abhaken, wer anwesend ist
