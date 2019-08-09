# create-teqfw-app

Template to create TeqFW based web applications using npm.

**ATTN**: *It is my own test package, not public ready. Please, use it but don't be offended.*



# TeqFW App files structure

TeqFW based application has the following typical structure:

- **app**: application source scripts;
- **bin**: application executable scripts;
    - **tequila.js**:
- **cfg**: configuration scripts;
    - **local.init.json**: template to create configuration for local instance (`local.json`);
- **doc**: documentation files;
- **pub**: public files (frontend);
- **test**: *your* test scripts;
- **var**:
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