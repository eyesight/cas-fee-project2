Thema: Kurz erläutern. 
Organisationstool für Schulen mit involvierten Eltern (Kind) und Lehrer 
UX: nicht fancy, sondern eher konservativ und vertrauensfördernd.
Zielpublikum: Eltern, ( Schüler), Lehrer (nicht speziell IT-Affine Personen)
Rahmenbedingung: 1 Kind wird durch 1 Elternperson vertreten


**Gut gelöst:**

UX: Layout und Design Dokumente erstellt und dann als HTML/CSS Prototyp gebaut.
Komponentenorientiert Aufteilen/Strukturieren - Schon zu Beginn eine gute Struktur geplant (Sass mit BEM-Mix)
Authentifizierung mit der Autorisierung (Lehrer kann den Registrierer bestätigen, ansonsten kann er nicht alle Inhalte nutzen. Einfache und Effektive Lösung)
Guards sind gut eingesetzt
Backend und Frontend sind immer auf dem selben Stand in Bezug auf Berechtigungen, der Server weiss, was er zulassen darf
Verzicht auf NG-Material (Versionsprobleme, codebloat) gelöst mit einfachen html/css mitteln.

Modularisiserung nach Angular. Avatarbild im Chat ist zusätzliche Komponente, sondern wird von Komponente
chat-message verwaltet mit einem Service welcher jeweils das korrekte Bild liefert.

Zusammenarbeit via Git:
- Zusammenarbeit gut; Aufteilung sinnvoll



Präsentation: Notizen:

**was würden wir anders machen:**

1. Wahl Server = Ruby on Rails; alles umbauen zu node-server. Damit mehr Javascript gelernt wird und dass beide in der Lage sind zu editieren.

Aufwand fürs Testing wurde unterschätzt


Der Production mit AOT haben wir viel zu spät gemacht und zusammen sehr lange gebraucht, um das zu beheben

Registrierungsformular ist zu lange - nächstes Mal würden wir die Registrierung in verschiedene Schritte verpacken -> ein Prozess-Workflow

Wir haben teilweise die Services mehrfach injected und hatten so einzelne Male probleme - falsche Version, gewisse falsche Funktionen, oder nicht ausgeführtes
Nicht so viele Observables sondern mehr Promises wenn nicht nötig.

UX: - wäre besser Bild über ein Popup zu laden und dort gezielt den User bei der Entscheidung (ja ich möchte Bild behalten oder nein zurück zum vorherigen Zustand führen zu können)

git: 
- Bei Arbeiten mit Git unnötig viele commits, zu wenig git commit --amend gearbeitet, History ist recht unübersichtlich; das wäre in Zukunft und grösseren Projekten sinnvoll

**Was gelernt:**

Der Aufwand war schwer einzuschätzen und war massiv mehr, als gedacht. 
Haben früh angefangen und trotztem bis zur Abgabe gebraucht. 
90 Stunden haben nie ausgereicht.

Wir haben auch auf Windows im I.E. Getestet und dann ein paar Optische fehler festgestellt.
Mussten Hardware beschaffen und Zeit invesstieren

Frameworks kennengelerent und die Mächtigkeit solcher.
Table in Classliste konnte wegen Angular nich mehr unterteilt werden - ansonsten hätte man Angular-Table benutzen müssen.

Durch User-Tests gemerkt, dass Abläufe/Funktionen/Struktur für den User unlogisch sein kann, was aber für uns klar war (Test-Person hat nich begriffen, wie er das Bild speichern soll, resp. Hat den letzten Schritt nicht gecheckt)
Umgang mit Services, Sideeffekt
Wir wissen jetzt wo es in Zürich und Winterthur öffentliche Orte gibt mit W-Lan ;)



**Nun folgt DEMO:** siehe presi_ablauf
