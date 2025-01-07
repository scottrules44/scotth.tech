### Google Sign In Plugin

Get users into your apps quickly and securely, using a registration system they already use and trust with Google Sign In.

#### Platforms:
This plugin only works on iOS and Android.

#### Functions:

**`googleSignIn.init(options)`**  
Initialize Google Sign In.

- **options (table)**:
	- **ios**:
		- `clientId (string)`: Client ID for Google Sign-In (found in Google Console, see setup).
		- `hostedDomain (string, optional)`: The Google Apps domain to which users must belong to sign in.
		- `serverClientID (string, optional)`: Web client (Auto-created for Google Sign-In).
	- **android**:
		- `clientId (string)`: Client ID for Google Sign-In (found in Google Console, see setup).

```lua
googleSignIn.init({
	ios = {
		clientId = "652763858765-ati8ar1t20ofebu4a39nhk7ea9oqmuu1.apps.googleusercontent.com"
	},
	android = {
		clientId = "652763858765-hq7huph5a5to4m39gqsoo7cn0ih3bd3d.apps.googleusercontent.com",
	}
})
```

**`googleSignIn.signIn(listener)`**  
Sign in to Google.

- **listener (function)**: 
	- `event.status` can be "signed in", "cancelled", "error".
	- If `event.isError` is true, then `event.error` will be returned.
	- If `event.isError` is false, then `event.email`, `event.userId`, `event.idToken`, `event.photoUrl`, `event.displayName`, `event.givenName`, `event.familyName`, `event.accessToken`, `event.serverAuthCode`, `event.scopes` will be returned.

**`googleSignIn.silentSignIn(listener)`**  
Sign in to Google without popup.

- **listener (function)**: 
	- `event.status` can be "signed in", "cancelled", "error".
	- If `event.isError` is true, then `event.error` will be returned.
	- If `event.isError` is false, then `event.email`, `event.userId`, `event.idToken`, `event.photoUrl`, `event.displayName`, `event.givenName`, `event.familyName`, `event.accessToken`, `event.serverAuthCode`, `event.scopes` will be returned.

**`googleSignIn.signOut(listener)`**  
Sign out of Google.

- **listener (function)**: 
	- `event.status` can be "signed out", "error".
	- If `event.isError` is true, then `event.error` will be returned.

**`googleSignIn.disconnect(listener)`**  
Disconnect current Google user from app.

- **listener (function)**: 
	- `event.status` can be "signed out", "error", "disconnected".
	- If `event.isError` is true, then `event.error` will be returned.

**`googleSignIn.getCurrentUser(listener)`**  
Returns the current user information if signed in.

- **listener (function)**: 
	- `event.status` can be "account data found", "not signed in".
	- If `event.isError` is true, then `event.error` will be returned.
	- If `event.isError` is false, then `event.email`, `event.userId`, `event.idToken`, `event.photoUrl`, `event.displayName`, `event.givenName`, `event.familyName`, `event.accessToken`, `event.serverAuthCode`, `event.scopes` will be returned.

**`googleSignIn.requestScope(scope, listener)`**  
Requests scopes for a signed-in user. -- Note this is being phased out

- **scope (array of strings)**: The API scopes requested by the app. Example: `{"https://www.googleapis.com/auth/drive.appdata"}` (see [docs](https://developers.google.com/identity/protocols/googlescopes)).
- **listener (function)**: 
	- `event.status` can be "scope request successful", "scope request canceled", "request scope failed", "error".
	- If `event.isError` is true, then `event.error` will be returned.
	- If `event.isError` is false, then `event.email`, `event.userId`, `event.idToken`, `event.photoUrl`, `event.displayName`, `event.givenName`, `event.familyName`, `event.accessToken`, `event.serverAuthCode`, `event.scopes` will be returned.

#### Setup:

Go to [Google Console](https://console.developers.google.com), create a new project or open an existing project, enable credentials (Under APIs & Services), create a new credential


On Android follow steps 1-4 and grab the "Web application Client Id" for Android in [Set up your Google APIs console project](https://developer.android.com/identity/sign-in/credential-manager-siwg#set-google)


On iOS click your created client ID under OAuth 2.0 client IDs, you want to use this client ID on iOS (see example below), and put "iOS URL scheme" into build.settings (see below). Also, you need Google service enabled in your build.settings (see below) and you need a google-services.json file (if you are not using Firebase you can skip this step). Go to [this link](https://developers.google.com/mobile/add?platform=android&cntapi=signin&cnturl=https:%2F%2Fdevelopers.google.com%2Fidentity%2Fsign-in%2Fandroid%2Fsign-in%3Fconfigured%3Dtrue&cntlbl=Continue%20Adding%20Sign-In), follow the steps, and put the file (google-services.json) in the root of your project (again this is only needed if using Firebase).

#### Firebase setup:

Go into the authentication page on Firebase and enable Google Sign-In. Then you need to add your fingerprint under settings > general > your apps > select app > add fingerprint. What's a fingerprint and how do I get it? Go [here](https://developers.google.com/android/guides/client-auth) and get your fingerprint. Download Google services files for iOS and Android. For Android, you have to include the google-services.json file in the project. On iOS, you don't have to for Google Sign-In. On iOS, you just need the "CLIENT_ID" from the Google services plist for the client ID in `.init()` (also put into "iOS URL scheme" into build.settings (see below)). On Android, the client ID is in the google-services.json under client > oauth_client > client_type = 3.

```lua
local googleSignIn = require "plugin.googleSignIn"
googleSignIn.init({
	ios = {
		clientId = "652763858765-ati8ar1t20ofebu4a39nhk7ea9oqmuu1.apps.googleusercontent.com"
	},
	android = {
		clientId = "652763858765-hq7huph5a5to4m39gqsoo7cn0ih3bd3d.apps.googleusercontent.com",
	}
})
googleSignIn.signIn(function (ev) end)
```

#### Build Settings:

```lua
settings =
{
	android = {
		useGoogleServicesJson = true,
	},
	iphone =
	{
		plist =
		{
			CFBundleURLTypes = {
				{ CFBundleURLSchemes = {
					"com.googleusercontent.apps.replace",
				}}
			},
		},
	},
	plugins =
	{
		["plugin.googleSignIn"] =
		{
			publisherId = "tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```

#### Helpful Links:

- [Get Plugin](https://solar2dmarketplace.com/plugins?GoogleSignIn_tech-scotth)
- [Example](https://github.com/scottrules44/googleSignIn-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)