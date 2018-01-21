# CasFeeProject2: School
School is a tool to organize and communicate between teachers, parents and children. 

## Technologie stack
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

- Angular 4: Frontend Framework
- Express.js: Backend Framework
- Node.js: runtime environment
- MySQL: Database
- Sass: as style sheet language (compiled to css)
- We used BEM-Mixed as methodology
- Boostrat v4.0.0-beta.3: Framework for layouting
- Open Sans: google-font

## installation
<h4>Requirements:</h4>
<ul>
<li> node >= 7.9</li>
<li> npm >= 5.5</li>
<li>Mysql (make sure that STRICT_TRANS_TABLES is not configured in my.cnf)</li>
<li>OSX Plattform / Windows</li>
</ul>
<h4>Manual</h4>
<ul>
  <li>1. download project or git clone from this repo</li>
  <li>2. entpack (if necessary) to dir and switch to dir</li>
  <li>3. run:</li>
  
  ```bash
  npm install
  ```
  <li>4. install db </li>
  <li>5. start server:
  <ul>
  <li>change to directory ./server </li>
  <li>run: </li>
  
  ```bash
    npm install
   ```
  <li>install mysql (z.B. mit MAMP (osx))
  </li><li>run scripts under in MySql 
  </li><li>this will create the database school_test and fills tables and creates a systemuser school for this database
  </li>
  <li>start node server: 
  <br>go to server dir <br>
  enter to console:
  
```bash
node index.js
```

  </ul>
  </li>
  <li>6. if you have ng globally installed (npm install -g ) then run this command in the projects-root:
  
  ```bash
  ng serve
  ```
          
   if not then switch to ./node_modules/@angular/cli/bin and type ./ng serve</li>
</ul>

It runs on [localhost:4200](http://localhost:4200/) 

  
<h4>Testing</h4>
to use the tool as registered user use:

```bash
  Benutzername: test@test.com
  Password: test99!
```


to use the tool as admin/teacher:
```bash
  Benutzername: lehrer@test.com
  Password: test99!
```


## Modules
Description of the modules can be found [here](/_01admin-stuff/00_modul-definition.md)

## Testing
We wrote some Unit-tests and e2e-tests. For Unit-Tests run the following
```bash
  ng test
```
Open in browser: [localhost:9876](http://localhost:9876/) 


- User-Tests: 
  - Person 1: Pictures and results can be found [here](/_01admin-stuff/04UserTests/User-Test_Jonas.md)
  - Person 2: Pictures and results can be found [here](/_01admin-stuff/04UserTests/User-Test_Lehrerin.md)
  
- [e2e-Tests with puppeteer](/e2e_test_puppeteer)

## Specials: the good ones
 - imagecompression on client-side
 - avoid codebloat: we reduced the bootstrap to just the pieces of code, we really needed. (NO ng-material)
 - chat shows user if server is on- or offline
 - good structuring of the files: 
    - all directories in the app with "_" are shared
    - scss-files are in one directory and structured in config and theme (blocks)
 - server and client have always the same information about the authorization-status of the current user 
 - authentification and authorization is made with simple solutions (using guards)
 - User is guided and with error- and success-messages
 
## Specials: things which we'd like to improve for the next release
 - On the module image-loader the user should see the preview of the image in a modal-window and then click "speichern". It would be a more user-friendly solution.
 - in the next release we divide the registration-page into several parts. It's a large form the user has to fill out. It would be more user-friendly as well
 - Our Git-History is a mess ...

## Further informations
Interested to see our production-history/first steps?
- here you find some [mockups](/_01admin-stuff/01mockups_layout) 
- here you find our [prototype](/_02prototype) 


## Authors
- Andreas Wildisen
- Claudia Friedrich

