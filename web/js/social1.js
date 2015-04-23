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
var Cala = Cala || {};

// Some variables
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
				say("Found param with value" + params[which]);
				return params[which];
			}
			else{
				say("No custom path");
				return def;
			}	
		},
		runOnReady: function(runMe){
			$(document).ready(runMe);
		},

		// Not in use at the moment
		// Get the correct page for this path
		loadThisPath: function(){
			say("Loading the current path??");
			say(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + params.x);
			path = Cala_tplPath + Cala.paramsGet('x', 'index');
			console.log("=////////////////////////////////This path is" + path);	
			$("#mainContent").load(path + ".html");

		}

	}

}();

// Register a new account
function Cala_userRegister(params){

	say("Register account");

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
				say("Seems like it worked");
				Cala_usersLogMeInSuccess(data);
			}else{
				say("Something wrong happened");
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

/*****************************************************************************/
/*!
 * Social 1: Implementation for Wirez
 * Part ofWirez Comunication System
 * version: 0.1.2-dev
 * @requieres Wirez v0.1.2 or later
 * @requires jQuery v1.5? or later (maybe other things too)
 *
 * Copyright (c) 2015 Twisted Head
 * License: MIT
 */

/**
 * Include this AT THE BOTTOM of your pages, that is all you need to do.

 <script>whereAmI();</script>

*/

/*****************************************************************************/
//
// Boot stuff
//
//////////////////////////////////////////////////////////////////////////////

// Version
var version = "0.1.2-dev";

//Some needed stuff

// Some other constants
//! @todo move in Cala_x
var VAR_CURRENT_USER_NAME  = "userWirez";
var VAR_CURRENT_SESSION_KEY = "currentSessionKey";

// Parameters sent via url
var params = false;

/**
 * Run stuff during boot up, if you want me to run stuff, let me know
 * @todo rename to Cala_runme or Cala.runme
 */
var runMe = [amILoggedIn, Cala.loadThisPath, pagesSetUp];

/**
 * Say stuff, this is a very minimal debugging functionality
 * @todo rename to Cala.say
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

	say("Booting up the car!");

	// Get the params
	params = getUrlVars();
	//Cala.loadParams();

	if(onApp){
		say("Running on an app...");
	}
	else{
		say("Running on a stand alone...");
	}

	// Run things that people want me to run
	for(i = 0; i < runMe.length; i++){
		say("running...");
		justRunThis(runMe[i]);
	}

}

function justRunThis(what){
	what();
}
/**
 * This is what you should call from your pages, call it at the bottom
 */
function whereAmI(){

	//! This will be usefull when running on an app, but it will not go here I just
	//! don't want to touch it because I might loose it
	if(onApp == true){
		say("I am on an app");

		$.getScript( "cordova.js", function( data, textStatus, jqxhr ) {
			document.addEventListener("deviceready", initMe, false);
			say(data); // Data returned
			say(textStatus); // Success
			say(jqxhr.status); // 200
			say("Load was performed.");
		});

	}else{
		say("I am on a computer");
		$(document).ready(initMe);
	}
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

	say("This page id is: " + $("body").attr("id"));

	// Customize if required
	if (window[pageId] !== undefined) {
		window[pageId]();
	}
	else{
		say("No customization required");
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
	say("Going to: " + basePath + goTo);
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
		say("Found param: " + hash[0] + hash[1]);
	}
	return vars;
}

/*****************************************************************************/
//
// Template and messaging
//
//////////////////////////////////////////////////////////////////////////////

/**
 * Change the background for pages
 * @todo Move this into a plugin
 */
function tplBackgroundGenerateRandom(){
	say("Generating random background");
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
		say("This page uses a custom background");
		// Request the user's background
		_tplSetBodyBackgroundCorrectly(wirez_userGetBackgroundPath(keyGet(VAR_CURRENT_USER_NAME, "---"), bg));	
	}
	else{
		_tplSetBodyBackgroundCorrectly(bg);
	}

}

// If there is no conversation I will handle the error
// @todo I should really handle this things better
// @todo Move to wirez
function _setConvDetailsError(details){
	say("No Conversation, or some error");
	iGoTo("directory.html");
}

