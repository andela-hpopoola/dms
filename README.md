[![Build Status](https://travis-ci.org/andela-hpopoola/dms.svg?branch=develop)](https://travis-ci.org/andela-hpopoola/dms)
[![Coverage Status](https://coveralls.io/repos/github/andela-hpopoola/dms/badge.svg?branch=develop)](https://coveralls.io/github/andela-hpopoola/dms?branch=develop)
[![Code Climate](https://codeclimate.com/github/andela-hpopoola/dms/badges/gpa.svg)](https://codeclimate.com/github/andela-hpopoola/dms)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
# Document Management System (DMS)

DMS is a modern full stack document management system, complete with roles and privileges. It creates a restful API for users to create and manage documents and for admins to manage users. 

## Table of Contents

1. Technologies
2. Features
2. Installation and Setup
3. Testing the application
4. Limitations
5. How To Contribute

## Technologies
This project built with React and Redux architecture. Nodejs and Express are used for server side development. The application data is persisted with POSTGRES. The application is styled with SASS and bundled with Webpack.
1. React & Redux: React is used for rapid front-end web developement. React is the "V" in your MVC, but with the Redux Application Architecture you can add the "M & C" to easily wire up components into a working application. Redux is a predictable state container for JavaScript apps.
2. NodeJS & Express: NodeJS is a server-side JavaScript runtime engine built on Chrome's V8 JavaScript engine. Express is used as a web development framework. Express is a fast, unopinionated, minimalist web framework for Node.js.
3. Postgresql & Sequelize: Postgresql is the world's most advanced open source Object-Relational Model (ORM) database.Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
4. Sass: Sass stands for Syntactically Awesome Style Sheets. It is the most mature, stable, and powerful professional grade CSS extension language in the world.
5. Webpack: Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging modules.


## Features

#### Users
Users can perform the following actions with the application
  - Create documents
  - Edit documents
  - Delete documents
  - View documents
  - Search for documents (Private, Public and Role)
  - View All Documents (All Documents)

Admin can perform all users actions and the following actions
  - Edit public documents
  - Search for Users
  - Search for documents

Super Admin can perform all admin and users actions and the following actions
  - Create roles
  - Edit roles

#### Documents
A single document has the following properties
  - Title
  - Content
  - Access right : Private (default), Public and Role
  - User ID

#### Roles
The application contains 3 roles by default
  - SuperAdmin
  - Admin
  - User

#### Authentication
The api endpoints are protected from authorized access. The unprotected endpoint are the signup and login endpoint. JWT token is used to protect the application against unauthorized access. Some of the endpoints are also protected by roles.


## Endpoints

#### Users

  EndPoint              | Functionality                             | Access
 ----------             | ---------------                           | ------------------ 
`POST /users/login`     |   Logs in a user.                         |  No Authentication
`POST /users/logout`    |   Logs out a user.                        |  No Authentication
`POST /users`           |   Creates a new user.                     |  Admin / SuperAdmin
`GET /users`            |   Find matching instances of user.        |  Admin / SuperAdmin
`GET /users/:id`        |   Finds user.                             |  Admin / SuperAdmin
`PUT /users/:id`        |   Update user attributes.                 |  User
`DELETE /users/:id`     |   Deletes user                            |  Admin / SuperAdmin
`GET /users/:id/documents`   | Gets all documents for a particular user | User

#### Documents

  EndPoint              | Functionality                           | Access
 ----------             | ---------------                         | ------------------ 
`POST /documents`       |   Creates a new document instance.      |  User
`GET /documents`        |   Find matching instances of document.  |  User
`GET /documents/:id`    |   Find document.                        |  User
`PUT /documents/:id`    |   Updates document attributes.          |  User
`DELETE /documents/:id` |   Delete document.                      |  User
`GET search/documents/?q=${query}` | Search for a doc             |  User

All roles endpoints can only be accessed by the superadmin.

## Installation and Setup

1. Clone the repository:
```
https://github.com/andela-hpopoola/dms.git
```
2. Navigate into the cloned repository folder

3. Install dependencies:
```
$ npm install
```

4. Start the application:

```
http://localhost:8000/
```

5. Test the API endpoints with Postman


## Contribution
To contribute to the project, follow the instructions below
 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that I can review your changes

NOTE: Be sure to merge the latest from "upstream" before making a pull request!



## Limitations

1. Superadmin cannot customize a new role
2. A notification is not send to the user when his public document is edited
3. A number of people that have view a public document is tracked.


## Licence
Copyright (c) 2017 Haruna Popoola

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Copyright (c) 2017 Haruna Popoola