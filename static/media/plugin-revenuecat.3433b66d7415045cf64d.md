# RevenueCat Plugin

Add subscriptions, one-time purchases, and a native paywall UI to your Solar2D app using RevenueCat. Works on iOS and Android with a single Lua API.

### Platforms:
iOS 13+ and Android API 24+

---

## Setup Guide

### 1. Create a RevenueCat account & project

1. Sign up at [app.revenuecat.com](https://app.revenuecat.com)
2. Create a new **Project**
3. Under **Apps & Providers**, add your iOS app (Bundle ID) and/or Android app (Package Name)
4. Copy your **Public SDK Key** — it starts with `appl_` for iOS and `andp_` for Android

### 2. Create products in the App Store / Google Play

Your product IDs must exist in App Store Connect (or Google Play Console) **before** RevenueCat can load them.

- **iOS subscriptions** → App Store Connect → Your App → Monetization → Subscriptions → create a Subscription Group, then add products inside it
- **iOS one-time (lifetime)** → App Store Connect → Monetization → In-App Purchases → Non-Consumable
- **Android** → Google Play Console → Your App → Monetization → In-app products or Subscriptions
- Each product needs a display name, price, and description and must reach **"Ready to Submit"** status

### 3. Configure the RevenueCat dashboard

1. In the RC dashboard go to **Product catalog → Products** and add each product ID
2. Go to **Product catalog → Entitlements**, create an entitlement (e.g. `premium`) and attach all your products to it
3. Go to **Product catalog → Offerings**, create an offering, add packages for Monthly / Annual / Lifetime, and mark it as the **default** offering

### 4. iOS — add the frameworks

Download `RevenueCat.xcframework` and `RevenueCatUI.xcframework` from the [purchases-ios releases page](https://github.com/RevenueCat/purchases-ios/releases) and place them in:

```
src/ios/EmbeddedFrameworks/
```

### 5. Android — build the plugin AAR

Open `src/android` in Android Studio and run the Gradle task:

```
Solar2Dev → deployToLocalSolar2DRepo
```

Or from the terminal:

```bash
cd src/android
./gradlew :plugin:deployToLocalSolar2DRepo
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
            publisherId = "com.solar2d",
        },
    },

    android =
    {
        minSdkVersion = "24",   -- Required for RevenueCat paywalls
    },
}
```

---

## Quick Start

```lua
local rc = require("plugin.revenuecat")

-- Use appl_... for iOS, andp_... for Android
local RC_API_KEY
if system.getInfo("platform") == "android" then
    RC_API_KEY = "andp_YOUR_ANDROID_KEY"
else
    RC_API_KEY = "appl_YOUR_IOS_KEY"
end

rc.setDebugLogsEnabled(true)
rc.configure({ apiKey = RC_API_KEY })

rc.getOfferings(function(ev)
    if ev.isError then
        print("Error: " .. ev.error)
        return
    end
    local current = ev.offerings.current
    if current then
        print("Current offering: " .. current.identifier)
        for _, pkg in ipairs(current.availablePackages) do
            print("  Package: " .. pkg.identifier)
        end
    end
end)
```

---

## Functions

### revenuecat.configure(options)

Initialises the RevenueCat SDK. Call this once before any other function.

**options** (table, required)
- `apiKey` (string, required) — Your Public SDK Key from the RC dashboard
- `appUserID` (string, optional) — Custom user ID to identify the customer. Omit to let RC generate an anonymous ID
- `observerMode` (boolean, optional) — Set `true` if your app handles purchases itself and you only want RC to observe

```lua
rc.configure({ apiKey = "appl_YOUR_KEY" })

-- With a logged-in user ID
rc.configure({ apiKey = "appl_YOUR_KEY", appUserID = "user_12345" })
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
            -- check entitlement:
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
        -- unlock features using ev.customerInfo
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
rc.configure({ apiKey = RC_API_KEY })

-- Check existing entitlement on launch
rc.getCustomerInfo(function(ev)
    if not ev.isError then
        local prem = ev.customerInfo.entitlements.active[RC_ENTITLEMENT]
        if prem then
            print("User has premium access!")
            -- unlock your app features here
        end
    end
end)

-- Fetch offerings and show a buy button
rc.getOfferings(function(ev)
    if ev.isError or not ev.offerings.current then return end

    local monthly = ev.offerings.current.monthly
    if monthly then
        print("Monthly price: " .. monthly.storeProduct.localizedPriceString)
    end
end)

-- Present the paywall
rc.presentPaywall({}, function(ev)
    if ev.result == "purchased" or ev.result == "restored" then
        local prem = ev.customerInfo.entitlements.active[RC_ENTITLEMENT]
        if prem then print("Unlocked premium!") end
    end
end)

-- Restore button handler
rc.restorePurchases(function(ev)
    if not ev.isError then
        print("Restore done")
    end
end)
```

---

##### Helpful Links:
- [RevenueCat Dashboard](https://app.revenuecat.com)
- [RevenueCat Docs](https://www.revenuecat.com/docs)
- [Why are offerings empty?](https://rev.cat/why-are-offerings-empty)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
