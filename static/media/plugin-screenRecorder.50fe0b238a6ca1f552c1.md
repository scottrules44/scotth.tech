# Screen Recorder Plugin

> This plugin is no longer supported. Please see [Screen Recorder V2](https://scotth.tech/plugin/screenRecorderV2).

This plugin allows you to record the device's screen and save to Solar2D's file system to be played and shared.

### Platforms:
iOS and Android 5.0+

### Limitations:
No audio is recorded unless mic is turned on (audio is recorded through mic). In order to record with mic, checking .micAccess is probably a good idea. You can only record portrait or landscape, not both (screen rotations are handled automatically when flipped). Screen recordings should be stopped if your app suspends (see below). Android will capture the whole screen including native alerts like volume controller, on-screen buttons, and push notifications, which is not the case on iOS.

```lua
local apiLevel = system.getInfo('androidApiLevel')
local platform = system.getInfo('platform')
local isRecording = false
local function onSystemEvent( event )
    if (event.type == "applicationSuspend") then
        if platform == 'android' then
            if apiLevel >= 21 then
                if (isRecording == true) then
                   screenRecorder.stopRecording()
                end
            else
                print('Api level 21 (android 5.0) required for screen recording')
            end
        else
            if (isRecording == true) then
                screenRecorder.stopRecording()
            end
        end
   end
end
Runtime:addEventListener( "system", onSystemEvent )
```

### Where is file saved?
The file is saved in TemporaryDirectory under "screenCapture.mp4". If you want to move it somewhere else you can use things like the [zip plugin](https://docs.coronalabs.com/plugin/zip/compress.html#example) to compress, move, and decompress to a location of choice.

### Video Specs:
30fps. iOS is dependent on device. Android is 720x1280 (portrait), 1280x720 (landscape), or 720x720 (square). In the future, there will be an option to set quality.

### Functions:

#### screenRecorder.record(listener, params)
Starts screen recording.

listener (function)(recommended) — handles all recording statuses
- event.response
    - "permission denied(Record Display)" (Android only)
    - "recording started"
    - "recording stopped"

params (table)(optional) — `{recordHD = boolean (default is true), recordAudio = boolean (default is false)}`

```lua
screenRecorder.record(function ( e )
    if (e.response == "permission denied(Record Display)") then
       print("permission denied")
    elseif(e.response == "recording started") then
        print("recording started")
    elseif(e.response == "recording stopped") then
        print("recording stopped")
    end
end, {recordHD = false, recordAudio = true})
```

#### screenRecorder.stopRecording()
Stop screen recording.

#### screenRecorder.micAccess()
Returns the following values:
- event.response
    - "access granted"
    - "denied"
    - "undetermined" (iOS only) — need to request with .micRequest
    - "missing from build.settings" (Android only)

```lua
print(screenRecorder.micAccess())
```

#### screenRecorder.micRequest(listener)
listener (function)(recommended) — handles mic permission responses
- event.response
    - "access granted"
    - "denied"
    - "missing from build.settings" (Android only)

### Build Settings:

iOS requires NSMicrophoneUsageDescription in Plist if you want to record from mic during recordings. Android requires "android.permission.RECORD_AUDIO" and "android.permission.CAPTURE_VIDEO_OUTPUT".

```lua
settings =
{
    iphone =
    {
        plist =
        {
            NSMicrophoneUsageDescription = "Used for recording audio",
        },
    },
    android =
    {
        usesPermissions =
        {
            "android.permission.CAPTURE_VIDEO_OUTPUT",
            "android.permission.RECORD_AUDIO",
            "android.permission.FOREGROUND_SERVICE",
        },
    },
    plugins = {
        ["plugin.screenRecorder"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    }
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?ScreenRecorder_tech-scotth)
- [Example](https://github.com/scottrules44/screenRecorder-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
