/****************************************************************************
/*!
 * Cala Framework: To make your life simpler
 * version: 0.1.0-dev
 * @requires jQuery v1.5? or later (maybe other things too)
 *
 * Copyright (c) 2015 Twisted Head
 * License: MIT

 * Include this AT THE BOTTOM of your pages, that is all you need to do.

 <script>Cala.boot();</script>


 *           | |      
 *   ___ __ _| | __ _ 
 *  / __/ _` | |/ _` |
 * | (_| (_| | | (_| |
 *  \___\__,_|_|\__,_|

 *****************************************************************************/                   
var CalaApiUrl = "http://localhost";

var Cala = function() {

	// Version
	var version = "0.1.0-dev";

	/**
	 * Run stuff during boot up, if you want me to run stuff, let me know
	 */
	var _runMe = [];

	// Parameters sent via url
	var _params = false;

	// Each page must be initialized, this is the function that will do it
	//var _initCurrentPage = function(){Cala.say("Default customization")};

	//Logged in status
	loggedIn = false;
	myId = 0;

	return {

		/*****************************************************************************/
		//
		// Settings, Boot, Default, etc... stuff
		//
		//////////////////////////////////////////////////////////////////////////////

		register: function(which){
			Cala.say("Registering something");
			Cala.runMeAdd(which.boot);
		},

		// Add functions to the runMe process
		runMeAdd: function (what){
			Cala.say("Adding to runme...");
			_runMe.push(what);
			Cala.say("Total: " + _runMe.length);
		},

			/**
			 * Say stuff, this is a very minimal debugging functionality
			 */
			say: function (what){
				console.log("s: " + what);
			},

			/**
			 * This is where it all begins, this should be run at the very beggining 
			 * of the page load, or when document is ready, but you never call this directly,
			 * you need to call whereAmI();
			 */
			initMe: function (){

				Cala.say("Booting up the car! !!!!!!!!!!!!!!!!!!!!!!!!");

				// Get the params
				Cala.params.getFromUrl();
/*
				if(onApp){
					Cala.say("Running on an app...");
				}
				else{
					Cala.say("Running on a stand alone...");
				}

				// Run things that people want me to run
				for(i = 0; i < _runMe.length; i++){
					Cala.say("running...");
					_runMe[i]();
				}
*/
			},

			/**
			 * This is what you should call from your pages, call it at the bottom
			 */
			boot: function(){

				// Declare the first functions to be called
				//Cala.runMeAdd(Cala.amILoggedIn);
				//Cala.runMeAdd(Cala.pages.setCurrentBodyId);

				if(onApp == true){
					Cala.say("I am on an app");

					$.getScript( "cordova.js", function( data, textStatus, jqxhr ) {
						document.addEventListener("deviceready", initMe, false);
						Cala.say(data); // Data returned
						Cala.say(textStatus); // Success
						Cala.say(jqxhr.status); // 200
						Cala.say("Load was performed.");
					});

				}else{
					Cala.say("I am on a computer");
					$(document).ready(Cala.initMe);
				}
			},

			/*****************************************************************************/
			//
			// Modules
			//
			//////////////////////////////////////////////////////////////////////////////

			modules:{
				getPath: function(){
					return "modules";
				}
			},
			/*****************************************************************************/
			//
			// Tools
			//
			//////////////////////////////////////////////////////////////////////////////

			params: {
				// Set the parameters for this page
				getFromUrl: function(){
					Cala._params = Cala.getUrlVars();
				},

				// Get a parameter
				get: function(which, defValue){

					Cala.say("Looking for param: " + which);

					if(Cala._params[which] == undefined){
						Cala.say("Nothing found, using default value");
						return defValue;
					}
					else{
						Cala.say("Value found in param");
						return Cala._params[which];
					}

				},
			},

			// I parse a tpl and replace it with some values
			parseTpl: function(tpl, values, bl){
				for (var key in values) {
					var theKey = "{" + key + "}";
					var re = new RegExp(theKey, "g");
					tpl = tpl.replace(re, values[key]);
				}

				// Should I add html breakLines?
				if(bl == true){
					tpl = textAddBreakLines(tpl);
				}

				return tpl;

			},

			// Local storage

			// Keys
			keyStore: function(key, value){
				Cala.say("Storing key: " + key);
				window.localStorage.setItem(key, value);
				return true;
			},

			keyGet: function(key, defaultValue){
				var value = window.localStorage.getItem(key);
				if(value == null){
					Cala.say("No value found, I will use the default");
					value = defaultValue;
				}
				Cala.say("Gotten Key: " + key + " with value: " + value);
				return value;
			},

			// keyname is now equal to "key"
			// value is now equal to "value"
			removeKey: function(theKey){
				Cala.say("Removing key: " + theKey);
				window.localStorage.removeItem(theKey);
			},

			/**
			 * Helper function to actually present messages to the user, you should never
			 * call this directly
			 */
			_msgAlert: function(what, type){
				alert(what);
			},

			// Alert messages to the user
			msgAlert: function(what){
				_msgAlert(what, 'alert');
			},

			// Alert warning messages to the user
			msgWarning: function(what){
				_msgAlert(what, 'warning');
			},

			// Alert information messages to the user
			msgInfo: function(what){
				_msgAlert(what, 'info');
			},

			/**
			 * Alert stuff, not really very usefull to you, it is/will be used internally
			 */
			_alert: function(what){
				alert(what);
			},
	
			// Parse a date from a UTC timestamp
			// Read more https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Text_formatting
			dateParse: function(timestamp){

				//var utcSeconds = 1234567890;
				var d = new Date(0);
				d.setUTCSeconds(timestamp);
				timestamp = d.toString();

				return timestamp;

			},

			// I will redirect somewhere
			iGoTo: function(goTo){
				Cala.say("Going to: " + basePath + goTo);
				window.location.href = goTo;
			},

			// http://phpjs.org/functions/strpos/
			strpos: function(haystack, needle, offset) {
				//  discuss at: http://phpjs.org/functions/strpos/
				// original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
				// improved by: Onno Marsman
				// improved by: Brett Zamir (http://brett-zamir.me)
				// bugfixed by: Daniel Esteban
				//   example 1: strpos('Kevin van Zonneveld', 'e', 5);
				//   returns 1: 14

				var i = (haystack + '')
					.indexOf(needle, (offset || 0));
				return i === -1 ? false : i;
			},

			// Parse url parameters
			// http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
			getUrlVars: function(){
				var vars = [], hash;
				var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
				for(var i = 0; i < hashes.length; i++){
					hash = hashes[i].split('=');
					vars.push(hash[0]);
					vars[hash[0]] = hash[1];
					Cala.say("Found param: " + hash[0] + "--" + hash[1]);
				}

				return vars;
			},

			/*****************************************************************************/
			//
			// Text manipulation
			//
			//////////////////////////////////////////////////////////////////////////////

			// Add html break lines to the text
			textAddBreakLines: function(text){
				var theKey = "\n";
				var re = new RegExp(theKey, "g");
				text = text.replace(re, "<br />");
				return text;
			},

			/*****************************************************************************/
			//
			// Users
			//
			//////////////////////////////////////////////////////////////////////////////

			// Change the login info and put my name in it
			amILoggedIn: function(){

				Cala.say("Am I logged in?");

				// A unique id for this user
				Cala.myId = Cala.keyGet(Cala.VAR_CURRENT_USER, "---");

				if(Cala.myId != "---"){
					Cala.say("Yes I am loged in");
					Cala.loggedIn = true;
				}
				else{
					Cala.say("No, I am not logged in");
				}

			},

			/*****************************************************************************/
			//
			// Pages
			//
			//////////////////////////////////////////////////////////////////////////////
			pages: {
				/**
				  * Determine which page is this, params could do this part actually
				  */
				setCurrentBodyId: function(){
					Cala.say("Setting up pages");
					page = Cala.params.get("x", "");
					if(page != ""){
						Cala.say("This page is: " + page);
						// Set the id to the body
						$("body").attr("id", page);
					}
					Cala.pages.initCurrent();
				},

				// Override this function in order to have custom initialization of your pages
				_initCurrentPage: function(){
					Cala.say("Default itialization was used, nothing fancy")
				},
				/**
				  * Set up the page, you should override _initCurrentPage because that is the function
				  * I will call to complete this process
				  * @todo find a way to see if the loaded module has this function and call it automatically
				  */
				initCurrent: function(){
					Cala.say("Page initialization is in the house!");
					Cala.pages._initCurrentPage();
				},
			}
}}(); // end of cala

