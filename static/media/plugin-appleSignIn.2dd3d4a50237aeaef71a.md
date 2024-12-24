# Apple Sign In Plugin

This plugin allows you to perform an Apple Sign In on iOS 13+ and Other Device though the Web View.

## Platforms
This plugin only works with:
-iOS 13+
-Devices that support a Web View (i.e not Apple TV)
^ See instructions below for setup

> **Note**: [When an existing user logs into your app(is not new), Apple doesn’t provide the email and full name.](https://www.raywenderlich.com/4875322-sign-in-with-apple-using-swiftui)

## Functions

### `appleSignIn.show(type, listener, credentials)`
- **`type`** *(string, optional)*: Can be `nil`, `"email"`, `"name"`, or `"nameAndEmail"`.  
  - `"email"`: Returns the following events to the listener:
    - `event.email`: Note that this could be a personal or Apple-generated email.
  - `"name"`: Returns the following events to the listener:
    - `event.fullName`: A table that contains:
      - `event.fullName.givenName` *(string, first name)*  
      - `event.fullName.familyName` *(string, last name)*  
  - `"nameAndEmail"`: Returns both name and email events.

- **`listener`** *(function)*: A function that handles the events returned. Events include:
  - `event.isError` *(boolean)*: Indicates whether login was successful.  
  - `event.error` *(string)*: Contains error details if `isError` is `true`.  
  - `event.identityToken` *(string)*: The identity token.  
  - `event.authorizationCode` *(string)*: The authorization code.  
  - `event.user` *(string)*: The user ID, returned if login is successful.

- **`credentials`** *(function, needed for non iOS Devices)*: params for Web Sign In
  - `params:`
    - `"clientId"`(String): pass in from Apple Developer Console tied to Service Id i.e "tech.scotth.apple-sign-in"
    - `"domain"` (String): Domain where you are hosting redirect (note the path is set to "/apple_process_sign_in_solar2d")

---

### `appleSignIn.getCredentialState(userId, listener)  -- Only on iOS`
- **`userId`** *(string)*: The user ID (found from `event.user`).
- **`listener`** *(function)*: A function that handles the credential state events. Possible `event.type` values:
  - `"revoked"`  
  - `"notFound"`  
  - `"authorized"`  
  - `"transferred"`  

---

## Setup for Other Devices

In order to support the webview, please follow Apple Guide [here](https://developer.apple.com/help/account/configure-app-capabilities/configure-sign-in-with-apple-for-the-web)

- Note for Step 7, you will need to setup a web server that can handle post request (i.e not Github Pages or other static host), check out the [example server posted](https://github.com/scottrules44/AppleSignIn_Web_Solar2D/tree/main/Express%20Server%20Example), all redirects will come as post requests to path "/apple_process_sign_in_solar2d" on your domain

- If you need to customize the domain path or UI, source code can be [here](https://github.com/scottrules44/AppleSignIn_Web_Solar2D/blob/main/plugin_appleSignIn.lua)


- You will then need to add credentials to the .show function
```lua
appleSignIn.show("nameAndEmail", function (e)
      print(json.encode(e))
end , { clientId = "tech.scotth.apple-sign-in", domain = "cloud.scotth.tech" }  )
```

## Build Settings
```lua
settings = 
{ 
    iphone = 
    { 
        entitlements = { 
            ["com.apple.developer.applesignin"] = {"Default"}, -- make sure provisioning profile supports Apple Sign In 
        } 
    }, 
    plugins = { 
        ["plugin.appleSignIn"] = 
        { 
            publisherId = "tech.scotth", 
            marketplaceId = "insert marketplace account ID", 
        }, 
    }, 
}
