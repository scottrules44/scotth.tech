# Mapbox Plugin

This plugin allows you to display map views from the Mapbox SDK. You can add custom map view styles to the map views.

### Platforms:
iOS via Corona Simulator, and Android and iOS via Corona Native (see how to build for Corona Native below).

### Functions:

#### mapbox.init(accessToken)
accessToken — access token from your Mapbox account.

#### mapbox.newView(params)
Note: this does not return anything; the object is returned in the listener.

params (table):
- x (number) — x Corona point of map view
- y (number) — y Corona point of map view
- width (number) — width of map view
- height (number) — height of map view
- listener (function) — returns map view and other events:
  - event.type == "obj" — event.obj = (Mapbox MapView) returns a map view object with all its properties and methods listed below
  - event.type == "regionChange" — event.phase == "began", "moving", or "ended"; event.lat = (number) latitude; event.lng = (number) longitude
  - event.type == "annotationInfoClicked" — event.annotationLat (number), event.annotationLng (number), event.annotationTitle (string), event.annotationSubtitle (string)
- style (string)(optional) — default is "light"; other options: custom Mapbox style, "dark", "emerald", "hybrid", "streets", or "satellite"
- hideLogo (boolean)(optional) — default is false
- hideAttribution (boolean)(optional) — default is false
- hideCompass (boolean)(optional) — default is false
- rotateEnabled (boolean)(optional) — default is true
- scrollEnabled (boolean)(optional) — default is true
- zoomEnabled (boolean)(optional) — default is true
- showsUserLocation (boolean)(optional) — default is false (requires location on device, see below)
- allowsTilting (boolean)(optional) — default is true

### Mapbox MapView Properties:

x (number) — x Corona point of map view

y (number) — y Corona point of map view

width (number) — width of map view

height (number) — height of map view

hideLogo (boolean)

hideAttribution (boolean)

hideCompass (boolean)

rotateEnabled (boolean)

scrollEnabled (boolean)

zoomEnabled (boolean)

showsUserLocation (boolean) — requires location on device, see below

allowsTilting (boolean)

### Mapbox MapView Methods:

#### :getZoom(listener)
listener (function) — returns event.zoom (number)

#### :setZoom(zoom)
zoom (number) — set zoom for map

#### :setCenter(lat, lng)
lat (number) — latitude of map
lng (number) — longitude of map

#### :getCenter(listener)
listener (function) — returns event.lat, event.lng

#### :animateCamera(params)
params (table):
- lat (number) — latitude to animate to
- lng (number) — longitude to animate to
- duration (number)(optional) — time of animation in seconds, default is 10
- tilt (number)(optional) — toward the horizon measured in degrees
- bearing (number)(optional) — measured in degrees clockwise from true north

#### :addMarkers(markers)
markers (array) — array of tables with the following params:
- lat (number) — latitude to pin marker to
- lng (number) — longitude to pin marker to
- title (string)(optional) — title to add to pin
- subtitle (string)(optional) — subtitle to add to pin

#### :removeAllMarkers()
Remove all markers from map.

#### :hide()
Hide map.

#### :unhide()
Unhide map.

#### :setFollowMode(mode)
Requires location on device (see below).

mode (string) — "follow" or "disable"

#### :disableUserInteraction(shouldDisable)
shouldDisable (boolean)

#### :destroyView()
Destroy map.

### User Location:

In order to use location on iOS, you need permission from the user. You must add `NSLocationWhenInUseUsageDescription` to Info.plist. You can use `mapbox.requestLocationServices()` to request access and `mapbox.locationServicesEnabled()` to check the status — returns string: "denied" (iOS), "granted" (iOS), "restricted" (iOS parental controls prevent access), or "not determined" (iOS, you have not requested access).

### Build Settings:

```lua
settings =
{
	iphone =
	{
		plist =
        {
           --used for user tracking
		   --NSLocationWhenInUseUsageDescription = "A description of why the app needs access to location services."
        },
	},
    plugins =
    {
    	["plugin.mapbox"] =
		{
		publisherId="tech.scotth",
		marketplaceId = "insert marketplace account ID",
		},
    },
}
```

[View Example on GitHub Gist](https://gist.github.com/scottrules44/2399975222f7b435a3881dfb98b7c139)

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?MapboxPlugin_tech-scotth)
- [Example](https://github.com/scottrules44/mapbox-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
