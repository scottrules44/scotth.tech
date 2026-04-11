# Doc Picker Plugin

This plugin allows you to import and export files to iCloud and third-party apps.

### Platforms:
iOS 8.0+

### Setup:
Go to your Apple Developer account, navigate to Certificates and Profiles, then iCloud Containers. Create a container with the + button, then go to App IDs, click the ID you are using and edit it. Make sure "Include CloudKit support" is enabled, click Edit, check the iCloud container you just made, then continue and assign. Next, go to your development provisioning profile, click Edit, click Regenerate, then download and install the new profile.

### Functions:

#### docPicker.import(documentTypes, listener)
Open a document picker for importing files.

- `documentTypes` (array of strings) — array of [uniform type identifiers](https://developer.apple.com/library/content/documentation/FileManagement/Conceptual/understanding_utis/understand_utis_intro/understand_utis_intro.html#//apple_ref/doc/uid/TP40001319), e.g. `{"public.text", "public.image"}`
- `listener` (function) — `event.status` can be `"document picked"`, `"documents picked"`, or `"picker cancelled"`. `event.url` is returned on `"document picked"` (iOS 8–10); `event.urls` returns an array of paths to files (iOS 11+)

#### docPicker.export(exportPath, listener)
Open a document picker for exporting a file.

- `exportPath` (path) — file URL to export ([system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html))
- `listener` (function) — `event.status` can be `"picker cancelled"`, `"documents picked"`, or `"document picked"`. `event.url` is returned on `"document picked"` (iOS 8–10); `event.urls` returns an array of paths to files (iOS 11+)

#### docPicker.copy(fileToCopy, pathToCopy)
Copy an imported file into the app sandbox.

- `fileToCopy` (string) — the URL string from an import to copy into the app sandbox
- `pathToCopy` (path) — destination URL ([system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html))

### Build Settings:

```lua
settings =
{
    iphone =
    {
        iCloud = true,
    },
    plugins =
    {
        ["plugin.docPicker"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?DocPicker_tech-scotth)
- [Example](https://github.com/scottrules44/docPicker-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
