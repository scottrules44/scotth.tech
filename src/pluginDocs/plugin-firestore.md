# Firestore Plugin

This plugin brings [Cloud Firestore](https://firebase.google.com/docs/firestore) to Solar2D: read, write, query and listen to documents in your Firebase project from Lua, with the same code on every platform.

**Platforms**

- **iOS 15+** and the iOS Simulator (Apple Silicon and Intel) — Firebase iOS SDK 12.18.0.
- **Android 6.0+** — Firebase Android BoM 34.19.0 (`firebase-firestore` 26.6.0).
- **macOS** and the macOS Simulator — Firebase macOS SDK 12.18.0.
- **HTML5** — Firebase JS SDK 12.18.0.
- **Windows, Linux, Windows Simulator** — pure Lua over the Cloud Firestore REST API. `checkRealtime()` polls the document or collection (every 2 seconds by default) instead of holding a live connection, and requests are unauthenticated unless you pass a Firebase Auth ID token to `init()` or `setAuthToken()`; security rules that require a signed-in user reject unauthenticated requests. On the other platforms a user signed in with the Firebase Auth plugin is used automatically.

### Setup:

1. In the Firebase console create a Firestore database and set its security rules.
2. Download `GoogleService-Info.plist` and `google-services.json` from the console and put both in the root folder of your project. Set `useGoogleServicesJson = true` in the `android` section of `build.settings`. Every platform, including HTML5 and Windows, reads the project from these files.
3. Call `firestore.init()` before the first request.

![](/pluginDocs/projectSettings.png)

![](/pluginDocs/androidJson.png)

![](/pluginDocs/iosPlist.png)

### Functions:

#### firestore.init( [options] )
Configures Firebase (when no other Firebase plugin has done it). Returns `true` when a configuration was found.

- options (table) — optional.
  - HTML5: the Firebase **web** app config from the console (`apiKey`, `projectId`, `appId`, ...). Without it the mobile files are used.
  - Windows / Linux: `projectId` and `apiKey` override the files; `authToken` (a Firebase Auth ID token) authenticates the requests; `pollInterval` (milliseconds, default 2000) sets the `checkRealtime()` polling rate.

#### firestore.setAuthToken( idToken )
Windows / Linux only. Sets, or clears with `nil`, the Firebase Auth ID token sent with every request.

#### firestore.setData( collection, [documentId], data, listener )
Writes `data` to `collection/documentId`, replacing the document. Without a document id a new document with a generated id is added and the listener gets it as `event.id`.

- collection (string) — path to the collection, for example `"cities"` or `"cities/LA/visits"`
- documentId (string) — optional
- data (table) — the fields; strings, numbers, booleans, arrays and nested tables
- listener (function)

#### firestore.updateData( collection, documentId, data, listener )
Merges the fields of `data` into an existing document; the other fields keep their values.

#### firestore.deleteData( collection, documentId, [field], listener )
Deletes one field of the document, or the whole document when no field is given.

#### firestore.readDataInDocument( collection, documentId, listener )
Reads one document. The listener gets `event.data` (absent when the document does not exist) and `event.id`.

#### firestore.readDataInCollection( collection, listener, [orderBy], [descending], [limit], [operator], [value] )
Reads a collection into `event.data`, a table keyed by document id.

- orderBy (string) — optional. Sorts the documents by this field.
- descending (boolean) — optional. `true` for descending order.
- limit (number) — optional. Maximum number of documents.
- operator (string) — optional. `"<"`, `"<="`, `">"`, `">="` or `"="`, applied to the `orderBy` field.
- value (string or number) — optional. The value to compare with.

#### firestore.checkRealtime( collection, [documentId], listener )
Calls the listener with the current data and again every time the document, or the whole collection when no document id is given, changes. One live listener at a time; starting another one replaces it.

#### firestore.stopRealtime()
Stops the live listener.

### Events:

- event.name (string) — `"firestore"`
- event.isError (boolean)
- event.error (string) — the reason, when `isError` is true
- event.data (table) — the document fields, or the documents of a collection keyed by id
- event.id (string) — the document id

Values map to Lua types. Numbers are stored as doubles. Timestamps arrive as `{ seconds, nanoseconds }`, geo points as `{ latitude, longitude }` and document references as path strings.

### Example:

```lua
local firestore = require( "plugin.firestore" )
local json = require( "json" )

firestore.init()

firestore.setData( "cities", "LA", { name = "Los Angeles", population = 4000000, tags = { "west", "coast" } }, function( event )
    if event.isError then
        print( "write failed: " .. tostring( event.error ) )
        return
    end

    -- The three biggest cities with more than a million people
    firestore.readDataInCollection( "cities", function( event )
        for id, city in pairs( event.data or {} ) do
            print( id, city.name, city.population )
        end
    end, "population", true, 3, ">", 1000000 )
end )

-- Follow one document
firestore.checkRealtime( "cities", "LA", function( event )
    if not event.isError then
        print( "LA changed: " .. json.encode( event.data ) )
    end
end )

-- Later
firestore.stopRealtime()
firestore.deleteData( "cities", "LA", "tags", function( event ) print( "tags removed" ) end )
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
		["plugin.firestore"] =
		{
			publisherId = "tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?Firestore_tech-scotth)
- [Example](https://github.com/scottrules44/firestore-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
