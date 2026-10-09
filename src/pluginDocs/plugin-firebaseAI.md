# Firebase AI Logic Plugin

This plugin brings [Firebase AI Logic](https://firebase.google.com/docs/ai-logic), the Gemini API through Firebase, to Solar2D on iOS (15+) / macOS (Solar2D Simulator and macOS builds), Android (5.0+), and over REST on Windows / Linux builds and HTML5. Text and multimodal generation, streaming, multi-turn chat, structured JSON output, function calling, token counting and image generation with the Gemini image models.

> **Note**: Firebase AI Logic requires [Firebase App Check](/plugin/firebaseAppCheck) from November 2, 2026, and new setups enforce it by default. Use `plugin.firebaseAppCheck` together with this plugin and call its `init()` first.

| Platform | Implementation | Streaming |
| --- | --- | --- |
| iOS 15+, macOS 12+ (Simulator and desktop) | native Firebase SDK | yes |
| Android 5.0+ | native Firebase SDK | yes |
| Windows, Linux, Windows Simulator, HTML5 | pure Lua over the Firebase AI Logic REST API | no (full answer in one event) |

### Functions:

#### firebaseAI.init(options)
Configures Firebase (when no other Firebase plugin has done it) and creates the AI Logic client.

- options.backend (string) — `"googleAI"` (default, Gemini Developer API with a free tier) or `"vertexAI"` (Agent Platform Gemini API, needs billing).
- options.location (string) — Agent Platform only, default `"global"`.
- options.useLimitedUseAppCheckTokens (boolean) — optional, use limited-use App Check tokens.
- options.listener (function) — receives one event with `phase = "init"`, `event.backend`, `event.isSimulator`.

#### firebaseAI.generateContent(options)
Generates a response and returns a request id.

- options.model (string) — required, e.g. `"gemini-2.5-flash"`.
- options.prompt (string) — the user message. Or `options.parts` (array of parts) or `options.contents` (array of `{ role, parts }` for a full conversation).
- options.systemInstruction (string or content table)
- options.generationConfig (table) — `temperature`, `topP`, `topK`, `candidateCount`, `maxOutputTokens`, `presencePenalty`, `frequencyPenalty`, `stopSequences`, `responseMimeType` (`"application/json"`), `responseSchema` (JSON schema table), `responseModalities` (`{ "TEXT", "IMAGE" }`), `thinkingConfig` (`{ thinkingBudget=, includeThoughts=, thinkingLevel= }`), `imageConfig` (`{ aspectRatio = "16:9", imageSize = "1K" }`).
- options.safetySettings (array) — `{ category = "HARM_CATEGORY_HARASSMENT", threshold = "BLOCK_MEDIUM_AND_ABOVE" }` entries.
- options.tools (array) — `{ functionDeclarations = { { name=, description=, parameters = <JSON schema> } } }`, `{ googleSearch = {} }`, `{ codeExecution = {} }`, `{ urlContext = {} }`.
- options.toolConfig (table) — `{ functionCallingConfig = { mode = "AUTO" | "ANY" | "NONE", allowedFunctionNames = {} } }`.
- options.stream (boolean) — deliver the answer while it is generated (`chunk` events, then `done`). Native platforms only.
- options.timeout (number) — seconds, default 180.
- options.listener (function) — required.

Parts can be strings or tables: `{ text = "..." }`, `{ image = fullPath }` or `{ file = fullPath, mimeType = "audio/mpeg" }` (read from disk and sent inline, use `system.pathForFile()`), `{ data = base64, mimeType = "image/png" }`, `{ fileUri = "gs://...", mimeType = "video/mp4" }` (Cloud Storage, Agent Platform backend), and `{ functionResponse = { name = "...", response = { ... } } }` for function calling.

#### firebaseAI.startChat(options)
Creates a multi-turn chat. Same model options as `generateContent` plus `options.history` (array of `{ role, parts }`). Returns a chat object, or `nil, error`.

- chat:sendMessage(options) — same as `generateContent` without `model`; the history is kept for you. Returns a request id.
- chat:getHistory() — array of `{ role, parts }` tables.
- chat:close()

#### firebaseAI.countTokens(options)
Counts the tokens of a prompt (`model` plus `prompt` / `parts` / `contents`). The event has `phase = "countTokens"` and `event.totalTokens`.

#### firebaseAI.cancel(requestId)
Stops a running request, for example a streaming answer.

#### firebaseAI.isSupported()
Returns `true` on every shipped platform.

### Events:

- event.name (string) — `"firebaseAI"`
- event.phase (string) — `"init"`, `"chunk"` (streaming), `"done"` or `"countTokens"`
- event.requestId (number), event.chatId (number, chat messages only), event.streamed (boolean)
- event.isError (boolean), event.error (string)
- event.text (string) — the answer (for `chunk` events the new piece of text; `event.fullText` has everything so far)
- event.thoughtSummary (string) — when `thinkingConfig.includeThoughts` is set
- event.candidates (array) — full candidates with `content = { role, parts }`, `finishReason`, `safetyRatings`
- event.finishReason (string) — `"STOP"`, `"MAX_TOKENS"`, `"SAFETY"`, ...
- event.functionCalls (array) — `{ name, args, id }` when the model wants you to call a function
- event.inlineData (array) — `{ mimeType, data }` with base64 data, e.g. generated images
- event.usageMetadata (table) — `promptTokenCount`, `candidatesTokenCount`, `totalTokenCount`, `thoughtsTokenCount`
- event.promptFeedback (table) — `blockReason`, `blockReasonMessage`, `safetyRatings`
- event.modelVersion (string)

### Setup:

1. In the Firebase console open **AI Logic** and complete the guided setup for the Gemini Developer API (free tier) or the Agent Platform Gemini API. This enables the API and registers your apps. Without it every request returns "Firebase AI Logic API has not been used in project ... or it is disabled".
2. Put `GoogleService-Info.plist` and `google-services.json` in the root folder of your project and set `useGoogleServicesJson = true` for Android, like the other Firebase plugins.
3. Add `plugin.firebaseAppCheck`, call `firebaseAppCheck.init()` before `firebaseAI.init()`, and register your debug token for Simulator runs.
4. Use a current model name such as `gemini-2.5-flash`.

### Build Settings:

```lua
settings =
{
	android =
	{
		useGoogleServicesJson = true,
	},
	plugins = {
		["plugin.firebaseAppCheck"] =
		{
			publisherId = "tech.scotth",
		},
		["plugin.firebaseAI"] =
		{
			publisherId = "tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```

### Example:

```lua
local appCheck = require( "plugin.firebaseAppCheck" )
local ai = require( "plugin.firebaseAI" )

appCheck.init( { provider = "auto" } )
ai.init( { backend = "googleAI" } )

-- one-shot, streamed
ai.generateContent( {
	model = "gemini-2.5-flash",
	prompt = "Write a two-line poem about armadillos.",
	stream = true,
	listener = function( event )
		if event.isError then
			print( "error: " .. event.error )
		elseif event.phase == "chunk" then
			print( event.fullText )
		else
			print( "done, " .. event.usageMetadata.totalTokenCount .. " tokens" )
		end
	end,
} )

-- chat
local chat = ai.startChat( { model = "gemini-2.5-flash", systemInstruction = "Answer briefly." } )
chat:sendMessage( { prompt = "Hi!", listener = function( event ) print( event.text ) end } )

-- image + question
ai.generateContent( {
	model = "gemini-2.5-flash",
	parts = { { image = system.pathForFile( "photo.jpg", system.DocumentsDirectory ) }, "What is in this picture?" },
	listener = function( event ) print( event.text ) end,
} )

-- structured output
ai.generateContent( {
	model = "gemini-2.5-flash",
	prompt = "List two planets with their diameter in km.",
	generationConfig = {
		responseMimeType = "application/json",
		responseSchema = { type = "array", items = { type = "object", properties = { name = { type = "string" }, diameterKm = { type = "integer" } }, required = { "name", "diameterKm" } } },
	},
	listener = function( event ) print( event.text ) end,
} )
```

### Notes:

- On macOS (Simulator and desktop builds) the Firebase plugins share one Firebase runtime, `libFirebaseRuntime.dylib`, that ships inside each plugin package. Keep the tech.scotth Firebase plugins you use on the same release so they carry the same runtime.
- The Windows / Linux / HTML5 implementation talks to the same backend the SDKs use. It attaches App Check tokens when `plugin.firebaseAppCheck` is present and can send a Firebase Auth ID token through `options.authTokenProvider = function( callback ) callback( idToken ) end`.
- The Live API (bidirectional audio), Imagen models and on-device inference are not exposed in this version.

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?FirebaseAI_tech-scotth)
- [Firebase AI Logic docs](https://firebase.google.com/docs/ai-logic)
- [Gemini models](https://firebase.google.com/docs/ai-logic/models)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
