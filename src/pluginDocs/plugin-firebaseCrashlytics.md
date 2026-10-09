# Firebase Crashlytics Plugin

This plugin brings [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics) to Solar2D. Crashes, non-fatal errors, logs, custom keys and the user id are reported to the Firebase console, and unhandled Lua runtime errors are recorded as non-fatal exceptions automatically and handed to your listener.

**Platforms**

- **iOS 15+** and the iOS Simulator (Apple Silicon and Intel) — Firebase iOS SDK 12.18.0.
- **Android 6.0+** — Firebase Android BoM 34.19.0 (`firebase-crashlytics` 20.1.1); the plugin's Gradle settings apply the Crashlytics Gradle plugin, which uploads the mapping file for you.
- **macOS** — Firebase macOS SDK 12.18.0. Firebase keeps its installation token in the Keychain, which needs an app signed with the **Keychain Sharing** entitlement.
- **HTML5, Windows, Linux, Windows Simulator, macOS Simulator** — pure Lua. Firebase has no Crashlytics SDK for the web or the desktop and no upload API, so nothing is reported from these platforms. The same API keeps shared game code running: the listener still receives every unhandled Lua error, everything else is written to the console, and `isSupported()` returns `false`.

### Setup:

1. In the Firebase console enable **Crashlytics** for your app.
2. Download `GoogleService-Info.plist` and `google-services.json` from the console and put both in the root folder of your project. Set `useGoogleServicesJson = true` in the `android` section of `build.settings`.
3. Call `firebaseCrashlytics.init( listener )` as early as possible in `main.lua`.
4. iOS: to see symbolicated native frames, upload the dSYM of each build with the `upload-symbols` tool from the Firebase SDK. Lua frames are reported as file, line and function name and need no symbols.

![](/pluginDocs/projectSettings.png)

![](/pluginDocs/androidJson.png)

![](/pluginDocs/iosPlist.png)

### Functions:

#### firebaseCrashlytics.init( [listener] )
Configures Firebase (when no other Firebase plugin has done it), enables crash collection and installs the Lua error handler. Returns `true` when a configuration was found.

- listener (function) — optional. Receives an event for every unhandled Lua error. On iOS, Android and macOS this handler replaces `Runtime:addEventListener( "unhandledError" )`, so use the listener instead.

#### firebaseCrashlytics.addLog( message )
Adds a breadcrumb that is sent with the next crash report.

- message (string)

#### firebaseCrashlytics.setUserIdentifier( id )
Sets the user id shown in the Crashlytics console.

- id (string)

#### firebaseCrashlytics.setUserName( name )
#### firebaseCrashlytics.setUserEmail( email )
Stored as the custom keys `username` and `email`.

#### firebaseCrashlytics.setStringValue( key, value )
#### firebaseCrashlytics.setIntValue( key, value )
#### firebaseCrashlytics.setFloatValue( key, value )
#### firebaseCrashlytics.setBoolValue( key, value )
Custom keys attached to every report, visible in the Crashlytics console.

- key (string)
- value (string, number or boolean)

#### firebaseCrashlytics.recordError( description, code, [stackTrace] )
Records a non-fatal error without crashing.

- description (string)
- code (number)
- stackTrace (table) — optional. An array of frames `{ fileName = "main.lua", lineNumber = 12, methodName = "update" }`; on Android a frame can also carry `declaringClass`.

#### firebaseCrashlytics.sendCrash( [message] )
Crashes the app on purpose to test the pipeline. Crash reports are sent on the next launch. On the platforms without an SDK a Lua error with the message is raised instead.

#### firebaseCrashlytics.isSupported()
`true` where crashes are reported (iOS, Android, macOS), `false` on HTML5 and the desktop.

### Events:

- event.name (string) — `"firebaseCrashlytics"`
- event.type (string) — `"error"`
- event.error (string) — the Lua error message
- event.stackTrace (string) — the Lua stack trace, when available

### Example:

```lua
local firebaseCrashlytics = require( "plugin.firebaseCrashlytics" )

firebaseCrashlytics.init( function( event )
    print( "Lua error recorded: " .. tostring( event.error ) )
end )

firebaseCrashlytics.setUserIdentifier( "player-3547347" )
firebaseCrashlytics.setStringValue( "level", "forest-2" )
firebaseCrashlytics.setIntValue( "coins", 120 )
firebaseCrashlytics.addLog( "level started" )

-- A handled problem worth knowing about
firebaseCrashlytics.recordError( "save file was corrupt", 42, {
    { fileName = "save.lua", lineNumber = 88, methodName = "load" },
} )

-- Once, to check that reports arrive in the console (the report is sent on the next launch)
-- firebaseCrashlytics.sendCrash( "test crash" )
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
		["plugin.firebaseCrashlytics"] =
		{
			publisherId = "tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?FirebaseCrashlytics_tech-scotth)
- [Example](https://github.com/scottrules44/firebaseCrashlytics-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
