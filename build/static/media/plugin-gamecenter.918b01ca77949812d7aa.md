# Gamecenter Plugin

This plugin allows you to access Apple Gamecenter.

## Platforms
iOS, tvOS, macOS

## Limitations
tvOS does not support getting friends and also `leaderboard.show` will show achievements (I recommend making your own interface).

## Functions

### `gc.init(listener)`
Handles sign in and connection status.

- `type` (string) -- "login"
	- `status` (string) -- "signed in", "could not login", "showing login", or "could not access gamecenter"
- `type` (string) -- "error"
	- `status` (string) -- "error" or "other error"
	- `error` (string) -- "feature not available", "unable to access gamecenter", "unknown error", "internet not available", or if "other error" you will get a description of error

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

### `gc.isAvailable()`
Returns (boolean) true if Gamecenter is available and false if not available.

```lua
print(gc.isAvailable())
```

## Nodes

### `gc.leaderboards`
Handles Gamecenter leaderboards.

- `gc.leaderboards.show("leaderboardId")` -- returns "showing"
	- `leaderboardId` (string) (optional) If this is nil or blank, it will show all leaderboards. If it is a string, it will show that leaderboard based on the id.

```lua
print(gc.leaderboards.show("insert cool leaderboard id here")) -- prints "showing"
```

- `gc.leaderboards.loadScores("leaderboardId", listener, {params})` -- returns "showing"
	- `leaderboardId` (string) the id of leaderboard that you want to get scores from
	- `listener` (function)
		- `status` (string) -- can be "success" or "error"
		- `error` (string) -- explains the error
		- `scores` (array) each array contains table:
			- `date` (string) -- returns date of score ("HH:mm yyyy/MMM/d") (timezone GMT)
			- `leaderboardIdentifier` (string) -- leaderboardId of the leaderboard requested
			- `rank` (integer) -- how high the person is ranked on the leaderboard
			- `playerId` (string) -- id of player who got the score
			- `value` (integer) -- the actual score
			- `playerAlias` (string) -- username of player
			- `formattedValue` (string) -- A player’s score as a localized string. You determine how your scores are formatted when you define the leaderboard on iTunes Connect.
	- `params` (table) (optional)
		- `timeScope` (string) -- possible values are "today", "week", or "all" (all is default)
		- `playerScope` (string) -- possible values are "friends" or "global" (global is default)
		- `rangeMin` (integer) -- the starting number to start getting scores from a leaderboard (requires rangeMax and only can get up to 100 values)
		- `rangeMax` (integer) -- the ending number to stop getting scores from a leaderboard (requires rangeMin and only can get up to 100 values)

```lua
local function lis(e)
		print("loadScores")
		print("----------")
		print(json.encode(e))
		print("----------")
end
gc.leaderboards.loadScores("insert leaderboard id here", lis, {timeScope = "today", playerScope= "friends"})
```

- `gc.leaderboards.loadScore("leaderboardId", listener)` -- returns (integer) your score from a leaderboard
	- `leaderboardId` (string) the id of leaderboard that you want to get the signed user's score from
	- `listener` (function)
		- `status` (string) -- can be "success" or "error"
		- `error` (string) -- explains the error
		- `score` (integer) score of player

```lua
gc.leaderboards.loadScore("leaderboardId", function(e)
		print("your score")
		print("----------")
		print(e.score)
		print("----------")
end)
```

- `gc.leaderboards.submit("leaderboardId", score, listener)`
	- `leaderboardId` (string) the id of leaderboard that you want to get the signed user's scores from
	- `score` (integer) the score to be sent
	- `listener` (function)
		- `status` (string) -- either "score sent" or "error"
		- `error` (string) -- explains the error

```lua
gc.leaderboards.submit("leaderboardId", 123456789, function(e)
		print("submit score")
		print("----------")
		print(json.encode(e))
		print("----------")
end)
```

### `gc.achievements`
Handles Gamecenter achievements.

- `gc.achievements.show()` -- returns "showing"
	- Show the achievement Gamecenter popup

