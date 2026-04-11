# Gamecenter Plugin

This plugin allows you to access Apple Game Center.

### Platforms:
iOS, tvOS, macOS

### Limitations:
tvOS does not support getting friends, and `leaderboard.show` will show achievements (it is recommended to make your own interface).

### Functions:

#### gc.init(listener)
Handles sign in and connection status.

- type (string) — "login"
  - status (string) — "signed in", "could not login", "showing login", or "could not access gamecenter"
- type (string) — "error"
  - status (string) — "error" or "other error"
  - error (string) — "feature not available", "unable to access gamecenter", "unknown error", "internet not available", or if "other error" you will get a description of the error

```lua
local gc = require "plugin.gamecenter"
local json = require("json")
gc.init(function(e)
	print("init")
	print("----------")
	print(json.encode(e))
	print("----------")
	if(e.status == "signed in") then
	end
end)
```

#### gc.isAvailable()
Returns (boolean) true if Game Center is available and false if not available.

```lua
print(gc.isAvailable())
```

### Nodes:

### gc.leaderboards
Handles Game Center leaderboards.

#### gc.leaderboards.show(leaderboardId)
Returns "showing".

leaderboardId (string)(optional) — if nil or blank, shows all leaderboards; if a string, shows that specific leaderboard by ID.

```lua
print(gc.leaderboards.show("insert cool leaderboard id here"))--prints "showing"
```

#### gc.leaderboards.loadScores(leaderboardId, listener, params)
leaderboardId (string) — the ID of the leaderboard to get scores from
listener (function):
- status (string) — "success" or "error"
- error (string) — explains the error
- scores (array) — each item contains:
  - date (string) — date of score ("HH:mm yyyy/MMM/d")(timezone GMT)
  - leaderboardIdentifier (string) — leaderboardId of the requested leaderboard
  - rank (integer) — how high the person is ranked
  - playerId (string) — ID of the player who got the score
  - value (integer) — the actual score
  - playerAlias (string) — username of player
  - formattedValue (string) — a player's score as a localized string

params (table)(optional):
- timeScope (string) — "today", "week", or "all" (all is default)
- playerScope (string) — "friends" or "global" (global is default)
- rangeMin (integer) — starting number to begin getting scores from (requires rangeMax, max 100 values)
- rangeMax (integer) — ending number to stop getting scores (requires rangeMin, max 100 values)

```lua
local function lis(e)
    print("loadScores")
    print("----------")
    print(json.encode(e))
    print("----------")
end
gc.leaderboards.loadScores("insert leaderboard id here", lis,{timeScope = "today", playerScope= "friends"})
```

#### gc.leaderboards.loadScore(leaderboardId, listener)
Returns the signed-in user's score from a leaderboard.

leaderboardId (string) — the ID of the leaderboard
listener (function):
- status (string) — "success" or "error"
- error (string) — explains the error
- score (integer) — score of player

#### gc.leaderboards.submit(leaderboardId, score, listener)
leaderboardId (string) — the ID of the leaderboard
score (integer) — the score to be sent
listener (function):
- status (string) — "score sent" or "error"
- error (string) — explains the error

```lua
gc.leaderboards.submit("leaderboardId", 123456789, function(e)
    print("submit score")
    print("----------")
    print(json.encode(e))
    print("----------")
end)
```

### gc.achievements
Handles Game Center achievements.

#### gc.achievements.show()
Show the achievement Game Center popup. Returns "showing".

```lua
print(gc.achievements.show())-- prints "showing"
```

#### gc.achievements.loadAll(listener)
Returns all achievements.

listener (function):
- status (string) — "success" or "error"
- error (string) — explains the error
- achievements (array) — each item contains:
  - lastReportedDate (string) — last time progress was reported ("HH:mm yyyy/MMM/d")(timezone GMT)
  - percentComplete (integer) — progress on the achievement (1–100)
  - identifier (string) — the ID of the achievement
  - unachievedDescription (string) — localized description when not yet completed
  - title (string) — title of achievement
  - achievedDescription (string) — localized description after completion
  - status (string) — "hidden" or "visible"
  - replayable (string) — "replayable" or "not replayable"

