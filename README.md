# Welcome to Ali News 

## Initialising the databases

Now, you might be thinking Ali, this is a fantastic little news project you are building here, and you would be right. Now I know what you're thinking next, OMG there is no .env files and I cannot access your databases, don't worry little one I'm here to help.

First you will need to create two new files
* .env.test
* .env.development

Each of these will setup the database based on if you want the full database set or just some test data.\
Now edit each of these files and copy the following text into each 'PGDATABASE=database_name_here' and replace 'database_name_here' with the databases you are looking to access.


**The .env files are automatically added to git ignore so you will have to do this each time you clone the repo**

