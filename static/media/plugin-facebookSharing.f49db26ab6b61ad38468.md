# Facebook Sharing Plugin

This plugin allows your application to share content (links, photos, and videos) to Facebook within the app.

### Platforms:
iOS 7+ and Android 5+

### Gotchas:
You need the Facebook app installed to share videos and photos. Use `canShow` to check the API before attempting to share.

### Functions:

#### facebookSharing.init()
Initialize Facebook Sharing.

```lua
facebookSharing.init()
```

#### facebookSharing.show(params, listener)
Show the Facebook sharing dialog.

- `params` (table)(required) — `{ url (string), photos (array of pathForFile image files, each less than 12MB), video (pathForFile video file, less than 50MB), hashtag (string, e.g. "#solar2d") }`

  Note: `photos` and `video` keys can be used together, but the `url` key should not be combined with `photos` or `video`.

- `listener` (function)
  - `event.status`
    - `"did share"`
    - `"did cancel"`
    - `"error"`
  - `event.isError` (boolean)
  - `event.error` (string)

```lua
local function fbLis(e)
    print(json.encode(e))
end
facebookSharing.show(
{
    photos = {system.pathForFile("test1.png"), system.pathForFile("test2.png")},
    video = system.pathForFile("test.mp4"),
    hashtag = "#solar2d"
}, fbLis)
```

#### facebookSharing.canShow(type)
Returns a boolean indicating whether sharing is available for the given type.

- `type` (string) — `"video"`, `"photos"`, or `"url"`

```lua
print(facebookSharing.canShow("video")) -- prints boolean
```

### Build Settings:

```lua
settings =
{
    iphone =
    {
        plist =
        {
            FacebookAppID = "XXXXXXXXXX",  -- Replace XXXXXXXXXX with your Facebook App ID
            FacebookDisplayName = "solar2d test app",
            CFBundleURLTypes =
            {
                { CFBundleURLSchemes = { "fbXXXXXXXXXX", } }  -- Replace XXXXXXXXXX with your Facebook App ID
            },
            -- Whitelist Facebook apps
            LSApplicationQueriesSchemes =
            {
                "fb",
                "fbapi",
                "fbauth2",
                "fbauth",
                "fbshareextension",
            },
        },
    },
    android =
    {
        usesPermissions =
        {
            "android.permission.INTERNET"
        },
        applicationChildElements =
        {
            -- Array of strings
            [[
                <provider android:authorities="com.facebook.app.FacebookContentProviderXXXXXXXXXX"
                          android:name="com.facebook.FacebookContentProvider" android:exported="true"/>
            ]],
        },
        facebookAppId = "XXXXXXXXXX",  -- Replace XXXXXXXXXX with your Facebook App ID
    },
    plugins =
    {
        ["plugin.facebookSharing"] = {
            publisherId = "tech.scotth",
            marketplaceId = "xxxxxx", -- replace with your Solar2D Marketplace account ID
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?FacebookSharing_tech-scotth)
- [Example](https://github.com/scottrules44/facebookSharing-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
