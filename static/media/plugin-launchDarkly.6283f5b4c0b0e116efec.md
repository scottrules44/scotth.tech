### LaunchDarkly Plugin

This plugin provides feature flag management and A/B testing capabilities through LaunchDarkly's SDK. Control feature rollouts, perform experimentation, and manage configuration remotely without app updates.

### Testing:
The plugin includes simulator stubs for macOS and Windows that show warnings but allow your app to run during development. For full functionality, build and test on actual iOS or Android devices with a valid LaunchDarkly account.

### Limitations:
- Only supports iOS and Android devices.
- Simulator builds will show warnings but return default values.

### Functions:

#### `launchDarkly.init(mobileKey, config, context, timeout)`

Initialize the LaunchDarkly SDK.

- **mobileKey** (string, required): Your LaunchDarkly mobile SDK key from your environment settings.
- **config** (table, optional): Configuration options for the SDK.
  - **offline** (boolean): Start SDK in offline mode. Default: `false`
  - **streamingMode** (boolean): Use streaming mode for flag updates. Default: `true`
  - **evaluationReasons** (boolean): Include evaluation reasons in variation details. Default: `false`
  - **eventsCapacity** (number): Maximum number of events to queue. Default: `100`
  - **eventsFlushInterval** (number): Event flush interval in milliseconds. Default: `30000`
  - **backgroundPollingInterval** (number): Background polling interval in milliseconds. Default: `3600000`
  - **connectionTimeout** (number): Connection timeout in milliseconds. Default: `10000`
  - **maxCachedContexts** (number): Maximum cached contexts. Default: `5`
  - **privateAttributes** (table): Array of attribute names to keep private
  - **allAttributesPrivate** (boolean): Make all attributes private. Default: `false`
  - **diagnosticOptOut** (boolean): Opt out of diagnostic reporting. Default: `false`
  - **wrapperName** (string): Custom wrapper name for analytics
  - **wrapperVersion** (string): Custom wrapper version

- **context** (table, optional): User context for flag evaluation.
  - **key** (string, required): Unique identifier for the context
  - **kind** (string): Context kind. Default: `"user"`
  - **name** (string): Display name for the context
  - **anonymous** (boolean): Whether context is anonymous. Default: `false`
  - **custom** (table): Custom attributes (key-value pairs)

- **timeout** (number, optional): Maximum time to wait for initialization in milliseconds. Default: `5000`

**Example:**
```lua
local launchDarkly = require("plugin.LaunchDarkly")

launchDarkly.init(
    "mob-your-mobile-key-here",
    {
        streamingMode = true,
        eventsFlushInterval = 30000
    },
    {
        key = "user-123",
        name = "John Doe",
        custom = {
            plan = "premium",
            score = 1500
        }
    },
    5000
)
```

---

#### `launchDarkly.boolVariation(flagKey, defaultValue)`

Get the boolean value of a feature flag.

- **flagKey** (string, required): The unique key for the feature flag.
- **defaultValue** (boolean, required): Default value if flag cannot be evaluated.

**Returns:** Boolean value of the flag.

**Example:**
```lua
local showNewFeature = launchDarkly.boolVariation("new-feature", false)
if showNewFeature then
    -- Show new feature
end
```

---

#### `launchDarkly.intVariation(flagKey, defaultValue)`

Get the integer value of a feature flag.

- **flagKey** (string, required): The unique key for the feature flag.
- **defaultValue** (number, required): Default value if flag cannot be evaluated.

**Returns:** Integer value of the flag.

---

#### `launchDarkly.doubleVariation(flagKey, defaultValue)`

Get the double/floating-point value of a feature flag.

- **flagKey** (string, required): The unique key for the feature flag.
- **defaultValue** (number, required): Default value if flag cannot be evaluated.

**Returns:** Double value of the flag.

---

#### `launchDarkly.stringVariation(flagKey, defaultValue)`

Get the string value of a feature flag.

- **flagKey** (string, required): The unique key for the feature flag.
- **defaultValue** (string, required): Default value if flag cannot be evaluated.

**Returns:** String value of the flag.

**Example:**
```lua
local welcomeMessage = launchDarkly.stringVariation("welcome-message", "Welcome!")
print(welcomeMessage)
```

---

#### `launchDarkly.jsonVariation(flagKey, defaultValue)`

Get the JSON value of a feature flag.

- **flagKey** (string, required): The unique key for the feature flag.
- **defaultValue** (string, required): Default JSON string if flag cannot be evaluated.

**Returns:** JSON string value of the flag.

**Example:**
```lua
local configJson = launchDarkly.jsonVariation("app-config", "{}")
local config = json.decode(configJson)
```

---

#### `launchDarkly.boolVariationDetail(flagKey, defaultValue)`

Get the boolean value with evaluation details.

- **flagKey** (string, required): The unique key for the feature flag.
- **defaultValue** (boolean, required): Default value if flag cannot be evaluated.

