# E-Commerce Back End
[![MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

## Table of Contents
* [Description](#description)
* [User-Story](#user-story)
* [Acceptance-Criteria](#acceptance-criteria)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Questions](#questions)
* [Credits](#credits)

## Description

This code is a simple backend for a ecommerce website. It allows you to view, create, edit and delete products, categories and tags for products in any way you form. There is no front end of this code, so you must use a program similar to Insomnia to test and run the code yourself.

## User Story

```md
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

## Acceptance Criteria

```md
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete data in my database
```
## Installation

In order to use this ecommerce back end, you will need to have node.js and mysql installed, other than than all you need is to download the source code from this repository!

## Live Demo - Click for video

link: https://youtu.be/nkehu7QRJwg

## Usage

** You must create a .env file with the following variable names: **
```
DB_NAME='ecommerce_db'
DB_USER=''
DB_PASSWORD=''
```

To use the tracker, do the following:

1) Navigate to the project directory where you have downloaded the source code

2) Now run the following commands in order
----------

``` 
npm install 
```
----------
```
mysql -u root -p
```
----------

3) Assuming you have installed the node modules correctly and the code is not outdated, enter your MySQL password and run the following
```
SOURCE db/schema.sql
```
```
quit
```
YOU MUST RUN THEM IN THIS ORDER
----------
4) Now run the following commands
```
node seeds/index.js
```
```
npm start
```
5) Using insomnia or another similar program, manipulate the database as you see fit.

## License

  ```
  This project is covered under the MIT License license. To learn more about what this means, click the license button at the top
  ```

## Questions

Have questions about this project?\
GitHub: https://github.com/Harry-Ward15 \
Email: hward.1508@gmail.com

## Credits

Starter code was written by UWA Bootcamp 2022/23
