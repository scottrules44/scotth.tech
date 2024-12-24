## About

This plugin allows you use IronSource ads and mediation

## Platforms

iOS and Android

## Setup

Go to [Iron Source website](https://www.ironsrc.com) and create account. Then go to apps and create an app for android and/or iOS

If you want to setup mediation go here and setup each network
	[https://platform.ironsrc.com/partners/monetize/mediation/setup](https://platform.ironsrc.com/partners/monetize/mediation/setup)
## Functions



#### `ironSource.init(listener, params)` — init function

- **listener** (function) returns an event in the Events section below
- **params** (table): 
  - `androidAppKey` = app key for Android (string)
  - `iOSAppKey` = app key for iOS (string)
  - `clientSideCallback` = boolean (default is false)
  - `GDPR` = boolean (default is false)
  - `enableATT` = boolean (shows App Tracking Transparency popup before initiating and returns events, default is true)
  - `enableRewardVideo` = boolean (init reward videos, default is true)
  - `enableInterstitial` = boolean (should init interstitial, default is true)
  - `enableBanner` = boolean (should init banner, default is true)

#### `ironSource.load(type, params)` — load ad

- **type** (string): 
  - `"banner"` (note: show banners before loading), `"interstitial"`, `"rewardedVideo"`
- **params** (table):
  - `iOSAdUnitId` (string) (required for iOS) ad unit id for the ad type for iOS.
  - `androidAdUnitId` (string) (required for Android) ad unit id for the ad type for Android.
  - On `"banner"`, the param `"placement"` can be added.
  - `tablet` (boolean) (default is false) can be added.

#### `ironSource.show(type, params)` — show ads

- **type** (string): `"banner"`, `"interstitial"`, `"rewardedVideo"`
- **params** (table):
  - On `"banner"`, `position` (string) = `"top"` or `"bottom"`.
  - On `"interstitial"`, `"rewardedVideo"`, the param `"placement"` can be added.

#### `ironSource.hide(type)` — hides banners until `.show` is called again

- **type** (string): `"banner"`

#### `ironSource.isLoaded(type)` — returns boolean

- **type** (string): `"banner"`, `"interstitial"`, `"rewardedVideo"`

#### `ironSource.setMetaData(key, value)` — set meta data for Iron Source

- **key** (string)
- **value** (string)
  
  Examples:
  - For CCPA: `ironSource.setMetaData("do_not_sell", "true")`
  - For apps with age gates: `ironSource.setMetaData("is_child_directed", "true")`
  - For COPPA AdColony: `ironSource.setMetaData("AdColony_COPPA", "true")`
  - For AppLovin Age Restriction: `ironSource.setMetaData("AppLovin_AgeRestrictedUser", "true")`
  - For CacheFlag Facebook: `ironSource.setMetaData("Facebook_IS_CacheFlag", "IMAGE")`
  - For Admob Ad Content Filtering: `ironSource.setMetaData("AdMob_MaxContentRating", "MAX_AD_CONTENT_RATING_G")` (other values: `MAX_AD_CONTENT_RATING_G`, `MAX_AD_CONTENT_RATING_PG`, `MAX_AD_CONTENT_RATING_T`, `MAX_AD_CONTENT_RATING_MA`)

#### `ironSource.setProperties(properties)` — set properties

- **properties** (table):
  - `type` (string): `"banner"`, `"interstitial"`, `"offerwall"`, `"rewardedVideo"`
  - `userId` (string)
  - `mediationSegment` (string)
  - `mediationType` (string)

#### `ironSource.getRewardVideoPlacementInfo(placement)` — returns table with reward information

- **placement** (string)
- Returns a table with:
  - `rewardAmount` (number)
  - `rewardName` (string)
  - `isRewardedVideoPlacementCapped` (boolean)

#### `ironSource.getOfferwallCredits()`

#### `ironSource.getSize()` — gets size of banners (note: banner must be showing and loaded to get size)

- Returns `height` (number)

#### `ironSource.getAdId()` — return ad id for [test mode](https://developers.is.com/ironsource-mobile/air/integration-testing/#step-1)

- Returns a string

#### `ironSource.debugMode()` — prints SDK integration for validation

#### `ironSource.destroyBanner()` — destroy banner

#### `ironSource.setFBTrackingEnabled(shouldEnable)` — Only for iOS (Use for Facebook Ads iOS 14+)

- **shouldEnable** (boolean): Set based on ATT Preference

### Events:
Returned in listener function on `.init()`.

#### App Tracking Transparency events (if `enableATT` is true and iOS 14+):

- `phase == "att event"`, `status == "not determined"`
- `phase == "att event"`, `status == "authorized"`
- `phase == "att event"`, `status == "denied"`
- `phase == "att event"`, `status == "restricted"`

#### Banner:

- `phase == "adLoaded"`, `isError == false`, `type == "banner"`
- `phase == "adLoadedFailed"`, `isError == true`, `error == error message (string)`, `type == "banner"`
- `phase == "adClicked"`, `isError == false`, `type == "banner"`
- `phase == "adScreenPresented"`, `isError == false`, `type == "banner"`
- `phase == "adScreenDismissed"`, `isError == false`, `type == "banner"`
- `phase == "adLeftApplication"`, `isError == false`, `type == "banner"`

#### Interstitial:

- `phase == "adReady"`, `isError == false`, `type == "interstitial"`
- `phase == "adLoadFailed"`, `isError == true`, `error == error message (string)`, `type == "interstitial"`
- `phase == "adOpened"`, `isError == false`, `type == "interstitial"`
- `phase == "adClosed"`, `isError == false`, `type == "interstitial"`
- `phase == "adShowSucceeded"`, `isError == false`, `type == "interstitial"`
- `phase == "adShowFailed"`, `isError == false`, `type == "interstitial"`, `error == error message (string)`
- `phase == "adClicked"`, `isError == false`, `type == "interstitial"`


#### Reward Video:

- `phase == "availabilityChanged"`, `isError == false`, `type == "rewardedVideo"`, `available == boolean (could be false or true)`
- `phase == "adClosed"`, `isError == false`, `type == "rewardedVideo"`
- `phase == "adOpened"`, `isError == false`, `type == "rewardedVideo"`
- `phase == "adStarted"`, `isError == false`, `type == "rewardedVideo"`
- `phase == "adEnded"`, `isError == false`, `type == "rewardedVideo"`
- `phase == "adRewarded"`, `isError == false`, `type == "rewardedVideo"`, `rewardName == reward name from video ad (string)`, `rewardAmount == reward amount from video ad (number)`
- `phase == "adShowError"`, `isError == true`, `type == "rewardedVideo"`, `error == error message (string)`
- `phase == "didClickRewardedVideo"`, `isError == false`, `type == "rewardedVideo"`

#### Impression Data:

- `adSource == the ad network used for impression (string)`, `adFormat == also known as the ad unit (string)`, `type == "impressionData"`, `adUnitName == also known as the instance name (string)`, `value == revenue of impression (string)`, `adPlatform == "ironSource"`, `isError == false`

[Firebase Analytics docs for logging impression to Firebase](https://scotth.tech/plugin-firebaseAnalytics#ironsrc)


### iOS 14:

Iron Source Plugin has been updated for iOS 14. Please add `SKAdNetworkItems` listed below in `build.settings`.

As for App Tracking Transparency (ATT) in iOS 14, Iron Source recommends showing a pop-up and requesting permission before calling `.init()`.

To show/request ad tracking, please use and read information about the [ATT Plugin](http://docs.coronalabs.com/plugin/att/). If you don't request permission or if permission is denied, Iron Source's ads will not be targeted via the device's identity for Advertisers (IDFA).

For showing Facebook Ads, please use the `.setFBTrackingEnabled` API mentioned above.

### Google Play Families programs:

In order to be in the Families section on Google Play, you must do the following:

1. Rebuild and use the latest Iron Source Plugin (3/23/2022, 1.20).
2. Remove `"com.google.android.gms.permission.AD_ID"` by adding the following to your `Build.settings`:

```lua
settings =
{
    android =
    {
        -- Add this
        manifestChildElements = 
        {
            [[
            <uses-permission android:name="com.google.android.gms.permission.AD_ID" tools:node="remove"/>
            ]],
        },
    },
}
```

3. Set MetaData "IS_DeviceID_OptOut" and "IS_Child_Directed" to "true" before init:


For mixed audience:

1. Rebuild and use the latest Iron Source Plugin (3/23/2022, 1.20).
2. If the user is a child or the age is unknown, set MetaData "IS_DeviceID_OptOut" and "IS_Child_Directed" to "true" before init:

```lua
local age = 12
local ageKnown = true
if(age <= 13 or ageKnown == false) then -- if age is 13 or below or age is unknown we have to flag
    ironSource.setMetaData("IS_DeviceID_OptOut", "true") -- Before Init
    ironSource.setMetaData("IS_Child_Directed", "true") -- Before Init
end

ironSource.init(listener, params)
```

## Build.settings
```lua
settings =
{
    android =
    {
        applicationChildElements =
        {
            -- Array of strings
            [[
            <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="insert app id for admob"/>
            ]],
        },
    },
    iphone =
    {
        plist =
        {
            SKAdNetworkItems = {{SKAdNetworkIdentifier = "SU67R6K2V3.skadnetwork"}, {SKAdNetworkIdentifier = "4PFYVQ9L8R.skadnetwork"}, {SKAdNetworkIdentifier = "cstr6suwn9.skadnetwork"}, {SKAdNetworkIdentifier = "ludvb6z3bs.skadnetwork"}, {SKAdNetworkIdentifier = "F38H382JLK.skadnetwork"}, {SKAdNetworkIdentifier = "V4NXQHLYQP.skadnetwork"}, {SKAdNetworkIdentifier = "22mmun2rn5.skadnetwork"}, {SKAdNetworkIdentifier = "238da6jt44.skadnetwork"}, {SKAdNetworkIdentifier = "4DZT52R2T5.skadnetwork"}, {SKAdNetworkIdentifier = "GTA9LK7P23.skadnetwork"}}, -- iOS 14 ready, supports all adapters https://developers.ironsrc.com/ironsource-mobile/ios/ios-14-network-support/
            NSAppTransportSecurity =
                {
                    NSAllowsArbitraryLoads = true,
                },
                NSUserTrackingUsageDescription= "insert reason for tracking here",
            GADApplicationIdentifier = "replace this",
        },
    },
    plugins =
    {
        -- Adapters
        ["ironsource.applovin"] = {
            publisherId = "tech.scotth",
        },
        ["ironsource.adColony"] = {
            publisherId = "tech.scotth",
        },
        ["ironsource.admob"] = {
            publisherId = "tech.scotth",
        },
        ["ironsource.amazon"] = {
            publisherId = "tech.scotth",
        },
        ["ironsource.chartboost"] = {
            publisherId = "tech.scotth",
        },
        ["ironsource.facebook"] = {
            publisherId = "tech.scotth",
        },
        ["ironsource.fyber"] = {
            publisherId = "tech.scotth",
        },

        ["ironsource.hypermx"] = {
            publisherId = "tech.scotth",
        },
        ["ironsource.inmobi"] = {
            publisherId = "tech.scotth",
        },
        ["ironsource.myTarget"] = {
            publisherId = "tech.scotth",
        },
        ["ironsource.pangle"] = {
            publisherId = "tech.scotth",
        },
        ["ironsource.superAwesome"] = {
            publisherId = "tech.scotth",
        },
        ["ironsource.tapjoy"] = {
            publisherId = "tech.scotth",
        },
        ["ironsource.unityAds"] = {
            publisherId = "tech.scotth",
        },
        ["ironsource.vungle"] = {
            publisherId = "tech.scotth",
        },

        ["ironsource.yahoo"] = {
            publisherId = "tech.scotth",
        },
        -- Core Plugin
        ["plugin.ironSource.v2"] =
        {
            publisherId="tech.scotth",
            marketplaceId = "insert marketplace account ID"
        },
    },
}

```


## Helpful Links



[Iron Source Knowledge Center](https://developers.is.com/)

[Get Plugin](https://solar2dmarketplace.com/plugins?IronSource_tech-scotth)

[Get Demo](https://github.com/scottrules44/ironSourceDemo)

[Support](https://forums.coronalabs.com/forum/654-corona-store-plugins/)
