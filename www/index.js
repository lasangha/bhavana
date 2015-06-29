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
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
				Cordova_boot();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};



// Actually boot cala from phonegap
function Cordova_boot(){

		console.log("Booting cordova...");

    Cala.say("Booting from cordova");
    Cala_runMe.push(amILoggedIn);
    Cala_runMe.push(Cala.loadThisPath);
    Cala_runMe.push(pagesSetUp);
		console.log("Booting cordova...??");
    initMe();

}

app.initialize();
