# Deploy Plugin

This plugin allows you to run scripts from file paths, enabling you to run Lua scripts from the internet.

### Functions:

#### deploy.runScript(pathToScript, directory, simPath, encryptionKey)
Run a Lua script from a file path.

- `pathToScript` (string) — path to the script
- `directory` (Constant) — [Directory Constants](https://docs.coronalabs.com/api/type/Constant.html)
- `simPath` (string)(optional) — in the simulator you can set a different path to the script (note: the directory is `system.ResourceDirectory`)
- `encryptionKey` (array)(optional) — e.g. `{1,2,3,4,5}` or `{34345123,234234,23433924995,954032,355}`. Array of 5 numbers to decrypt code. If a `simPath` is set, it will encrypt your code and output it to `pathToScript` and `directory` (note: `system.ResourceDirectory` is not readable)

#### deploy.printEncryptedCode(code, encryptionKey)
Print encrypted code.

- `code` (string) — code to encrypt
- `encryptionKey` (array) — e.g. `{1,2,3,4,5}` or `{34345123,234234,23433924995,954032,355}`. Array of 5 numbers to decrypt code.

#### deploy.runCode(code, encryptionKey)
Run a string of code directly.

- `code` (string) — code to run
- `encryptionKey` (array)(optional) — e.g. `{1,2,3,4,5}` or `{34345123,234234,23433924995,954032,355}`. Array of 5 numbers to decrypt code.

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.deploy"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Plugin Source Code](https://github.com/scottrules44/deploy-source)
- [Get Plugin](https://solar2dmarketplace.com/plugins?DeployPlugin_tech-scotth)
- [Example](https://github.com/scottrules44/deploy-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