**Returns:** Table with:
- **value** (boolean): The flag value
- **variationIndex** (number): Index of the variation served
- **isDefaultValue** (boolean): Whether the default value was used
- **reason** (string, optional): Reason for the evaluation result

**Example:**
```lua
local detail = launchDarkly.boolVariationDetail("new-feature", false)
print("Value:", detail.value)
print("Variation:", detail.variationIndex)
print("Is Default:", detail.isDefaultValue)
```

---

#### Other Variation Detail Functions

- `launchDarkly.intVariationDetail(flagKey, defaultValue)`
- `launchDarkly.doubleVariationDetail(flagKey, defaultValue)`
- `launchDarkly.stringVariationDetail(flagKey, defaultValue)`
- `launchDarkly.jsonVariationDetail(flagKey, defaultValue)`

All follow the same pattern as `boolVariationDetail` with their respective return types.

---

#### `launchDarkly.allFlags()`

Get all feature flags and their current values.

**Returns:** Table with flag keys as keys and JSON-encoded values as values.

**Example:**
```lua
local flags = launchDarkly.allFlags()
for key, value in pairs(flags) do
    print(key, value)
end
```

---

#### `launchDarkly.identify(context)`

Change the current evaluation context (e.g., when user logs in/out).

- **context** (table, required): New context for flag evaluation (same format as in `init`).

**Example:**
```lua
launchDarkly.identify({
    key = "user-456",
    name = "Jane Smith",
    custom = {
        plan = "basic"
    }
})
```

---

#### `launchDarkly.track(eventKey, data, metricValue)`

Track a custom analytics event.

- **eventKey** (string, required): Unique key for the event.
- **data** (table, optional): Custom data associated with the event.
- **metricValue** (number, optional): Numeric value for experimentation metrics.

**Example:**
```lua
launchDarkly.track("purchase-completed", {
    item = "premium-upgrade",
    price = 9.99
}, 9.99)
```

---

#### `launchDarkly.registerFeatureFlagListener(flagKey, callback)`

Register a listener for changes to a specific flag.

- **flagKey** (string, required): The flag key to listen to.
- **callback** (function, required): Function called when flag changes.
  - Receives `flagKey` as parameter

**Example:**
```lua
launchDarkly.registerFeatureFlagListener("new-feature", function(flagKey)
    print("Flag changed:", flagKey)
    local newValue = launchDarkly.boolVariation("new-feature", false)
    -- Update UI based on new value
end)
```

---

#### `launchDarkly.unregisterFeatureFlagListener(flagKey)`

Remove listener for a specific flag.

- **flagKey** (string, required): The flag key to stop listening to.

---

#### `launchDarkly.registerAllFlagsListener(callback)`

Register a listener for changes to any flags.

- **callback** (function, required): Function called when any flag changes.
  - Receives comma-separated string of changed flag keys

**Example:**
```lua
launchDarkly.registerAllFlagsListener(function(changedKeys)
    print("Flags changed:", changedKeys)
    -- Refresh all flag-dependent features
end)
```

---

#### `launchDarkly.unregisterAllFlagsListener()`

Remove listener for all flags.

---

#### `launchDarkly.isInitialized()`

Check if the SDK has been initialized.

**Returns:** Boolean indicating initialization status.

---

#### `launchDarkly.isOffline()`

Check if the SDK is in offline mode.

**Returns:** Boolean indicating offline status.

---

#### `launchDarkly.setOffline()`

Put the SDK in offline mode (stops network communication).

---

#### `launchDarkly.setOnline()`

Put the SDK in online mode (resumes network communication).

---

#### `launchDarkly.flush()`

Manually flush pending analytics events.

---

#### `launchDarkly.close()`

Shut down the SDK and release resources.

---

#### `launchDarkly.getVersion()`

Get the SDK version string.

**Returns:** String with SDK version.

---

### Build Settings:
```lua
settings =
{
    plugins =
    {
        ["plugin.launchDarkly"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "replace with marketplace id"
        },
    },
}
```

### Usage Example:
```lua
local launchDarkly = require("plugin.LaunchDarkly")
local json = require("json")

-- Initialize
launchDarkly.init(
    "mob-your-mobile-key",
    { streamingMode = true },
    {
        key = "user-123",
        custom = { tier = "premium" }
    },
    5000
)

-- Wait for initialization
if launchDarkly.isInitialized() then
    -- Get feature flags
    local showNewUI = launchDarkly.boolVariation("new-ui", false)
    local maxItems = launchDarkly.intVariation("max-items", 10)
    
    -- Listen for changes
    launchDarkly.registerFeatureFlagListener("new-ui", function(key)
        print("UI flag updated!")
    end)
    
    -- Track events
    launchDarkly.track("level-completed", { level = 5 }, 100)
end
```

[Get LaunchDarkly Plugin](https://solar2dmarketplace.com/plugins?LaunchDarkly_tech-scotth)

[Get Support In Forums](https://forums.solar2d.com)

[LaunchDarkly Demo](https://github.com/scottrules44/LaunchDarkly-Demo)
