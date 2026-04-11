# Native Sockets

This plugin allows you to open, send, read, and close sockets natively.

### Platforms:
iOS 13+ and Android

### Functions:

#### nativeSockets.init(listener)
Initialize native sockets.

listener (function) — e.status can be:
- "didClose" — has e.closeCode (int) and e.reason (string)
- "didOpen" — has e.protocol (string)

#### nativeSockets.connect(url, listener)
Returns a socket object.

url (string) — url for socket
listener (function) — e.status = "didReceiveMessage", e.isError (boolean), e.error (string, returned if e.isError = true), e.message (string message from socket)

#### nativeSockets.send(socketObj, message, listener)
Send a message over a socket.

socketObj (socket) — socket to send message to
message (string) — message to send
listener (function) — e.isError (boolean), e.error (string, returned if e.isError = true)

#### nativeSockets.disconnect(socketObj)
Close a socket.

socketObj (socket) — socket to close

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.nativeSockets"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?NativeSockets_tech-scotth)
- [Example](https://github.com/scottrules44/nativeSockets-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
