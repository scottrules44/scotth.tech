## About

This plugin allows you to log in though [firebase](https://firebase.google.com) auth for iOS(8+) and Android(4.0 +)

## Functions

#### firebaseAuth.init()

&nbsp;

#### firebaseAuth.createAccount(email, password, listener)
##### create account with email
email(string)
&nbsp;
password(string)
&nbsp;
listener(function) event.isError(boolean value, true if successful and false if not) and event.error(string value, description of error, nil if isError is false)
&nbsp;

#### firebaseAuth.signIn(email, password, listener)
##### login with email
email(string)
&nbsp;
password(string)
&nbsp;
listener(function) event.isError(boolean value, true if successful and false if not) and event.error(string value, description of error, nil if isError is false)
&nbsp;

#### firebaseAuth.sendVerification(listener)
##### send a verification email to logined in user
listener(function) event.isError(boolean value, true if successful and false if not) and event.error(string value, description of error, nil if isError is false)


&nbsp;

## Functions

### firebaseAuth.resetPassword(email, listener)
**send an email to reset password**  
- **email** (string): Email to send reset to  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not) and `event.error(string value)` (description of error, nil if `isError` is false)  

&nbsp;

### firebaseAuth.isSignedIn()
**returns boolean, true if logged in, false if not**

&nbsp;

### firebaseAuth.isEmailVerified()
**returns boolean, true if email on account logged in is verified, false if not**

&nbsp;

### firebaseAuth.isAnonymous()
**returns boolean, true if account is anonymous, false if not**

&nbsp;

### firebaseAuth.getUID()
**returns string, unique identifier for account**

&nbsp;

### firebaseAuth.getEmail()
**returns string, email for account**

&nbsp;

### firebaseAuth.getProviders()
**returns array of strings, for providers of account (email auth:"password", google auth: "google.com", etc)**

&nbsp;

### firebaseAuth.getDisplayName()
**returns string, display name for account**

&nbsp;

### firebaseAuth.getPhoneNumber()
**returns string, phone number for account**

&nbsp;

### firebaseAuth.getPhotoUrl()
**returns string, URL (http://) for account photo**

&nbsp;

### firebaseAuth.getRefreshToken(listener)
**get refresh token for account**  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not), `event.error(string value)` (description of error, nil if `isError` is false), and `event.token (string value)` (refresh token)  

&nbsp;

### firebaseAuth.setPhotoUrl(url, listener)
**set URL for account photo**  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not) and `event.error(string value)` (description of error, nil if `isError` is false)  

&nbsp;

### firebaseAuth.setEmail(email, listener)
**set email for account**  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not) and `event.error(string value)` (description of error, nil if `isError` is false)  

&nbsp;

### firebaseAuth.setDisplayName(name, listener)
**set name for account**  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not) and `event.error(string value)` (description of error, nil if `isError` is false)  

&nbsp;

### firebaseAuth.updatePassword(password, listener)
**update password for account**  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not) and `event.error(string value)` (description of error, nil if `isError` is false)  

&nbsp;

### firebaseAuth.deleteAccount(listener)
**delete account**  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not) and `event.error(string value)` (description of error, nil if `isError` is false)  

&nbsp;

### firebaseAuth.signOut(listener)
**sign out of account**  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not) and `event.error(string value)` (description of error, nil if `isError` is false)  

&nbsp;

### firebaseAuth.sendVerificationCode(phoneNumber, listener)
**send verification code to phone to be used with `.signInWithPhoneNumber`**  
- **phoneNumber** (string): Phone number to send code to  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not) and `event.error(string value)` (description of error, nil if `isError` is false)  

&nbsp;

### firebaseAuth.signInWithPhoneNumber(code, listener)
**sign in with verification code sent to phone using `.sendVerificationCode`**  
- **code** (string): Code sent with `.sendVerificationCode`  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not) and `event.error(string value)` (description of error, nil if `isError` is false)  

&nbsp;

