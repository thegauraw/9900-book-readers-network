# The Front-end of Book Recommendation System

## Before getting started

Making sure that you are running npm version v7.0.0+ and node v16.0.0+. Otherwise, download the nvm script to manage node versions with the following steps (supposed that you are running this project in VLAB):

```bash
#Run this command in your command-line
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
~/.profile
nvm -v #To make sure that you have installed it properly
```

Then you can run following commands to install the npm and node version the project used:

```bash
nvm install 16
nvm use 16
node -v #expected output is v16.xx.xx
```

## Run it locally

```
npm install
npm run start
```

## Code structure

```js
frontend
│   README.md
│   package.json
│   tsconfig.json    //Typescript Configs
│   firebase.json    //for Firebase Hosting
│   .firebaserc.json //for Firebase Hosting
│   .prettierrc.json //Code formatter configuration (have to install prettier extension on IDE to config it)
|
└───src
│   │   index.tsx
│   │   theme.ts     //customized Material-UI theme settings, could include colors, fonts, other global settings
│   │
│   └───components   //all components and pages
│   └───pages        //all pages
│   └───assets       //all images the frontend used
│   │
│   └───config       //project configuration
│   │
│   └───utils        //state and localStorage data management
│   │
│   └───services     //all API callable functions
|   └───types        //all important data types definition
|
└───public           //HTML manifest
```

## Deploy it to Cloud

This project has been hosted on Firebase Hosting, https://daydayup-9900.web.app/

### How to deploy

Reference: [Hosting](https://firebase.google.com/docs/hosting/test-preview-deploy)

One time setting:

```bash
npm install -g firebase-tools
firebase login #login with a google account in which has been invited to join the Google Cloud Project.
```

After that, run commands for building and then deploying:

```
npm run publish-pre         #build and deploy it with a temporary link
npm run publish-prod        #build and deploy it to the cloud
```
