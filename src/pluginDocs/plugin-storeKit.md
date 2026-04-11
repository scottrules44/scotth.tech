# Store Kit Plugin

This plugin allows you to make in-app purchases on iOS, macOS, and tvOS.

### Platforms:
iOS, macOS, and tvOS

### Limitations:
Please see the [migration guide](#migration) from the store API to the storeKit plugin. Requires internet to make a purchase.

### Gotchas:

You must call .loadProducts before restoring or buying.

macOS is not testable ([see here](https://forums.coronalabs.com/topic/63217-icloud-osx-fail/?p=328020)). If it works on iOS it will most likely work on macOS (make sure you set up product IDs correctly in iTunes Connect).

event.transaction.receipt will return nil on macOS since this does not exist on macOS. Please use event.transaction.originalReceipt.

### Properties:

#### store.isActive
(boolean) Returns true (added to help with migration)

#### store.canLoadProducts
(boolean) Returns true (added to help with migration)

#### store.canMakePurchases
(boolean) Returns true if user has enabled in-app purchase, returns false if user has disabled in-app purchase. (Note: also works if called as a function store.canMakePurchases())

#### store.target
(string) Returns "apple"

### Functions:

#### store.init(listener)
listener (function)(required) — handles transaction and restore events
- event.transaction
    - event.transaction.state — returns a string: "purchased", "no products to restore", "restored", "deferred" (the transaction is in the queue but its final status is pending external action such as Ask to Buy), "cancelled", or "failed"
    - event.transaction.productIdentifier — returns a string of productId passed in on purchase
    - event.transaction.identifier — the unique string identifier for the transaction
    - event.transaction.originalReceipt — a JSON-formatted string representation of the original transaction receipt
    - event.transaction.receipt — a JSON-formatted string representation of the transaction receipt
    - event.transaction.date — a string representing the date when the transaction occurred, returned in GMT time and YYYY/MM/DD locale format ("10:00 2000/12/30")
    - event.transaction.errorType — a string representing the type of error that occurred when the transaction state is "failed"
    - event.transaction.errorString — a more descriptive error message (string) when the transaction state is "failed"
- event.name
    - "storeTransaction"
- event.errorType — if an error occurred, a string value stating the type of error
- event.errorString — if an error occurred, a string value stating the cause of the error
- event.isError — returns false if error, or true if no error

[View Example on GitHub Gist](https://gist.github.com/scottrules44/2edbc0544f9f0e7f06522cba11e17d5e)

#### store.restore()
Users who wipe the information on a device or buy a new device may wish to restore previously purchased items. This function initiates the process of retrieving all valid purchases. Returns info to store.init() — called once for each item.

[View Example on GitHub Gist](https://gist.github.com/scottrules44/f1341e6eaf6b2b6ac90a5c89afc2aee2)

#### store.loadProducts(productIdentifiers, productListener)
productIdentifiers (table)(required) — an array of strings indicating a list of product identifiers

productListener (function)(required) — handles product events and gives you info about products
- event.products
    - event.products.productIdentifier — a string representing the product identifier
    - event.products.title — a string representing the product title
    - event.products.description — a string representing the product description
    - event.products.price — the product price (string)
    - event.products.localizedPrice — the product price as a localized currency string, for example $0.99
    - event.products.priceLocale — a string representing a locale string in one of the following forms: `<IsoLanguageCode>_<IsoCountryCode>` or `<IsoLanguageCode>-<IsoScriptCode>_<IsoCountryCode>`
- event.name
    - "productList"
- event.invalidProducts — an array (table) of strings representing a list of unavailable/invalid product identifiers

[View Example on GitHub Gist](https://gist.github.com/scottrules44/b41a8e0aefc1ac6e7b1c150afe4b9d94)

#### store.purchase(productIdentifier)
productIdentifier (string) — product identifier to buy

[View Example on GitHub Gist](https://gist.github.com/scottrules44/f2505c55b58a8a776c905fb15b0ab14e)

### Build Settings:

[View Example on GitHub Gist](https://gist.github.com/scottrules44/f36df345c055af0e74df95964b5329ca)

---

### Migration Guide

If you are using the [store kit library](https://docs.coronalabs.com/api/library/store/index.html) and trying to migrate to the storeKit plugin, this guide will help.

#### Differences

- finishTransaction() is not necessary but won't cause any errors if left in due to a "dummy function" being put in for it
- It is now `require("plugin.storeKit")`
- purchase() now only expects a string vs an array or a string
- If there are no restored products to get, the init listener returns event.transaction.state == "no products to restore"

### Build Settings (Migration):

[View Example on GitHub Gist](https://gist.github.com/scottrules44/dcc8b26e09fe6aac4dc84ade3643e0f9)

##### Helpful Links:
- [Get Plugin](https://marketplace.coronalabs.com/plugin/store-kit)
- [Example](https://github.com/scottrules44/storeKit-Demo)
- [Support](https://forums.coronalabs.com/forum/654-corona-store-plugins/)
