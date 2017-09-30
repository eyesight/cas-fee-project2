#Security-Module

**Funktionen**:
- Login
- User-Registrierung mit E-Mail und Passwort (Name, Vorname, Adresse, PLZ, Ort, Tel-Nr.)
- Lehrer(Admin) erfasst alle User(Daten)
- Personen können sich registrieren, wenn es matched mit Daten in Backend (von Lehrer erfasst), sind alle Daten freigeschaltet
- Erfassung von nur einem Responsible (Elternteil von Kind) pro Kind möglich

Jeder kann sich grundsätzlich regis. Funktionen zu benutzen geht aber nur wenn man als Eltern/Kind vom Lehrer in eine Klasse eingeladen wurde.


Login/Authentisierung/Autorisierung (Serverseitig sicherstellen, Kind kann nicht als Lehrer fungieren nicht als Eltern etc.) API dementsprechend auslegen.



#Modul 1 Klassenliste

Lehrer erstellt die Klassenliste:
Erfassen, Mutieren Name, Vorname, Adresse, GebDatum, Gender des Schülers
Speichern
Anzahl Schüler anzeigen (z.B: Total = 14)
fakultativ:
Löschen einer Zeile (Warnung Popup)

#Modul 2 Eltern erfassen in Klassenliste
Zu jeder Schülerin eine Elternperson: verantwortliche erwachsene Person zu erfassen, mutieren.
Beziehung ist erfassbar (Mutter, Vater, Pflegevater ...)


Faktultativ:
- Eltern bestehen i.d.R. nicht aus aus einer Person. 1:n Beziehungen ermöglichen

#Modul 3 - Chat
Der Chat ist ein general-Channel. Jede/r sieht den gleichen Inhalt. Es gibt nur ein Chat-Menu (im Hauptmenu). 
Alle können alles sehen.
Zeitpunkt bei jedem Chat anzeigen.
fakultativ: 
- im Hauptmenu: Punkt Chat: Batch (anzahl unread messages). 
- Im Chat sieht man nur die letzten (3-10: tbd) Tage sofort. Sonst muss man weiterscrollen.

1) Auswahl Chat-Partner.
2) Laden bisheriger Chat
3) Input für neue Chat-Message (keine Bilder verwenden)
4) ev. Mit vorgefertigen Antworten, ev. Themenorientiert -> Auswahl treffen vor Chat, Vorgefertigte Antworten vorschlagen welche matchen könnten? (Elasticmatch)(Prio2)
5) Implementieren Com over WebSockets
6) Prio 2: Auswahl eines Icons/Profilbild

#Modul 3.1 Chat: alter Verlauf nachladen (Optional)

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
