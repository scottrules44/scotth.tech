# One Password

This plugin uses the [One Password](https://1password.com/) extension, which requires iOS 8+ and One Password to be installed.

### Limitations:
Only works on iOS (not the iOS simulator).

### Functions:

#### onePassword.show(listener, url)
listener (required)(function) — returns event.username, event.password, and event.error. Username returns a string (could be an email depending on how the user entered it). Password returns the password as a plain string (no encoding).
url (required)(string) — use this as the app name or website name. If your site was example.com, use "https://example.com/". If you just want to use an app name, use something like "my app".

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.onePassword"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?OnePasswordPlugin_tech-scotth)
- [Example](https://github.com/scottrules44/onePassword-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
