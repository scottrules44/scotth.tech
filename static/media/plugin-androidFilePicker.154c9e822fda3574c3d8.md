# Android File Picker Plugin

This plugin allows you to pick a file from the integrated Android pop up.

### Platforms:
Android

### Functions:

#### androidFilePicker.show(type, pathToExport, listener)
Show file picker.

type (string) — type of file to get from pop up (example: "image/*")

pathToExport (string) — where to put the file via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

listener (function) — returns event.isError (boolean), event.error (string), event.filename (string), and event.uri (string)

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.androidFilePicker"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?AndroidFilePicker_tech-scotth)
- [Example](https://github.com/scottrules44/androidFilePicker-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
