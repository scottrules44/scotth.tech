# Firebase Remote Config Plugin

This plugin brings [Firebase Remote Config](https://firebase.google.com/docs/remote-config) to Solar2D. Change your app's behaviour and appearance from the Firebase console without shipping an update: define parameters and conditions in the console, ship defaults in the app, then fetch and activate the current template at runtime.

The same Lua API runs on every platform, so shared game code needs no platform branches.

**Platforms**

- **iOS 15+** and the iOS Simulator (Apple Silicon and Intel) — Firebase iOS SDK 12.18.0.
- **Android 6.0+** — Firebase Android BoM 34.19.0 (`firebase-config` 23.1.0).
- **macOS** — Firebase macOS SDK 12.18.0. Firebase keeps its installation token in the Keychain, which needs an app signed with the **Keychain Sharing** entitlement; without it `fetchData()` fails and `event.error` reports `SecItemAdd (-34018)`.
- **HTML5** — Firebase JS SDK 12.18.0.
- **Windows, Linux, Windows Simulator, macOS Simulator** — pure Lua over the Firebase REST APIs. The fetched template is kept in the app's documents folder, so the values are available offline and survive restarts.

### Setup:

1. In the Firebase console open **Run → Remote Config**, add your parameters and publish the template.
2. Download `GoogleService-Info.plist` and `google-services.json` from the console and put both in the root folder of your project. Set `useGoogleServicesJson = true` in the `android` section of `build.settings`. Every platform, including HTML5 and Windows, reads the project from these files.
3. Call `firebaseConfig.init()`, set your defaults with `setDefaults()`, then `fetchData()`.

![](/pluginDocs/projectSettings.png)

![](/pluginDocs/androidJson.png)

![](/pluginDocs/iosPlist.png)

### Functions:

#### firebaseConfig.init( [options] )
Configures Firebase from `GoogleService-Info.plist` / `google-services.json` when no other Firebase plugin has done it yet. Returns `true` when a configuration was found. Every other function configures Firebase on demand as well, but `init()` is where a missing file is reported.

- options (table) — optional.
  - HTML5: the Firebase **web** app config from the console (`apiKey`, `projectId`, `appId`, ...), the same table you pass to `firebaseAnalytics.init()`. Without it the mobile files are used, and the fetches show up under that app in the console.
  - Windows / Linux: `projectId`, `appId` and `apiKey` override the files.

#### firebaseConfig.setDefaults( defaults )
Values used until a template has been fetched and activated, and for keys the template does not define.

- defaults (table) — `key = value` pairs; strings, numbers and booleans.

#### firebaseConfig.fetchData( listener )
Fetches the current template from Firebase and activates it, so the getters return the new values. Values fetched less than 10 seconds ago are reused without a network request.

- listener (function) — receives one event with `event.isError` (boolean) and, when the fetch failed, `event.error` (string).

#### firebaseConfig.getString( key )
#### firebaseConfig.getDouble( key )
#### firebaseConfig.getLong( key )
#### firebaseConfig.getBoolean( key )
The active value for `key`, falling back to the default and then to `""`, `0` or `false`. `getDouble()` and `getLong()` both return numbers; use `getLong()` for whole-number parameters. `getBoolean()` accepts `1`, `true`, `t`, `yes`, `y` and `on` in any case, like the Firebase SDKs.

- key (string)

### Events:

- event.name (string) — `"firebaseConfig"` (`"firebaseRemoteConfig"` on iOS and macOS, kept for compatibility)
- event.isError (boolean)
- event.error (string) — the reason, when `isError` is true

### Example:

```lua
local firebaseConfig = require( "plugin.firebaseConfig" )

firebaseConfig.init()
firebaseConfig.setDefaults(
{
    welcome_message = "Welcome!",
    max_level = 10,
    price = 1.99,
    feature_enabled = true,
} )

firebaseConfig.fetchData( function( event )
    if event.isError then
        print( "fetch failed: " .. tostring( event.error ) )
    end
    -- The active values, or the defaults while nothing has been fetched yet
    print( firebaseConfig.getString( "welcome_message" ) )
    print( firebaseConfig.getLong( "max_level" ) )
    print( firebaseConfig.getDouble( "price" ) )
    print( firebaseConfig.getBoolean( "feature_enabled" ) )
end )
```

### Build Settings:

```lua
settings =
{
	android =
	{
		useGoogleServicesJson = true,
		usesPermissions =
		{
			"android.permission.INTERNET",
			"android.permission.ACCESS_NETWORK_STATE",
		},
	},
	plugins =
	{
		["plugin.firebaseConfig"] =
		{
			publisherId = "tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?FirebaseConfig_tech-scotth)
- [Example](https://github.com/scottrules44/firebaseConfig-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