// Helper function to set the details about the conversation in the form
function _setConvDetailsSuccess(response){

	details = response.resp;

	say("Setting the conversation details" + messagesFixTitle(details.subject));
	// Restore the subject title, if it was hidden
	$("#subjectTitle").show();
	$("#toWire").hide();
	$("#subject").hide();
	$("#subjectTitle").html("(" + details.recipientWire + ") " + details.subject);
	$("#conversationMessageTitle").html("(" + details.recipientWire + ") " + messagesFixTitle(details.subject));
	$("#idConversation").val(details.idConversation);

	// Set the background, I will put the background from the other party
	say("Changing the background of this conversation");

	if(keyGet(VAR_CURRENT_USER_NAME, "---") == details.recipientWire){
		say("I am the eggman");
		$("#toWire").val(details.senderWire);
		_tplRequestNewBackground(details.senderWire);
	}
	else{
		say("coo coo cu chu" + details.recipientWire);
		$("#toWire").val(details.recipientWire);
		_tplRequestNewBackground(details.recipientWire);
	}

	getMsgsInConversation();

}

// Change values to start a new conversation, this must be set before goint to the page
// @deprecated?
function startNewConversation(recipient){
	say("Starting a new conversation");
	gotoConversation("0", recipient);
}

// Add html break lines to the text
function textAddBreakLines(text){
	var theKey = "\n";
	var re = new RegExp(theKey, "g");
	text = text.replace(re, "<br />");
	return text;
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

/***************************************************************************
 *
 * Local storage
 *
 */

//! Store keys in local storage
function keyStore(key, value){
	say("Storing key: " + key);
	window.localStorage.setItem(key, value);
	return true;
}

//! Get key from local storage
function keyGet(key, defaultValue){
	var value = window.localStorage.getItem(key);
	if(value == null){
		say("No value found, I will use the default");
		value = defaultValue;
	}
	say("Gotten Key: " + key + " with value: " + value);
	return value;
}

//! Remove key from local storage
function removeKey(theKey){

	say("Removing key: " + theKey);
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

	say("Retrieving a list of contacts");

	wirez_getPeopleList($("#personLike").val(), params.ini != undefined ? params.ini : 0, _getPeopleListSuccess, _getPeopleListError);

	return false;

}

// Helper function to create the people list
function _getPeopleListSuccess(data){

	say("Found people apparently");

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
			say("Setting contact...");
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

	say("Error getting a list of people");

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

	d("Loging in");

	$.ajax({
		type: 'GET',
		url: apiUrl + 'index.php',
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

	say("Getting my details");

	$.ajax({
		type: 'GET',
		url: apiUrl + 'index.php',
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
	say("Getting my details");
	Cala_usersGetMyDetails(
			function(data){
				if(typeof data.resp == 'object'){
					say("Got user details, at least it looks like it :)");
					$("#myFullName").val(data.resp.fullName);
					$("#myUserName").val(data.resp.userName);
					$("#myEmail").val(data.resp.email);
					$("#myAccountAbout").val(data.resp.about);
				}
				else{
					say("Some error with the account details");
				}
			},
			function(){
				say("There was an error retrieving your information");
			});
}

/**
 *  Customize my account
 */
function Cala_usersSetEditAccount(){

	say("Customizing my account");

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

	say("Updating the user account");

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
	say("Updating the user account...");
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
				say("Something happened");
			}
			else{
				say("Success updating profile");
				// Change the IAM just in case
				Cala_IAM = $("#myUserName").val();
				keyStore(VAR_CURRENT_USER_NAME, $("#myUserName").val());
				Tpl_msgWarning("Sus datos fueron actualizados satisfactoriamente");
				iGoTo("?x=myAccount");
			}
		},
		onError: function(){
			say("Error updating profile")
				Tpl_msgWarning("Hubo un error actualizando sus datos, favor intente de nuevo más tarde");
		}
	});
	return false;
}

// Change the login info and put my name in it
function amILoggedIn(){

	say("Am I logged in?");

	// This should be changed to the actual name
	myName = keyGet(VAR_CURRENT_USER_NAME, "---");

	wirez_requestData.iam = keyGet(VAR_CURRENT_USER_NAME, "");
	Cala_IAM         = keyGet(VAR_CURRENT_USER_NAME, "");

	Cala_SESSION_KEY = keyGet(VAR_CURRENT_SESSION_KEY, "123");
	wirez_requestData.sessionKey = keyGet(VAR_CURRENT_SESSION_KEY, "123");

	if(keyGet(VAR_CURRENT_USER_NAME, "---") != "---"){
		say("Yes I am");
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
		say("No, I will have to go to the login page");
	}

	// Set a new background
	// This should be set by Wirez, not general Cala
	//tplSetCorrectBackground();

}

// I log people out
function logMeOut(){

	wirez_userLogMeOut(_logMeOutSuccess, _logMeOutError);
	return false;
}

function _logMeOutRmKeys(){

	Tpl_msgSuccess("Good bye :)");

	keysGone = [VAR_CURRENT_USER_NAME, VAR_CURRENT_SESSION_KEY];

	for(i = 0; i < keysGone.length; i++){
		removeKey(keysGone[i]);
	}

	iGoTo(Cala_goOnOut);

}

function _logMeOutSuccess(){
	say("Successfully logged out");
	_logMeOutRmKeys();
}

function _logMeOutError(){
	say("Error logging out with errors apparently");
	_logMeOutRmKeys();
}

// I log people in
function Tpl_logMeIn(){

	say("Logging in");

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

	say("Able to login?");

	if(parseInt(details.resp.sessionKey) < 0){
		_logMeInError();
	}
	else{
		//! @todo This should be done by the Cala api
		iGoTo($('#goToAfterLogin').val());
	}
}

function _logMeInError(error){
	say("Error trying to login:" + error);
	Tpl_msgDanger("Los datos no son correctos");
}

// Register a new user
function Tpl_userRegister(){

	say("Register a new user");

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
			say("Success in registration request");
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
			say("Error in registration request");
			Tpl_msgDanger("Sucedió un error, favor intentar nuevamente");	
		}
	});

	return false;

}

