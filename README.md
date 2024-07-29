# Starter Repository for Assignment
You are required to build your folder structures for your project.

## Prerequisites

Before running the tests, ensure that the following dependencies are installed:

- Node.js
- npm (Node Package Manager)

## Clone the Repository

1. Open Visual Studio Code (VSCode) on your local machine.

2. Click on the "Source Control" icon in the left sidebar (the icon looks like a branch).

3. Click on the "Clone Repository" button.

4. In the repository URL input field, enter `https://github.com/ST0503-BED/your-repository-name.git`.

5. Choose a local directory where you want to clone the repository.

6. Click on the "Clone" button to start the cloning process.

## Setting Up Environment Variables

This repository provides instructions for setting up environment variables using a `.env` file in an Express.js application. The environment variables will be used in the `db.js` file located in the `src/services` directory.

### Setup

To set up environment variables for your Express.js application, follow these steps:

1. Create a file named `.env` in the root directory of your project.
2. Open the `.env` file and add the following lines:

   ```
   DB_HOST=<your_database_host>
   DB_USER=<your_database_user>
   DB_PASSWORD=<your_database_password>
   DB_DATABASE=<your_database_name>
   JWT_SECRET_KEY=<your_secret_key>
   JWT_EXPIRES_IN=<duration>
   JWT_ALGORITHM=<selected_algorithm>
   ```

   Replace `<your_database_host>`, `<your_database_user>`, `<your_database_password>`, and `<your_database_name>` with the appropriate values for your database connection.

   For example:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your passwor
   DB_DATABASE=ca2_erd
   JWT_SECRET_KEY=SECRET
   JWT_EXPIRES_IN=60m
   JWT_ALGORITHM=HS256
   ```

   Note: Make sure there are no spaces around the equal sign (=) in each line.

3. Save the `.env` file.

### Usage

The `db.js` file in the `src/services` directory uses the `dotenv` package to read the `.env` file and set the environment variables. Here's an example of how the `db.js` file should look:

```javascript
require('dotenv').config(); // Read .env file and set environment variables

const mysql = require('mysql2');

const setting = {
    connectionLimit: 10, // Set limit to 10 connections
    host: process.env.DB_HOST, // Get host from environment variable
    user: process.env.DB_USER, // Get user from environment variable
    password: process.env.DB_PASSWORD, // Get password from environment variable
    database: process.env.DB_DATABASE, // Get database from environment variable
    multipleStatements: true, // Allow multiple SQL statements
    dateStrings: true // Return date as string instead of Date object
}

const pool = mysql.createPool(setting);

module.exports = pool;
```

The `dotenv` package is used to load the environment variables from the `.env` file, and `process.env` is used to access these variables in your code.

Make sure to include the `require('dotenv').config();` line at the beginning of your file to load the environment variables from the `.env` file.

## Important Note

Ensure that the `.env` file is included in your `.gitignore` file to prevent sensitive information (such as database credentials) from being exposed in your version control system.

That's it! You have successfully set up environment variables using a `.env` file in your Express.js application. These variables can now be accessed in the `db.js` file or any other part of your application where needed.

Now you can move on to next part below.

## Install Dependencies

1. Open the terminal in VSCode by going to `View` > `Terminal` or using the shortcut `Ctrl + ``.

2. Navigate to the project root directory.

3. Install the required dependencies using npm:

   ```
   npm install express nodemon mysql2 dotenv bcrypt jsonwebtoken
   ```

## Database Initialization

1. Make sure you have a MySQL database available for the mock test. Update the database configuration details in the `.env` file.

2. To initialize the database tables and populate them with sample data, open the terminal in VSCode and run the following command:

   ```
   npm run init_tables
   ```

## Run Application

- 2 ways to start application
  1. npm start
  2. npm run dev

## HTML Pages
Home

Register

Login

Profile --> Update User

Teams --> Single Team Info

Quests --> Single Quest Info

Ranks:

Users --> Single User Info

Forum --> User Messages --> update Message

## How to use?

Open your browser and enter http://localhost:3000

### register

Click on the Register button to go to register.html

Enter your details and click the Signup button

You will be redirected to profile.html

### login

If you want to login instead,

Click on the Login button to go to login.html

Enter your details and click the Login button

You will be redirected to profile.html

<!-- Error 1: If an unknonwn username is entered, it will state "User not found" all fields will reset -->

<!-- Error 2: If the wrong password is entered, it will state "Wrong password" all fields will reset -->

### profile

In profile.html,

You can delete your account by clicking the delete button in the profile.html

You can update your details by clicking on the Update details button

If you are not in a team, you can click the View All Teams button which will redirect you to teams.html

<!-- Error 1: If toke as timed out, it will state "Session timed out, log out and log back in to continue" -->

#### update User

Enter your new details and then click submit

You will be redirected to login.html

### teams

In teams.html,

You can create your own team by entering team name and then clicking the Create button

You can also view the available teams' details such as points and members by clicking Expand button

#### Single Team Info

In singleTeamInfo.html,

You can join the team by clicking the Join button but make sure you are logged in

<!-- Error 1: If you are not logged in, it will state "Login to join a team" -->

<!-- Error 2: If you are already in a team, it will state "Each user can only join one team" -->

### rankings

In rankings.html,

You can view all ranks available for teams and what are the minimum points every team has to achieve to get the rank

### quests

In quests.html,

You can view all Quests and click the Enter button of the quest you want to do

#### Single Quest Info

In singleQuestInfo.html,

You can complete the quest by clicking the Complete button

Now your team will get the points as stated

Your team will rank up if it hits the minimum points for the rank

<!-- Error 1: If you are not logged in, it will state "Login and join a team to complete quests" -->

<!-- Error 2: If you are not in a team, it will state "You are not in a team. Join one to complete quests" -->

### users

In users.html,

You can view all users registered in the website, there will be a View details button for every user

You can click the button to view more details about the user such as team and level

#### Single User Info

In singleUserInfo.html,

You can view selected users' public details and his/her team.

### forum

In forum.html,

You can view and send messages globally

You can click Your Messages button to view your own mesages

<!-- Error 1: If you are not logged in, it will state "Login or Register to send messages" but you can still view messages -->

#### user Messages

In userMessages.html,

You can delete any of your messages

##### update Message

You can also click the Update Message button on any message to edit that messsage in updateMessage.html

Finally, you can click the logout button to log out

It will bring you to login.html