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
// Boot stuff
//
//////////////////////////////////////////////////////////////////////////////

// Version
var version = "0.1.2-dev";

//Some needed stuff

// Which is the current conversation
var VAR_CURRENT_CONVERSATION_ID              = "currentConversationId"; // Deprecated
var VAR_CURRENT_CONVERSATION_RECIEVER_ID     = "currentConversationRecieverId"; //Deprecated
var VAR_CURRENT_CONVERSATION_RECIPIENT_WIREZ = "currentConversationRecipientWirez"; // Deprecated

// Some other constants
var VAR_CURRENT_USER_NAME  = "userWirez";
var VAR_CURRENT_SESSION_KEY = "currentSessionKey";

// Last message read
// @deprecated ??
var VAR_LAST_MSG_ID = "lastMsgId";

// Parameters sent via url
var params = false;

// When you click to see a conversation, this should be set
// If the idConversation is 0, this is a new conversation
// @deprecated
function gotoConversation(idConversation, recipient){
	say("Going to see a conversation");
	keyStore(VAR_CURRENT_CONVERSATION_ID, idConversation);
	keyStore(VAR_CURRENT_CONVERSATION_RECIPIENT_WIREZ, recipient);
	return true;
}

/**
 * Run stuff during boot up, if you want me to run stuff, let me know
 */
var runMe = [amILoggedIn, Cala.loadThisPath, pagesSetUp];

/**
 * Say stuff, this is a very minimal debugging functionality
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

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// end: Boot stuff
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

/*****************************************************************************/
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

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// end: Tools
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

/*****************************************************************************/
// Template and messaging
//
//////////////////////////////////////////////////////////////////////////////

/**
 * Change the background for pages
 */
// Global variable to know for whom the background was requested for, this is here because I can't really tell the api to 
// send this information to the function that makes the actual change, if you know better, please let me know :)
// @deprecated ?
var tplBackgroundRequestedForWire = keyGet(VAR_CURRENT_USER_NAME, "---");

function tplBackgroundGenerateRandom(){
	say("Generating random background");
	return basePath + "img/bgs/bg_" + Math.floor((Math.random() * 10) + 1) + ".jpg";
}

// @deprecated
function tplBackgroundChangeRandom(){
	bg = tplBackgroundGenerateRandom();
	say("Changing the bg to: " + "bg_" + bg + ".jpg");
	_tplSetBodyBackgroundCorrectly("img/bgs/bg_" + bg + ".jpg", false);
}

// Helper function to handle the actual changing of the background
function _tplSetBodyBackgroundCorrectly(path){

	// Add a random timestamp to fool the cache
	//if(foolCache == true){
		tmpDate = new Date();
		path = path + "&foolCache=" + tmpDate.getTime();
	//}
	$("body").css("background", "url(" + path + ") no-repeat center center fixed");
	$("body").css("background-size", "cover");

}

// Success requesting a new background from the server
// @deprecated
function _tplSetCorrectBackgroundSuccess(data){

	say("Good response about that background :)" + data);

	if(data.resp == SUCCESS_ALL_GOOD){
		say("I was able to at least request the information for my personal background");
		tplBackgroundChangeRandom();
	}
	else if(data.resp == SUCCESS_USER_BG_EXISTS){
		// I shall set a custom bg
		say("There seems to be a new background");
		newBgPath = wirez_userGetBackgroundPath(tplBackgroundRequestedForWire);
		say("The new path is: " + newBgPath);
		_tplSetBodyBackgroundCorrectly(newBgPath, true);
	}
	else{
		tplBackgroundChangeRandom();
	}
}

// Errors requesting a new background from the server
// @deprecated
function _tplSetCorrectBackGroundError(){
	say("Good response about that background :)");
	say("Error getting the background");
	tplBackgroundChangeRandom();
}

// Helper function to request the new background and put it accordingly
// @deprecated
function _tplRequestNewBackground(wire){

	tplBackgroundRequestedForWire = wire;

	var options = {
		options: {
			onSuccess: _tplSetCorrectBackgroundSuccess,
			onError: _tplSetCorrectBackGroundError
		},
		requestData: {
			userName: wire,
			justChecking: true
		}
	};

	wirez_userGetBackground(options);

}

// I set the correct background depending on the page type
function tplSetCorrectBackground(){

	// Get a random background
	bg = tplBackgroundGenerateRandom();

	if($("body").hasClass("custom")){
		say("This page uses a custom background");
		// Request the user's background
		_tplSetBodyBackgroundCorrectly(wirez_userGetBackgroundPath(keyGet(VAR_CURRENT_USER_NAME, "---"), bg));	
	//	_tplRequestNewBackground(keyGet(VAR_CURRENT_USER_NAME, "---"));
	}
	else{
		_tplSetBodyBackgroundCorrectly(bg);
		//tplBackgroundChangeRandom(bg);
	}

}

/**
 * Helper function to actually present messages to the user, you should never
 * call this directly
 */
function _msgAlert(what, type){
	alert(what);
}

// Alert messages to the user
function msgAlert(what){
	_msgAlert(what, 'alert');
}

// Alert warning messages to the user
function msgWarning(what){
	_msgAlert(what, 'warning');
}

// Alert information messages to the user
function msgInfo(what){
	_msgAlert(what, 'info');
}

/**
 * Alert stuff, not really very usefull to you, it is/will be used internally
 */
function _alert(what){
	alert(what);
}

// If there is no conversation I will handle the error
// @todo I should really handle this things better
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

// Local storage

// Keys
function keyStore(key, value){
	say("Storing key: " + key);
	window.localStorage.setItem(key, value);
	return true;
}

