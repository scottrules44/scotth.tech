# Firebase In-App Messaging Plugin

This plugin allows you to show Firebase In-App Messages inside your app for iOS and Android.

### Functions:

#### firebaseInAppMessaging.init()
Initialize Firebase In-App Messaging.

#### firebaseInAppMessaging.setUserId(id)
- id (string) — set user ID

#### firebaseInAppMessaging.getInstanceId(callback)
- callback (function) — event.isError (boolean) and event.instanceID (string), use for testing

### Setup:

Make sure you download and include `GoogleServices-Info.plist` and put it in the root folder of your Corona project. Also add your `google-services.json` to your root folder and set `useGoogleServicesJson = true` in build.settings. Also add `google_app_id` (App ID) string to the android section (see example below).

![](/pluginDocs/projectSettings.png)

![](/pluginDocs/androidJson.png)

![](/pluginDocs/iosPlist.png)

### Build Settings:

```lua
settings =
{
	iphone =
	{
		plist =
		{
			NSAppTransportSecurity =
			{
			    NSAllowsArbitraryLoads = true,
			},
		},
	},
	android =
	{
		useGoogleServicesJson = true,
	},
	plugins =
	{
		["plugin.firebaseInAppMessaging"] =
		{
			publisherId = "tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?FirebaseInAppMessaging_tech-scotth)
- [Example](https://github.com/scottrules44/firebaseInAppMessaging-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
