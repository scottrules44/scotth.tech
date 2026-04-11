# Controller Haptics Plugin

Play Haptics/Vibration Patterns on Supported Controllers.

### Platforms/Limitations:
iOS 11+ and macOS 11+ only. Only supports playing `.ahap` files.

You can find AHAP files and a creator at [https://haptrix.com](https://haptrix.com).

### Functions:

#### controllerHaptics.isSupported()
Returns `true` if a controller is connected and supports haptics.

#### controllerHaptics.play(pathOfAhap, hapticLocality)
Play an AHAP haptic file on the connected controller.

- `pathOfAhap` (string) — path of the AHAP file to play (via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html))
- `hapticLocality` (string)(optional) — location on controller to play; default is `"default"`. Other options: `"all"`, `"handles"`, `"triggers"`, `"leftHandle"`, `"rightHandle"`, `"leftTrigger"`, or `"rightTrigger"`

### Build Settings:

```lua
settings =
{
    plugins = {
        ["plugin.controllerHaptics"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?ControllerHaptics_tech-scotth)
- [Example](https://github.com/scottrules44/controllerHaptics-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
