# Firebase Storage Plugin

This plugin allows you to store files through Firebase Storage for iOS (8+), macOS (10.13+), and Android (4.0+).

### Functions:

#### firebaseStorage.init(bucketUrl)
Initialize Firebase Storage.

- bucketUrl (string)(optional) — bucket to use. Note: no bucket URL will result in using the default bucket.

#### firebaseStorage.upload(filePath, pathInFirebase, listener)
Upload a file to Firebase Storage.

- filePath (path) — path to the file you want to upload via [system.pathForFile()](https://docs.coronalabs.com/api/library/system/pathForFile.html)
- pathInFirebase (string) — where you want to put the file in Firebase
- listener (function) — returns event.isError (boolean), event.error (string), and event.downloadURL (string, returned on successful upload)

#### firebaseStorage.getDownloadURL(pathInFirebase, listener)
Get the download URL for a file in Firebase Storage.

- pathInFirebase (string) — where you want to get the file URL in Firebase
- listener (function) — returns event.isError (boolean), event.error (string), and event.downloadURL (string, returned if URL is found)

#### firebaseStorage.delete(pathInFirebase, listener)
Delete a file from Firebase Storage.

- pathInFirebase (string) — where you want to delete the file in Firebase
- listener (function) — returns event.isError (boolean) and event.error (string)

### How to Download a File:

```lua
local urlForImage = "insert url for this file here"
network.download(  urlForImage, "GET", function(e)
	if (e.isError == false) then
		local displayDownload = display.newImageRect("coronaIcon.png", system.TemporaryDirectory, 50, 50 )
		displayDownload.x, displayDownload.y = display.contentCenterX, display.contentCenterY+50
	end
end, "coronaIcon.png", system.TemporaryDirectory )
```

### Setup:

Please go to your Firebase console. Go to Storage > Rules and copy-paste the rules below (this is for testing):

```lua
rules_version = '2';
service firebase.storage {
	match /b/{bucket}/o {
		match /{allPaths=**} {
			allow read, write: if true;
		}
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
		["plugin.firebaseStorage"] =
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
- [Get Plugin](https://solar2dmarketplace.com/plugins?FirebaseStorage_tech-scotth)
- [Example](https://github.com/scottrules44/firebaseStorage-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
