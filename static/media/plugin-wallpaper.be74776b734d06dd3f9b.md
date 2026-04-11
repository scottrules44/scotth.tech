# Wallpaper Plugin

This plugin allows you to set wallpapers on Android. Note: this plugin does not handle live wallpapers, and JPG is not supported — use JPEG instead.

### Platforms:
Android

### Functions:

#### wallpaper.set(wallpaperFile)

wallpaperFile (path) — path to image file via [system.pathForFile()](https://docs.coronalabs.com/api/library/system/pathForFile.html).

#### wallpaper.isSetWallpaperAllowed()

Returns a boolean. Note: this only works on Android 6.0+.

#### wallpaper.getSize()

Returns numbers: width, height.

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.wallpaper"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?Wallpaper_tech-scotth)
- [Example](https://github.com/scottrules44/wallpaper-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
