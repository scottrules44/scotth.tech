# Textbelt Plugin

This plugin uses [Textbelt](http://www.textbelt.com/), which allows you to send SMS messages.

Limitations: Textbelt is now a paid service if you don't want to set up Textbelt on your own server (see textbelt.init function). See the Textbelt website for info on carrier support ([here](http://www.textbelt.com)).

### Functions:

#### textbelt.init(key)

key (string) — found on the Textbelt site.

#### textbelt.sendText(number, message, lis)

number (string) — the phone number to send the text message to.

message (string) — the message you would like to send.

lis (function) — callback with the following event properties:
- event.isError
- event.error — returns "unable to send", "unable to connect"
- event.status — returns "success", "error"
- event.data — returns tables

```lua
textbelt.sendUS("0123456789", "hello there", function (e)
    if e.isError then
        print("error sending message")
    else
        print("error sending message")
    end
end)
```

### Variables:

textbelt.serverIp (string) — use if you are hosting Textbelt on your own server.

textbelt.serverIpHttps (boolean) — should use https with your server (default is true).

### App Transport Security URL(s):

textbelt.com — Set NSIncludesSubdomains = true. Check out Solar2D's guide [here](https://docs.coronalabs.com/guide/hardware/appleATS/index.html).

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.textbelt"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?TextbeltPlugin_tech-scotth)
- [Example](https://github.com/scottrules44/textbelt-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
