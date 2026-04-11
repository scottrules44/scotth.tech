# Universal Links Plugin

This plugin allows you to get the link with Universal Links (iOS 9.0+).

### Runtime Events:

- name: "universalLinks"
- url: the URL opened with the app
- type: "cold" or "warm"

```lua
Runtime:addEventListener("universalLinks", myListener)
```

### Setup:

Add the following to your build.settings:

```lua
settings =
{
    iphone =
    {
        entitlements = {
            ["com.apple.developer.associated-domains"] = {
                "applinks:www.mysite.com"
            },
        },
    },
    plugins = {
        ["plugin.universalLinks"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

Make sure to add the `apple-app-site-association` file to your site ([check out Apple's site for more details](https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html)):

```lua
{
    "applinks": {
        "apps": [],
        "details": [
        {
        "appID": "REPLACE.with.your.appID",
        "paths": ["*"]
        }
        ]
    }
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?UniversalLinks_tech-scotth)
- [Universal Links Website Validator](https://branch.io/resources/aasa-validator/)
- [Example](https://github.com/scottrules44/universalLinks-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
