# Firebase Functions Plugin

This Firebase Functions plugin allows you to call Cloud Functions within your app for iOS (8+) and Android (6+).

### Functions:

#### firebaseFunctions.init()
Initialize Firebase Functions.

#### firebaseFunctions.call(functionName, [data], callback)
Call a Cloud Function.

- functionName (string) — name of function to call
- data (table)(optional) — data to send to the function
- callback (function) — triggered with event.data (table, string, number, boolean) return data from function, event.isError (boolean), and event.error (string)

### Setup:

Make sure you download and include `GoogleServices-Info.plist` and put it in the root folder of your Solar2D project. Also add your `google-services.json` to your root folder and set `useGoogleServicesJson = true` in build.settings.

![](/pluginDocs/projectSettings.png)

![](/pluginDocs/androidJson.png)

![](/pluginDocs/iosPlist.png)

### Build Settings:

```lua
settings =
{
	plugins = {
		["plugin.firebaseFunctions"] =
		{
			publisherId = "tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
	android =
	{
		useGoogleServicesJson = true,
	},
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?FirebaseFunctions_tech-scotth)
- [Example](https://github.com/scottrules44/Firebase-Function-Demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
