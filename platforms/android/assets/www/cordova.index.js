var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('deviceready', Cordova_boot, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

app.initialize();

/**
 * This is what you should call from your pages, call it at the bottom
 */
function Cordova_boot(){
    Cala.say("Booting from cordova");
    Cala_runMe.push(amILoggedIn);
    Cala_runMe.push(Cala.loadThisPath);
    Cala_runMe.push(pagesSetUp);
    Cala.say("Running from cordova");
    initMe();
}

