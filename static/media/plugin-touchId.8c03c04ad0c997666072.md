# Touch ID / Face ID Plugin

This plugin uses Touch ID found in iOS 8+ and iPhone 5s and above. It also supports Face ID with iPhone X and above via the NSFaceIDUsageDescription key — see Build Settings for details.

### Limitations:
Only works on iOS and not the iOS simulator.

### Functions:

#### touchId.show(listener, reason, fallbackTitle, cancelTitle)

listener (required)(function) — returns event.response. Responses are "success", "failed", "enter password", and "Does not support touch id".

reason (required)(string) — this text will show up inside the popup and is used to explain why Touch ID is needed.

fallbackTitle (optional)(string) — text to appear when biometric auth fails and another method should be used. Triggers "enter password" for listener.

cancelTitle (optional)(string) — text to appear when biometric auth fails and the user cancels. Triggers "failed" for listener.

### Build Settings:

```lua
settings =
{
    iphone =
    {
        plist =
        {
            NSFaceIDUsageDescription = "Need it for the plugin",
        }
    },
    plugins =
    {
        ["plugin.touchId"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    }
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?TouchId_tech-scotth)
- [Example](https://github.com/scottrules44/touchId-sample)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
