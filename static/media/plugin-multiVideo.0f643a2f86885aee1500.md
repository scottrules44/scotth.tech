# Multi Video Plugin

This plugin allows you to show a video slider and switch between them.

### Platforms:
iOS and Android

### Functions:

#### multiVideo.init(fullScreenImage)
fullScreenBackgroundImage (file) — pass in image with [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html) you want to use as your button for full screen viewing. Note: a 1:1 width to height ratio is recommended.

#### multiVideo.showView(x, y, videos)
Shows the video view.

x (number) — x position of video view
y (number) — y position of video view
videos (array) — include array of files ([system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)) and remote urls

#### multiVideo.removeView()
Remove the video view.

#### multiVideo.hideFullscreenButton()
Hide the fullscreen button on the view.

#### multiVideo.showFullscreenButton()
Show the fullscreen button on the view.

#### multiVideo.pauseCurrentVideo()
Pause the current showing video.

#### multiVideo.resumeCurrentVideo()
Resume the current showing video.

#### multiVideo.setAutoPlay(autoplay)
Sets auto play for videos.

autoplay (boolean) — set to false to prevent videos from autoplaying, true to resume autoplaying

#### multiVideo.newVideo(x, y, width, height, url, shouldLoop)
Makes a new video. Returns a video object.

x (number) — x position of new video view
y (number) — y position of new video view
width (number) — width of new video view
height (number) — height of new video view
url (string) — file path ([pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)) or http url
shouldLoop (boolean)(optional) — default is false

#### Video Object:

##### properties:
x (number)
y (number)
width (number)
height (number)
xScale (number)
yScale (number)

##### methods:
.resume() — resume video
.pause() — pause video
.destroy() — remove video

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.multiVideo"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?MultiVideoPlugin_tech-scotth)
- [Example](https://github.com/scottrules44/multiVideo-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
