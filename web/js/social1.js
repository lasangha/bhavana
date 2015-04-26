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
// Version
var version = "0.1.2-dev";

//! The main instance of Cala
var Cala = Cala || {};

//! Some constants
var ERROR_NO_VALID_USER         = "-300";
var ERROR_USER_WRONG_LOGIN_INFO = "-301";
var ERROR_USER_NO_VALID_SESSION = "-302";
var ERROR_USER_ACCESS_DENIED    = "-303";
var ERROR_USER_EXISTS           = "-304";

//! Some variables
//var Cala_tplPath = "tpl/";

// Where is the api?
//var Cala_apiUrl = "";

// Basic variables needed to exist
//! Who am I? This should be sent always, ever in blank
var Cala_IAM = '';
//! Session key
var Cala_SESSION_KEY = '';

//Where do you want me to go upon logout?
//var Cala_goOnOut = 'index.html';

//Some needed stuff

// Some other constants
//! @todo move in Cala_x
var VAR_CURRENT_USER_NAME  = "userName";
var VAR_CURRENT_SESSION_KEY = "currentSessionKey";

// Parameters sent via url
var params = false;

//! Running on app
var onApp = false;

/**
 * Run stuff during boot up, if you want me to run stuff, let me know
 */
var Cala_runMe = [];

/**
 * The main Cala object/class
 */
var Cala = function() {

	var params = {};

	return {
		loadParams: function(){
			params = getUrlVars();
		},
		paramsGet: function(which, def = ""){
			// TMP solution, I will move all params in here
			params = window.params;	
			if(params[which] !== undefined && params[which] != ''){
				Cala.say("Found param with value" + params[which]);
				return params[which];
			}
			else{
				Cala.say("No custom path");
				return def;
			}	
		},
		runOnReady: function(runMe){
			$(document).ready(runMe);
		},
		say: function(what){
			console.log(what);
		},
		// Not in use at the moment
		// Get the correct page for this path
		loadThisPath: function(){
			Cala.say("Loading the current path??");
			Cala.say(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + params.x);
			path = Cala_tplPath + Cala.paramsGet('x', 'index');
			console.log("=////////////////////////////////This path is" + path);	
			$("#mainContent").load(path + ".html");

		}

	}

}();

/**
 *  Register a new account
 */
function Cala_userRegister(params){

	Cala.say("Register account");

	$.ajax({
		type: 'GET',
		url: Cala_apiUrl,
		dataType: "json",
		data: {
			r: "users_register",
			w: "users",
			fullName: params.options.fullName,
			userName: params.options.userName,
			email: params.options.email,
			pwd: params.options.pwd,
			about: params.options.about,
			country: params.options.country,
			iam: '', // During registration this is not important
			sessionKey: ''
		},
		//! @todo This is not very standard procedure, I should also log the person in
		success: function (data) {
			if(data.resp != ERROR_USER_EXISTS && data.resp != ERROR_BAD_REQUEST){
				// Log the user in
				Cala.say("Seems like it worked");
				Cala_usersLogMeInSuccess(data);
			}else{
				Cala.say("Something wrong happened");
			}
			params.onSuccess(data);
			/*
				//details = {sessionKey: data.resp, userName: params.options.userName, success: 1};
			}else{
				details = {success: data.resp};
			}
			*/
		},
		error: function (data){
			params.onError(data);
		}
	});

}

/**
 *  Log users out
 */
function wirez_userLogMeOut(callMeSuccess, callMeError){

	Cala.say("Log out");

	$.ajax({
		type: 'GET',
		url: Cala_apiUrl + 'index.php',
		dataType: "json",
		data: {
			r: "users_log_me_out",
			w: "users",
			iam: Cala_IAM,
			sessionKey: Cala_SESSION_KEY
		},
		success: function (data) {
			callMeSuccess(data);
		},
		error: function (data){
			callMeError(ERROR_ERROR);
		}
	});

}

/**
  I get a list of people in the directory
 */
function cala_getPeopleList(name, initHere, callMeSuccess, callMeError){

	Cala.say("Retrieving a list of contacts");

	$.ajax({
		type: 'GET',
		url: Cala_apiUrl + 'index.php',
		dataType: "json",
		data: {
			r: "users_get_list",
			w: "users",
		like:  name,
		ini: initHere,
		iam: Cala_IAM,
		sessionKey: Cala_SESSION_KEY
		},
		success: function (data) {
			callMeSuccess(data);
		},
		error: function(data){
			callMeError(ERROR_ERROR);
		}
	});

}