/*****************************************************************************/
//
// Paths
// This are possible paths that can be loaded by Cala
//
//////////////////////////////////////////////////////////////////////////////
var Paths = function (){

	// A list of paths and their archives
	var _paths = [];

	// Where are the actual files located, you could/should store them somewhere not available via wwws
	// USE TRAILING SLASH
	var _location = "./modules/";

	return{
		// Boot them up
		boot: function(){
			Cala.say("Booting up paths--------------------------->>>>");
			Paths.load();
		},
			//Load the current path
			// I will load a file called x.html where x is the parameter passed like ?x=this
			// The file should be located in _location/x.html
			// By default I load a file called default.html
			load: function(){
				basePath = _location + Cala.params.get("x", "core")
				indexPath = basePath + "index.html";
				/*
				scriptPath = basePath + "main.js";
				$.getScript(scriptPath, function(){
					Cala.pages.initCurrent();
					});
					*/
				Cala.say("Loading file in...9" + basePath);
				$("#mainContent").load(indexPath);
			}
	}}();

// Include it in Cala and register for boot time
//Cala.Paths = Paths;
//Cala.register(Cala.Paths);

/*****************************************************************************/
//
// Ajax Requests
// It can be GET or POST
// Options: Any valid jQuery ajax request options should be good to use here.
// Data: Is the data to be sent over, the sky is the limit.
// I will use the 
/**
  Cala.Requests.make({
  options:{
	what: "myCustomTestCall",
	val1: "value1ToBeSent",
	val2: "value2 To Be Sent"
  },
  data:{
	url: 'http://example.net',
	type: 'POST'
  }
	});
*/