```lua
local json = require("json")
gc.achievements.loadAll(function(e)
	print("achievement loadAll")
	print("----------")
	print(json.encode(e))
	print("----------")
end)
```

#### gc.achievements.submit(achievementId, progress, shouldDisplayNotification, listener)
achievementId (string) — the ID of the achievement
progress (integer) — the progress to be sent (1–100)
shouldDisplayNotification (boolean) — set to true to show banner on completion
listener (function):
- status (string) — "achievement set" or "error"
- error (string) — explains the error

```lua
gc.achievements.submit(achievementId, achievementProgress, true,function(e)
    print("achievement submit")
    print("----------")
    print(json.prettify(e))
    print("----------")
end)
```

#### gc.achievements.reset(listener)
Resets all achievements immediately.

listener (function):
- status (string) — "success" or "error"
- error (string) — explains the error

```lua
gc.achievements.reset(function(e)
	print("achievements reset")
	print("----------")
	print(json.encode(e))
	print("----------")
end)
```

### gc.challenges
Handles Game Center challenges.

#### gc.challenges.show()
Show the challenges Game Center popup. Returns "showing".

```lua
print(gc.challenges.show()) --prints "showing"
```

#### gc.challenges.load(listener)
Returns all challenges.

listener (function):
- status (string) — "success" or "error"
- error (string) — explains the error
- challenges (array) — each item contains:
  - issuingPlayerId (string) — the player ID of who sent the challenge
  - issuingPlayerAlias (string) — the player name of who sent the challenge
  - receivingPlayerId (string) — the ID of the player who received
  - receivingPlayerAlias (string) — the name of the player who received
  - state (string) — "declined", "complete", "pending", or "invalid"
  - message (string) — the message sent with the challenge
  - issueDate (string) — the date the challenge was sent ("HH:mm yyyy/MMM/d")(timezone GMT)
  - completionDate (string) — the date the challenge was completed ("HH:mm yyyy/MMM/d")(timezone GMT)

```lua
gc.challenges.load(function(e)
    print("challenges load")
    print("----------")
    print(json.encode(e))
    print("----------")
end)
```

### gc.player
Handles player data.

#### gc.player.id()
Returns (string) the Game Center ID.

```lua
print(gc.player.id())
```

#### gc.player.name()
Returns (string) the Game Center username.

```lua
print(gc.player.name())
```

#### gc.player.underage()
Returns (boolean) whether the local player is underage.

```lua
print(gc.player.underage())
```

#### gc.player.multiplayerGamingRestricted()
(iOS 13+) Returns (boolean) whether the player can join multiplayer games.

```lua
print(gc.player.multiplayerGamingRestricted())
```

#### gc.player.friends(listener)
listener (function):
- status (string) — "success" or "error"
- error (string) — explains the error
- friends (array) — array of tables containing playerID (string) and displayName (string)

```lua
gc.player.friends(function(e)
    print("player friends")
    print("----------")
    print(json.encode(e))
    print("----------")
end)
```

#### gc.player.identityVerificationSignature(listener)
Generates a signature so that a third-party server can authenticate the local player.

listener (function):
- isError (boolean)
- error (string) — explains the error
- publicKeyURL (string) — the URL for the public encryption key
- signature (string) — the verification signature data that Game Center generates
- salt (string) — a random string used to compute and randomize the hash
- timestamp (number) — the signature's creation date and time

```lua
gc.player.identityVerificationSignature(function(e)
	print("Identity Verification Signature")
	print("----------")
	print(json.encode(e))
	print("----------")
end)
```

### gc.multiplayer
Handles multiplayer.

#### gc.multiplayer.invite(minPlayers, maxPlayers, inviteMessage, showExistingMatches, listener, recipients)
Invite a new player and show existing matches.

minPlayers (integer)(optional) — the minimum number of players
maxPlayers (integer)(optional) — the max number of players
inviteMessage (string)(optional) — the string displayed on another player's device when invited
showExistingMatches (boolean)(optional, default true) — if true, the UI will show existing matches
listener (function):
- status (string) — "finish", "foundMatch", "playerDidQuitForError", "playerDidQuit", "cancelled", or "error"
- creationDate (string) — date of match creation
- matchID (string) — matchID
- itIsMyTurn (boolean) — whether it is your turn or not
- error (string) — error when status is "error"

