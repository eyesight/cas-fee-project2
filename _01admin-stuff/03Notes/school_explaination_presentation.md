Zielpublikum: Eltern, ( Schüler), Lehrer (nicht speziell IT-Affine Personen)


Verzicht auf NG-Material (Versionsprobleme, codebloat)  gelöst mit einfachen html/css mitteln

Performance thoughts:
- avatar appearance in chat is faster if loaded using a service delivering the image instead of creating a 
separate component inputing each avatar (proper modularizing vs perf.)


Zusammenarbeit via Git:
- Zusammenarbeit gut; Aufteilung sinnvoll
- Bei arbeiten mit Git unnötig viele commits, zu wenig git commit --amend gearbeitet, History ist recht unübersichtlich; das wäre in Zukunft und grösseren Projekten sinnvoll



Präsentation: Notizen:

**Schlecht:**

1. Wahl Server = Ruby on Rails; alles umbauen zu node-server. Damit mehr Javascript gelernt wird und dass beide in der Lage sind zu editieren.
Table in Classliste konnte wegen Angular nich mehr unterteilt werden - ansonsten hätte man Angular-Table benutzen müssen.
Aufwand fürs Testing wurde unterschätzt
Der Aufwand war schwer einzuschätzen und war massiv mehr, als gedacht. Haben früh angefangen und trotztem bis zur Abgabe gebraucht. 90 Stunden hätten nie ausgereicht
Der Production mit AOT haben wir viel zu spät gemacht und zusammen sehr lange gebraucht, um das zu beheben
Wir haben auch auf Windows im I.E. Getestet und dann ein paar Optische fehler festgestellt
Registrierungsformular ist zu lange - nächstes Mal würden wir die Registrierung in verschiedene Schritte verpacken -> ein Prozess-Workflow
Lehrer sollte Daten löschen können, ging vergessen
Wir haben teilweise die Services mehrfach injected und hatten so einzelne Male probleme - falsche Version, gewisse falsche Funktionen, oder nicht ausgeführtes

**Was gelernt:**

Einsatz vom Framework,
Durch User-Tests gemerkt, dass Abläufe/Funktionen/Struktur für den User unlogisch sein kann, was aber für uns klar war (Test-Person hat nich begriffen, wie er das Bild speichern soll, resp. Hat den letzten Schritt nicht gecheckt)
Umgang mit Services, Sideeffekt
Wir wissen jetzt wo es in Zürich und Winterthur öffentliche Orte gibt mit W-Lan ;)

**Gut gelöst:**

Komponentenorientiert Aufteilen/Strukturieren - Schon zu Beginn eine gute Struktur geplant
Sass mit BAM
Authentifizierung mit der Autorisierung (Lehrer kann den Registrierer bestätigen, ansonsten kann er nicht alle Inhalte nutzen. Einfache und Effektive Lösung)
Guards sind gut eingesetzt
Backend und Frontend sind immer auf dem selben Stand, welche Berechtigung vorhanden ist, der Server weiss, was er zulassen darf


