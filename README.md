<div style="text-align: center;">

# Alitt - Definitely Not Reddit

### <a href='https://alitt-app.herokuapp.com/api'> Hosted Version using Heroku</a>

Alitt is something I'm building as part of my back-end based project on the Northcoders Bootcamp. This is an API which aims to be somesort of reddit clone.

It's running using Express & PostgreSQL

## Getting Started

You can clone this repo to take a look yourself, my hosted version is linked above.
You will need to install the dependencies, once cloned open up your terminal and run "npm install" to install all necessary packages.


Next you will need to create two new files
* .env.test
* .env.development

Each of these will setup the database based on if you want the full database set or just some test data.\
Now edit each of these files and copy the following text into each 'PGDATABASE=database_name_here' and replace 'database_name_here' with the databases you are looking to access.

**The .env files are automatically added to git ignore so you will have to do this each time you clone the repo**


### Test File
Included is a test file, which will test each endpoint of the API, you can run this test file by running 'npm test app.test.js' in your terminal

## Version Requirments
Node Version Requirment - v17.8.0 \
PSQL Version Requirement - v14.2

</div>