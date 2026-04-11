# Video Editor Plugin

This plugin allows you to trim videos, merge two videos into one, get video info (duration, size, width, height), and get a thumbnail (image) of a specific second in a video.

### Platforms:
iOS and Android

### Functions:

#### videoEditor.createThumbnail(videoInput, imageOutput, atTime, imageWidth, imageHeight, quality)

videoInput (string) — video file path via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

imageOutput (string) — image output path via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

atTime (number) — second to get image from video

imageWidth (number) — image width

imageHeight (number) — image height

quality (number) — image quality (1–100, 100 = high quality)

#### videoEditor.trim(videoInput, startTime, endTime, videoOutput, listener)

videoInput (string) — video file path via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

startTime (number) — second to start trim

endTime (number) — second to end trim

videoOutput (string) — video output path via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

listener (function) — returns event.isError; if true then an error occurred, if false then it was a success

#### videoEditor.getVideoInfo(videoInput)

Returns a table with the following key/value pairs: width (number), height (number), orientation (string — "portrait" or "landscape"), duration (number), size (number, bytes), bitrate (number).

videoInput (string) — video file path via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

#### videoEditor.mergeVideos(videoInput1, videoInput2, videoOutput, listener)

videoInput1 (string) — first video to merge, file path via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

videoInput2 (string) — second video to merge, file path via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

videoOutput (string) — video output path via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

listener (function) — returns event.isError; if true then an error occurred, if false then it was a success

#### videoEditor.cropVideo(videoInput, videoOutput, width, height, listener)

Important: make sure the crop width and height are smaller than the video's width and height.

videoInput (string) — video to crop, file path via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

videoOutput (string) — video output path via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

width (number) — crop video width

height (number) — crop video height

listener (function) — returns event.isError; if true then an error occurred, if false then it was a success

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.videoEditor"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?VideoEditor_tech-scotth)
- [Example](https://github.com/scottrules44/videoEditor-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
