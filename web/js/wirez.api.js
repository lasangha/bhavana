/*!
 * Wirez Comunication System
 * version: 0.1.2-dev
 * @requires jQuery v1.5? or later (maybe other things too)
 *
 * This code depends on the PHP Api that should be located in the server, other
 * Apis may exist in the future too.
 * In that API you can read the standard used too, I may write a separate file
 * with those details, but there you should be able to find all the required
 * information in order to either create your own implementations, or to work 
 * with it.
 *
 * Copyright (c) 2015 Twisted Head
 * License: MIT

This will be the js api for wirez, some day...

Confession:
I don't like javascript, I have tried to, but I just don't!
I know very little about it and it is always a lot of trouble to work with it.

I tried to make it more object oriented and I know there is a really bad
reuse of code here, but javascript has got me on my knees, I only hope
that the code runs and that it does not give much problems!

I know there are much better ways to do almost EVERYTHING in here, but so far, this should do! :)

Any help, much appreciated :)

//end of confession :)

 */

/*****************************************************************************/
//
// Variables and settings
//
//////////////////////////////////////////////////////////////////////////////

// Version number
var wirez_version = "0.1.2-dev";

/**
 * Locate this in your pages:

// From Here 

		<script>
			//var apiUrl = 'http://localhost/wirez';
		</script>

// To Here
*/

/**
 * ERROR/RESPONSE MESSAGES
 */
var ERROR_ERROR = -1;

// Read the PHP Api for details on each one of this
var ERROR_MSGS_NOTHING_FOUND    = "-100";
var ERROR_DB_NO_RESULTS_FOUND   = "-200";
var ERROR_NO_REQUEST_DONE       = "-10";

var SUCCESS_ALL_GOOD            = "1";
var ERROR_BAD_REQUEST           = "-1";

var SUCCESS_USER_BG_EXISTS      = "301";
var ERROR_NO_VALID_USER         = "-300";
var ERROR_USER_WRONG_LOGIN_INFO = "-301";
var ERROR_USER_NO_VALID_SESSION = "-302";
var ERROR_USER_EXISTS           = "-303";

var _IAM         = "Tux";
var _SESSION_KEY = "123";

/*****************************************************************************/
//
// Basic Tools
//
//////////////////////////////////////////////////////////////////////////////

/**
 * Request process, this is an ajax request, it can be GET or POST
 */
var wirez_requestsOptions = {
	type: 'GET',
	url: apiUrl + 'index.php',
	dataType: "json",
	onSuccess: function(data){d("Default error on ajax call")},
	onError: function(data){d("Default error on ajax call")}
};

// Basic request data
var wirez_requestData = {
	w: "core",
	r: "core_test_call",
	iam: _IAM,
	sessionKey: _SESSION_KEY
};

// I make the actual request, via jQuery
// @todo what are options for?
function wirez_requests(options){

	d("Making request: " + wirez_requestData.what);

	// Merge the options
	if(options.options !== undefined){
		d("Changing options...");
		for(option in options.options){
			wirez_requestsOptions[option] = options.options[option];
		}
	}

	// Merge the request data
	if(options.requestData !== undefined){
		d("Changing data...");
		for(requestData in options.requestData){
			wirez_requestData[requestData] = options.requestData[requestData];
		}
	}

	_onSuccess = wirez_requestsOptions.onSuccess;
	_onError = wirez_requestsOptions.onError;

	wirez_requestsOptions.onSuccess = undefined;
	wirez_requestsOptions.onError = undefined;

	$.ajax({
		type: wirez_requestsOptions.type,
		url: wirez_requestsOptions.url,
		dataType: wirez_requestsOptions.dataType,
		data: wirez_requestData,
		success: _onSuccess,
		error: _onError
	});

}

/**
 *  Debugging, sort of
 * If you don't want me to be printing all sorts of things just comment the line in this function
 */
function d(what){
	console.log("w: " + what);
}

/*****************************************************************************/
//
// Messaging System
//
//////////////////////////////////////////////////////////////////////////////

/**
  I send messages, they should be located in the form
  I should get back the id of the conversation in which we are talking, or
  a new conversation id if that is the case
 */
function wirez_sendMsg(_from, _to, theText, _idConversation, subjectIs, callMeSuccess, callMeError){

	d("Sending message from the api");

	var msg = ERROR_ERROR;

	$.ajax({
		type: 'POST',
		url: apiUrl + 'index.php',
		dataType: "json",
		data: {
			w: "wirez",
			r: "messages_send",
			from: _from,
			to: _to,
			text: JSON.stringify(theText),
			idConversation: _idConversation,
			subject: subjectIs,
			iam: _IAM,
			sessionKey: _SESSION_KEY
		},
		success: function (data) {
			d("I got a response: " + data);
			details = {idConversation: data.resp, recipientWire: _to}
			callMeSuccess(details);
		},
		error: function(data){
			d("Something went wrong");
			callMeError(ERROR_ERROR);
		}
	});

}

/**
  I get the details about a conversation
 */
