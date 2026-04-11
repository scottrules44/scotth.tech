# Class Kit Plugin

This plugin allows use of Class Kit on iPad 11.4, add assignable content and grade and log it.

### Platforms:
iOS 11.4+ only. You can only test on an iPad physical device.

### Functions:

#### classKit.addContent(content)
Adds assignable content to the Schoolwork app (called contexts).

content (table)
- `["type"]` (string) — `"app"`, `"audio"`, `"book"`, `"challenge"`, `"chapter"`, `"document"`, `"exercise"`, `"game"`, `"lesson"`, `"level"`, `"none"`, `"page"`, `"quiz"`, `"section"`, or `"video"`
- `["id"]` (string) — identifier for your content, e.g. `"com.myname.mytestname"`
- `["title"]` (string) — title of the content as it will appear in the Schoolwork app
- `["displayOrder"]` (integer)(optional) — position of content relative to its siblings
- `["universalLinkURL"]` (string)(optional) — URL to the app (should be set in build.settings; see below)
- `["child"]` (table)(optional) — attach content to content, e.g. a quiz to chapter 1. Can contain `["type"]`, `["title"]`, `["id"]`, `["displayOrder"]`, and `["universalLinkURL"]`

#### classKit.startContext(id, listener)
Start the context.

- `id` (string)
- `listener` (function) — event fired on completion; returns `event.error` (string), `event.isError` (boolean)

#### classKit.stopContext(id, listener)
Stop the context.

- `id` (string)
- `listener` (function) — event fired on completion; returns `event.error` (string), `event.isError` (boolean)

#### classKit.removeContext(id, listener)
Remove context from the Schoolwork app.

- `id` (string)
- `listener` (function) — event fired on completion; returns `event.error` (string), `event.isError` (boolean)

#### classKit.saveData()
Save Schoolwork data.

#### classKit.isContextActive(id, listener)
Check whether a context is active.

- `id` (string)
- `listener` (function) — event fired on completion; returns `event.error` (string), `event.isError` (boolean), `event.isActive` (boolean)

#### classKit.createActivity(id, listener)
Create an activity for a context.

- `id` (string)
- `listener` (function) — event fired on completion; returns `event.error` (string), `event.isError` (boolean)

#### classKit.startActivity()
Start the created activity.

#### classKit.stopActivity()
Stop the created activity.

#### classKit.destoryActivity()
Destroy the created activity.

#### classKit.addItemActivity(type, info)
Add an item to the activity.

- `type` (string) — `"score"`, `"binary"`, or `"quantity"`
- `info` (table)
  - `["id"]` (string) — item ID, e.g. `"myapp.myItem"`
  - `["title"]` (string) — title of item, e.g. `"Multiple Choice score"`
  - Score type: `["score"]` (double), `["maxScore"]` (double)
  - Binary type: `["binaryType"]` (string) — `"yesNo"`, `"trueFalse"`, or `"passFail"`
  - Quantity type: `["quantity"]` (double)

#### classKit.addPrimaryItemActivity(type, info)
Add a primary item to the activity. See `addItemActivity` above for `type` and `info` parameters.

#### classKit.setProgressActivity(progress)
Set the activity progress.

- `progress` (double) — number between 0 and 1

#### classKit.markComplete(id)
Mark an assignment complete.

- `id` (string) — ID to mark complete

#### classKit.isActivityRunning()
Returns a boolean indicating whether an activity is currently running.

### Enable ClassKit on iPad for Test Mode:

Go to Settings > Developer (make sure your device has developer mode enabled) > ClassKit API > Enable ClassKit and set to teacher or student. You also need the [Schoolwork app](https://itunes.apple.com/us/app/schoolwork/id1355112526?mt=8) to test and create assignments.

### Build Settings:

```lua
settings =
{
    phone =
    {
        entitlements = {
            ["com.apple.developer.ClassKit-environment"] = "development" -- or "production"
        },
        plist =
        {
            CFBundleURLTypes = {
                {
                    CFBundleURLSchemes = {
                    "testApp"
                    } -- Scheme to use in classkit
                }
            }
        },
    },
    plugins =
    {
        ["plugin.classKit"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

[View Example on GitHub Gist](https://gist.github.com/scottrules44/155159d9422315f25fd93d2984a06c4c)

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?ClassKit_tech-scotth)
- [Example](https://github.com/scottrules44/classKit-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