/*****************************************************************************/
//
// Boot stuff
//
//////////////////////////////////////////////////////////////////////////////

/**
 * Say stuff, this is a very minimal debugging functionality
 * @todo rename to Cala.say
 * @deprecated
 */
function say(what){
	console.log("s: " + what);
}

/**
 * This is where it all begins, this should be run at the very beggining 
 * of the page load, or when document is ready, but you never call this directly,
 * you need to call whereAmI();
 */
function initMe(){

	Cala.say("Booting up the car!");

	// Get the params
	params = getUrlVars();
	//Cala.loadParams();

	if(onApp){
		Cala.say("Running on an app...");
	}
	else{
		Cala.say("Running on a stand alone...");
	}

	// Run things that people want me to run
	for(i = 0; i < Cala_runMe.length; i++){
		Cala.say("running...");
		justRunThis(Cala_runMe[i]);
	}

}

function justRunThis(what){
	what();
}

/**
 * This is what you should call from your pages, call it at the bottom
 */
function Cala_boot(){

	Cala_runMe.push(amILoggedIn);
	Cala_runMe.push(Cala.loadThisPath);
	Cala_runMe.push(pagesSetUp);

	//! This will be usefull when running on an app, but it will not go here I just
	//! don't want to touch it because I might loose it
	if(onApp == true){
		Cala.Cala.say("I am on an app");

		$.getScript( "cordova.js", function( data, textStatus, jqxhr ) {
			document.addEventListener("deviceready", initMe, false);
			Cala.say(data); // Data returned
			Cala.say(textStatus); // Success
			Cala.say(jqxhr.status); // 200
			Cala.say("Load was performed.");
		});

	}else{
		Cala.say("I am on a computer");
		$(document).ready(initMe);
	}
}

/***************************************************************************
 *
 * Local storage
 *
 */

//! Store keys in local storage
function keyStore(key, value){
	Cala.say("Storing key: " + key);
	window.localStorage.setItem(key, value);
	return true;
}

//! Get key from local storage
function keyGet(key, defaultValue){
	var value = window.localStorage.getItem(key);
	if(value == null){
		Cala.say("No value found, I will use the default");
		value = defaultValue;
	}
	Cala.say("Gotten Key: " + key + " with value: " + value);
	return value;
}

//! Remove key from local storage
function removeKey(theKey){

	Cala.say("Removing key: " + theKey);
	// Remove them all
	if(theKey == ''){
	
	}else{
		window.localStorage.removeItem(theKey);
	}
}

/*****************************************************************************/
//
// Contacts, Directory, People
//
//////////////////////////////////////////////////////////////////////////////

/**
  I get a list of people in the directory
  */
function getPeopleList(){

	Cala.say("Retrieving a list of people in the directory");

	cala_getPeopleList($("#personLike").val(), params.ini != undefined ? params.ini : 0, _getPeopleListSuccess, _getPeopleListError);

	return false;

}

// Helper function to create the people list
function _getPeopleListSuccess(data){

	Cala.say("Found people apparently");

	// Nothing found actually
	if(data.resp == ERROR_DB_NO_RESULTS_FOUND){
		_getPeopleListError();
	}
	else{

		$("#directorySearching").hide();

		var tpl = ''
			+ '<div class="well peopleListingEach emptyWell">'
			+ '<div class="thumbnail peopleListingAvatarThumb"><img src="{avatar}" class="peopleListingAvatar" /></div>'
			+ '<div class="peopleListingName"> <span class="peopleListingNameEach">{name}</span> ~ {about}'
			+ '<br /> <span class="peopleListingWire">::{wire}</span> '
			+ '</div>'
			+ '<a class="btn btn-primary btn-sm" href="conversation.html?withWire={wire}&idConversation=0&startNew=true">'
			+ ' <span class="glyphicon glyphicon-pencil" aria-hidden="true"> New</span>'
			+ '</a>'
			+ ' <a class="btn btn-success btn-sm" href="msgListing.html?withWire={wire}">'
			+ ' <span class="glyphicon glyphicon-list" aria-hidden="true"> View All</span>'
			+ '</a>'
			+ '</div>';

		// Clear the list first
		$("#peopleListing").empty();

		for(var contact in data.resp) {
			Cala.say("Setting contact...");
			var thisContact = data.resp[contact];

			// Fix name
			if(thisContact.name == ""){
				thisContact.name = "I am the egg man";
			}

			thisContact.avatar = wirez_userGetAvatarPath(thisContact.wire, '100');

			$("#peopleListing").append(parseTpl(tpl, thisContact, true));
		}
	}
}