//////////////////////////////////////////////////////////////////////////////

var Requests = function(){

	var _options = {
		type: 'GET',
		url: CalaApiUrl + '/api.php',
		dataType: "json",
	};

	// I should add all other options here
	var _onSuccess = function(data){d("Default error on ajax call")};

	var _onError = function(data){d("Default error on ajax call")};

	// Basic request data
	var _data = {
		what: "testCall",
		iam: "",
		sessionKey: ""
	};

	return {
		boot: function(){
			Cala.say("Booting up Requests");
		},

		// I make the actual request, via jQuery
		make: function(options){

			Cala.say("Making request" + _options.url);

			// Merge the options
			if(options.options !== undefined){
				Cala.say("Changing options...");
				for(option in options.options){
					_options[option] = options.options[option];
				}
			}

			// Merge the request data
			if(options.data !== undefined){
				Cala.say("Changing data...");
				for(data in options.data){
					_data[data] = options.data[data];
				}
			}

			_onSuccess = options.onSuccess;
			_onError   = options.onError;

			// Do the actual ajax call via jQuery
			$.ajax({
				type:     _options.type,
				url:      _options.url,
				dataType: _options.dataType,
				data:     _data,
				success:  _onSuccess,
				error:    _onError
			});
			Cala.say("d: -------------");
		}

	}}();

Cala.Requests = Requests;
Cala.register(Cala.Requests);
