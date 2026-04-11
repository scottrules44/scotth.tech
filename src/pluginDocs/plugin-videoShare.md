# Video Share Plugin

This plugin allows you to share video from your app via the activity popup and save video to the iOS camera roll.

### Limitations:
Only works on iOS.

### Functions:

#### videoShare.save(videoPath, listener)

videoPath (path)(required) — the path (via [system.pathForFile()](https://docs.coronalabs.com/api/library/system/pathForFile.html)) to save the video to the camera roll.

listener (function)(optional) — returns event.status as "saved" or "could not save" when done.

#### videoShare.show(videoPath, text, listener, x, y)

videoPath (path)(optional) — the path (via [system.pathForFile()](https://docs.coronalabs.com/api/library/system/pathForFile.html)) to share via the activity popup on iOS.

text (string)(optional) — some text to insert into the activity popup.

listener (function)(optional) — returns event.status as "completed" when done.

### Build Settings:

```lua
settings =
{
    iphone =
    {
        plist =
        {
            NSPhotoLibraryUsageDescription = "Needed for video saving",
        },
    },
    plugins = {
        ["plugin.videoShare"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?VideoShare_tech-scotth)
- [Example](https://github.com/scottrules44/videoShare-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
