# Orientation Plugin

This plugin allows you to lock the orientation on your device.

### Platforms:
iOS and Android

### Functions:

#### orientation.init()
Initialize the plugin.

#### orientation.lock(orientation)
Lock the device orientation.

orientation (string) — can be "all", "landscape", or "portrait"

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.orientation"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?OrientationPlugin_tech-scotth)
- [Example](https://github.com/scottrules44/orientation-example)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
