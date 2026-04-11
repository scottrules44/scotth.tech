# Firebase Analytics Plugin

This plugin allows you to log events through Firebase Analytics for iOS (8+) / macOS, Android (4.0+), and Web / HTML5. Note: `.logImpressionData` and `.getAppInstanceId` don't work on Web.

### Functions:

#### firebaseAnalytics.init(config, callback)
Initialize Firebase Analytics.

- config (table) — Only required and used for Web Builds; pass config info from the Firebase console (see example below and setup section)
- callback (function) — Only required and used for Web Builds; callback for when the Firebase library loads on web. Sends event.isError (boolean)

[View Example on GitHub Gist](https://gist.github.com/scottrules44/9378502f38a7fee86fc08d4accedfbb8)

#### firebaseAnalytics.logEvent(eventId, params)
See [Firebase docs](https://firebase.google.com/docs/reference/android/com/google/firebase/analytics/FirebaseAnalytics.Event) for all events. eventId examples: SELECT_CONTENT = "select_content" and CONTENT_TYPE = "content_type"

- eventId (string)
- params (table)

#### firebaseAnalytics.setUserProperties(name, property)
- name (string)
- property (string)

#### firebaseAnalytics.setUserId(id)
Set user id.

- id (string)

#### firebaseAnalytics.setCurrentScreen(screenName, screenClass)
- screenName (string)
- screenClass (string)

#### firebaseAnalytics.logImpressionData(adPlatform, params, customName)
- adPlatform (string) — platform of ads (i.e, IronSource)
- params (table)(optional) — can include `{adSource=(string), adFormat=(string), adUnitName=(string), currency=(string), value=(string)}`
- customName (string)(optional) — use custom logging name (i.e use other than Event Ad Impression)

#### firebaseAnalytics.getAppInstanceId(listener)
- listener (function) — event.id (string), event.isError (boolean), event.error (string)

### Setup:

For iOS/macOS make sure you download and include `GoogleServices-Info.plist` and put it in the root folder of your Corona project. Also add your `google-services.json` to your root folder and set `useGoogleServicesJson = true` in build.settings for Android. For Web, add config to `.init()`.

![](/pluginDocs/projectSettings.png)

![](/pluginDocs/androidJson.png)

![](/pluginDocs/iosPlist.png)

![](/pluginDocs/webSetup.png)

### Build Settings:

```lua
settings =
{
	android =
	{
		useGoogleServicesJson = true,
	},
	plugins = {
		["plugin.firebaseAnalytics"] =
		{
			publisherId = "tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?FirebaseAnalytics_tech-scotth)
- [Example](https://github.com/scottrules44/firebaseAnalytics-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
