# AI Plugin

One on-device AI API for Solar2D on iOS, macOS, Android and Windows. Each platform's own model does the work (Apple Foundation Models, Gemini Nano through ML Kit GenAI), and a cloud fallback serves every other device with the same code. Sessions, streaming, structured output from a Lua schema, and summarize / rewrite / proofread / describe-image tasks.

- **iOS 26+ / macOS 26+** — `FoundationModels`. Free-form prompting with guided decoding; the most capable backend.
- **Android** — ML Kit GenAI (Gemini Nano). Summarize, rewrite, proofread and describe-image run natively, and free-form prompting runs through the Prompt API.
- **Windows** — served by any cloud provider, so the same Lua code runs unchanged.
- **Anywhere** — Claude, ChatGPT, Gemini, Mistral, Groq, Grok, DeepSeek or OpenRouter in pure Lua, with no native code.

Ask the device what it can do with `getCapabilities()`. Every feature it reports is available to call, served natively by the platform model or built by the plugin on top of `generate` (for example `summarize` on Apple).

### Functions:

#### ai.getCapabilities()
Returns a table describing the active backend.

- backendId (string) — e.g. `"apple.foundationModels"`
- modelName (string)
- available (boolean)
- availability (string) — `"ready"`, `"notReady"`, `"downloading"`, `"unsupportedOS"`, `"unsupportedDevice"`, `"needsSetup"`, `"needsPackageIdentity"` or `"disabledByPolicy"`
- detail (string) — human-readable explanation worth showing the player
- maxContextTokens (number)
- features (table) — `generate`, `stream`, `structured`, `summarize`, ... true when the plugin can serve it at all. **Branch on this one.**
- native (table) — served natively by the platform model
- emulated (table) — served by building a prompt over `generate`
- errorCode (string) — set when `available` is false
- fallbacks (array) — configured fallback providers, e.g. `{ "cloud.anthropic" }`

#### ai.isAvailable()
Shorthand for `ai.getCapabilities().available`.

#### ai.getBackends()
Array of capability tables, one per configured provider, in priority order. Useful for a diagnostics screen.

#### ai.prepare(listener)
Downloads or initialises the on-device model. Emits `progress` events where the platform reports them (`progress = -1` means indeterminate). Safe to call when already ready. On Android this can be a multi-gigabyte download, so it is never triggered automatically; ask the player first.

#### ai.setFallback(options)
Routes requests the device cannot serve to a cloud AI service, see Providers below. Pass `nil` to remove it. Returns `true`, or `false, errorCode, message` for an unknown provider or a missing required model.

- options.provider (string) — `"anthropic"` (default, also `"claude"`), `"openai"`, `"gemini"`, `"mistral"`, `"groq"`, `"xai"`, `"deepseek"`, `"openrouter"`
- options.url (string) — an endpoint you control that holds the credential server-side. **Ship this.**
- options.apiKey (string) — the service's key, development only (prints a warning on every use)
- options.model (string) — model id; each provider has a default
- options.maxTokens (number) — default 1024
- options.maxTokensField (string) — OpenAI-format providers: `"max_tokens"` or `"max_completion_tokens"`
- options.effort (string) — Claude only: `"low"` (default), `"medium"` or `"high"`
- options.headers (table) — extra headers, e.g. your own player auth token
- options.timeout (number) — seconds, default 60

#### ai.setMockResponder(fn, options)
A deterministic provider for the Simulator, CI and devices with no model. `fn(request)` returns a string, or a table `{ text = "...", chunks = {...}, errorCode = ai.errors.GUARDRAIL_VIOLATION }`.

#### ai.newSession(config)
Creates a conversation that keeps its own transcript.

- config.instructions (string) — system prompt (prepended to each prompt on backends without a system channel)
- config.temperature (number)
- config.maxTokens (number)

#### session:respond(options)
Returns a request id, or `nil, errorCode, errorMessage` on a synchronous failure.

