## About

This Solar2D plugin allows you capture screen video, app audio, microphone, and camera.


## Functions

#### screenRecorder.start(params)

params(table)

&nbsp;

-- path(string)(required)

-- hideCameraSwitch(boolean)(default false)

-- microphoneEnabled(boolean)(default false)

-- appAudioEnabled(boolean)(Android only)(default false)

-- listener(function) event.type(string) = "startRecording" or "stopRecording", event.isError(boolean), event.error(string) if .isError is true, event.path(string) if .type "stopRecording"

&nbsp;

```
local screenRecorder = require "plugin.screenRecorder.v2"

screenRecorder.start{
		listener = function(event)
				print(json.encode(event))
		end,
		cameraEnabled = true,
		microphoneEnabled= true,
		appAudioEnabled = true, --only supported on Android (default is false)
		path=system.pathForFile( "myRec.mp4", system.TemporaryDirectory )
}
```
&nbsp;




#### screenRecorder.setCamera(params)

Option to show a camera view in the screen recording view (after recording starts)

params(table)

&nbsp;

show(boolean)

cameraPosition(string)(optional) default "front", options "back" or "front"

x(number)(optional), y(number)(optional)

width(number)(optional), height(number)(optional)


&nbsp;

```
screenRecorder.setCamera({show=true, x=100,y= 100, width=100, height=100 })
```

#### screenRecorder.stop()

Will stop Screen Recorder

```
screenRecorder.stop()
```

#### screenRecorder.isRecording()

returns true if recording, false if not

```
print(screenRecorder.isRecording())
```

### Build.settings
```
settings =
{
	plugins =
	{
		["plugin.screenRecorder.v2"] =
		{
			publisherId="tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```


### Helpful Links



[Get Screen Recorder Plugin](https://solar2dmarketplace.com/plugins?ScreenRecorderV2_tech-scotth)

[Get Support In Forums](https://forums.solar2d.com/c/corona-marketplace/13)

[Check Demo](https://github.com/scottrules44/screenRecorder-v2-demo)
