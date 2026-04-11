# Contacts Plugin

This plugin allows you to get all contacts on iOS and Android.

### Platforms:
iOS (and simulator) and Android

### Functions:

#### contacts.canAccess()
Returns a string indicating the current access status:

- `"access granted"` (both)
- `"denied"` (both) — cannot access contacts
- `"restricted"` (iOS) — user won't allow access
- `"not determined"` (iOS) — user has not been shown the prompt yet

#### contacts.requestAccess(listener)
Request access to contacts.

- `listener` (function)

`event.status` values:
- `"access granted"` (both)
- `"denied"` (both) — cannot access contacts
- `"access granted already"` (both) — already have access
- `"access canceled"` (iOS) — user hit cancel on prompt
- `"error"` (iOS) — also returns `event.error` with a description
- `"restricted"` (iOS) — user has previously denied permission

#### contacts.get(listener)
Retrieve all contacts.

- `listener` (function)

`event.status` values:
- `"success"` (both)
- `"denied"` (both) — cannot access contacts
- `"error"` (iOS) — also returns `event.error` with a description
- `"restricted"` (iOS) — user has previously denied permission

`event.contacts` — only returned if `event.status == "success"`. Each contact contains:
- `name` (string)
- `addresses` (array of tables)
  - `street` (string)
  - `city` (string)
  - `state` (string)
  - `postalCode` (string)
  - `country` (string)
  - `type` (string)(Android) — `"home"`, `"work"`, or `"other"`
- `phoneNumbers` (array of tables)
  - `number` (string)
  - `type` (string)
    - `"mobile"` (both)
    - `"other"` (both)
    - `"work"` (Android)
    - `"home"` (Android)
    - `"main"` (iOS)
    - `"iPhone"` (iOS)
    - `"homeFax"` (iOS)
    - `"workFax"` (iOS)
    - `"otherFax"` (iOS)
    - `"pager"` (iOS)
- `emailAddresses` (array of tables)
  - `email` (string)
  - `type` (string)(Android) — `"home"`, `"work"`, `"mobile"`, or `"other"`

### Build Settings:

```lua
settings =
{
    iphone =
    {
        plist =
        {
            NSContactsUsageDescription = "testing",
        },
    },
    android = {
        usesPermissions = {
            "android.permission.READ_CONTACTS"
        }
    },
    plugins = {
        ["plugin.contacts"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

[View Example on GitHub Gist](https://gist.github.com/scottrules44/e2aacb10e2c4f165dac292df7174af1b)

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?Contacts_tech-scotth)
- [Example](https://github.com/scottrules44/contacts-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