// Error on getting people listing
function _getPeopleListError(){

	Cala.say("Error getting a list of people");

	$("#peopleListing").empty();

	$("#directorySearchingNotFoundImage").attr('src', 'img/noMessagesFound.png');
	$("#directorySearchingNotFoundTitle").html("No one else found");
	$("#directorySearching").show();

}

/*****************************************************************************/
//
// User management
//
//////////////////////////////////////////////////////////////////////////////

/**
 *  Log users in
 */
function Cala_usersLogMeIn(details){

	Cala.say("Loging in");

	$.ajax({
		type: 'GET',
		url: Cala_apiUrl,
		dataType: "json",
		data: {
			w: "users",
			r: "users_log_me_in",
			iam: '',
			userName: details.params.userName,
			pwd: details.params.pwd
		},
		success: function (data){
			if(data.resp != ERROR_USER_WRONG_LOGIN_INFO){
				Cala_usersLogMeInSuccess(data);
				details.onSuccess(data);
			}else{
				details.onError(ERROR_USER_WRONG_LOGIN_INFO);
			}
		},
		error: function (data){
			details.onError(ERROR_ERROR);
		}
	});
}

function Cala_usersLogMeInSuccess(data){
	keyStore(VAR_CURRENT_USER_NAME, data.resp.userName);
	keyStore(VAR_CURRENT_SESSION_KEY, data.resp.sessionKey);
	Calas_SESSION_KEY = data.resp.sessionKey;
}

/**
 * Retrieve account details
 */
function Cala_usersGetMyDetails(callMeSuccess, callMeError){

	Cala.say("Getting my details");

	$.ajax({
		type: 'GET',
		url: Cala_apiUrl + 'index.php',
		dataType: "json",
		data: {
			w: "users",
		r: "users_get_my_details",
		iam: Cala_IAM,
		sessionKey: Cala_SESSION_KEY
		},
		success: function (data) {
			callMeSuccess(data);
		},
		error: function (data){
			callMeError(ERROR_ERROR);
		}
	});

}

/**
 *  Get MY details, you need to be logged in in order for this to work
 */
function Tpl_usersGetMyDetails(){
	Cala.say("Getting my details");
	Cala_usersGetMyDetails(
			function(data){
				if(typeof data.resp == 'object'){
					Cala.say("Got user details, at least it looks like it :)");
					$("#myFullName").val(data.resp.fullName);
					$("#myUserName").val(data.resp.userName);
					$("#myEmail").val(data.resp.email);
					$("#myAccountAbout").val(data.resp.about);
				}
				else{
					Cala.say("Some error with the account details");
				}
			},
			function(){
				Cala.say("There was an error retrieving your information");
			});
}

/**
 *  Customize my account
 */
function Cala_usersSetEditAccount(){

	Cala.say("Customizing my account");

	//! @todo restore this
	//myAccountSetAvatar();

	// Retrieve and set the details in the account
	Tpl_usersGetMyDetails();

	// Avatar
	//! @todo restore this
	//wirez_uploadSomething("users", "users_avatar_upload", "#myAccountPersonalAvatarUploader", myAccountSetAvatar, myAccountSetAvatar);

	// Background
	//! @todo send to wirez
	//wirez_uploadSomething("users", "users_personal_bg_upload", "#myAccountPersonalBgUploader", tplSetCorrectBackground, tplSetCorrectBackground);

}

/**
 * Update my account
 */
function Cala_usersUpdateAccount(details){

	Cala.say("Updating the user account");

	$.ajax({
		type: 'POST',
		url: Cala_apiUrl,
		dataType: "json",
		data: {
			w: "users",
		r: "users_update_profile",
		iam: Cala_IAM,
		sessionKey: Cala_SESSION_KEY,
		fullName: details.requestData.fullName,
		userName: details.requestData.userName,
		email: details.requestData.email,
		about: details.requestData.about,
		country: details.requestData.country,
		pwd: details.requestData.pwd
		},
		success: function (data) {
			// Update the user name if that changed
				Cala_IAM = details.requestData.userName;
			keyStore(VAR_CURRENT_USER_NAME, details.requestData.userName);

			details.onSuccess(data);
		},
		error: function (data){
			details.onError(ERROR_ERROR);
		}
	});

}

