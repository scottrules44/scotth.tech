## About

This plugin allows you to get firebase remote config values from firebase console.

## Platforms

Android 4.4+, iOS 8+, MacOS 10.13+

## Functions

#### firebaseConfig.init()

&nbsp;

#### firebaseConfig.fetchData(listener)

listener(function) If event.isError == true then no data was received. If event.isError == false then data was received

&nbsp;

#### firebaseConfig.getDouble("key")

get number value(decimal value on android)

&nbsp;

#### firebaseConfig.getLong("key")

get number value(big numbers on android)

&nbsp;

#### firebaseConfig.getBoolean("key")

get boolean value

&nbsp;

#### firebaseConfig.getString("key")

get string value

&nbsp;

#### firebaseConfig.getInstanceId(listener)

listener(function) If event.isError == true then no InstanceId was not received. If event.isError == false then event.token and event.instanceID are returned

&nbsp;

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
		["plugin.firebaseConfig"] =
		{
			publisherId="tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```


## Helpful Links



[Get Firebase Config Plugin](https://solar2dmarketplace.com/plugins?FirebaseConfig_tech-scotth)

[Get Support In Forums](https://forums.solar2d.com/c/corona-marketplace/13)

[Check Demo](https://github.com/scottrules44/firebaseConfig-demo)
