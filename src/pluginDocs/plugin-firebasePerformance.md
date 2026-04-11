# Firebase Performance Plugin

This plugin allows you to see performance metrics for iOS (8+) and Android 6.0.

### Functions:

#### firebasePerformance.init()
Initialize Firebase Performance.

#### firebasePerformance.createTrace(name)
Create a trace.

- name (string) — name of trace

#### firebasePerformance.doesTraceExist(name)
Returns boolean — tells you if a trace exists.

- name (string) — name of trace

#### firebasePerformance.incrementTrace(name, incrementName)
Increment a trace.

- name (string) — name of trace
- incrementName (string) — name of increment

#### firebasePerformance.stopTrace(name)
Stop a trace.

- name (string) — name of trace

### Setup:

Make sure you download and include `GoogleServices-Info.plist` and put it in the root folder of your Corona project. Also add your `google-services.json` to your root folder and set `useGoogleServicesJson = true` in build.settings.

![](/pluginDocs/projectSettings.png)

![](/pluginDocs/androidJson.png)

![](/pluginDocs/iosPlist.png)

### Build Settings:

```lua
settings =
{
	plugins = {
		["plugin.firebasePerformance"] =
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
- [Get Plugin](https://solar2dmarketplace.com/plugins?FirebasePerformance_tech-scotth)
- [Example](https://github.com/scottrules44/firebasePerformance-demo)
- [Support](https://forums.coronalabs.com/forum/654-corona-store-plugins/)
