# create-teqfw-app

Template to create TeqFW based web applications using npm.

**ATTN**: *It is my own test package, not public ready. Please, use it but don't be offended.*



# TeqFW App files structure

TeqFW based application has the following typical structure:

- **bin**: application executable scripts;
    - **command.js**:
    - **cron.js**:
    - **server.js**:
- **cfg**: configuration scripts;
- **doc**: documentation files;
- **pub**: client side startup files;
- **test**: *your* test scripts;
- **var**:
    - **log**: application logs;
    - **tmp**: application temporary files;
  
  
    
# Create new application 

```
$ npm init teqfw-app my-app
$ cd my-app
```  
  
  
    
# Place application to github

Create empty github repository `https://github.com/user/my-app` (w/o LICENSE, README, .gitignore, etc).

```
$ cd my-app
$ git init
$ git add .
$ git commit -m "Init TeqFW application."
$ git remote add origin git@github.com:user/my-app.git
$ git push -u origin master
```