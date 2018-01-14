# CasFeeProject2: School
School is a tool to organize and communicate between teachers, parents and children. 

## Technologie stack
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

- Angular 5: Frontend Framework
- Express.js: Backend Framework
- Node.js: runtime environment
- MySQL: Database
- Sass: as style sheet language (compiled to css)
- Boostrat v4.0.0-beta.3: Framework for layouting
- Open Sans: google-font

## installation
<h4>Requirements:</h4>
<ul>
<li> node >= 7.9</li>
<li>Mysql (make sure that STRICT_TRANS_TABLES is not configured in my.cnf)</li>
<li>Windows / OSX Plattform</li>

<h4>Anleitung</h4>
<ul>
  <li>1. download project</li>
  <li>2. entpack (if not already) to dir and switch to dir</li>
  <li>3. npm install</li>
  <li>4. install db -> see ./server/readme.md</li>
<li>5. start server:
  <ul>
  <li>change to directory ./server </li>
  <li>npm install </li>
  <li>install mysql (z.B. mit MAMP (osx))
  </li><li>create database "school_development" & user/pw "school"
  </li><li>run scripts under sql (it create and fills tables)
  </li>
  <li>start node server: <br>go to server dir  <br>
                          *command:* <br>
                          node index.js <br></li>
  </ul>
  </li>
  <li>6. if you have ng globally installed (npm install -g ) then just:
         ng serve 
         if not then switch to ./node_modules/@angular/cli/bin and type ng serve</li>
  </ul>
  
<h4>User-Credentials</h4>
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
Interested to see our production-history/first steps?
- here you find some [mockups](https://github.com/eyesight/cas-fee-project2/tree/master/_01admin-stuff/01mockups_layout) 
- here you find our [prototype](https://github.com/eyesight/cas-fee-project2/blob/master/_02prototype) 


## Authors
- Andreas Wildisen
- Claudia Friedrich

