# RevenueCat Plugin

Add subscriptions, one-time purchases, and a native paywall UI to your Solar2D app using RevenueCat. Works on iOS and Android with a single Lua API.

### Platforms:
iOS 13+ and Android API 24+

---

## Setup Guide

### 1. Create a RevenueCat account & project

1. Sign up at [app.revenuecat.com](https://app.revenuecat.com)
2. Create a new **Project**
3. Under **Apps & Providers**, add your app — use your Bundle ID for iOS or Package Name for Android
4. Copy your **Public SDK Key** — it starts with `appl_` for iOS and `andp_` for Android

### 2. Create your products in the App Store / Google Play

Your product IDs need to exist in App Store Connect or Google Play Console before RevenueCat can load them.

- **iOS subscriptions** → App Store Connect → Your App → Monetization → Subscriptions
- **iOS one-time purchases** → App Store Connect → Monetization → In-App Purchases → Non-Consumable
- **Android** → Google Play Console → Your App → Monetization → In-app products or Subscriptions
- Each product needs a display name, price, and description and must reach **Ready to Submit** status before it can be fetched

### 3. Configure the RevenueCat dashboard

1. **Product catalog → Products** — add each of your product IDs
2. **Product catalog → Entitlements** — create an entitlement (e.g. `premium`) and attach your products to it
3. **Product catalog → Offerings** — create an offering, add packages for your products, and set it as the **default** offering

---

## Functions

### revenuecat.configure(options)

Initialises the RevenueCat SDK. Call this once before any other function.

**options** (table, required)
- `apiKey` (string, required) — Your Public SDK Key from the RC dashboard
- `appUserID` (string, optional) — Custom user ID to identify the customer. Omit to let RC generate an anonymous ID
- `observerMode` (boolean, optional) — Set `true` if your app handles purchases itself and you only want RC to observe
- `onReady` (function, optional) — Callback fired once the SDK is fully initialised. On Android `configure` is asynchronous, so any calls to `getOfferings`, `setAttributes`, etc. **must** go inside `onReady`. On iOS `configure` is synchronous and `onReady` fires immediately — use it on both platforms for a consistent cross-platform pattern

```lua
rc.configure({
    apiKey  = "appl_YOUR_KEY",
    onReady = function()
        rc.setAttributes({ displayName = "Jane" })
        rc.getOfferings(callback)
    end
})
```

---

### revenuecat.getOfferings(callback)

Fetches the offerings configured in the RC dashboard. Offerings contain packages (products).

**callback** receives an event table:
- `event.isError` (boolean)
- `event.error` (string) — present when `isError` is true
- `event.offerings` (table)
  - `.current` (table) — the default offering
    - `.identifier` (string)
    - `.serverDescription` (string)
    - `.availablePackages` (array of package tables)
    - `.monthly`, `.annual`, `.lifetime`, `.weekly` — shortcut to the matching package (or `nil`)
  - `.all` (table) — all offerings keyed by identifier

**Package table:**
- `identifier` (string) — e.g. `"$rc_monthly"`
- `packageType` (string) — `"MONTHLY"`, `"ANNUAL"`, `"LIFETIME"`, `"WEEKLY"`, etc.
- `storeProduct` (table)
  - `productIdentifier` (string)
  - `localizedTitle` (string)
  - `localizedDescription` (string)
  - `localizedPriceString` (string) — e.g. `"$4.99"`
  - `price` (number)
  - `currencyCode` (string)

```lua
rc.getOfferings(function(ev)
    if ev.isError then
        print("Offerings error: " .. ev.error)
        return
    end
    local current = ev.offerings.current
    if current then
        for _, pkg in ipairs(current.availablePackages) do
            print(pkg.identifier, pkg.storeProduct.localizedPriceString)
        end
    end
end)
```

---

### revenuecat.purchasePackage(options, callback)

Starts a purchase flow for a specific package.

**options** (table, required)
- `packageIdentifier` (string, required) — the package identifier, e.g. `"$rc_monthly"`
- `offeringIdentifier` (string, optional) — which offering to look in; defaults to current

**callback** receives an event table:
- `event.isError` (boolean)
- `event.userCancelled` (boolean) — `true` when the user dismissed the payment sheet
- `event.error` (string) — present when `isError` is true and not cancelled
- `event.customerInfo` (table) — updated CustomerInfo on success
- `event.transactionId` (string) — the store transaction ID
- `event.productIdentifier` (string) — the purchased product ID

```lua
rc.purchasePackage(
    { packageIdentifier = "$rc_monthly", offeringIdentifier = "default" },
    function(ev)
        if ev.userCancelled then
            print("User cancelled")
        elseif ev.isError then
            print("Purchase error: " .. ev.error)
        else
            print("Purchased! Transaction: " .. ev.transactionId)
            local ent = ev.customerInfo.entitlements.active["premium"]
            if ent then print("Premium is active!") end
        end
    end
)
```

---

### revenuecat.presentPaywall(options, callback)

Shows the RevenueCat native paywall UI. The paywall is built from the offering's remote paywall configuration in the RC dashboard.

**options** (table, optional)
- `offeringIdentifier` (string, optional) — show a specific offering's paywall; omit for the default offering

**callback** receives an event table:
- `event.result` (string) — `"purchased"`, `"restored"`, or `"cancelled"`
- `event.isError` (boolean)
- `event.error` (string)
- `event.customerInfo` (table) — present on `"purchased"` or `"restored"`

```lua
rc.presentPaywall({}, function(ev)
    if ev.result == "purchased" then
        print("Purchase complete!")
    elseif ev.result == "restored" then
        print("Purchases restored!")
    elseif ev.result == "cancelled" then
        print("Paywall dismissed")
    elseif ev.isError then
        print("Paywall error: " .. (ev.error or "unknown"))
    end
end)

-- Show a specific offering's paywall
rc.presentPaywall({ offeringIdentifier = "sale_offering" }, callback)
```

---

### revenuecat.getCustomerInfo(callback)

Fetches the current customer's subscription status and entitlements.

**callback** receives an event table:
- `event.isError` (boolean)
- `event.error` (string)
- `event.customerInfo` (table)
  - `originalAppUserId` (string)
  - `latestExpirationDate` (string or nil)
  - `requestDate` (string)
  - `activeSubscriptions` (array of product ID strings)
  - `allPurchasedProductIdentifiers` (array of product ID strings)
  - `entitlements.all` (table keyed by entitlement ID)
  - `entitlements.active` (table keyed by entitlement ID, only active ones)

**Entitlement table:**
- `identifier` (string)
- `isActive` (boolean)
- `willRenew` (boolean)
- `isSandbox` (boolean)
- `productIdentifier` (string)
- `store` (string) — `"APP_STORE"`, `"PLAY_STORE"`, etc.
- `periodType` (string) — `"NORMAL"`, `"TRIAL"`, `"INTRO"`
- `expirationDate` (string or nil)
- `latestPurchaseDate` (string or nil)

```lua
rc.getCustomerInfo(function(ev)
    if ev.isError then return end

    local premium = ev.customerInfo.entitlements.active["premium"]
    if premium then
        print("Premium active, expires: " .. (premium.expirationDate or "never"))
    else
        print("No active premium entitlement")
    end
end)
```

---

### revenuecat.restorePurchases(callback)

Restores any purchases the user previously made (required on iOS for App Store approval).

**callback** receives an event table:
- `event.isError` (boolean)
- `event.error` (string)
- `event.customerInfo` (table) — updated CustomerInfo after restore

```lua
rc.restorePurchases(function(ev)
    if ev.isError then
        print("Restore error: " .. ev.error)
    else
        print("Restore complete")
        local premium = ev.customerInfo.entitlements.active["premium"]
        if premium then print("Premium restored!") end
    end
end)
```

---

### revenuecat.logIn(appUserID, callback)

Identifies the current user with your own user ID. Use this after the user signs into your app.

**appUserID** (string, required) — your own user identifier

**callback** receives an event table:
- `event.isError` (boolean)
- `event.error` (string)
- `event.created` (boolean) — `true` if this is a new RC user
- `event.customerInfo` (table)

```lua
rc.logIn("user_abc123", function(ev)
    if ev.isError then
        print("Login error: " .. ev.error)
    else
        print("Logged in. New user: " .. tostring(ev.created))
    end
end)
```

---

### revenuecat.logOut(callback)

Switches the current user back to an anonymous ID. Use when the user signs out of your app.

**callback** receives an event table:
- `event.isError` (boolean)
- `event.error` (string)
- `event.customerInfo` (table)

```lua
rc.logOut(function(ev)
    if not ev.isError then
        print("Logged out, anonymous ID: " .. ev.customerInfo.originalAppUserId)
    end
end)
```

---

### revenuecat.setAttributes(attributes)

Sets subscriber attributes on the current user. These appear in the RC dashboard and can be used for targeting.

**attributes** (table) — key-value pairs of strings

```lua
rc.setAttributes({
    displayName = "Jane Smith",
    email       = "jane@example.com",
    plan        = "trial",
})
```

---

### revenuecat.setDebugLogsEnabled(enabled)

Enables or disables verbose RevenueCat SDK logging to the console. Useful during development.

**enabled** (boolean)

```lua
rc.setDebugLogsEnabled(true)   -- enable verbose logs
rc.setDebugLogsEnabled(false)  -- disable (default in release)
```

---

### revenuecat.getAppUserID()

Returns the current user's RevenueCat App User ID as a string. Returns `nil` if the SDK has not been configured yet.

```lua
local uid = rc.getAppUserID()
print("RC User ID: " .. (uid or "not configured"))
```

---

## Full Example

```lua
local rc = require("plugin.revenuecat")

local RC_ENTITLEMENT = "premium"
local RC_API_KEY = system.getInfo("platform") == "android"
    and "andp_YOUR_ANDROID_KEY"
    or  "appl_YOUR_IOS_KEY"

rc.setDebugLogsEnabled(true)
rc.configure({
    apiKey  = RC_API_KEY,
    onReady = function()
        rc.getCustomerInfo(function(ev)
            if not ev.isError then
                local prem = ev.customerInfo.entitlements.active[RC_ENTITLEMENT]
                if prem then
                    print("User has premium access!")
                end
            end
        end)

        rc.getOfferings(function(ev)
            if ev.isError or not ev.offerings.current then return end

            local monthly = ev.offerings.current.monthly
            if monthly then
                print("Monthly price: " .. monthly.storeProduct.localizedPriceString)
            end
        end)

        rc.presentPaywall({}, function(ev)
            if ev.result == "purchased" or ev.result == "restored" then
                local prem = ev.customerInfo.entitlements.active[RC_ENTITLEMENT]
                if prem then print("Unlocked premium!") end
            end
        end)

        rc.restorePurchases(function(ev)
            if not ev.isError then
                print("Restore done")
            end
        end)
    end,
})
```

---

## Build Settings

```lua
settings =
{
    plugins =
    {
        ["plugin.revenuecat"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "(replace with Account ID in account page)",
        },
    },

    android =
    {
        minSdkVersion = "24",   -- Required for RevenueCat paywalls
    },
}
```

Your Account ID can be found on your Solar2D Marketplace account page.

---

##### Helpful Links:
- [Get plugin](https://solar2dmarketplace.com/plugins?RevenueCat_tech-scotth)
- [RevenueCat Dashboard](https://app.revenuecat.com)
- [RevenueCat Docs](https://www.revenuecat.com/docs)
- [Why are offerings empty?](https://rev.cat/why-are-offerings-empty)
- [Example](https://github.com/scottrules44/RevenueCat-Demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
