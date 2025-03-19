## About

This plugin allows implement the OneSignal SDK 


## Functions

### Initialization

#### onesignal.init(appId)


**Parameters:**
- `appId` (string) (optional): The OneSignal App ID.

**Example:**
```lua
local onesignal = require "plugin.OneSignal"

onesignal.init("your-app-id")
```

---

### Tags Management

#### onesignal.addTags(tags)

Adds multiple tags to the user.

**Parameters:**
- `tags` (table): A key-value table of tags to add.

**Example:**
```lua
onesignal.addTags({ key1 = "value1", key2 = "value2" })
```

#### onesignal.addTag(key, value)

Adds a single tag to the user.

**Parameters:**
- `key` (string): The tag key.
- `value` (string): The tag value.

**Example:**
```lua
onesignal.addTag("key", "value")
```

#### onesignal.removeTags(keys)

Removes multiple tags from the user.

**Parameters:**
- `keys` (table): A list of tag keys to remove.

**Example:**
```lua
onesignal.removeTags({ "key1", "key2" })
```

#### onesignal.removeTag(key)

Removes a single tag from the user.

**Parameters:**
- `key` (string): The tag key to remove.

**Example:**
```lua
onesignal.removeTag("key")
```

#### onesignal.getTags()

Retrieves all tags associated with the user.

**Returns:**
- A table containing all tags.

**Example:**
```lua
local tags = onesignal.getTags()
print(tags.key1)
```

---

### User Management

#### onesignal.oneSignalId()

Retrieves the OneSignal user ID.

**Returns:**
- The OneSignal user ID (string).

**Example:**
```lua
local userId = onesignal.oneSignalId()
print(userId)
```

#### onesignal.getExternalId()

Retrieves the external ID associated with the user.

**Returns:**
- The external ID (string).

**Example:**
```lua
local externalId = onesignal.getExternalId()
print(externalId)
```

#### onesignal.login(externalId)

Logs in a user with the provided external ID.

**Parameters:**
- `externalId` (string): The external ID to associate with the user.

**Example:**
```lua
onesignal.login("external-id")
```

#### onesignal.logout()

Logs out the current user.

**Example:**
```lua
onesignal.logout()
```

#### onesignal.addAlias(key, value)

Adds an alias for the user.

**Parameters:**
- `key` (string): The alias key.
- `value` (string): The alias value.

**Example:**
```lua
onesignal.addAlias("aliasKey", "aliasValue")
```

#### onesignal.removeAlias(key)

Removes an alias for the user.

**Parameters:**
- `key` (string): The alias key to remove.

**Example:**
```lua
onesignal.removeAlias("aliasKey")
```

#### onesignal.setLanguage(language)

Sets the user's language.

**Parameters:**
- `language` (string): The language code (e.g., "en", "fr").

**Example:**
```lua
onesignal.setLanguage("en")
```

---

### Privacy Management

#### onesignal.setConsentGiven(consent)

Sets whether the user has given consent for data collection.

**Parameters:**
- `consent` (boolean): `true` if consent is given, `false` otherwise.

**Example:**
```lua
onesignal.setConsentGiven(true)
```

#### onesignal.setConsentRequired(required)

Sets whether consent is required for data collection.

**Parameters:**
- `required` (boolean): `true` if consent is required, `false` otherwise.

**Example:**
```lua
onesignal.setConsentRequired(true)
```

---

### Push Notifications

#### onesignal.getPermission()

Checks if the user has granted push notification permissions.

**Returns:**
- `true` if permissions are granted, `false` otherwise.

**Example:**
```lua
local hasPermission = onesignal.getPermission()
print(hasPermission)
```

#### onesignal.requestPermission(callback)

Requests push notification permissions from the user.

**Parameters:**
- `callback` (function): A function that receives the result of the permission request.

**Example:**
```lua
onesignal.requestPermission(function(event)
	if event.accepted then
		print("Permission granted")
	else
		print("Permission denied")
	end
end)
```