/**
 *  Update my account
 */
function Tpl_usersUpdateAccount(){

	Cala.say("Updating the user account...");

	Cala_usersUpdateAccount({
		requestData: {
			fullName: $("#myFullName").val(),
		userName: $("#myUserName").val(),
		email: $("#myEmail").val(),
		about: $("#myAccountAbout").val(),
		pwd: $("#myAccountPwd").val()
		},
		onSuccess: function(data){
			if(data.resp == ERROR_NO_REQUEST_DONE){
				Tpl_msgWarning("Hubo un error actualizando sus datos, favor intente de nuevo más tarde");
				Cala.say("Something happened");
			}else if(data.resp == ERROR_USER_EXISTS){
				Tpl_msgWarning("Los datos ya existen, intente con otro correo electrónico o nombre de usuario");
			}
			else{
				Cala.say("Success updating profile");
				Tpl_msgWarning("Sus datos fueron actualizados satisfactoriamente");
				// Refresh this page
				iGoTo("?x=myAccount");
			}
		},
		onError: function(){
			Cala.say("Error updating profile")
				Tpl_msgWarning("Hubo un error actualizando sus datos, favor intente de nuevo más tarde");
		}
	});
	return false;
}

// Change the login info and put my name in it
function amILoggedIn(){

	Cala.say("Am I logged in?");

	// This should be changed to the actual name
	myName = keyGet(VAR_CURRENT_USER_NAME, "---");

	//wirez_requestData.iam = keyGet(VAR_CURRENT_USER_NAME, "");
	Cala_IAM = myName; //keyGet(VAR_CURRENT_USER_NAME, "");

	Cala_SESSION_KEY = keyGet(VAR_CURRENT_SESSION_KEY, "123");
	//wirez_requestData.sessionKey = keyGet(VAR_CURRENT_SESSION_KEY, "123");

	if(myName != "---"){
		Cala.say("Yes I am");
		$("#logMeIn").text("");

		$("#userMenuTitle").html(myName);

		newLink = ''
			+ '<li>'
			+ '<a href="?x=myAccount">'
			+ '<span class="glyphicon glyphicon-cog" aria-hidden="true"></span>'
			+ ' Configuración de la Cuenta</a></li>'
			+ '<li>'
			+ '<a href="#" onClick="return logMeOut();">'
			+ '<span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>'
			+ ' Salir</a></li>'
			+ '<li class="divider"></li>';

		$("#userMenu").prepend(newLink);
		// @todo move to wirez
		//messagesSetCheckThemOut();
	}
	else{
		Cala.say("No, I will have to go to the login page");
	}

	// Set a new background
	// This should be set by Wirez, not general Cala
	//tplSetCorrectBackground();

}

/**
 * TPL
 * I log people out
 */
function logMeOut(){

	wirez_userLogMeOut(
			function (){
				Cala.say("Successfully logged out");
				_logMeOutRmKeys();
			},
			function (){
				Cala.say("Error logging out with errors apparently");
				_logMeOutRmKeys();
			});

	return false;
}

/**
 * Remove keys after logout
 */
function _logMeOutRmKeys(){

	Tpl_msgSuccess("Hasta luego :)");

	keysGone = [VAR_CURRENT_USER_NAME, VAR_CURRENT_SESSION_KEY];

	// If I don't do it like this, it won't be able to remove them all
	for(i = 0; i < keysGone.length; i++){
		removeKey(keysGone[i]);
	}

	iGoTo('index.html');

}

// I log people in
function Tpl_logMeIn(){

	Cala.say("Logging in");

	Cala_usersLogMeIn({
		params: {
			userName: $("#myUserName").val(),
		pwd: $("#myPwd").val()
		},
		onSuccess: _logMeInSuccess,
		onError: _logMeInError
	});

	return false;
}

/**
 * @todo Check that I was actually able to login!
 */
function _logMeInSuccess(details){

	Cala.say("Able to login?");

	if(parseInt(details.resp.sessionKey) < 0){
		_logMeInError();
	}
	else{
		iGoTo($('#goToAfterLogin').val());
	}

	return false;

}

