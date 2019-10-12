// Set up AsyncStorage.
var AsyncStorage = null;


// Set up BackgroundTimer.
var BackgroundTimer = null;
var customSetInterval = null;


/*
 *   BrainCloudClient expect localStorage to be available as a
 *   synchronous API, this will simulate the minimum required
 *   functions and use AsyncStorage to persist the data.
 */
var localStorageData = {};

try {

} catch (reason) {
    console.error("Error loading localStorage " + reason);
}

if (typeof localStorage === 'undefined' || localStorage === null) {
    localStorage = {
        getItem: function (key) {
            value = null;
            if (localStorageData.hasOwnProperty(key)) {
                value = localStorageData[key];
            }
            return value;
        },
        setItem: function (key, value) {
            localStorageData[key] = value;

        }
    }
}

function XMLHttpRequest4Upload() {
    this.upload = {
        addEventListener: this.addEventListener.bind(this)
    };
    this.observer = {
        load: null,
        error: null,
        abort: null,
        progress: null
    }
}
XMLHttpRequest4Upload.prototype.open = function (method, url, async) {
    this.url = url;
    this.method = method;
    this.async = async;
}
XMLHttpRequest4Upload.prototype.send = function (form) {
    form.submit(this.url, function (err, res) {
        if (err) {
            this.observer["error"](err);
        } else {
            this.observer["load"](res);
        }
        res.resume();
    }.bind(this));
}
XMLHttpRequest4Upload.prototype.addEventListener = function (event, callback) {
    this.observer[event] = callback
}

// Lastly, import the brainCloudClient module.
var bc = require("./lib/brainCloudClient.concat.js")

exports.XMLHttpRequest4Upload = XMLHttpRequest4Upload;
exports.BrainCloudWrapper = bc.BrainCloudWrapper
exports.BrainCloudClient = bc.BrainCloudClient