#### onesignal.clearAllNotifications()

Clears all notifications from the notification center.

**Example:**
```lua
onesignal.clearAllNotifications()
```

---

### Subscription Management

#### onesignal.optIn()

Opts the user into receiving notifications.

**Example:**
```lua
onesignal.optIn()
```

#### onesignal.optOut()

Opts the user out of receiving notifications.

**Example:**
```lua
onesignal.optOut()
```

#### onesignal.optedIn()

Checks if the user is currently opted in to receive notifications.

**Returns:**
- `true` if opted in, `false` otherwise.

**Example:**
```lua
local isOptedIn = onesignal.optedIn()
print(isOptedIn)
```

---

### Outcomes

#### onesignal.addOutcome(name)

Tracks an outcome event.

**Parameters:**
- `name` (string): The name of the outcome.

**Example:**
```lua
onesignal.addOutcome("purchase")
```

#### onesignal.addUniqueOutcome(name)

Tracks a unique outcome event.

**Parameters:**
- `name` (string): The name of the unique outcome.

**Example:**
```lua
onesignal.addUniqueOutcome("uniquePurchase")
```

#### onesignal.addOutcomeWithValue(name, value)

Tracks an outcome event with a value.

**Parameters:**
- `name` (string): The name of the outcome.
- `value` (number): The value associated with the outcome.

**Example:**
```lua
onesignal.addOutcomeWithValue("purchase", 9.99)
```

---

### In-App Messaging

#### onesignal.inAppAddTrigger(key, value)

Adds a trigger for in-app messages.

**Parameters:**
- `key` (string): The trigger key.
- `value` (string): The trigger value.

**Example:**
```lua
onesignal.inAppAddTrigger("key", "value")
```

#### onesignal.inAppRemoveTrigger(key)

Removes a trigger for in-app messages.

**Parameters:**
- `key` (string): The trigger key to remove.

**Example:**
```lua
onesignal.inAppRemoveTrigger("key")
```

#### onesignal.inAppClearTriggers()

Clears all triggers for in-app messages.

**Example:**
```lua
onesignal.inAppClearTriggers()
```

---

### Log Levels

#### onesignal.setLogLevel(level)

Sets the log level for the SDK.

**Parameters:**
- `level` (string): The log level (e.g., "debug", "info").

**Example:**
```lua
onesignal.setLogLevel("debug")
```

#### onesignal.setAlertLevel(level)

Sets the alert level for the SDK.

**Parameters:**
- `level` (string): The alert level (e.g., "error", "warning").

**Example:**
```lua
onesignal.setAlertLevel("error")
```

---

### SMS Management

#### onesignal.addSMS(phoneNumber)

Adds an SMS number to the user.

**Parameters:**
- `phoneNumber` (string): The phone number to add.

**Example:**
```lua
onesignal.addSMS("+1234567890")
```

#### onesignal.removeSMS(phoneNumber)

Removes an SMS number from the user.

**Parameters:**
- `phoneNumber` (string): The phone number to remove.

**Example:**
```lua
onesignal.removeSMS("+1234567890")
```

---

### Email Management

#### onesignal.addEmail(email)

Adds an email address to the user.

**Parameters:**
- `email` (string): The email address to add.

**Example:**
```lua
onesignal.addEmail("user@example.com")
```

#### onesignal.removeEmail(email)

Removes an email address from the user.

**Parameters:**
- `email` (string): The email address to remove.

**Example:**
```lua
onesignal.removeEmail("user@example.com")
```

### Build.settings
```
settings =
{
	plugins =
	{
		["plugin.OneSignal"] =
		{
			publisherId="tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```


### Helpful Links


[Get OneSignal Plugin](https://solar2dmarketplace.com/plugins?OneSignal_tech-scotth)

[Get Support In Forums](https://forums.solar2d.com/c/corona-marketplace/13)

[Check Demo](https://github.com/scottrules44/scanner-demo)
