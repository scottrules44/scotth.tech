# Review Pop Up Plugin

This plugin allows you to show the native review pop up found in iOS and Android.

### Platforms:
iOS 10.3+ and Android

### Limitations:
On iOS during development, .show() will always show the pop up but this will not happen on release. On Android, to test you need to follow [these steps](https://developer.android.com/guide/playcore/in-app-review/test).

### Functions:

#### reviewPopUp.init(listener, testMode)
listener (function) — returns event.status. On iOS, event.status "ready" is returned after init is called. On Android, event.status = "error" or "ready".

testMode (boolean) — to use the FakeReviewManager and to test, [read more here](https://developer.android.com/guide/playcore/in-app-review/test)

#### reviewPopUp.show()
On Android, "ready" status must be returned from init before calling show.

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.reviewPopUp"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?ReviewPopUp_tech-scotth)
- [Example](https://github.com/scottrules44/reviewPopUp-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
