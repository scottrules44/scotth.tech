# Volume Control Plugin

This plugin allows you to control the device's volume level for all audio (excluding ringer).

### Limitations:
Only works on iOS and Android.

### Functions:

#### volume.get()

Returns a value between 0 and 1 (1 = max, 0 = mute). Android only returns to the tenth decimal place.

#### volume.set(volume)

volume (number) — pick a value between 0 and 1. Note: on Android you can only go to the tenth decimal place (.01 will not work on Android but .1 will).

#### volume.hideBox()

Hides the volume box on iOS (does nothing on Android). Recommended if you want to use non-deprecated iOS APIs.

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.volumeControl"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?VolumeControl_tech-scotth)
- [Example](https://github.com/scottrules44/volumeControl-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
