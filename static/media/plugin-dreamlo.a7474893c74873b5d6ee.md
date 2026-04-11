# Dreamlo Plugin

This plugin uses [Dreamlo](http://www.dreamlo.com/), a free cross-platform leaderboard system.

### Setup:
1. Go to http://www.dreamlo.com/ and click the "Get Your" button on leaderboards
2. Save your URL (in Notes, Evernote, etc.)
3. (Optional) If you want HTTPS/SSL, donate $5 or more to Carmine T. Guida
4. Paste in your Public Code and Private Code into `dreamlo.init`

### Functions:

#### dreamlo.init(publicCode, privateCode, alerts, https)
Initialize the Dreamlo leaderboard.

- `publicCode` (string)
- `privateCode` (string)
- `alerts` (boolean)
- `https` (boolean)

#### dreamlo.add(playerName, myData, listener)
Add or update a player's score.

- `playerName` (string)
- `myData` (table) — `{ score (number), seconds (number), text (string) }`, e.g. `{1234, 123, "sometext"}`
- `listener` (function) — returns `isError` (network error), `isDone` (did action complete)

Note: This also updates an existing player's data.

#### dreamlo.delete(playerName, listener)
Delete a player's data.

- `playerName` (string)
- `listener` (function) — returns `isError` (network error), `isDone` (did action complete)

#### dreamlo.deleteAll(listener)
Clear the entire leaderboard.

- `listener` (function) — returns `isError` (network error), `isDone` (did action complete)

#### dreamlo.getScores(myData, listener)
Get one or more scores from the leaderboard.

- `myData` (table) — `{ sort (string), ascending (boolean), amount (number), ending (number), name }`
- `listener` (function) — returns `isError` (network error), `isDone` (did action complete), `isData` (are there any scores), `data` (array of tables with keys: `seconds`, `name`, `date`, `text`, `score`)

Example `data` format:
```
[1] = {
    seconds = "0",
    name    = "playerName",
    date    = "2/10/2016 3:04:38 AM",
    text    = "",
    score   = "1234"
}
[2] = {
    seconds = "5",
    name    = "bob",
    date    = "2/10/2016 3:04:38 AM",
    text    = "hello",
    score   = "1235"
}
```

### App Transport Security URL(s):

Domain: `dreamlo.com` — Set `NSIncludesSubdomains = true`. Check out Corona's guide [here](https://docs.coronalabs.com/guide/hardware/appleATS/index.html).

Note: You must donate to enable HTTPS/SSL.

### Build Settings:

```lua
settings =
{
    plugins = {
        ["plugin.dreamlo"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Plugin Source Code](https://github.com/scottrules44/dreamlo-plugin-source/tree/main)
- [Example](https://github.com/scottrules44/Dreamlo-example)
- [How to add promo code with dreamlo](https://forums.coronalabs.com/topic/61595-in-app-promo-codes-with-dreamlo/)
- [Get Plugin](https://store.coronalabs.com/plugin/dreamlo)
- [Support](https://forums.coronalabs.com/forum/654-corona-store-plugins/)