/*****************************************************************************/
//
// Messaging and conversations
// @todo move all this to wirez
//
//////////////////////////////////////////////////////////////////////////////

// Send messages from the form
function sendMsg(){

	say("Sending message");

	wirez_sendMsg(
			keyGet(VAR_CURRENT_USER_NAME, "---"),
			$('#toWire').val(),
			$('#mainTextMessages').val(),
			$('#idConversation').val(),
			$("#subject").val(),
			_sendMsgSuccess,
			_sendMsgError);

	return false;
}

// Helper function to send messages, once they have been sent
function _sendMsgSuccess(data){

	say("Conversation ID: " + data.idConversation);

	if(params['startNew'] == 'true'){
		iGoTo("conversation.html?withWire=" + data.recipientWire + "&idConversation=" + data.idConversation);
	}else{
		$("#mainTextMessages").val("");
		$("#mainTextMessages").focus();
		getMsgsInConversation();
	}

}

// Errors while sending messages
function _sendMsgError(){
	say("There was an error while sending a message");
}

// Gets a list of recent conversations with pending or new messages, this is for the general view 
function getRecentMessages(){

	// Are you looking for someone in specific?
	params = getUrlVars();

	say("Messages with:" + params.withWire);

	if(params.withWire != undefined){
		withWire = params.withWire;
	}else{
		withWire = "";
	}

	wirez_getRecentMessages(withWire, 0, _getRecentMessagesParse, _getRecentMessagesError);

}

