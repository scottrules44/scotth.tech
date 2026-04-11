# Card IO Plugin

This plugin allows you to scan credit cards via the [cardIO](https://www.card.io) popup.

### Limitations:
Only works on iOS and Android

### Functions:

#### cardIO.show(listener, cardScanning)
listener (function)(required) — returns event.status. Statuses are "succeeded" and "cancelled". If status == "succeeded", the following events may also be returned (note: not all events are always returned):
- event.expiry (string) — expiry on card, example: "01/2020"
- event.cvv (string) — card verification value, example: "911"
- event.cardNumber (string) — example: "5105105105105100"
- event.cardType (string) — credit card type: "Ambiguous" (iOS only), "Unknown", "Amex", "Japan Credit Bureau", "Visa", "Mastercard", "Discover", or "Maestro" (Android only), example: "Amex"
- event.redactedCardNumber (string) — example: "...........1111"
- event.postalCode (string) — required by certain countries, example: "73301"
- event.cardholderName (string) — name on card, example: "John Smith"

cardScanning (table)(optional) — set the following keys to true to allow that data to be returned:
- cardholderName
- expiry
- postalCode
- cvv

### Build Settings:

```lua
settings =
{
    iphone =
    {
        plist =
        {
            NSCameraUsageDescription = "Used to Scan Cards",
            CFBundleDevelopmentRegion = "en",
        },
    },
    android =
    {
        usesPermissions =
        {
            "android.permission.CAMERA",
        },
    },
    plugins =
    {
        ["plugin.cardIO"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?CardIO_tech-scotth)
- [Example](https://github.com/scottrules44/cardIO-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
