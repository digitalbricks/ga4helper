# ga4helper
Helper for loading/unloading Google Analytics 4 tracking and removing involved cookies – to be combined with a cookie consent tool.

## Usage
Load the script (or bundle it with others to one single file)
```html
<script src="ga4helper.js"></script>
```

Instantiate the helper, giving your GA4 property ID as parameter
```js
var ga4helper = new Ga4helper('G-XXXXXXXXXX');
```

Now I assume you have some kind of cookie consent banner in place (not part part of this repository) where you can query and react to the consent status. So the folling code example just uses the fictional `consent_status` variable to determine consent status.

```js
if(consent_status=='consented'){
    ga4helper.load();
} else if(consent_status=='denied'){
    ga4helper.unload();
} else {
    ga4helper.unload();
}
```

Note that we explicit call `unload()` on consent denial / rejection – even if no choice has was made by the user. This is because the `unload()` method also tries to remove GA4 cookies from the browser.

To be honest, I don't know why but some GA cookies do re-appear after deletion and then reloading the page. I watched this behavior in Google Chrome and Safari whereas this does not happen in Firefox. So to be save, call `unload()` better once more than less. Alternatively, you can use `bulkDeleteCookies()` just for cookie deletion.

## Methods
### `load()`
Adds the `<script>` element with googletagmanager to the document and initiates tracking.

### `unload()`
Removed the `<script>` elements from document and tries to delete GA cookies using `bulkDeleteCookies()`.

### `bulkDeleteCookies()`
Tries to delete GA cookies. You don't need to call this method directly as `unload()` does that for you. But you can if you wan't.

## Debug Mode
When instantiating `Ga4helper` you **have** to give your GA property ID as first parameter. But as second parameter you **may** enable the debug mode, which gives you some info on the console.

```js
var ga4helper = new Ga4helper('G-XXXXXXXXXX', true);
```

