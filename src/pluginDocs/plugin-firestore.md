# Firestore Plugin

This plugin allows you to connect with Firebase Firestore. Please use Corona 2019.3497+.

### Platforms:
iOS 8+, macOS 10.13, and Android 6+

### Functions:

#### firestore.init()
Setup Firebase.

#### firestore.setData(collection, document, data, listener)
- collection (string) — path to collection
- document (string) — document name to set data
- data (table) — table of what to set the data as
- listener (function) — returns event.isError and event.error if isError == true

#### firestore.updateData(collection, document, data, listener)
- collection (string) — path to collection
- document (string) — document name to update data
- data (table) — table of what to update the data as
- listener (function) — returns event.isError and event.error if isError == true

#### firestore.readDataInDocument(collection, document, listener)
- collection (string) — path to collection
- document (string) — document name to read data
- listener (function) — returns event.isError and event.error if isError == true, and returns event.data if isError == false

#### firestore.readDataInCollection(collection, listener, field, isDescending, limitedTo, quereyType, querey)
- collection (string) — path to collection
- listener (function) — returns event.isError and event.error if isError == true, and returns event.data if isError == false
- field (string)(optional) — sorts data by field
- isDescending (boolean)(optional) — set descending with boolean
- limitedTo (number)(optional) — limit results by a number
- quereyType (string)(optional) — query types are "=", ">", "<", "<=", and ">="
- querey (number or string)(optional) — query value for quereyType

#### firestore.deleteData(collection, document, field, listener)
- collection (string) — path to collection to delete
- document (string)(optional) — document to delete
- field (string)(optional) — field to delete
- listener (function) — returns event.isError and event.error if isError == true

#### firestore.checkRealtime(collection, document, listener)
Listener will fire every time a selected document is updated.

- collection (string) — path to collection
- document (string) — document name to listen for data
- listener (function) — returns event.isError and event.error if isError == true, and returns event.data if isError == false

#### firestore.stopRealtime()
Stop checking realtime for new data.

### Build Settings:

Make sure you add Firebase settings to the plugin (google-services.json and GoogleService-Info.plist).

```lua
settings =
{
	plugins =
	{
		["plugin.firestore"] =
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
- [Get Plugin](https://solar2dmarketplace.com/plugins?Firestore_tech-scotth)
- [Example](https://github.com/scottrules44/firestore-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