recipients (array of strings)(optional) — player IDs

```lua
gamecenter.multiplayer.invite(2,4,"Come play now", false,function(e)
	print("invite")
	print("----------")
	print(json.encode(e))
	print("----------")
end)
```

#### gc.multiplayer.newMatch(minPlayers, maxPlayers, inviteMessage, recipients, listener)
Create a match without using the native UI.

minPlayers (integer)(optional) — the minimum number of players
maxPlayers (integer)(optional) — the max number of players
inviteMessage (string)(optional) — the string displayed on another player's device when invited
recipients (array of strings)(optional) — player IDs
listener (function):
- status (string) — "finish", "foundMatch", "playerDidQuitForError", "playerDidQuit", "cancelled", or "error"
- creationDate (string) — date of match creation
- matchID (string) — matchID
- itIsMyTurn (boolean) — whether it is your turn or not
- error (string) — error when status is "error"

```lua
gamecenter.multiplayer.newMatch(2,4,"Come play now", {friendID},function(e)
	if e.itIsMyTurn == true then
		quitGame.alpha = 1
		printGameData.alpha = 1
		endTurn.alpha = 1
		printGameData.alpha = 1
	else
		quitGame.alpha = 1
		printGameData.alpha = 1
		endTurn.alpha = 0
	end
end)
```

#### gc.multiplayer.setListener(listener)
Set listener for multiplayer callbacks.

listener (function):
- status (string) — "exchangeCancellation", "receivedExchangeReplies", "receivedExchangeRequest", "requestMatchWithOtherPlayer", "matchEnded", "receivedTurnEventForMatch", or "playerWantsToQuit"
- participants (array) — contains table with playerOutcome (string: "won", "lost", "quit", "tied", "first", "second", "third", "fourth", "timeExpired", "customRange", "none"), displayName (string), playerID (string)
- message (string) — match message
- matchID (string) — matchID
- itIsMyTurn (boolean) — whether it is your turn or not
- didBecomeActive (boolean) — when status == "receivedTurnEventForMatch"
- playerName (string) — the name of player for the event
- playerID (string) — the ID of player for the event
- activeExchanges (table) — contains data (table), message (string), displayName (string), playerID (string)
- playersToInvite (table) — contains displayName (string), playerID (string)
- matchData (table) — table of match data
- error (string) — error when status is "error"
- currentParticipantDisplayName (string) — current player display name
- currentParticipantID (string) — current player PlayerId/gamePlayerID

```lua
gamecenter.multiplayer.setListener(function(e)
    print("Multiplayer Listener")
    print("----------")
    print(json.encode(e))
    print("----------")
end)
```

#### gc.multiplayer.getMatchData(listener)
listener (function):
- status (string) — "gotMatchData", "matchNotActive", or "error"
- participants (array) — contains table with playerOutcome, displayName, playerID
- currentParticipantDisplayName (string) — current player display name
- currentParticipantID (string) — current player PlayerId/gamePlayerID
- error (string) — explains the error
- matchID (string) — matchID
- data (table) — data from match

```lua
gamecenter.multiplayer.getMatchData(function(e)
    print("Got Match Data")
    print("----------")
    print(json.encode(e))
    print("----------")
end)
```

#### gc.multiplayer.getMatchStatus(listener)
listener (function):
- status (string) — "open", "matching", "matchNotActive", or "ended"

```lua
gamecenter.multiplayer.getMatchStatus(function(e)
    print("Get Match status")
    print("----------")
    print(e.status)
    print("----------")
end)
```

#### gc.multiplayer.updateData(data, listener)
data (table) — data to update
listener (function):
- status (string) — "dataUpdated" or "error"
- error (string) — explains the error

```lua
gamecenter.multiplayer.updateData({hello="world"},function(e)
    print("Update Data")
    print("----------")
    print(e.status)
    print("----------")
end)
```

#### gc.multiplayer.deleteMatch(matchId, listener)
matchId (string)(optional) — matchId to delete; will delete active match if nil
listener (function):
- status (string) — "matchDeleted" or "error"
- error (string) — explains the error