- options.prompt (string) — required
- options.listener (function or table with an `enterpriseAI` method)
- options.stream (boolean) — emit `chunk` events as tokens arrive
- options.schema (table) — constrain the output to a shape, see Schemas
- options.images (array) — absolute paths, needs `features.vision`
- options.temperature, options.maxTokens — per-request overrides
- options.remember (boolean) — `false` keeps this exchange out of the transcript

#### session:skill(name, args)
`name` is `"summarize"`, `"rewrite"`, `"proofread"` or `"describeImage"`. Native where the platform has it, emulated elsewhere. Returns a request id.

#### session:cancel(requestId), session:cancelAll()
Best-effort. The listener still gets a terminal `error` event with `errorCode == ai.errors.CANCELLED`.

#### session:getTranscript(), session:reset(), session:release()
The transcript is an array of `{ role = "user" | "assistant", text = "..." }`, trimmed in whole exchanges as it nears the context window. Call `release()` when finished.

#### ai.respond, ai.summarize, ai.rewrite, ai.proofread, ai.describeImage
One-shot calls on a shared session with no history, e.g. `ai.summarize{ text = questLog, sentences = 2, listener = onSummary }` or `ai.rewrite{ text = bio, tone = "friendly", listener = onRewrite }`. `tone` is `"professional"`, `"casual"`, `"friendly"`, `"concise"` or `"elaborate"`.

### Schemas:

One schema table drives guided decoding on Apple and a parse-and-repair loop everywhere else. `event.response` is a validated Lua table either way. Streaming is suppressed for schema requests; the result arrives on `ended`.

- `"string"`, `"number"`, `"integer"`, `"boolean"` — a scalar
- `{ enum = {...} }` — one of a fixed set
- `{ array = <spec>, minItems=, maxItems= }` — a list
- `{ object = { field = <spec> } }` — a nested object (a bare table of fields is shorthand)
- `{ type = "number", min=, max= }` — a bounded number
- `optional = true` — may be absent
- `description = "..."` — guidance passed to the model

Numeric strings become numbers, enum values are case-corrected and out-of-range numbers are clamped. A missing required field or an unknown enum value is still an error.

### Events:

- event.name (string) — `"enterpriseAI"`
- event.provider (string) — the backend that actually served it
- event.requestId (number)
- event.phase (string) — `"began"`, `"progress"`, `"chunk"`, `"ended"` or `"error"`
- event.text (string) — for `chunk` the new piece only (append it); for `ended` the full text
- event.progress (number) — `progress` events only, `-1` when indeterminate
- event.response (table) — on `ended` when a schema was supplied
- event.isError (boolean), event.errorCode (string), event.errorMessage (string)

Every request gets exactly one `began` and exactly one terminal event (`ended` or `error`), even when the plugin retries or falls back internally.

### Error codes:

Branch on `ai.errors.*`, never on message text. The set is the same on every platform: `UNSUPPORTED_OS`, `UNSUPPORTED_DEVICE`, `NEEDS_SETUP`, `NEEDS_PACKAGE_IDENTITY`, `DISABLED_BY_POLICY`, `MODEL_NOT_READY`, `MODEL_DOWNLOADING`, `DOWNLOAD_FAILED`, `INVALID_ARGUMENT`, `UNSUPPORTED_FEATURE`, `CONTEXT_WINDOW_EXCEEDED`, `SCHEMA_MISMATCH`, `GUARDRAIL_VIOLATION`, `CANCELLED`, `TIMEOUT`, `RATE_LIMITED`, `NETWORK_REQUIRED`, `NETWORK_FAILED`, `AUTH_FAILED`, `NO_PROVIDER`, `INTERNAL`.

