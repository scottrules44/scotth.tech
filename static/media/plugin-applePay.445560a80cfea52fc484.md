{% raw %}
### Apple Pay Plugin

This plugin allows you to accept payments via stripe with the apple pay pop up

### Platforms:

this plugin only works with iOS 8.0+

### Setup: please follow each step carefully

1\. You need an apple [development account](https://developer.apple.com/programs/) and a computer that runs macOS. Also please make sure you already have a app id and development certifcate setup for this demo

2\. Go to [apple developer account]( https://developer.apple.com/account/) and under "indentifiers" click merchant ids

3\. click + button in top right name it what ever you would like and give a merchant id that begans with "merchant".

4\. open a new tap and go to [stripe.com](http://stripe.com) and create and account

5\. once in you account go "payments" and then apple pay

6\. create a new application under iOS and click continue

7\. a file called certSigningRequest should have just been downloaded

8\. lets hop back to apple developer profile under "Certifcates" click "All"

9\. click + and select "Apple Pay Certificate" under Production

10\. select merchant id which you would like to use

11\. use the certSigningRequest you just downloaded and upload it on the Choose File page. download "Payment Processing Certificate"

12\. hop back over to stripe and hit continue until you have to upload a file and upload the certficate you just downloaded from apple developer site

13\. hop back to apple developer profile and under "indentifiers" click app ids and click on the app id that you want to use

14\. click edit and enabled apple pay

15\. now lets under provisioning profiles and select development

16\. click + and create a new iOS apple development profile and select the app id which you just enabled apple pay for

17\. download profile and double click it

18\. hop back to stripe and go to "API" and grab your Test Publishable Key( Use Live Publishable Key when ready to launch app)

19\. in your code insert applePay.init("merchantId", "stripePublishableKey", listener) and add merchantId to you build settings via entitlements(see build.settings below)

### Functions:

#### applePay.init(merchantId, stripePublishableKey, listener)

merchantId(string) apple merchant id

stripePublishableKey(string) stripe publishable key

listener(function) returns event.status. These status' are "showing", "apple pay not setup", "stripe token failed", "completed", and "hidding", if event.status is "completed" then event.token will be returned which can be used to process payments on your own sever or via stripe's apis(stripes api's at bottem).

#### applePay.allowsApplePay()-- returns boolean. true if apple pay is enabled, false if not enabled

#### applePay.requestToken(arrayOfItems, currencyCode) -- note this only returns

arrayOfItems (array) insert a table with amounts and labels like so {{amount = 10.00, label= "hello"}, {amount = 9.99, label= "world"} }

currencyCode (string) The three-letter ISO 4217 currency code

### How to make Payment request via locally with Stripe:

Please use the following code below to process payment with token which comes from .init() listener via event.token and pass to listener when .requestToken() is called. Your secret key comes from your stripe dashboard under API. Please note if you use test secret key, use a test publisher key. If you use live secret key, use a live publisher key

```

local secretKey ="key" -- insert stripe secret key 
local token = "my token" -- returned .init with event.token 
local amount = 50001 -- 50001 = 500.01 
network.request( "https://api.stripe.com/v1/charges", "POST", function ( e ) 
	if e.isError then 
		print("payment unsuccessful") 
	else 
		print("payment successful") 
	end 
end, {headers= {["Content-Type"]= "application/x-www-form-urlencoded", ["Authorization"]= "Bearer "..secretKey}, body= "amount="..amount.."¤cy=usd".."&source="..token.."&description=Pay Rob, Scott, and Brent" } ) 
```

### Build Settings:

```lua
settings =
{
    iphone = {
        plist =
        {
            NSAppTransportSecurity =
            {
                NSAllowsArbitraryLoads = true,
            },
        },
        entitlements = {
            ["com.apple.developer.in-app-payments"] = {"enter merchant id here"},
        },
    },
    plugins = {
        ["plugin.applePay"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "replace with marketplace account ID"
        },
    },
}
```

##### Helpful Links:

[Get Plugin](https://solar2dmarketplace.com/plugins?ApplePay_tech-scotth)

[Example](https://github.com/scottrules44/applePay-demo)

[Support](https://forums.solar2d.com/c/corona-marketplace/13)
{% endraw %}