```lua
gamecenter.multiplayer.deleteMatch(function(e)
    print("Delete Match")
    print("----------")
    print(e.status)
    print("----------")
end)
```

#### gc.multiplayer.quitOutOfTurn(outcome, listener)
outcome (string)(optional, default "none") — "won", "lost", "quit", "tied", "first", "second", "third", "fourth", "timeExpired", "customRange", or "none"
listener (function):
- status (string) — "quitOutOfTurn" or "error"
- error (string) — explains the error

```lua
gamecenter.multiplayer.quitOutOfTurn("won", function(e)
    print("Quit Out of Turn")
    print("----------")
    print(e.status)
    print("----------")
end)
```

#### gc.multiplayer.quitInTurn(outcome, turnTimeout, data, listener)
outcome (string)(optional, default "none") — "won", "lost", "quit", "tied", "first", "second", "third", "fourth", "timeExpired", "customRange", or "none"
turnTimeout (integer) — number of seconds before a player's turn is skipped
data (table) — data to quit in turn with
listener (function):
- status (string) — "quitInTurn", "matchNotActive", or "error"
- error (string) — explains the error

```lua
gamecenter.multiplayer.quitInTurn("lost", 900, {hello = "world"}, function(e)
    print("Quit In Turn")
    print("----------")
    print(e.status)
    print("----------")
end)
```

#### gc.multiplayer.endTurn(data, turnTimeout, listener)
data (table) — data to end turn with
turnTimeout (integer) — number of seconds before a player's turn is skipped
listener (function):
- status (string) — "turnEnded", "matchNotActive", or "error"
- error (string) — explains the error

```lua
gamecenter.multiplayer.endTurn( {hello = "world"}, 900, function(e)
    print("End Turn")
    print("----------")
    print(e.status)
    print("----------")
end)
```

#### gc.multiplayer.endMatch(data, listener)
data (table) — data to end match with
listener (function):
- status (string) — "endMatch", "matchNotActive", or "error"
- error (string) — explains the error

```lua
gamecenter.multiplayer.endMatch( {hello = "world"}, function(e)
    print("End Match")
    print("----------")
    print(e.status)
    print("----------")
end)
```

#### gc.multiplayer.isItMyTurn(listener)
listener (function):
- status (string) — "matchNotActive", "notMyTurn", or "itIsMyTurn"
- playerName (string) — the name of player for the event
- playerID (string) — the ID of player for the event

```lua
gamecenter.multiplayer.isItMyTurn( function(e)
    print("Is it my turn?")
    print("----------")
    print(e.status)
    print("----------")
end)
```

#### gc.multiplayer.listMatches(listener)
listener (function):
- isError (boolean)
- error (string) — explains the error
- matches (array) — array of tables containing matchID (string), creationDate (string in "HH:mm yyyy/MMM/d" format), matchData (table), participants (array with playerOutcome, displayName, playerID, currentParticipantDisplayName, currentParticipantID)

```lua
gamecenter.multiplayer.listMatches( function(e)
	print("List Matches")
	print("----------")
	print(json.encode(e.matches))
	print("----------")
end)
```

#### gc.multiplayer.startMatchWithId(matchId, listener)
matchId (string)
listener (function):
- status (string) — "error" or "startedMatchWithId"
- participants (array) — contains table with playerOutcome, displayName, playerID
- error (string) — explains the error
- itIsMyTurn (boolean) — whether it is your turn or not
- matchData (table) — table of match data

