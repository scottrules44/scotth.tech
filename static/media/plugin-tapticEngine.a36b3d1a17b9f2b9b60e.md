# Taptic Engine Plugin

This plugin uses the Taptic Engine. It will only work with iPhone 7 and 7 plus (and hopefully future devices).

### Limitations:
Only works on iOS and not the iOS simulator.

### Functions:

#### tapticEngine.vibrate(type)

type (optional)(string) — heavy, light, and medium. Default is medium.

#### tapticEngine.set(type)

Caches vibrate for reduced lag.

type (optional)(string) — heavy, light, and medium. Default is medium.

#### tapticEngine.destroy()

Removes vibrate cache.

#### tapticEngine.activate()

Activates vibrate cache.

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.tapticEngine"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?TapticEngine_tech-scotth)
- [Example](https://github.com/scottrules44/tapticEngine-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