function keyGet(key, defaultValue){
	var value = window.localStorage.getItem(key);
	if(value == null){
		say("No value found, I will use the default");
		value = defaultValue;
	}
	say("Gotten Key: " + key + " with value: " + value);
	return value;
}

// keyname is now equal to "key"
// value is now equal to "value"
function removeKey(theKey){
	say("Removing key: " + theKey);
	window.localStorage.removeItem(theKey);
}

/*****************************************************************************/
// Contacts, Directory, People
//
//////////////////////////////////////////////////////////////////////////////

/**
 * Get my details
 */
// Successfully got user details
function _userGetMyDetailsSucess(data){
	say("Got user details, at least it looks like it :)");
	//say(">>" + JSON.stringify(data.resp));
	$("#myAccountWire").val(data.resp.wire);
	$("#myAccountName").val(data.resp.name);
	$("#myAccountAbout").val(data.resp.about);
}

// Error getting user details
function _userGetMyDetailsError(data){
	say("Error occured getting user details");
}

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
// User management
//
//////////////////////////////////////////////////////////////////////////////

function _userUpdateProfileSuccess(data){

	if(data !== ERROR_NO_REQUEST_DONE){
		d("Something happened");
	}
	else{
		d("Success updating profile");
		msgAlert("All good :)");
		iGoTo("myAccount.html");
	}
}
function _userUpdateProfileError(data){
	d("Error updating profile")
}

// Update my account
function userUpdateProfile(){

	wirez_userUpdateProfile({
		requestData:{
				about: $("#myAccountAbout").val(),
				wire:  $("#myAccountWire").val(),
				name: $("#myAccountName").val(),
				pwd: $("#myAccountPwd").val(),
				onSuccess: _userUpdateProfileSuccess,
				onError: _userUpdateProfileError
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
	_IAM         = keyGet(VAR_CURRENT_USER_NAME, "");

	_SESSION_KEY = keyGet(VAR_CURRENT_SESSION_KEY, "123");
	wirez_requestData.sessionKey = keyGet(VAR_CURRENT_SESSION_KEY, "123");

	if(keyGet(VAR_CURRENT_USER_NAME, "---") != "---"){
		say("Yes I am");
		$("#logMeIn").text("");

		$("#userMenuTitle").html(myName);

		newLink = ''
			+ '<li><a href="myAccount.html">My Account/Settings</a></li>'
			+ '<li><a href="#" onClick="return logMeOut();">Log Out</a></li>'
			+ '<li class="divider"></li>';

		$("#userMenu").prepend(newLink);
		messagesSetCheckThemOut();
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

	msgAlert("Good bye :)");

	keysGone = [VAR_CURRENT_USER_NAME, VAR_CURRENT_SESSION_KEY, VAR_LAST_MSG_ID];

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
function logMeIn(){

	say("Logging in");

	wirez_userLogMeIn($("#userName").val(), $("#pwd").val(), _logMeInSuccess, _logMeInError);

	return false;
}

/**
 * @todo Check that I was actually able to login!
 */
function _logMeInSuccess(details){

	say("Able to login?" + details.sessionKey);

	if(parseInt(details.sessionKey) < 0){
		_logMeInError();
	}
	else{
		keyStore(VAR_CURRENT_USER_NAME, details.userName);
		keyStore(VAR_CURRENT_SESSION_KEY, details.sessionKey);
		_SESSION_KEY = details.sessionKey;

		iGoTo($('#goToAfterLogin').val());
	}
}

function _logMeInError(error){
	say("Error trying to login:" + error);
	alert("Wrong log in information");
	return false;
}

// Register a new user
function userRegister(){
	say("Register a new user");
	wirez_userRegister(
			$("#myFullNameRegister").val(), 
			$("#myUserNameRegister").val(),
			$("#myEmailRegister").val(),
			$("#myPwdRegister").val(),
			$("#myPwdAgainRegister").val(),
			_userRegisterSuccess,
			_userRegisterError);
	return false;
}

function _userRegisterSuccess(data){

	say("Success in registration request");

	if(data.success == ERROR_USER_EXISTS){
		msgAlert("This user already exists");
	}
	else if(data.success != ERROR_BAD_REQUEST){
		msgAlert("Successfully registered :), You can now login");
		_logMeInSuccess(data);
	}
	else{
		msgAlert("Something wrong happened, you may have some pending fields");
	}
	return false;
}

function _userRegisterError(data){
	say("Error in registration request");
}

/*****************************************************************************/
//
// Messaging and conversations
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

/**
 *  Customize my account
 */
function customize_myAccount(){

	say("Customizing my account");

	myAccountSetAvatar();

	options = {
		options: {
			onSuccess: _userGetMyDetailsSucess,
			onError: _userGetMyDetailsError
		}
	};

	wirez_userGetMyDetails(options);

	// Avatar
	wirez_uploadSomething("users", "users_avatar_upload", "#myAccountPersonalAvatarUploader", myAccountSetAvatar, myAccountSetAvatar);

	// Background
	wirez_uploadSomething("users", "users_personal_bg_upload", "#myAccountPersonalBgUploader", tplSetCorrectBackground, tplSetCorrectBackground);

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

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// end: Custom pages
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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
		formData: {w: _w, r: _r, iam: _IAM, sessionKey: _SESSION_KEY},
		dragDrop: true,
		fileName: "fileToUpload",
		returnType:"json",
		onError: _onError,
		onSuccess: _onSuccess,
		showDelete: false
	}

	var wirez_uploadAvatarObj = $(_id).uploadFile(wirez_settingsUploader);
}



