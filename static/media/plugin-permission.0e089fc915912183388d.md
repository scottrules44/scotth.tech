# Permission Plugin

This plugin allows you to check and request permissions.

### Platforms:
iOS and MacOS

### Functions:

#### Permission Types:
"photo" (MacOS, iOS) — more coming soon

#### permission.requestPermission(type, listener)
type (string) — type of permission to request (see above)

listener (function) — listener which will return events. event.status returns "authorized", "restricted", or "denied"

#### permission.hasPermission(type)
Returns string "authorized", "denied", "not determined", or "restricted".

type (string) — type of permission to check (see above)

### Build Settings:

```lua
settings =
{
    iphone =
    {
        plist =
        {
            NSPhotoLibraryUsageDescription = "test",
            NSPhotoLibraryAddUsageDescription = "test",
        },
    },
    plugins =
    {
        ["plugin.permission"] =
        {
            publisherId = "tech.scotth",
        },
    },
    macos = {
        plist =
        {
            NSPhotoLibraryUsageDescription = "test",
            NSPhotoLibraryAddUsageDescription = "test",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?PermissionPlugin_tech-scotth)
- [Example](https://github.com/scottrules44/appleSignIn-demo)
- [Support](https://forums.coronalabs.com/forum/654-corona-store-plugins/)
