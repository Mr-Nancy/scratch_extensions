
new (function() {
    var ext = this;
    var alarm_went_off = false; // This becomes true after the alarm goes off

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.set_alarm = function(time) {
       window.setTimeout(function() {
           alarm_went_off = true;
       }, time*1000);
    };

    ext.when_alarm = function() {
       // Reset alarm_went_off if it is true, and return true
       // otherwise, return false.
       if (alarm_went_off === true) {
           alarm_went_off = false;
           return true;
       }

       return false;
    };

    ext.getQuote = function(category) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "https://quotes.rest/qod", true);
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myObj = JSON.parse(this.responseText);
                callback(myObj.contents.quotes[0].quote);
            }
        };
        xmlhttp.send();
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'Get Today Wizdom in the Category %s', 'getQuote', "Category"],
            ['', 'run alarm after %n seconds', 'set_alarm', '2'],
            ['h', 'when alarm goes off', 'when_alarm'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Quote extension', descriptor, ext);
})();
