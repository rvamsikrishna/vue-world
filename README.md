# Vue-world

An application where you can create and host events built using vuejs, vue-router, vuex and firebase.

## Getting Started
Clone this repo on to your local machine

### Prerequisites

This project uses firebase. So create a firebase project. Then create a file named `firebase-cnfig.js` in the root of src folder and add the firebase app credentials in it as: 
```
export const config = {
  apiKey: 'XXXXXXX',
  authDomain: 'XXXXXXXX',
  databaseURL: 'XXXXXXX',
  projectId: 'XXXXXXXX',
  storageBucket: 'XXXXXXXXXX',
  messagingSenderId: 'XXXXXXXXXXX'
}

```

We use firebase cloud funcions. So install firebase CLI globally using:

```
npm install -g firebase-tools
```

Then `cd` into your project folder and log in via the browser and authenticate the firebase tool:

```
firebase login
```

`cd` into functions folder of your project and install dependencies:

```
cd functions

npm install

```
We use algolia to add searh functionality.

Create an Algolia account at [www.algolia.com](https://www.algolia.com/).

Enable Billing on your Firebase project by switching to the Blaze or Flame plans you need billing enabled to allow external requests. For more information have a look at the [pricing page](https://firebase.google.com/pricing/).

Set the `algolia.app_id` and `algolia.api_key` Google Cloud environment variables to match the Algolia application ID and API key of your account. For this use:

```
firebase functions:config:set algolia.app_id="myAlgoliaAppId" algolia.api_key="myAlgoliaApiKey"

```

Now deploy your functions using

```
firebase deploy --only functions
```

### Installing

Get a development env running
Install the project dependencies and start the dev server
```javascript
// in the root directry of the project
npm install

//serve the app
npm run serve
```
