
#installation
Requirements:
- node >= 7.9
- Mysql (make sure that STRICT_TRANS_TABLES is not configured in my.cnf)
- Windows / OSX Plattform

- Anleitung
1) download project
2) entpack (if not already) to dir and switch to dir
3) npm install
4) install db -> see ./server/readme.md
5) start server:
  - change to ./server 
  - follow those readme instructions 

6) if you have ng globally installed (npm install -g ) then just:
ng serve 
if not then switch to ./node_modules/@angular/cli/bin and type ng serve
#Backend

**Andy:**:


#Frontend-Utils
**Framework Bootstrap**

installations via npm
- jquery 
- popper.js
- bootstrap: ^4.0.0-beta

Bootstrap for Angular-modules
- https://valor-software.com/ngx-bootstrap/#/

//TODO: Solve Problems with scripts in angular-cli:
https://github.com/angular/angular-cli/issues/5665

-> Solution: update angular-cli to 1.4.4?

**fonts:**
https://fonts.google.com/specimen/Open+Sans


**helper:**

- Juicy Mixins
http://kylebrumm.com/juice/



#Ordner-Structure
**Sass-files**
- ...
- ...
- ...


#Info for the modules
AW: Http in Service verwenden -> HttpModule muss geladen werden im hauptmodule (root-module) unter imports
Hatte plötzlich Probleme mit autom. nachladen bei codeänderungen. Die Seite erschien nicht mehr. 
Habe dann HttpModule einmal auskommenteirt und wieder aktiviert - dann gings