function wirez_getConvDetails(_idConversation, callMeSuccess, callMeError){

	d("Getting details about a conversation");

	var msg = ERROR_ERROR;

	$.ajax({
		type: 'GET',
		url: apiUrl + 'index.php',
		dataType: "json",
		data: {
			w: "wirez",
			r: "conversations_get_details",
			idConversation: _idConversation,
			iam: _IAM,
			sessionKey: _SESSION_KEY
		},
		success: function (data) {
			d("I got a response: " + data);
			callMeSuccess(data);
		},
		error: function(data){
			d("Something went wrong");
			callMeError(ERROR_ERROR);
		}
	});

}

// Retrieve messages in a conversation
function wirez_getMessagesInConversation(params, callMeSuccess, callMeError){

	d("Retrieving messages for a conversation");

	$.ajax({
		type: 'GET',
		url: apiUrl + 'index.php',
		dataType: "json",
		data: {
			w: "wirez",
			r: "messages_get_in_conversation",
			iam: _IAM,
			sessionKey: _SESSION_KEY,
			lastMsgId: params.lastMsgId,
			idConversation: params.idConversation,
			withWire: params.withWire,
			textLike: params.textLike
		},
		success: function (data) {
			callMeSuccess(data);
		},
		error: function (data){
			callMeError(ERROR_ERROR);
		}
	});

}

// Retrieve recent messages for a person
// @todo I don't think this function requires _withWire
function wirez_getRecentMessages(_withWire, _lastMessageId, callMeSuccess, callMeError){

	d("Retrieving recent messages");

	$.ajax({
		type: 'GET',
		url: apiUrl + 'index.php',
		dataType: "json",
		data: {
			r: "messages_get_recent",
			w: "wirez",
			iam: _IAM,
			sessionKey: _SESSION_KEY,
			lastMessageId: _lastMessageId,
			withWire: _withWire
		},
		success: function (data) {
			callMeSuccess(data);
		},
		error: function (data){
			callMeError(ERROR_ERROR);
		}
	});

}

/*****************************************************************************/
//
// User management, People, Contancts
//
//////////////////////////////////////////////////////////////////////////////

/**
  I get a list of people in the directory
 */
function wirez_getPeopleList(name, initHere, callMeSuccess, callMeError){

	d("Retrieving a list of contacts");

	$.ajax({
		type: 'GET',
		url: apiUrl + 'index.php',
		dataType: "json",
		data: {
			r: "users_get_list",
			w: "users",
		like:  name,
		ini: initHere,
		iam: _IAM,
		sessionKey: _SESSION_KEY
		},
		success: function (data) {
			callMeSuccess(data);
		},
		error: function(data){
			callMeError(ERROR_ERROR);
		}
	});

}


// Update profile
function wirez_userUpdateProfile1(options){

	d("Updating profile");

	wirez_requestData.r = "users_update_profile";
	wirez_requestData.w = "users";
	wirez_requestsOptions.type = "POST";

	// Things I need to send
	options.about = JSON.stringify(options.about);
	wirez_requests(options);
}

// Get the custom background for someone
// This is used to check if it exists
// If the background does not exist, I will use a custom one in-house
// I can change this so that if the background does not exist, I will present one by
// default, set by the request
function wirez_userGetBackground(options){

	d("Getting background for someone");

	wirez_requestData.r = "users_personal_bg_get";
	wirez_requestData.w = "users";

	wirez_requests(options);

}

// If all that you need is the PATH to get the background, use this one
function wirez_userGetBackgroundPath(_userName, fallBack){
	return (apiUrl + "index.php?w=users&r=users_personal_bg_get&reply_type=plain&userName="+_userName+"&fallBack="+fallBack);
}

// Gets the correct path for a user avatar
function wirez_userGetAvatarPath(wire, size){
	return apiUrl + "index.php?w=users&r=users_avatar_get&userName=" + wire + "&size=" + size;
}

// Log users in
// @deprecated?
function wirez_userLogMeIn(_iam, _pwd, callMeSuccess, callMeError){

	d("Loging in");

	$.ajax({
		type: 'GET',
		url: apiUrl + 'index.php',
		dataType: "json",
		data: {
			w: "users",
			r: "users_log_me_in",
		iam: _iam,
		pwd: _pwd
		},
		success: function (data) {
			// @todo this should not be done here, all required information should be returned from the PHP Api
			details = {sessionKey: data.resp, userName: _iam}
			callMeSuccess(details);
		},
		error: function (data){
			callMeError(ERROR_ERROR);
		}
	});

}

// Log users out
function wirez_userLogMeOut(callMeSuccess, callMeError){

	d("Log out");

	$.ajax({
		type: 'GET',
		url: apiUrl + 'index.php',
		dataType: "json",
		data: {
			r: "users_log_me_out",
			w: "users",
			iam: _IAM,
			sessionKey: _SESSION_KEY
		},
		success: function (data) {
			callMeSuccess(data);
		},
		error: function (data){
			callMeError(ERROR_ERROR);
		}
	});

}

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// end: User management
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