### firebaseAuth.signInWithApple(listener)
**sign in with Apple**  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not) and `event.error(string value)` (description of error, nil if `isError` is false)  
- **Note:** For iOS, add provisioning profile support for Apple sign-in in your Apple Developer account, and include the necessary configurations in your `build.settings`.

```
settings =
{
	iphone =
	{
		entitlements = {
			["com.apple.developer.applesignin"] = {"Default"}, -- make sure provisioning profile supports Apple Sign In
		}
	},
}
```

For Android, read the Firebase guide [here](https://firebase.google.com/docs/auth/android/apple#before-you-begin).

&nbsp;

## Functions

### firebaseAuth.signInWithGoogle(idToken, accessToken, listener)
**sign in with Google**  
- **idToken** (string): ID token for Google  
- **accessToken** (string): Access token for Google  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not) and `event.error(string value)` (description of error, nil if `isError` is false)`  

&nbsp;

### firebaseAuth.signInWithFacebook(accessToken, listener)
**sign in with Facebook (Please note you have to handle sign in yourself)**  
- **accessToken** (string): Access token for Facebook  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not) and `event.error(string value)` (description of error, nil if `isError` is false)`  

&nbsp;

### firebaseAuth.signInWithTwitter(token, secret, listener)
**sign in with Twitter (Please note you have to handle sign in yourself)**  
- **token** (string)  
- **secret** (string)  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not) and `event.error(string value)` (description of error, nil if `isError` is false)`  

&nbsp;

### firebaseAuth.signInWithGithub(accessToken, listener)
**sign in with GitHub (Please note you have to handle sign in yourself)**  
- **accessToken** (string)  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not) and `event.error(string value)` (description of error, nil if `isError` is false)`  

&nbsp;

### firebaseAuth.signInWithCustomToken(accessToken, listener)
**sign in with custom server**  
- **accessToken** (string)  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not) and `event.error(string value)` (description of error, nil if `isError` is false)`  

&nbsp;

### firebaseAuth.signInAnonymously(listener)
**sign in without an account, used for security**  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not) and `event.error(string value)` (description of error, nil if `isError` is false)`  

&nbsp;

### firebaseAuth.isNetworkAvailable()
**check for Wi-Fi access, returns boolean**  
**true** if device has internet access, **false** if not  

&nbsp;

### firebaseAuth.doesEmailExist(listener, email)
**checks if email is already registered**  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not) and `event.error(string value)` (description of error, nil if `isError` is false)`. If `isError` is false, then `event.doesEmailExist` (boolean is returned, true if email exists, false if email does not exist)`  
- **email** (string): Email to check if registered  

&nbsp;

### firebaseAuth.signInWithGameNetwork(listener, serverAuthCode)
**sign in with Game Center (iOS) or GPGS (Android)**  
- **listener** (function): `event.isError(boolean value)` (true if successful, false if not) and `event.error(string value)` (description of error, nil if `isError` is false)`  
- **serverAuthCode** (string) (used for Android, ignored on iOS/MacOS): Used for Google Sign In with GSPS


## Setup:
### add google-services.json and GoogleService-Info.plist from firebase console
![Firebase Info 1](https://i.ibb.co/GvvSLX0/new-Firebase-Project-Settings.png) \
![Firebase Info 2](https://i.ibb.co/Trydqm4/google-Sevices-Info.png) \
![Firebase Info 3](https://i.ibb.co/HXJBSZb/google-Sevices-Json.png) \
## Build.settings
```
settings =
{
	android = {
		useGoogleServicesJson = true,
		usesPermissions = {
			"android.permission.INTERNET"
		}
	},
	plugins =
	{
		["plugin.firebaseAuth"] =
		{
			publisherId="tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```


## Helpful Links

[Get Firebase Auth Plugin](https://solar2dmarketplace.com/plugins?FirebaseAuth_tech-scotth)

[Get Support In Forums](https://forums.solar2d.com/c/corona-marketplace/13)

[Check Demo](https://github.com/scottrules44/firebaseAuth-demo)
