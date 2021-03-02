# Sondages
Little app for creating polls. This app uses React, Graphql and Typescript. \
You probably need the server to run the app. \
You can find the server implementation [here](https://github.com/towaanu/sondages-server)

## Run for development
You can run the app in development mode using : `npm install && npm start` \
The app should be accessible at http://localhost:3000 \
In order to use the app you need the server. \
Environment variable can be configured in `.env`

## Create a build 
The build is using `.env.production` file for configuration. \
You can create a build using: `npm run build:production`. \
This command will create a build folder inside the current folder.

## Using docker

### Development
If you don't have node intalled locally you can run the app with docker using the following command : \
``docker run -v `pwd`:/sondages -p 3000:3000 -w /sondages node:alpine npm install && npm start`` \
The app should be accessible at http://localhost:3000

### Production build
You can get a production build using docker with the following command : \
`./docker.run.sh` \
This command will create a build folder inside the current folder.