```lua
print(gc.achievements.show()) -- prints "showing"
```

- `gc.achievements.loadAll(listener)`
	- Returns all the achievements
	- `listener` (function)
		- `status` (string) -- can be "success" or "error"
		- `error` (string) -- explains the error
		- `achievements` (array) each array contains table:
			- `lastReportedDate` (string) -- The last time that progress on the achievement was successfully reported to Game Center. ("HH:mm yyyy/MMM/d") (timezone GMT)
			- `percentComplete` (integer) -- leaderboardId of the leaderboard requested (1-100)
			- `identifier` (string) -- the id of the achievement
			- `unachievedDescription` (string) -- A localized description of the achievement to be used when the local player has not completed the achievement.
			- `title` (string) -- title of achievement
			- `achievedDescription` (string) -- A localized description to be used after the local player has completed the achievement.
			- `status` (string) -- either "hidden" or "visible"
			- `replayable` (string) -- either "replayable" or "not replayable"

```lua
local json = require("json")
gc.achievements.loadAll(function(e)
		print("achievement loadAll")
		print("----------")
		print(json.encode(e))
		print("----------")
end)
```

- `gc.achievements.submit("achievementId", progress, shouldDisplayNotification, listener)`
	- `achievementId` (string) the id of achievement that you want to send the signed user's progress on
	- `shouldDisplayNotification` (Boolean) set to true for showing banner on completion
	- `progress` (integer) the progress to be sent should be between 1-100
	- `listener` (function)
		- `status` (string) -- either "achievement set" or "error"
		- `error` (string) -- explains the error

```lua
gc.achievements.submit(achievementId, achievementProgress, true, function(e)
		print("achievement submit")
		print("----------")
		print(json.prettify(e))
		print("----------")
end)
```

- `gc.achievements.reset(listener)`
	- Resets all achievements immediately
	- `listener` (function)
		- `status` (string) -- either "success" or "error"
		- `error` (string) -- explains the error

```lua
gc.achievements.reset(function(e)
		print("achievements reset")
		print("----------")
		print(json.encode(e))
		print("----------")
end)
```

### `gc.challenges`
Handles Gamecenter challenges.

- `gc.challenges.show()` -- returns "showing"
	- Show the challenges Gamecenter popup

```lua
print(gc.challenges.show()) -- prints "showing"
```

- `gc.challenges.load(listener)`
	- Returns all the challenges
	- `listener` (function)
		- `status` (string) -- can be "success" or "error"
		- `error` (string) -- explains the error
		- `challenges` (array) each array contains table:
			- `issuingPlayerId` (string) -- the playerid of the who sent the challenge
			- `issuingPlayerAlias` (string) -- the player name of the who sent the challenge
			- `receivingPlayerId` (string) -- the id of the player who received
			- `receivingPlayerAlias` (string) -- the name of the player who received
			- `state` (string) -- state of challenge: "declined", "complete", "pending", or "invalid"
			- `message` (string) -- the message sent with a challenge
			- `issueDate` (string) -- the date the challenge was sent ("HH:mm yyyy/MMM/d") (timezone GMT)
			- `completionDate` (string) -- The date the challenge was completed ("HH:mm yyyy/MMM/d") (timezone GMT)

```lua
gc.challenges.load(function(e)
		print("challenges load")
		print("----------")
		print(json.encode(e))
		print("----------")
end)
```

### `gc.player`
Handles player data.

- `gc.player.id()` (string) -- returns the Gamecenter id

```lua
print(gc.player.id())
```

- `gc.player.name()` (string) -- returns the Gamecenter username

```lua
print(gc.player.name())
```

- `gc.player.underage()` (boolean) -- returns a boolean value that indicates whether the local player is underage

```lua
print(gc.player.underage())
```

- `gc.player.multiplayerGamingRestricted()` (boolean) -- (iOS 13+) returns a Boolean value that indicates whether the player can join multiplayer games.

```lua
print(gc.player.multiplayerGamingRestricted())
```

