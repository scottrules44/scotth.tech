# Firebase Database Plugin

This plugin allows you to access the [Firebase Realtime Database](https://firebase.google.com/docs/database) API from Solar2D on iOS (15+) / macOS, Android (6.0+), Web / HTML5, and Windows builds (including the Windows Simulator). The same Lua API works on every platform; see the platform notes below for the few differences.

### Platforms:
- iOS 15+ and the iOS Simulator (Apple Silicon and Intel), macOS 12+ / Solar2D Simulator — Firebase Apple SDK 12.18
- Android 6.0+ (minSdk 23) — Firebase Android BoM 34.18
- Web / HTML5 — Firebase JS SDK 12.18, loaded from Google's CDN when `init()` is called
- Windows builds and the Windows Simulator — Firebase C++ SDK 13.12 (bundled inside the plugin, nothing else to install)

### Functions:

#### firebaseDatabase.init(options)
Initialize the Firebase Database plugin. Returns `true` when the database is ready. The Firebase project settings are read automatically from the config files in your project (see Setup); the optional `options` table overrides them, which is handy on Web and Windows if you would rather not ship `google-services.json`.

- options (table)(optional) — any of `databaseURL`, `apiKey`, `projectId`, `appId`, `messagingSenderId`, `storageBucket` (strings). `databaseURL` also picks a database other than the project default.

```lua
firebaseDatabase.init() -- uses GoogleService-Info.plist / google-services.json from the project

firebaseDatabase.init({ databaseURL = "https://my-project-default-rtdb.firebaseio.com" })
```

#### firebaseDatabase.setOnline(isActive)
- isActive (boolean) — if set to true then we are online. If set to false we are offline.

#### firebaseDatabase.setPersistenceEnabled(enabled)
- enabled (boolean) — enable disk persistence which makes the app write data locally to the device so your app can maintain state while offline, even if the user or operating system restarts the app. Call it right after `init()`, before any other database call. Not available on Web / HTML5 (the call is ignored).

#### firebaseDatabase.set(path, data, listener)
Set data at a path.

- path (string) — path to set data
- data (string, boolean, number, table) — data to set at the path specified. Tables can be nested; a Lua array (`{1, 2, 3}`) is stored as a JSON array. Passing `nil` removes the node.
- listener (function) — If event.isError == true then no data was set and an event.error is returned. If event.isError == false then data was set.

#### firebaseDatabase.update(path, data, listener)
Update data at a path (only the keys in `data` are changed).

- path (string) — path to update data
- data (table) — data to update at the path specified
- listener (function) — If event.isError == true then no data was updated and an event.error is returned. If event.isError == false then data was updated.

#### firebaseDatabase.delete(path, listener)
Delete data at a path.

- path (string) — path to delete data
- listener (function) — If event.isError == true then no data was deleted and an event.error is returned. If event.isError == false then data was deleted.

#### firebaseDatabase.get(path, listener, querySortFilter)
Get data at a path.

- path (string) — path to get data
- listener (function) — If event.isError == true then no data was received and an event.error is returned (an empty path returns the error `"no data"`). If event.isError == false then data was received and event.data is returned which contains data at given path. event.key holds the key of the node.
- querySortFilter (table)(optional) — allows you to sort and filter data. Options: `{sort="byKey", "byValue", or "byChild", sortChild= child to sort data (note sort must be set to "byChild"), limitedToFirst = number to limit, limitedToLast = number to limit, startingAtValue= number or string, startingAfterValue= number or string, endingAtValue= number or string, endingBeforeValue= number or string, equalToValue= number or string}`

```lua
firebaseDatabase.get("leaderboard", function (ev)
  if(ev.isError) then
      native.showAlert( "Could not Get Data", ev.error , {"Ok"} )
  else
      native.showAlert( "Sorted Data Received", json.encode( ev.data ) , {"Ok"} )
  end
end, {sort = "byChild" , sortChild="points", limitedToLast = 2}) --Last will give us the top scores
```

#### firebaseDatabase.startListener(path, listener, querySortFilter)
Listen for data changes at a path. The listener fires once with the current data and again every time the data changes, until `stopListener` is called. One listener is kept per path; starting another listener on the same path replaces the previous one.

- path (string) — path to listen for new data change
- listener (function) — If event.isError == true then no data was received and an event.error is returned. If event.isError == false then data was received and event.data is returned which contains data at given path. event.key holds the key of the node.
- querySortFilter (table)(optional) — same options as `.get()`

```lua
firebaseDatabase.startListener("chat/room1", function (ev)
  if not ev.isError then
      print( json.encode( ev.data ) )
  end
end)
```

#### firebaseDatabase.stopListener(path)
Stop listening for data changes.

- path (string)(optional) — path whose listener should stop. Call it without arguments to stop every listener.

### Platform notes:

**Web / HTML5**
- Include `google-services.json` in the root folder of your project like on Android; it is packaged with the HTML5 build and `init()` reads the database URL, API key and project ID from it. No web config table is required (you can still pass one to `init()` to override it).
- The Firebase JavaScript SDK (12.18) is downloaded from `https://www.gstatic.com/firebasejs/` the first time `init()` runs, so the app needs an internet connection. Calls made while it is still loading are queued and run as soon as it is ready.
- `setPersistenceEnabled` does nothing on Web (the Firebase web SDK has no offline persistence).
- Table listeners (`{ firebaseDatabase = function(self, event) end }`) are supported like on the other platforms.

**Windows / Windows Simulator**
- Put `google-services.json` in the root folder of your project (the same file you use for Android). The plugin reads it from there when `init()` is called, so no extra setup is needed for Windows builds.
- The plugin ships the Firebase C++ SDK built into `plugin_firebaseDatabase.dll` (32-bit, static runtime). Your Windows build needs no additional DLLs or Visual C++ redistributable.
- `startingAfterValue` and `endingBeforeValue` are not available in the Firebase C++ SDK. They are applied as `startingAtValue` / `endingAtValue` (inclusive) on Windows and a warning is printed.
- Callbacks are delivered on the Solar2D thread on the next frame, exactly like on the other platforms.

**macOS / Solar2D Simulator**
- `init()` uses `GoogleService-Info.plist` from the project folder and falls back to `google-services.json`, so the same project runs unchanged in the Simulator.

### Setup:

Please go to your Firebase console. Go to Realtime Database > Rules and turn off user auth for database realtime access in order to test:

```lua
{
	"rules": {
		".read": true,
		".write": true
	}
}
```

Make sure you download and include `GoogleServices-Info.plist` and put it in the root folder of your Corona project. Also add your `google-services.json` to your root folder and set `useGoogleServicesJson = true` in build.settings. `google-services.json` is also what the Web / HTML5 and Windows versions of the plugin use, so keep it in the project for those builds too.

![](/pluginDocs/projectSettings.png)

![](/pluginDocs/androidJson.png)

![](/pluginDocs/iosPlist.png)

### Build Settings:

```lua
settings =
{
	plugins =
	{
		["plugin.firebaseDatabase"] =
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
- [Get Plugin](https://solar2dmarketplace.com/plugins?FirebaseDatabase_tech-scotth)
- [Example](https://github.com/scottrules44/firebaseDatabase-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