// Parse the list of new messages
function _getRecentMessagesParse(data){

	if(data.resp == ERROR_MSGS_NOTHING_FOUND || data.rep == ERROR_DB_NO_RESULTS_FOUND){
		_getRecentMessagesError();
	}else{

		say("Got new messages, I will parse them");

		var tpl = ''
			+ '<a href="conversation.html?idConversation={idConversation}&withWire={withWhom}">'
			+ '<div class="panel panel-success">'
			+ '<div class="panel-heading"><h1 class="panel-title">{subject}</h1></div>'
			+ '<div class="panel-body"><div class="well">{text}</div>'
			+ ' <span class="senderName label label-info">{senderName}</span> >> <span class="label label-success recieverName">{recipientName}</span>'
			+ '  @ <span class="label label-default msgTime">{parsedDate}</span>'

			+ '</div></div></a>';

		// Clear the list first
		$("#latestMessages").empty();

		for(var conversation in data.resp.msgs) {
			console.log("s-ssssssssssssssssssssssssssssssssssssssssssssssssssssss");
			$("#msgsListingNoMessagesFoundWrapper").html("");
			var thisConversation = data.resp.msgs[conversation];
			thisConversation['withWhom'] = thisConversation.recipientWire == keyGet(VAR_CURRENT_USER_NAME, "---")
				? thisConversation.senderWire
				: thisConversation.recipientWire;
			thisConversation['subject'] = messagesFixTitle(thisConversation['subject']);
			thisConversation['parsedDate'] = dateParse(thisConversation['timestamp']);
			$("#latestMessages").append(parseTpl(tpl, thisConversation, true));
		}
	}

}

/**
 * There was an error with the recent messages
 *  @todo I should be able to handle this better
 */
function _getRecentMessagesError(){

	say("Error with the messages");

	$("#msgsListingNoMsgsFoundImage").attr('src', 'img/noMessagesFound.png');

	params = getUrlVars();

	$("#msgsListingNoMessagesFoundTitle").html("No Messages Found :(");

	if(params.withWire != undefined){
		$("#msgsListingNoMsgsFoundImage").attr("src", wirez_userGetAvatarPath(params.withWire, "250"));
		$("#msgsListingNoMsgsFoundImgLink").attr("href", "conversation.html?withWire=" + params.withWire + "&idConversation=0&startNew=true");
		$("#msgsListingNoMsgsFoundLink").attr("href",  "conversation.html?withWire=" + params.withWire + "&idConversation=0&startNew=true");
		$("#msgsListingNoMsgsFoundLink").html("Talk to them...");
	}
	else{

	}
}

/**
 * Go back in the conversations history
 */
function conversationGoBack(){

	say("Going back in time with the messages");

	if($("#paginationGoBack").hasClass("disabled")){
		return false;
	}
	else{
		//return conversationGo();
	}
	return false;

}

/**
 * Each time a link is clicked I need to see if there is a search in progress
 */
function conversationGo(){

	// Update links
	$("#paginationGoBackLink").attr('href', $("#paginationGoBackLink").attr('href') + "&like=" + searching);
	$("#paginationGoNextLink").attr('href', $("#paginationGoNextLink").attr('href') + "&like=" + searching);

	return true;

}

/**
 * I get messages in the conversation
 */
function getMsgsInConversation(){
	wirez_getMessagesInConversation(
			{
				idConversation: $("#idConversation").val(),
	lastMsgId: $("#lastMsgId").val(),
	withWire: $("#toWire").val()
			},
			_getMgsInConversationSuccess,
			_getRecentMessagesError);
}

/**
 * Helper function to display the messages in a conversation
 */
function _getMgsInConversationSuccess(data){

	if(data.resp == ERROR_MSGS_NOTHING_FOUND){
		_getMgsInConversationError();
	}else{

		say("Formating messages");

		$("#messagesInConversationSearching").html("");

		var tpl = '<li class="list-group-item messagesInConversationEach" id="msgId-{idMsg}">'
			+ '<input type="hidden" value="{idMsg}" class="messagesInConversationId">'
			+ '<div class="well messagesInConversationTextEach">'
			+ '<div class="thumbnail messagesInConversationSenderAvatar">'
			+ '<img src="{senderAvatar}" class="messagesInConversationSenderAvatarImage avatar-{senderWire}">'
			+ '</div>'
			+ '<div class="thumbnail messagesInConversationRecipientAvatar">'
			+ '<img src="{recipientAvatar}" class="messagesInConversationRecipientAvatarImage avatar-{recipientWire}">'
			+ '</div>'
			+ '<div class="messagesInConversationHeaderEach">'
			+ ' <span class="label label-default msgTime">@{date}</span>'
			+ '</div>'
			+ '<div class="messagesInConversationTextEachOne">{text}</div>'
			+ '	</div>'
			+ ''
			+ '</li>';

		var ulMsgs = "";

		$("#lastMsgId").val(data.resp.lastMsgId);

		var msgs = data.resp.msgs;

		thisUserWire = keyGet(VAR_CURRENT_USER_NAME, "--");

		for(var prop in msgs) {
			var thisMsg = msgs[prop];
			say("Getting message");

			// Conversation subject
			var subject = '';
			thisMsg.subject = messagesFixTitle(thisMsg.subject);

			thisMsg.date = dateParse(thisMsg.msgTime);

			if(thisUserWire == thisMsg.senderWire){
				thisMsg.senderWire
			}

			thisMsg.senderAvatar = wirez_userGetAvatarPath(thisMsg.senderWire, 50);
			thisMsg.recipientAvatar = wirez_userGetAvatarPath(thisMsg.recipientWire, 50);

			$("#allMessagesInConversation").append(parseTpl(tpl, thisMsg, true));
			window.scrollTo(0, document.body.scrollHeight);
		}
	}
}