- `gc.player.friends(listener)`
	- `listener` (function)
		- `status` (string) -- can be "success" or "error"
		- `error` (string) -- explains the error
		- `friends` (array) -- returns array of tables which contain playerID (string) and
		- `status` (string)-- can be "success" or "error"
		- `error` (string)-- explains the error
		- `friends`(array) -- returns array of tables which contain playerID(string) and displayName(string)
```lua
gc.player.friends(function(e)
	print("player friends")
	print("----------")
	print(json.encode(e))
	print("----------")
end)
```

- `gc.player.identityVerificationSignature(listener)` -- Generates a signature so that a third-party server can authenticate the local player.
	- `listener` (function)
	- `isError` (boolean)
	- `error` (string) -- explains the error
	- `publicKeyURL` (string) -- The URL for the public encryption key.
	- `signature` (string) -- The verification signature data that GameCenter generates
	- `salt` (string) -- A random string that GameCenter uses to compute the hash and randomize it.
	- `timestamp` (number) -- The signature’s creation date and time

```lua
gc.player.identityVerificationSignature(function(e)
	print("Identity Verification Signature")
	print("----------")
	print(json.encode(e))
	print("----------")
end)
```

### `gc.multiplayer`
Handles multiplayer.

- `gc.multiplayer.invite(minPlayers, maxPlayers, inviteMessage, showExistingMatches, listener, recipients)` -- Invite a new player and show existing matches.
	- `minPlayers` (optional) (integer) -- The minimum number of players.
	- `maxPlayers` (optional) (integer) -- The maximum number of players.
	- `inviteMessage` (optional) (string) -- The string displayed on another player’s device when invited to join a match.
	- `showExistingMatches` (optional, default is true) (boolean) -- If true, the UI will show existing matches.
	- `listener` (function)
	- `status` (string) -- Can be "finish", "foundMatch", "playerDidQuitForError", "playerDidQuit", "finish", "cancelled", or "error".
	- `creationDate` (string) -- Date of match creation.
	- `matchID` (string) -- Match ID.
	- `itIsMyTurn` (boolean) -- Boolean for whether it is your turn or not.
	- `error` (string) -- Error when status is "error".
	- `recipients` (optional) (array of strings) -- Put player IDs in here.

```lua
gamecenter.multiplayer.invite(2, 4, "Come play now", false, function(e)
	print("invite")
	print("----------")
	print(json.encode(e))
	print("----------")
end)
```

- `gc.multiplayer.newMatch(minPlayers, maxPlayers, inviteMessage, recipients, listener)` -- Create match without using native UI.
	- `minPlayers` (optional) (integer) -- The minimum number of players.
	- `maxPlayers` (optional) (integer) -- The maximum number of players.
	- `inviteMessage` (optional) (string) -- The string displayed on another player’s device when invited to join a match.
	- `recipients` (optional) (array of strings) -- Put player IDs in here.
	- `listener` (function)
	- `status` (string) -- Can be "finish", "foundMatch", "playerDidQuitForError", "playerDidQuit", "finish", "cancelled", or "error".
	- `creationDate` (string) -- Date of match creation.
	- `matchID` (string) -- Match ID.
	- `itIsMyTurn` (boolean) -- Boolean for whether it is your turn or not.
	- `error` (string) -- Error when status is "error".

