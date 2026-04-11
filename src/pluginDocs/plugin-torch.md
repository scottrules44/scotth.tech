# Torch/Flashlight Plugin

Turn on and off the flash on iOS (8+) and Android (6.0+).

### Functions:

#### torch.isAvailable()

Returns a boolean value indicating if the torch is found.

#### torch.turnOn(brightness)

Turns the torch on.

brightness (number)(optional)(iOS only) — set brightness value between 0 and 1.

#### torch.turnOff()

Turns the torch off.

### Build Settings:

Note: publisherId="com.solar2dmarketplace" is used for this plugin.

```lua
settings =
{
    plugins =
    {
        ["plugin.torch"] =
        {
            publisherId = "com.solar2dmarketplace",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?Torch_com-solar2dmarketplace)
- [Example](https://github.com/scottrules44/Torch-Demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
