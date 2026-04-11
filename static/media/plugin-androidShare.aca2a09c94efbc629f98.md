# Android Share Plugin

This plugin allows you to share a file with another app on Android.

### Platforms:
Android

### Functions:

#### androidShare.show(path, title, subject, extraText)
Show the share pop up.

path (string) — path to file via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

title (string)(optional)

subject (string)(optional)

extraText (string)(optional)

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.androidShare"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?AndroidShare_tech-scotth)
- [Example](https://github.com/scottrules44/androidShare-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
