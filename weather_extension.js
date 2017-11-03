
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

    ext.getTemperature = function(city, callback) {
        var xmlhttp = new XMLHttpRequest();
        //xmlhttp.open("GET", "http://weathers.co/api.php?city="+city, true);
        xmlhttp.open("GET", "http://samples.openweathermap.org/data/2.5/weather?q=" + city + ",uk&appid=b1b15e88fa797225412429c1c50c122a1");
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myObj = JSON.parse(this.responseText);
                //callback(myObj.data.temperature);
                callback(myObj.main.temp);
            }
        };
        xmlhttp.send();
    };

    ext.power = function(base, exponent) {
        return Math.pow(base, exponent);
    };


    ext.power = function(base, exponent) {
        return Math.pow(base, exponent);
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['r', '%n ^ %n', 'power', 2, 3],
            ['R', 'current temperature in city %s', 'getTemperature', 'Boston'],
            ['', 'run alarm after %n seconds', 'set_alarm', '2'],
            ['h', 'when alarm goes off', 'when_alarm'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Alarm extension', descriptor, ext);
})();
