# CasFeeProject2: School
School is a tool to organize and communicate between teachers, parents and children. 

## Technologie stack
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

- Angular 5: Frontend Framework
- Express.js: Backend Framework
- Node.js: runtime environment
- MySQL: Database
- Sass: as style sheet language
- Boostrat v4.0.0-beta.3: Framework for layouting
- Open Sans: google-font

## installation
###Requirements:
- node >= 7.9
- Mysql (make sure that STRICT_TRANS_TABLES is not configured in my.cnf)
- Windows / OSX Plattform

###Anleitung
1) download project
2) entpack (if not already) to dir and switch to dir
3) npm install
4) install db -> see ./server/readme.md
5) start server:
  - change to directory ./server 
  - npm install </li>
  - install mysql (z.B. mit MAMP (osx))
    - create database "school_development" & user/pw "school"
    - run scripts under sql (it create and fills tables)
  - start node server:
  go to server dir 
  <h5>command:</h5>
  node index.js 

6) if you have ng globally installed (npm install -g ) then just:
ng serve 
if not then switch to ./node_modules/@angular/cli/bin and type ng serve

###User-Credentials
to use the tool as registered user use:
Benutzername: test@test.com
Password: test99!

to use the tool as admin/teacher:
Benutzername: lehrer@test.com
Password: test99!

## Modules
Description of the modules can be found [here](https://github.com/eyesight/cas-fee-project2/blob/master/_01admin-stuff/00_modul-definition.md)

## Specials

- User-Tests: 
  - Person 1: Pictures and results can be found [here](https://github.com/eyesight/cas-fee-project2/blob/master/_04UserTests/User-Test_Jonas.md)
- [e2e-Tests with puppeteer](https://github.com/eyesight/cas-fee-project2/blob/master/e2e_test_puppeteer)

## Further informations


## Authors
- Andreas Wildisen
- Claudia Friedrich