function _logMeInError(error){
	Cala.say("Error trying to login:" + error);
	Tpl_msgDanger("Los datos no son correctos");
}

// Register a new user
function Tpl_userRegister(){

	Cala.say("Register a new user");

	if($("#myPwdR").val() != $("#myPwdAgainR").val() || $("#myPwdR").val() == ""){
		Tpl_msgDanger("Las claves de acceso no coinciden");
		return false;
	}

	Cala_userRegister({
		options: {
			fullName: $("#myFullNameR").val(), 
		userName: $("#myUserNameR").val(),
		email: $("#myEmailR").val(),
		pwd: $("#myPwdR").val(),
		country: 'crc',
		about: ''},
		onSuccess: function(data){
			Cala.say("Success in registration request");
			if(data.resp == ERROR_USER_EXISTS){
				Tpl_msgDanger("Este usuario ya existe");
			}
			else if(data.resp != ERROR_BAD_REQUEST){
				_logMeInSuccess(data);
			}
			else{
				msgAlert("Sucedio un error, quizá hay campos pendientes");
			}
		},
		onError: function(){
			Cala.say("Error in registration request");
			Tpl_msgDanger("Sucedió un error, favor intentar nuevamente");	
		}
	});

	return false;

}

/*****************************************************************************/
// Custom pages
//
//////////////////////////////////////////////////////////////////////////////

// Customize directory
function customize_directory(){

	Cala_runMe.push(getPeopleList);

	// searching for someone?	
	like = "";

	if(params.like != undefined){
		like = "&like=" + params.like;
		$("#personLike").val(params.like);
	}

	// Go right
	if(params.ini == undefined || parseInt(params.ini) <= 0){
		Cala.say("No where to go back");
		$("#paginationGoBack").addClass("disabled");
		$("#paginationGoNextLink").attr('href', 'directory.html?ini=10');
	}
	else{
		$("#paginationGoBackLink").removeAttr('onclick');
		$("#paginationGoBackLink").attr('href', 'directory.html?ini=' + (parseInt(params.ini) - 10) + like);
		$("#paginationGoNextLink").attr('href', 'directory.html?ini=' + (parseInt(params.ini) + 10) + like);
	}

}

function directoryGoBack(){

	if($("#paginationGoBack").hasClass("disabled")){
		return false;
	}
	else{
		return directoryGo();
	}

}

// Each time a link is clicked I need to see if there is a search in progress
function directoryGo(){

	searching = $("#personLike").val();

	// Update links
	$("#paginationGoBackLink").attr('href', $("#paginationGoBackLink").attr('href') + "&like=" + searching);
	$("#paginationGoNextLink").attr('href', $("#paginationGoNextLink").attr('href') + "&like=" + searching);

	return true;

}

// Set the personal background on my account
function myAccountSetBackground(){
	tmpDate = new Date();
	Cala.say("Changing the background");
	$("body").attr("src", "img/loader_big.gif");
	$("#myAccountMyAvatar").attr("src", wirez_userGetAvatarPath(keyGet(VAR_CURRENT_USER_NAME, "---"), "250") + "&" + tmpDate.getTime());
}

// Set the avatar in the account page, this is for each user too see THEIR own avatar
function myAccountSetAvatar(){
	tmpDate = new Date();
	Cala.say("Changing the avatar");
	$("#myAccountMyAvatar").attr("src", "img/loader_big.gif");
	$("#myAccountMyAvatar").attr("src", wirez_userGetAvatarPath(keyGet(VAR_CURRENT_USER_NAME, "---"), "250") + "&" + tmpDate.getTime());
}

/****************************************************************************
/*!
 * Cala Framework Template System: To make your life preetier
 * version: 0.1.0-dev
 * @requires jQuery v1.5? or later (maybe other things too)
 *
 * Copyright (c) 2015 Twisted Head
 * License: MIT

 * Include this AT THE BOTTOM of your pages, that is all you need to do.

 *           | |      
 *   ___ __ _| | __ _ 
 *  / __/ _` | |/ _` |
 * | (_| (_| | | (_| |
 *  \___\__,_|_|\__,_|

 *****************************************************************************/                   

/*****************************************************************************/
//
// Messaging and alerts
//
//////////////////////////////////////////////////////////////////////////////

/**
 * Helper function to actually present messages to the user, you should never
 * call this directly
 */
