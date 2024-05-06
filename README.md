# AuthService

AuthService is a microservice API to manage users sessions.

## Functionalities

- Create users
- Create session with expiration
- JWT token verification

## Install guide

1. Install Mariadb, and create the db using auth.sql.

2. Install Node.js version >= v22.1.0. I recommend a LTS version.

3. Copy the source code, and go in the directory with a terminal, then run the command bellow to install dependencies.

````
npm i
````

4. Create a file named .env, it's a config file for the service. here is an exemple on how you can fill it:

````
# DB connection information
DBHOST=localhost
DBNAME=auth
DBUSER=namu
DBPASS=1234

# Make a random token with the exac same length. It's used to generate JWT.
TOKEN_SECRET=baeb6784dad4bc49a6ca90981cd9a236aac4c34c0797971f836603825cd4e058631a3ee26aaa7dcd521f0f4e7e6843942e97c7fa65980c89980864f3ed5715b5
SESSION_DURATION=1h

# Http server config
HOST=localhost
PORT=3000

# Environement (set to development to have debug information)
NODE_ENV=production

````

5. To launch the app, run:

````
node app.js
````
Or, for a development environment:
````
npm start
````

6. Connect to http://yourhost:port/api-docs/ to get the swagger UI

## Author

[@Namularbre](https://github.com/namularbre)
