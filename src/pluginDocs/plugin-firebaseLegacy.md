# Firebase (Legacy)

This plugin uses [Firebase](https://www.firebase.com), which is a place to store information. Note this plugin only supports login and database management.

### Legacy:
This plugin is no longer being maintained. Please see the [source code](https://github.com/scottrules44/firebase-plugin-source) and consider using the [other Firebase plugins](https://marketplace.coronalabs.com/search?search=firebase).

### Fill Before You Start:

`firebase.myUrl = "myUrl"`
— myUrl is found under console.firebase.google.com > your app > database > the only URL you should see (https://ProjectIdHere.firebaseio.com/)

`firebase.databaseSecret = "databaseSecret"`
— databaseSecret is found under console.firebase.google.com > your app > settings (gear icon) > project settings > database (in tab bar at top) > Database secrets > drag mouse down, click show > copy and paste here

`firebase.myKey = "myKey"`
— myKey is found under console.firebase.google.com > your app > settings (gear icon) > project settings > cloud messaging (in tab bar at top) > server key > copy and paste here

### Functions:

#### firebase.quickLogin(lis)
Does a quick login if a refresh token is stored.

- lis (function)(optional) — returns `error` (string), `isError` (boolean), `response` (string). If isError is true there will be no response, and if isError is false there will be no error.

#### firebase.login(email, password, lis, haveVerf)
- email (string)(required) — the email of the person you would like to log in with
- password (string)(required) — the password of the account
- lis (function)(optional, recommended) — lets you know if the login was successful. Returns `error` (string), `isError` (boolean), `response` (string).
- haveVerf (boolean)(optional, default false) — will check if user has verified email and will return error if not

#### firebase.loginWithSocial(access_token, providerId, requestUri, lis)
Firebase supports Facebook, Twitter, GitHub, and Google Plus. This has been tested with Google and Twitter but should work with Facebook and GitHub as well.

- access_token (string)(required) — the access token from a provider
- providerId (string)(required) — Firebase supports "google.com", "facebook.com", "twitter.com", or "github.com". Make sure each social login service you use is enabled in your Firebase console (Develop > Auth > Sign In Method)
- requestUri (string)(required) — found on console.firebase.google.com > auth > sign in method, click on a service and a callback URL should be there; grab it and paste it here.
- lis (function)(optional, recommended) — lets you know if the login was successful. Returns `error` (string), `isError` (boolean), `response` (string).

#### firebase.signOut(lis)
- lis (function)(optional, recommended) — lets you know if the sign out was successful. Returns `error` (string), `isError` (boolean), `response` (string).

#### firebase.createAccount(email, password, lis, haveVerf, signinAfterCreate)
- email (string)(required) — the email you want to create an account with
- password (string)(required) — the password to go with the account
- lis (function)(optional, recommended) — lets you know if the account was successfully made. Returns `error` (string), `isError` (boolean), `response` (string).
- verfiyEmail (boolean)(optional, default true) — will send a verification email
- signinAfterCreate (boolean)(optional, default true) — will sign in after the account is made

#### firebase.resetPassword(email, lis)
- email (string)(required) — the email of the account you would like to reset
- lis (function)(optional, recommended) — lets you know if the password reset was successful. Returns `error` (string), `isError` (boolean), `response` (string).

#### firebase.setAccountInfo(displayName, email, password, lis)
- displayName (string)(optional) — the display name you would use
- email (string)(optional) — email you would like to use
- password (string)(optional) — password you would like to use
- lis (function)(optional, recommended) — lets you know if the info was successfully changed. Returns `error` (string), `isError` (boolean), `response` (string).

#### firebase.getAccountInfo(lis)
- lis (function)(optional, recommended) — account info is in event.response. Returns `error` (string), `isError` (boolean), `response` (string).

#### firebase.uploadUserData(data, lis)
- data (table)(required) — the data you would like to upload to a user's storage
- lis (function)(optional, recommended) — lets you know if upload was successful. Returns `error` (string), `isError` (boolean), `response` (string).

#### firebase.deleteUserData(lis)
- lis (function)(optional, recommended) — lets you know if delete was successful. Returns `error` (string), `isError` (boolean), `response` (string).

#### firebase.updateUserData(data, lis)
- data (table)(required) — the data you would like to update in a user's storage
- lis (function)(optional, recommended) — lets you know if update was successful. Returns `error` (string), `isError` (boolean), `response` (string).

#### firebase.getUserData(lis)
- lis (function)(optional, recommended) — data is returned via event.response. Returns `error` (string), `isError` (boolean), `response` (string).

#### firebase.deleteAccount(lis)
- lis (function)(optional, recommended) — lets you know if account was deleted. Returns `error` (string), `isError` (boolean), `response` (string).

#### firebase.uploadData(path, data, lis)
- path (string)(required) — where to store the data in the database
- data (table)(required) — data you would like at the path specified
- lis (function)(optional, recommended) — lets you know if data was uploaded. Returns `error` (string), `isError` (boolean), `response` (string).

#### firebase.updateData(path, data, lis)
- path (string)(required) — where to update the data in the database
- data (table)(required) — data you would like at the path specified
- lis (function)(optional, recommended) — lets you know if data was updated. Returns `error` (string), `isError` (boolean), `response` (string).

#### firebase.deleteData(path, lis)
- path (string)(required) — where to delete data in the database
- lis (function)(optional, recommended) — lets you know if data was deleted. Returns `error` (string), `isError` (boolean), `response` (string).

#### firebase.getData(path, lis)
- path (string)(required) — where to get data from the database
- lis (function)(optional, recommended) — data is returned via event.response. Returns `error` (string), `isError` (boolean), `response` (string).

#### firebase.encodeFile(filename, dir)
- filename (string)(required) — where file is located
- dir (Directory constant)(optional, default system.ResourceDirectory) — what directory the file is located in

Returns the file as a string; this string can be stored in the database.

#### firebase.decodeFile(txt, dir)
- txt (string)(required) — the text from firebase.encodeFile to turn back into a file
- dir (Directory constant)(optional, default system.DocumentsDirectory) — what directory the file is located in

Returns filename and directory. There is no built-in way to put a file in a specific folder; there are plenty of ways to do this yourself.

### Variables:

- `firebase.isLoginedIn` — tells you if the user can make requests
- `firebase.get` — handy for GET sendType
- `firebase.put` — handy for PUT sendType
- `firebase.post` — handy for POST sendType
- `firebase.delete` — handy for DELETE sendType
- `firebase.patch` — handy for PATCH sendType
- `firebase.haveRefreshToken` — can tell you if a refresh token is stored or not

### App Transport Security URLs:

- googleapis.com
- google.com
- firebaseapp.com
- firebaseio.com

Set `NSIncludesSubdomains = true`. Check out Corona's guide [here](https://docs.coronalabs.com/guide/hardware/appleATS/index.html).

### Build Settings:

[View Example on GitHub Gist](https://gist.github.com/scottrules44/324e0615fce9c0f79be7132de8068054)

##### Helpful Links:
- [Get Source](https://github.com/scottrules44/firebase-plugin-source)
- [Example](https://github.com/scottrules44/firebase-demo)
- [Support](https://forums.coronalabs.com/forum/654-corona-store-plugins/)