/**
 * 'Fix' titles in conversations or messages
 */
function messagesFixTitle(subject){
	if(subject == null || subject == "" || subject == undefined){
		return 'Just chatting';
	}
	else{
		return subject;
	}

}

/**
 * Errors in messages in conversations
 */
function _getMgsInConversationError(){

	say("Error with the messages or no messages at all");

	$("#messagesInConversationNotFoundImage").attr('src', 'img/noMessagesFound.png');
	$("#messagesInConversationDetailsTitle").hide();

}

/**
 * Am I already checking for messages?
 */
var messagesCheckingForNew = false;

// Set the timer to check for new messages
function messagesSetCheckThemOut(){

	// If I have no idea what the last read message is, I will assume 0
	if(keyGet(VAR_LAST_MSG_ID, -1) == -1){
		keyStore(VAR_LAST_MSG_ID, 0);
	}

	say("Checking for new messages every: " + (parseInt(checkNewMessagesEvery) * 1000));

	// Call and set the interval
	_messagesCheckNewTopBar();

	setInterval(_messagesCheckNewTopBar, (parseInt(checkNewMessagesEvery) * 1000));

}

// Check for new messages and place a warning in the top bar
function _messagesCheckNewTopBar(){

	if(messagesCheckingForNew == false){
		say("Let's see if there are any new messages");
		messagesCheckingForNew = true;
		wirez_getRecentMessages("", keyGet(VAR_LAST_MSG_ID, 0),  _messagesCheckNewTopBarSuccess, _messagesCheckNewTopBarError);
	}
	else{
		say("I am already checking for new messages");
	}
}

// Create a standard subject for messages if none was given
function messagesCreateSubject(conversation){

	if(conversation.subject == ""){
		conversation.subject = "Just chatting";
	}

	return conversation;
}

// If there are new messages, I will put them in the top bar
function _messagesCheckNewTopBarSuccess(data){

	say("Got information about new messages");

	tpl = '<li>'
		+ '<a href="conversation.html?withWire={wire}&idConversation={idConversation}|{idMsg}">'
		+ '<div id="topNavBarMessagesContainer" class="topNavBarMessagesContainer">'
		+ '<img src="{avatar}" class="topNavBarMessagesAvatar">'
		+ '<div class="topNavBarMessagesSubject">{subject}</div>'
		+ '<div class="topNavBarMessagesText">{text}</div>'
		+ '<small class="topNavBarMessagesSenderName">{senderName}</small>'
		+ '</div>'
		+ '</a>'
		+ '</li>';

	if(data.resp.totalMessages > 0){

		say("Found new pending messages");

		$("#messagesRecentTopNavBarTotalNewFound").text(data.resp.totalMessages);

		$("#messagesRecentTopNavBarListing").empty();

		for(var prop in data.resp.msgs) {

			say("Getting message");

			var thisMsg = data.resp.msgs[prop];

			// Conversation subject
			thisMsg = messagesCreateSubject(thisMsg);
			thisMsg.avatar = wirez_userGetAvatarPath(thisMsg.senderAvatar, '25');
			thisMsg.text = thisMsg.text.substring(0, 25);
			thisMsg.subject = messagesFixTitle(thisMsg.subject).substring(0, 20);
			$("#messagesRecentTopNavBarListing").append(parseTpl(tpl, thisMsg, true));
		}

	}else{
		say("No new messages apparently");
	}

	messagesCheckingForNew = false;

}

