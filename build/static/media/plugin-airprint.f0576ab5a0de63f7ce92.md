### Airprint Plugin

This plugin allows you to print images, PDFs, and markup docs via AirPrint.

### Testing:
If you have a developer account, you can test AirPrint via Mac with [Print Simulator](https://developer.apple.com/download/more/?name=hardware%20io%20tools).

### Limitations:
- Only supports iOS (6+).

### Function:

#### `airprint.print(file, listener, duplex, orientation)`

- **file** (string, required): The path of the file you would like to print.
- **listener** (function, optional): Callback function for the status of the print.
  - **event.status**:
    - `"completed"`
    - `"cancelled"`
    - `"error"`
  - **event.error** (string): Description of the error (only returned if `status == "error"`).

- **duplex** (string, optional): Set duplex for printing.
  - `"none"`: No double-sided (duplex) printing; single-sided printing only (default).
  - `"longEdge"`: Duplex printing that flips the back page along the long edge of the paper.
  - `"shortEdge"`: Duplex printing that flips the back page along the short edge of the paper.

- **orientation** (string, optional): Set the orientation for printing.
  - `"landscape"`
  - `"portrait"` (default)

### Build Settings:

```lua
settings = 
{ 
    plugins = 
    { 
        ["plugin.airprint"] = 
        { 
            publisherId = "tech.scotth", 
            marketplaceId = "insert marketplace account ID", 
        }, 
    }, 
}
```

[Get Airprint Plugin](https://solar2dmarketplace.com/plugins?AirprintPlugin_tech-scotth)

[Get Support In Forums](https://forums.solar2d.com/c/corona-marketplace/13)

[Check Demo](https://github.com/scottrules44/airprint-example)
