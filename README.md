# Employee-Registry V2

An employee management application that:

* Registration page so every employee can register itself
Employee must login before being able to use the application
Landing page as overview of existing employees

* A logged in employee can add another employee
Ability to import employees over a CSV file


* Being able to edit and delete employees

* Add and display comments to employees on employee detail page
* Display author and date of the comment

# Features 

* Backend : The app Use Atlas Could by MongoDB and ExpressJS. 
* Frontend : React and others dependencies. with useing of React Route
* Docker file.

# How it Works

```bash
cd /path/to/Root/APP

docker-compose up --build

``` 
Then check localhost:3000 , and it depends on your env files confguration. 

# ENV file

You may edit PORT and REACT_APP_API_BASE_URL for deploying on "Play with Docker"

## Tree

```bash
.
├── client
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── Components
│       │   ├── AddLoggedUser.js
│       │   ├── ButtonAddUser.js
│       │   ├── ButtonEdditUser.js
│       │   ├── Comments.js
│       │   ├── Employees.js
│       │   ├── HeaderNav.js
│       │   ├── ImportCSVui.js
│       │   ├── InputForm.js
│       │   ├── InsertComment.js
│       │   └── Toolbar.js
│       ├── Context
│       │   ├── AddUserContext.js
│       │   └── AuthUser.js
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── reportWebVitals.js
│       ├── Route.js
│       ├── service-worker.js
│       ├── serviceWorkerRegistration.js
│       ├── setupTests.js
│       └── Views
│           ├── Home
│           │   └── index.js
│           ├── Profile
│           │   └── index.js
│           └── Registration
│               ├── index.js
│               ├── signin.js
│               └── signup.js
├── docker-compose.yml
├── README.md
└── server
    ├── app.js
    ├── bin
    │   └── www
    ├── db
    │   └── config.db.js
    ├── Dockerfile
    ├── package.json
    ├── package-lock.json
    ├── routes
    │   ├── comment.js
    │   ├── deleteuser.js
    │   ├── index.js
    │   ├── signin.js
    │   ├── signup.js
    │   ├── upload.js
    │   └── users.js
    ├── tmp
    └── views
        ├── error.ejs
        └── index.ejs

```


