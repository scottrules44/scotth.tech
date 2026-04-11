# Search Ads Plugin

This plugin allows you to get data from Search Ads on iOS.

### Functions:

#### searchAds.init(listener)
listener (function) — returns event data

### Search Events

There are different events for iOS 14.3+ and iOS 14.2 and below.

##### iOS 14.3+
- event.isError (boolean)
- event.error (string)
- event.token (string) — read [here](https://developer.apple.com/documentation/ad_services/aaattribution/3697093-attributiontokenwitherror) about Search Ads (Attribution) Tokens

##### iOS 14.2 and below
- event.isError (boolean)
- event.error (string)
- event.attributionDetails (table) — read more about data returned [here](https://developer.apple.com/documentation/iad/setting_up_apple_search_ads_attribution)

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.searchAds"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?SearchAds_tech-scotth)
- [Example](https://github.com/scottrules44/searchAds-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