[View Example on GitHub Gist](https://gist.github.com/scottrules44/bec9df42fd6967371d9ab2890df27286)

#### gc.multiplayer.rematch(listener)
Rematch current game.

listener (function):
- status (string) — "error" or "rematchStarted"
- participants (array) — contains table with playerOutcome, displayName, playerID
- error (string) — explains the error
- itIsMyTurn (boolean) — whether it is your turn or not
- currentParticipantDisplayName (string) — current player display name
- currentParticipantID (string) — current player PlayerId/gamePlayerID
- matchData (table) — table of match data

```lua
gamecenter.multiplayer.startMatchWithId("insertMatchIdHere",function(e)
    print("Start Match With Id")
    print("----------")
    print(e.status)
    print("----------")
end)
```

#### gc.multiplayer.sendReminderToAllParticipants(localizableMessageKey, arguments, listener)
Send a reminder to all participants.

localizableMessageKey (string)
arguments (array of strings)
listener (function):
- status (string) — "error" or "reminderSent"

```lua
gamecenter.multiplayer.sendReminderToAllParticipants("hello there", {"hello", "world"}, function(e)
    print("Send Reminder To All Participants")
    print("----------")
    print(e.status)
    print("----------")
end)
```

#### gc.multiplayer.sendReminderToParticipantWithId(participantId, localizableMessageKey, arguments, listener)
Send a reminder to a participant by ID.

participantId (string) — the ID of the participant (either PlayerId or gamePlayerID)
localizableMessageKey (string)
arguments (array of strings)
listener (function):
- status (string) — "error", "playerNotFound", or "reminderSent"

```lua
gamecenter.multiplayer.sendReminderToParticipantWithId( "participantId","hello there", {"hello", "world"}, function(e)
    print("Send Reminder To Participant With Id")
    print("----------")
    print(e.status)
    print("----------")
end)
```

#### gc.multiplayer.listParticipants(listener)
List participants.

listener (function):
- status (string) — "gotParticipants", "matchNotActive", or "error"
- participants (array) — contains table with playerOutcome, displayName, playerID
- currentParticipantDisplayName (string) — current player display name
- currentParticipantID (string) — current player PlayerId/gamePlayerID
- error (string) — explains the error

```lua
gamecenter.multiplayer.listParticipants( function(e)
	print("List Participants")
	print("----------")
	print(json.encode(e.participants))
	print("----------")
end)
```

#### gc.multiplayer.setMatchOutcome(participantId, listener)
participantId (string) — the ID of the participant (either PlayerId or gamePlayerID)
listener (function):
- status (string) — "outcomeSet", "matchNotActive", or "playerNotFound"

```lua
gamecenter.multiplayer.setMatchOutcome( "participantId", function(e)
    print("Set Match Outcome")
    print("----------")
    print(e.status)
    print("----------")
end)
```

### gc.accessPoint
Handles Game Center access point for iOS 14+.

#### gc.accessPoint.setActive(shouldEnable)
shouldEnable (boolean) — determines whether to display the access point.

```lua
print(gc.accessPoint.setActive(true))
```

#### gc.accessPoint.setLocation(location)
location (string) — location of access point icon: "bottomLeading", "bottomTrailing", "topLeading", or "topTrailing"

```lua
gc.accessPoint.setLocation("bottomLeading")
```

#### gc.accessPoint.setShowHighlights(shouldEnable)
shouldEnable (boolean) — indicates whether to display highlights for achievements and current leaderboard ranks.

```lua
gc.accessPoint.setShowHighlights(true)
```

#### gc.accessPoint.setFocused(shouldFocus)
(tvOS only) shouldFocus (boolean) — indicates whether the access point is in focus on tvOS.

```lua
gc.accessPoint.setFocused(true) -- only for apple tv
```

#### gc.accessPoint.triggerAccessPoint()
Displays the Game Center dashboard.

```lua
gc.accessPoint.triggerAccessPoint()
```

#### gc.accessPoint.triggerAccessPointWithType(accessPointType)
Displays the Game Center dashboard in the specified state.

accessPointType (string) — "default", "leaderboards", "achievements", "challenges", "localPlayer", or "dashboard"

```lua
gc.accessPoint.triggerAccessPointWithType("achievements")
```

### Build Settings:

```lua
settings =
{
	tvos = {
		entitlements = {
            ["com.apple.developer.game-center"] = true,
        },
	},
	macos = {
		entitlements = {
            ["com.apple.developer.game-center"] = true,
        },
	},
	iphone =
	{
		entitlements = {
            ["com.apple.developer.game-center"] = true,
        },
	},
	plugins = {
		["plugin.gamecenter"] =
		{
			publisherId="tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
    }
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?GameCenter_tech-scotth)
- [Example](https://github.com/scottrules44/gamecenter-corona-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
