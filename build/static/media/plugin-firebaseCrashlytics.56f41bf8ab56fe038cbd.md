## About

This plugin allows you log crash in Firebase Crashlytics (Note that it only it real only optizied for Java(Android) and ObjC/Swift(ios) but some lua code logged)

## Platforms

iOS and Android

## Functions

#### firebaseCrashlytics.init(errorListener)

##### setup Firebase Crashlytics

errorListener(functions)(optional)

&nbsp;

since this plugin handles and captures lua errors, Runtime:addEventListener("unhandledError") will not work, instead this errorListener will return event.error(string) of the lua error description when a error is captured

&nbsp;

#### firebaseCrashlytics.addLog(log)

##### add log to be sent with crash data

log(string) log data

&nbsp;

#### firebaseCrashlytics.setUserIdentifier(userId)

##### Specify a user identifier which will be visible in the Crashlytics UI.

userId(string) id of user

&nbsp;

#### firebaseCrashlytics.sendCrash(error)

##### (you should only use to test and will only send when you relaunch) The easiest way to cause a crash

error(string) error description

&nbsp;

#### firebaseCrashlytics.setStringValue(key,string)

##### Set a string value for a key to be associated with your crash data which will be visible in the Firebase Crashlytics UI.

key(string) key associated with string

&nbsp;

string(string) string to associated with crash

&nbsp;

#### firebaseCrashlytics.setIntValue(key,int)

##### Set an interger value for a key to be associated with your crash data which will be visible in the Firebase Crashlytics UI.

key(string) key associated with interger

&nbsp;

int(number) interger to associated with crash

&nbsp;

#### firebaseCrashlytics.setBoolValue(key,boolean)

##### Set a boolean value for a key to be associated with your crash data which will be visible in the Firebase Crashlytics UI.

key(string) key associated with boolean

&nbsp;

boolean(boolean) boolean to associated with crash

&nbsp;

#### firebaseCrashlytics.recordError(error, errorCode, stackTrace)

##### log error

error(string) error description
&nbsp;
errorCode(number) error code
&nbsp;
stackTrace(array, android only required) custom stack trace, include array of tables {methodName = "string", fileName = "fileName", lineNumber = number, declaringClass = "string"}
&nbsp;

## Crashlytics Setup:
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
		["plugin.firebaseCrashlytics"] =
		{
			publisherId="tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```


## Helpful Links



[Get Firebase Crashlytics Plugin](https://solar2dmarketplace.com/plugins?FirebaseCrashlytics_tech-scotth)

[Get Support In Forums](https://forums.solar2d.com/c/corona-marketplace/13)

[Check Demo](https://github.com/scottrules44/firebaseCrashlytics-demo)