function _Tpl_msgAlert(what, type){

	$("#Cala_alertMessages").html(''
			+ '<div class="alert alert-'+type+' alert-dismissible fade in" role="alert">'
			+ '<button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>'
			+ what
			+'</div>'
			);

}

//! Alert messages to the user
function Tpl_msgDanger(what){
	_Tpl_msgAlert(what, 'danger');
}

// Alert warning messages to the user
function Tpl_msgWarning(what){
	_Tpl_msgAlert(what, 'warning');
}

// Alert information messages to the user
function Tpl_msgInfo(what){
	_Tpl_msgAlert(what, 'info');
}

//! Success messages
function Tpl_msgSuccess(what){
	_Tpl_msgAlert(what, 'success');
}

/**
 * Alert stuff, not really very usefull to you, it is/will be used internally
 */
function _Tpl_alert(what){
	alert(what);
}

/*****************************************************************************/
//
// Other tools
//
//////////////////////////////////////////////////////////////////////////////

// Upload avatars
function wirez_uploadSomething(_w, _r, _id, _onSuccess, _onError){
	// I whished this was part of the core api, but I have not been able to make it work
	var wirez_settingsUploader = {
		url: Cala_apiUrl + "index.php",
		formData: {w: _w, r: _r, iam: Cala_IAM, sessionKey: Cala_SESSION_KEY},
		dragDrop: true,
		fileName: "fileToUpload",
		returnType:"json",
		onError: _onError,
		onSuccess: _onSuccess,
		showDelete: false
	}

	var wirez_uploadAvatarObj = $(_id).uploadFile(wirez_settingsUploader);
}

/**
 * Change the background for pages
 * @todo Move this into a plugin
 */
function tplBackgroundGenerateRandom(){
	Cala.say("Generating random background");
	return basePath + "img/bgs/bg_" + Math.floor((Math.random() * 10) + 1) + ".jpg";
}

// Helper function to handle the actual changing of the background
function _tplSetBodyBackgroundCorrectly(path){

	tmpDate = new Date();
	path = path + "&foolCache=" + tmpDate.getTime();
	$("body").css("background", "url(" + path + ") no-repeat center center fixed");
	$("body").css("background-size", "cover");

}

// I set the correct background depending on the page type
function tplSetCorrectBackground(){

	// Get a random background
	bg = tplBackgroundGenerateRandom();

	if($("body").hasClass("custom")){
		Cala.say("This page uses a custom background");
		// Request the user's background
		_tplSetBodyBackgroundCorrectly(wirez_userGetBackgroundPath(keyGet(VAR_CURRENT_USER_NAME, "---"), bg));	
	}
	else{
		_tplSetBodyBackgroundCorrectly(bg);
	}

}

// I parse a tpl and replace it with some values
function parseTpl(tpl, values, bl){
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

}

/*****************************************************************************/
//
// Tools
//
//////////////////////////////////////////////////////////////////////////////

/**
 * Set up the page, I will call any custom functions that you may have set up
 * to configure this page
 */
function pagesSetUp(){

	// Get the current page id
	pageId = "customize_" + $("body").attr("id");

	Cala.say("This page id is: " + $("body").attr("id"));

	// Customize if required
	if (window[pageId] !== undefined) {
		window[pageId]();
	}
	else{
		Cala.say("No customization required");
	}

}

// Parse a date from a UTC timestamp
// Read more https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Text_formatting
function dateParse(timestamp){

	//var utcSeconds = 1234567890;
	var d = new Date(0);
	d.setUTCSeconds(timestamp);
	timestamp = d.toString();

	return timestamp;

}

// I will redirect somewhere
function iGoTo(goTo){
	Cala.say("Going to: " + basePath + goTo);
	window.location.href = goTo;
}

// http://phpjs.org/functions/strpos/
function strpos(haystack, needle, offset) {
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
}

// Parse url parameters
// http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
function getUrlVars(){
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
		Cala.say("Found param: " + hash[0] + hash[1]);
	}
	return vars;
}

// If all that you need is the PATH to get the background, use this one
function wirez_userGetBackgroundPath(_userName, fallBack){
	return (Cala_apiUrl + "index.php?w=users&r=users_personal_bg_get&reply_type=plain&userName="+_userName+"&fallBack="+fallBack);
}

// Gets the correct path for a user avatar
function wirez_userGetAvatarPath(wire, size){
	return Cala_apiUrl + "index.php?w=users&r=users_avatar_get&userName=" + wire + "&size=" + size;
}


