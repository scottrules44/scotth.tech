# Firebase Database Plugin

This plugin allows you to access the [Firebase](https://firebase.google.com) database API.

### Platforms:
Android 5+ and iOS 8+

### Functions:

#### firebaseDatabase.init()
Initialize the Firebase Database plugin.

#### firebaseDatabase.setOnline(isActive)
- isActive (boolean) — if set to true then we are online. If set to false we are offline.

#### firebaseDatabase.setPersistenceEnabled(enabled)
- enabled (boolean) — enable disk persistence which makes the app write data locally to the device so your app can maintain state while offline, even if the user or operating system restarts the app

#### firebaseDatabase.set(path, data, listener)
Set data at a path.

- path (string) — path to set data
- data (string, boolean, integer, table) — data to set at the path specified
- listener (function) — If event.isError == true then no data was set and an event.error is returned. If event.isError == false then data was set.

#### firebaseDatabase.update(path, data, listener)
Update data at a path.

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
- listener (function) — If event.isError == true then no data was received and an event.error is returned. If event.isError == false then data was received and event.data is returned which contains data at given path.
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
Listen for new data changes at a path. Note: can only handle one path at a time.

- path (string) — path to listen for new data change
- listener (function) — If event.isError == true then no data was received and an event.error is returned. If event.isError == false then data was received and event.data is returned which contains data at given path.
- querySortFilter (table)(optional) — allows you to sort and filter data. Options: `{sort="byKey", "byValue", or "byChild", sortChild= child to sort data (note sort must be set to "byChild"), limitedToFirst = number to limit, limitedToLast = number to limit, startingAtValue= number or string, startingAfterValue= number or string, endingAtValue= number or string, endingBeforeValue= number or string, equalToValue= number or string}`

#### firebaseDatabase.stopListener()
Stop listening for new data changes.

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

Make sure you download and include `GoogleServices-Info.plist` and put it in the root folder of your Corona project. Also add your `google-services.json` to your root folder and set `useGoogleServicesJson = true` in build.settings.

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
