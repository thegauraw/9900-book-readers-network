# The Front-end of Book Recommendation System

## Visit the project: https://bookrs.web.app/

## Run it locally

```
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
│   .prettierrc.json //for code format
|
└───src
│   │   index.tsx
│   │   theme.ts     //customized Material-UI theme settings, could include colors, fonts, other global settings
│   │
│   └───components   //all components and pages
│   │
│   └───config       //project configuration
│   │
│   └───contexts     //for state management
│   │
│   └───services     //for all api calls
|
└───public           //for HTML manifest
```

## Deploy it to Firebase Hosting

#### Reference: [Hosting](https://firebase.google.com/docs/hosting/test-preview-deploy)

One time setting:

```
npm install -g firebase-tools
firebase login
```

After that, run commands for building and then deploying:

```
npm run publish-pre         #build and deploy it with a temporary link
npm run publish-prod        #build and deploy it to [bookRS](https://bookrs.web.app/), may set it up to deploy the main branch automatically later.
```