// If there are new messages, I will put them in the top bar
function _messagesCheckNewTopBarError(data){
	say("There was an error trying to get new messages");
	messagesCheckingForNew = false;
}


/*****************************************************************************/
// Custom pages
//
//////////////////////////////////////////////////////////////////////////////

/**
 * Customize conversations
 */
function customize_conversation(){
	say("I am a conversation");
	runMe.push(setPageForConversations);

	// Pagination
	// Go right
	if(params.ini == undefined || parseInt(params.ini) <= 0){
		say("No where to go back");
		$("#paginationGoBack").addClass("disabled");
		$("#paginationGoNextLink").attr('href', 'directory.html?ini=10');
	}
	else{
		$("#paginationGoBackLink").removeAttr('onclick');
		$("#paginationGoBackLink").attr('href', 'directory.html?ini=' + (parseInt(params.ini) - 10) + like);
		$("#paginationGoNextLink").attr('href', 'directory.html?ini=' + (parseInt(params.ini) + 10) + like);
	}
}

// Customize directory
function customize_directory(){

	runMe.push(getPeopleList);

	// searching for someone?	
	like = "";

	if(params.like != undefined){
		like = "&like=" + params.like;
		$("#personLike").val(params.like);
	}

	// Go right
	if(params.ini == undefined || parseInt(params.ini) <= 0){
		say("No where to go back");
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
	say("Changing the background");
	$("body").attr("src", "img/loader_big.gif");
	$("#myAccountMyAvatar").attr("src", wirez_userGetAvatarPath(keyGet(VAR_CURRENT_USER_NAME, "---"), "250") + "&" + tmpDate.getTime());
}

// Set the avatar in the account page, this is for each user too see THEIR own avatar
function myAccountSetAvatar(){
	tmpDate = new Date();
	say("Changing the avatar");
	$("#myAccountMyAvatar").attr("src", "img/loader_big.gif");
	$("#myAccountMyAvatar").attr("src", wirez_userGetAvatarPath(keyGet(VAR_CURRENT_USER_NAME, "---"), "250") + "&" + tmpDate.getTime());
}

/**
 * Customize pages for conversations
 * @ todo leave if idConversation == 0 and withWire == undefined
 */
function setPageForConversations(){

	// Do you know who you will be talking to?
	if(params['withWire'] == undefined || params['idConversation'] == undefined){
		iGoTo("directory.html");
	}

	$("#toWire").val(params['withWire']);

	// Is this a new conversation
	if(params['idConversation'] == 0){
		say("This is the general conversation");
		// Unless you want to start a new conversation, I will start fresh
		if(params['startNew'] == undefined){
			_setConvDetailsSuccess({
				resp:{
					recipientWire: params['withWire'],
				subject: messagesFixTitle(""),
				idConversation: 0,
				senderWire: keyGet(VAR_CURRENT_USER_NAME, "--")
				}
			});
		}
		else{
			_getMgsInConversationError();
		}
	}
	else{
		say("This is an old conversation");
		// Hide the subject input in the form
		$("#subject").hide();
		// Get the details about the conversation
		wirez_getConvDetails(params['idConversation'], _setConvDetailsSuccess, _setConvDetailsError);
	}

	$("#toWire").val(params['withWire']);

	$("#mainTextMessages").focus();

	$('#mainTextMessages').keypress(function(e){
		console.log(e.which);
		if(e.which == 13){
			if(e.shiftKey){
				return true;
			}else{
				console.log("going to send this thing!");
				sendMsg();
				return false;
			}
		}
		console.log("going to send this thing! not");
	});

}

/*****************************************************************************/
//
// Other tools
//
//////////////////////////////////////////////////////////////////////////////

// Upload avatars
function wirez_uploadSomething(_w, _r, _id, _onSuccess, _onError){
	// I whished this used the internal api, but I have not been able to make it work
	var wirez_settingsUploader = {
		url: apiUrl + "index.php",
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

