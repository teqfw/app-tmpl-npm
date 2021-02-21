# create-teqfw-app

Template to create TeqFW based web applications using npm.

**ATTN**: *It is my own test package, not public ready. Please, use it but don't be offended.*

# TeqFW App files structure

TeqFW based application has the following typical structure:

- **bin**: application executable scripts;
    - **tequila.js**:
- **cfg**: configuration scripts;
    - **init.json**: template to create local configuration for instance (`local.json`);
    - **init.sh**: template to create local configuration for shell scripts (`local.sh`);
- **doc**: documentation files;
- **src**: application sources (ES6 modules);
- **test**: *your* test scripts;
- **var**:
    - **tmp**: application temporary files;
- **web**: static files (html, css, images, ...);

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

# Configuration

```shell
$ cd ./cfg/
$ cp init.json local.json
$ cp init.sh local.sh
```

# Deployment

## 'dev' mode

```
$ ./bin/deploy/dev.sh
```

## 'live' mode

Clone project from git and copy deployment configuration inside then launch the deployment script.

Copy this file to root of installation folder (/home/live/inst/). Configuration files `local.json` & `local.sh` are
expected in the root folder.

Files and folders in the root folder:

```shell
      -rwxrwxr-x 1 live live  305 Jan  5 16:46 clone.sh
      drwxrwxr-x 9 live live 4.0K Jan  5 16:47 app_YYYYMMDD
      lrwxrwxrwx 1 live live   14 Jan  5 15:43 live -> app_YYYYMMDD
      -rw-rw-r-- 1 live live  591 Jan  5 15:40 local.json
      -rwxrwxr-x 1 live live  409 Jan  5 15:40 local.sh
```

```
$ cd ~/inst/
$ ./clone
$ cd ./app_YYYYMMDD
$ ./bin/deploy/live.sh
```