With a fallback set, `UNSUPPORTED_DEVICE`, `UNSUPPORTED_OS`, `NEEDS_PACKAGE_IDENTITY`, `DISABLED_BY_POLICY`, `UNSUPPORTED_FEATURE`, `MODEL_NOT_READY`, `NEEDS_SETUP` and `CONTEXT_WINDOW_EXCEEDED` are retried on the cloud. `GUARDRAIL_VIOLATION` deliberately is not: a prompt the on-device model refused is never quietly sent off the device.

### Providers:

`provider` picks the service behind `setFallback`. Each one fills in its address and a default model, and anything you pass replaces them.

**Hosted services (API key):**

- `"anthropic"` / `"claude"` — Claude, default model `claude-opus-5`. Key from console.anthropic.com
- `"openai"` — OpenAI / ChatGPT, default `gpt-5-mini`. Key from platform.openai.com
- `"gemini"` — Google Gemini, default `gemini-2.5-flash`. Key from aistudio.google.com
- `"mistral"` — Mistral, default `mistral-small-latest`. Key from console.mistral.ai
- `"groq"` — Groq, default `llama-3.3-70b-versatile`. Key from console.groq.com
- `"xai"` — xAI Grok, default `grok-4`. Key from console.x.ai
- `"deepseek"` — DeepSeek, default `deepseek-chat`. Key from platform.deepseek.com
- `"openrouter"` — OpenRouter, models from every vendor with one key; `model` is required (e.g. `"anthropic/claude-sonnet-4.5"`)

Services rename models often, so set `model` to the one you have tested.

```lua
-- development: key in the app (prints a warning)
ai.setFallback( { provider = "openai", apiKey = "sk-..." } )

-- release: your own endpoint holds the key
ai.setFallback( { provider = "gemini", url = "https://your-backend.example/ai" } )
```

For release, your endpoint receives exactly the request the service expects, adds the key (`x-api-key` for Claude, `Authorization: Bearer <key>` for the others) and forwards the body to the service, streaming the response back. It is also the place to authenticate and rate-limit players; send your own token with `headers`.

**Adding another service:** if it speaks the OpenAI Chat Completions format, pass `provider = "openai"` with its `url`, `model` and `apiKey`, no plugin change needed.

### Build Settings:

```lua
settings =
{
	plugins = {
		["plugin.enterpriseAI"] =
		{
			publisherId = "tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```

### Example:

```lua
local ai = require( "plugin.enterpriseAI" )

ai.setFallback( { url = "https://your-backend.example/ai" } )

local npc = ai.newSession( { instructions = "You are a terse quest-giver." } )

-- streamed dialogue
npc:respond( {
	prompt = "The player killed the swamp troll. React in one line.",
	stream = true,
	listener = function( event )
		if event.isError then
			print( "error: " .. event.errorCode )
		elseif event.phase == "chunk" then
			label.text = label.text .. event.text
		end
	end,
} )

-- structured loot drop
npc:respond( {
	prompt = "Generate a loot drop.",
	schema = {
		name = "string",
		rarity = { enum = { "common", "rare", "epic" } },
		gold = { type = "integer", min = 0, max = 500 },
	},
	listener = function( event )
		if event.phase == "ended" then print( event.response.name, event.response.gold ) end
	end,
} )

-- check what the device can do
local caps = ai.getCapabilities()
if caps.features.summarize then
	ai.summarize( { text = questLog, sentences = 2, listener = function( event ) print( event.text ) end } )
end
```

### Notes:

- **Never ship an API key.** A key inside an `.apk`, `.ipa` or `.exe` can be extracted by anyone. Point `setFallback{ url = ... }` at an endpoint you control that holds the key and authenticates and rate-limits players.
- These are ~3B-class local models. A 50-token line takes about two seconds, which makes them a great fit for dialogue, hints, flavour text and moderating player input.
- Android needs `minSdk` 26; the plugin's `corona.gradle` sets it and adds the ML Kit dependencies for you.

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?AI_tech-scotth)
- [Apple Foundation Models](https://developer.apple.com/documentation/foundationmodels)
- [ML Kit GenAI](https://developers.google.com/ml-kit/genai)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