```lua
gamecenter.multiplayer.newMatch(2, 4, "Come play now", {friendID}, function(e)
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

- `gc.multiplayer.setListener(listener)` -- Set Listener for multiplayer callbacks.
	- `listener` (function)
	- `status` (string) -- Can be "exchangeCancellation", "receivedExchangeReplies", "receivedExchangeRequest", "requestMatchWithOtherPlayer", "matchEnded", "receivedTurnEventForMatch", or "playerWantsToQuit".
	- `participants` (array) -- Contains table which contain playerOutcome (string) (can be "won", "lost", "quit", "tied", "first", "second", "third", "fourth", "timeExpired", "customRange", "none"), displayName (string), playerID (string).
	- `message` (string) -- Match message.
	- `matchID` (string) -- Match ID.
	- `itIsMyTurn` (boolean) -- Boolean for whether it is your turn or not.
	- `didBecomeActive` (boolean) -- When status == "receivedTurnEventForMatch".
	- `playerName` (string) -- The name of player for the event.
	- `playerID` (string) -- The ID of player for the event.
	- `activeExchanges` (table) -- Contains data (table), message (string), displayName (string), playerID (string).
	- `playersToInvite` (table) -- Contains displayName (string), playerID (string).
	- `matchData` (table) -- Table of match data.
	- `error` (string) -- Error when status is "error".
	- `currentParticipantDisplayName` (string) -- Current Player Display Name.
	- `currentParticipantID` (string) -- Current Player PlayerId/gamePlayerID.

```lua
gamecenter.multiplayer.setListener(function(e)
	print("Multiplayer Listener")
	print("----------")
	print(json.encode(e))
	print("----------")
end)
```

- `gc.multiplayer.getMatchData(listener)`
	- `listener` (function)
	- `status` (string) -- Can be "gotMatchData", "matchNotActive", or "error".
	- `participants` (array) -- Contains table which contain playerOutcome (string) (can be "won", "lost", "quit", "tied", "first", "second", "third", "fourth", "timeExpired", "customRange", "none"), displayName (string), playerID (string).
	- `currentParticipantDisplayName` (string) -- Current Player Display Name.
	- `currentParticipantID` (string) -- Current Player PlayerId/gamePlayerID.
	- `error` (string) -- Explains the error.
	- `matchID` (string) -- Match ID.
	- `data` (table) -- Data from match.

```lua
gamecenter.multiplayer.getMatchData(function(e)
	print("Got Match Data")
	print("----------")
	print(json.encode(e))
	print("----------")
end)
```

- `gc.multiplayer.getMatchStatus(listener)`
	- `listener` (function)
	- `status` (string) -- Can be "open", "matching", "matchNotActive", or "ended".

```lua
gamecenter.multiplayer.getMatchStatus(function(e)
	print("Get Match status")
	print("----------")
	print(e.status)
	print("----------")
end)
```

- `gc.multiplayer.updateData(data, listener)`
	- `data` (table) -- Data to update.
	- `listener` (function)
	- `status` (string) -- "dataUpdated" or "error".
	- `error` (string) -- Explains the error.

```lua
gamecenter.multiplayer.updateData({hello="world"}, function(e)
	print("Update Data")
	print("----------")
	print(e.status)
	print("----------")
end)
```

- `gc.multiplayer.deleteMatch(matchId, listener)`
	- `matchId` (string, optional, will delete active match if nil) -- Match ID to delete match.
	- `listener` (function)
	- `status` (string) -- "matchDeleted" or "error".
	- `error` (string) -- Explains the error.

```lua
gamecenter.multiplayer.deleteMatch(function(e)
	print("Delete Match")
	print("----------")
	print(e.status)
	print("----------")
end)
```

- `gc.multiplayer.quitOutOfTurn(outcome, listener)`
	- `outcome` (string, optional, default "none") -- Can be "won", "lost", "quit", "tied", "first", "second", "third", "fourth", "timeExpired", "customRange", or "none".
	- `listener` (function)
	- `status` (string) -- "quitOutOfTurn" or "error".
	- `error` (string) -- Explains the error.

```lua
gamecenter.multiplayer.quitOutOfTurn("won", function(e)
	print("Quit Out of Turn")
	print("----------")
	print(e.status)
	print("----------")
end)
```

- `gc.multiplayer.quitInTurn(outcome, turnTimeout, data, listener)`
	- `outcome` (string, optional, default "none") -- Can be "won", "lost", "quit", "tied", "first", "second", "third", "fourth", "timeExpired", "customRange", or "none".
	- `turnTimeout` (integer) -- Number of seconds before a player's turn is skipped.
	- `data` (table) -- Data to quit in turn with.
	- `listener` (function)
	- `status` (string) -- "quitInTurn", "matchNotActive", or "error".
	- `error` (string) -- Explains the error.

```lua
gamecenter.multiplayer.quitInTurn("lost", 900, {hello = "world"}, function(e)
	print("Quit In Turn")
	print("----------")
	print(e.status)
	print("----------")
end)
```

- `gc.multiplayer.endTurn(data, turnTimeout, listener)`
	- `data` (table) -- Data to end turn.
	- `turnTimeout` (integer) -- Number of seconds before a player's turn is skipped.
	- `listener` (function)
	- `status` (string) -- "turnEnded", "matchNotActive", or "error".
	- `error` (string) -- Explains the error.

```lua
gamecenter.multiplayer.endTurn({hello = "world"}, 900, function(e)
	print("End Turn")
	print("----------")
	print(e.status)
	print("----------")
end)
```

- `gc.multiplayer.endMatch(data, listener)`
	- `data` (table) -- Data to end match.
	- `listener` (function)
	- `status` (string) -- "endMatch", "matchNotActive", or "error".
	- `error` (string) -- Explains the error.

```lua
gamecenter.multiplayer.endMatch({hello = "world"}, function(e)
	print("End Match")
	print("----------")
	print(e.status)
	print("----------")
end)
```

- `gc.multiplayer.isItMyTurn(listener)`
	- `listener` (function)
	- `status` (string) -- Can be "matchNotActive", "notMyTurn", "itIsMyTurn".
	- `playerName` (string) -- The name of player for the event.
	- `playerID` (string) -- The ID of player for the event.

```lua
gamecenter.multiplayer.isItMyTurn(function(e)
	print("Is it my turn?")
	print("----------")
	print(e.status)
	print("----------")
end)
```

- `gc.multiplayer.listMatches(listener)`
	- `listener` (function)
	- `isError` (boolean)
	- `error` (string) -- Explains the error.
	- `matches` (array) -- Contains array of tables which has matchID (string), creationDate (string in "HH:mm yyyy/MMM/d" format), matchData (table), and participants (array) -- Contains table which contain playerOutcome (string) (can be "won", "lost", "quit", "tied", "first", "second", "third", "fourth", "timeExpired", "customRange", "none"), displayName (string), playerID (string), currentParticipantDisplayName (string), currentParticipantID (string).

```lua
gamecenter.multiplayer.listMatches(function(e)
	print("List Matches")
	print("----------")
	print(json.encode(e.matches))
	print("----------")
end)
```

### `gc.multiplayer.startMatchWithId(matchId, listener)`
Starts a match with the given match ID.

- `matchId` (string) -- The ID of the match to start.
- `listener` (function)
	- `status` (string) -- Can be "error" or "startedMatchWithId".
	- `participants` (array) -- Contains table which contain playerOutcome (string) (can be "won", "lost", "quit", "tied", "first", "second", "third", "fourth", "timeExpired", "customRange", "none"), displayName (string), playerID (string).
	- `error` (string) -- Explains the error.
	- `itIsMyTurn` (boolean) -- Boolean for whether it is your turn or not.
	- `matchData` (table) -- Table of match data.

```lua
gamecenter.multiplayer.startMatchWithId("insertMatchIdHere", function(e)
		print("Start Match With Id")
		print("----------")
		print(e.status)
		print("----------")
end)
```

### `gc.multiplayer.rematch(listener)`
Rematch the current game.

- `listener` (function)
	- `status` (string) -- Can be "error" or "rematchStarted".
	- `participants` (array) -- Contains table which contain playerOutcome (string) (can be "won", "lost", "quit", "tied", "first", "second", "third", "fourth", "timeExpired", "customRange", "none"), displayName (string), playerID (string).
	- `error` (string) -- Explains the error.
	- `itIsMyTurn` (boolean) -- Boolean for whether it is your turn or not.
	- `currentParticipantDisplayName` (string) -- Current Player Display Name.
	- `currentParticipantID` (string) -- Current Player PlayerId/gamePlayerID.
	- `matchData` (table) -- Table of match data.

```lua
gamecenter.multiplayer.rematch(function(e)
		print("Rematch")
		print("----------")
		print(e.status)
		print("----------")
end)
```

### `gc.multiplayer.sendReminderToAllParticipants(localizableMessageKey, arguments, listener)`
Send a reminder to all participants.

- `localizableMessageKey` (string)
- `arguments` (array of strings)
- `listener` (function)
	- `status` (string) -- Can be "error" or "reminderSent".

```lua
gamecenter.multiplayer.sendReminderToAllParticipants("hello there", {"hello", "world"}, function(e)
		print("Send Reminder To All Participants")
		print("----------")
		print(e.status)
		print("----------")
end)
```

### `gc.multiplayer.sendReminderToParticipantWithId(participantId, localizableMessageKey, arguments, listener)`
Send a reminder to a participant with the given ID.

- `participantId` (string) -- The ID of the participant (either PlayerId or gamePlayerID).
- `localizableMessageKey` (string)
- `arguments` (array of strings)
- `listener` (function)
	- `status` (string) -- Can be "error", "playerNotFound", or "reminderSent".

```lua
gamecenter.multiplayer.sendReminderToParticipantWithId("participantId", "hello there", {"hello", "world"}, function(e)
		print("Send Reminder To Participant With Id")
		print("----------")
		print(e.status)
		print("----------")
end)
```

### `gc.multiplayer.listParticipants(listener)`
List participants.

- `listener` (function)
	- `status` (string) -- Can be "gotParticipants", "matchNotActive", or "error".
	- `participants` (array) -- Contains table which contain playerOutcome (string) (can be "won", "lost", "quit", "tied", "first", "second", "third", "fourth", "timeExpired", "customRange", "none"), displayName (string), playerID (string).
	- `currentParticipantDisplayName` (string) -- Current Player Display Name.
	- `currentParticipantID` (string) -- Current Player PlayerId/gamePlayerID.
	- `error` (string) -- Explains the error.

```lua
gamecenter.multiplayer.listParticipants(function(e)
		print("List Participants")
		print("----------")
		print(json.encode(e.participants))
		print("----------")
end)
```

### `gc.multiplayer.setMatchOutcome(participantId, listener)`
Set the match outcome for a participant.

- `participantId` (string) -- The ID of the participant (either PlayerId or gamePlayerID).
- `listener` (function)
	- `status` (string) -- Can be "outcomeSet", "matchNotActive", or "playerNotFound".

```lua
gamecenter.multiplayer.setMatchOutcome("participantId", function(e)
		print("Set Match Outcome")
		print("----------")
		print(e.status)
		print("----------")
end)
```

## `gc.accessPoint`
Handles Gamecenter access point for iOS 14+.

### `gc.accessPoint.setActive(shouldEnable)`
	- `shouldEnable` (boolean) -- A Boolean value that determines whether to display the access point.

```lua
print(gc.accessPoint.setActive(true))
```

### `gc.accessPoint.setLocation(location)`
	- `location` (string) -- Location of access point icon "bottomLeading", "bottomTrailing", "topLeading", or "topTrailing".

```lua
gc.accessPoint.setLocation("bottomLeading")
```

### `gc.accessPoint.setShowHighlights(shouldEnable)`
	- `shouldEnable` (boolean) -- A Boolean value that indicates whether to display highlights for achievements and current ranks for leaderboards.

```lua
gc.accessPoint.setShowHighlights(true)
```

### `gc.accessPoint.setFocused(shouldFocus)`
	- `shouldFocus` (boolean) -- Only tvOS, A Boolean value that indicates whether the access point is in focus on tvOS.

```lua
gc.accessPoint.setFocused(true) -- only for apple tv
```

### `gc.accessPoint.triggerAccessPoint()`
	- Displays the Game Center dashboard.

```lua
gc.accessPoint.triggerAccessPoint()
```

### `gc.accessPoint.triggerAccessPointWithType(accessPointType)`
	- `accessPointType` (string) -- Can be "default", "leaderboards", "achievements", "challenges", "localPlayer", or "dashboard".

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

#### Helpful links:

- [Get Plugin](https://solar2dmarketplace.com/plugins?GameCenter_tech-scotth)
- [Example](https://github.com/scottrules44/gamecenter-corona-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
