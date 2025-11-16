# Data-intensive CT80A0000 Assignment 3 Repository, Roni Seppälä

## Project
This project demos only the following:
- 3 databases (1 point each)
- databases containing the correct ammount of data (3 points)

### How to run
- mirror the project folder
- install mongoDB and a mongoDB viewing tool of your choise
- run "npm install" in the root of the project
- run "npm run start" in the root of the project
This generates the data into 3 different databases in "mongodb://localhost:27017/"
Use the mongoDB viewing tool of your choise to check the data

## Structure
The demo has three different mongoDB databases made in using mongoose

The tables in the databases are inspired by a movie streaming website and include
1. User

|Field       |Type     |Extra      |
|------------|---------|-----------|
|fullName    |String   |Required   |
|email       |String   |Required   |
|city        |String   |Required   |
|createdAt   |Date     |           |
2. Content

|Field       |Type     |Extra      |
|------------|---------|-----------|
|title       |String   |Required   |
|contentType |String   |Required   |
|genre       |String   |Required   |
|year        |Number   |Required   |
|durationMin |Number   |Required   |
|ageRating   |String   |Reqiured   |
3. Subscription

|Field       |Type     |Extra      |
|------------|---------|-----------|
|userId        |ObjectId |Required   |
|planName      |String   |Required   |
|pricePerMonth |Number   |Required   |
|isActive      |Boolean  |Required   |
|startedAt     |Date     |           |
|endsAt        |Date     |           |
4. Rating

|Field       |Type     |Extra      |
|------------|---------|-----------|
|userId      |ObjectId |Required   |
|contentId   |ObjectId |Required   |
|liked       |Boolean  |Required   |
|comment     |String   |           |
|ratedAt     |Date     |           |
5. WatchHistory

|Field       |Type     |Extra      |
|------------|---------|-----------|
|userId      |ObjectId |Required   |
|contentId   |ObjectId |Required   |
|startedAt   |Date     |           |
|endedAt     |Date     |           |

## Note
Passwords were not included in the user database as with real data they would be encrypted, and storing any passwords in plain text, even fake ones, doesn't seem sensible

# AI notice
The dummy data in the databases was created with the assistance of ChatGPT-5.1-Extended thinking, and Copilot autocomplete with GPT-5-mini was intermittently used in code creation.