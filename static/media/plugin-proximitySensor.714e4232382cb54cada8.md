# Proximity Sensor Plugin

This plugin allows you to detect if something is close to the proximity sensor.

### Limitations:
Only works on Android and iOS. Screen goes dark and touch is ignored on iOS when init() is called and something is close to the screen. Not all devices have a proximity sensor.

### Functions:

#### ps.init()
Activates proximity readings.

#### ps.hasSensor()
Returns true if device has proximity sensor, returns false if device does not have proximity sensor.

#### ps.disable()
Deactivates proximity readings.

#### ps.setListener(listener)
listener (function) — returns event.status which can be "far" or "close"

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.proximitySensor"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?ProximitySensor_tech-scotth)
- [Example](https://github.com/scottrules44/proximitySensor-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
