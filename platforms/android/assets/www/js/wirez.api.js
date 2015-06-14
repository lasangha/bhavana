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

// Update profile
//! @deprecated
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

// Log users in
// @deprecated
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


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// end: User management
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


//////////////////////////////////////////////////////////////////////////////
///**************************************************************************
///**************************************************************************
///**************************************************************************
///**************************************************************************
///**************************************************************************
///**************************************************************************
///**************************************************************************

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
		Cala.say("This is the general conversation");
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
		Cala.say("This is an old conversation");
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

/**
 * Customize conversations
 */
function customize_conversation(){
	Cala.say("I am a conversation");
	Cala_runMe.push(setPageForConversations);

	// Pagination
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

// If there is no conversation I will handle the error
// @todo I should really handle this things better
// @todo Move to wirez
function _setConvDetailsError(details){
	Cala.say("No Conversation, or some error");
	iGoTo("directory.html");
}

// Helper function to set the details about the conversation in the form
function _setConvDetailsSuccess(response){

	details = response.resp;

	Cala.say("Setting the conversation details" + messagesFixTitle(details.subject));
	// Restore the subject title, if it was hidden
	$("#subjectTitle").show();
	$("#toWire").hide();
	$("#subject").hide();
	$("#subjectTitle").html("(" + details.recipientWire + ") " + details.subject);
	$("#conversationMessageTitle").html("(" + details.recipientWire + ") " + messagesFixTitle(details.subject));
	$("#idConversation").val(details.idConversation);

	// Set the background, I will put the background from the other party
	Cala.say("Changing the background of this conversation");

	if(keyGet(VAR_CURRENT_USER_NAME, "---") == details.recipientWire){
		Cala.say("I am the eggman");
		$("#toWire").val(details.senderWire);
		_tplRequestNewBackground(details.senderWire);
	}
	else{
		Cala.say("coo coo cu chu" + details.recipientWire);
		$("#toWire").val(details.recipientWire);
		_tplRequestNewBackground(details.recipientWire);
	}

	getMsgsInConversation();

}

// Change values to start a new conversation, this must be set before goint to the page
// @deprecated?
function startNewConversation(recipient){
	Cala.say("Starting a new conversation");
	gotoConversation("0", recipient);
}

// Add html break lines to the text
function textAddBreakLines(text){
	var theKey = "\n";
	var re = new RegExp(theKey, "g");
	text = text.replace(re, "<br />");
	return text;
}

/*****************************************************************************/
//
// Messaging and conversations
// @todo move all this to wirez
//
//////////////////////////////////////////////////////////////////////////////

// Send messages from the form
function sendMsg(){

	Cala.say("Sending message");

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

	Cala.say("Conversation ID: " + data.idConversation);

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
	Cala.say("There was an error while sending a message");
}

// Gets a list of recent conversations with pending or new messages, this is for the general view 
function getRecentMessages(){

	// Are you looking for someone in specific?
	params = getUrlVars();

	Cala.say("Messages with:" + params.withWire);

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

		Cala.say("Got new messages, I will parse them");

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

	Cala.say("Error with the messages");

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

	Cala.say("Going back in time with the messages");

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

		Cala.say("Formating messages");

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
			Cala.say("Getting message");

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

	Cala.say("Error with the messages or no messages at all");

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

	Cala.say("Checking for new messages every: " + (parseInt(checkNewMessagesEvery) * 1000));

	// Call and set the interval
	_messagesCheckNewTopBar();

	setInterval(_messagesCheckNewTopBar, (parseInt(checkNewMessagesEvery) * 1000));

}

// Check for new messages and place a warning in the top bar
function _messagesCheckNewTopBar(){

	if(messagesCheckingForNew == false){
		Cala.say("Let's see if there are any new messages");
		messagesCheckingForNew = true;
		wirez_getRecentMessages("", keyGet(VAR_LAST_MSG_ID, 0),  _messagesCheckNewTopBarSuccess, _messagesCheckNewTopBarError);
	}
	else{
		Cala.say("I am already checking for new messages");
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

	Cala.say("Got information about new messages");

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

		Cala.say("Found new pending messages");

		$("#messagesRecentTopNavBarTotalNewFound").text(data.resp.totalMessages);

		$("#messagesRecentTopNavBarListing").empty();

		for(var prop in data.resp.msgs) {

			Cala.say("Getting message");

			var thisMsg = data.resp.msgs[prop];

			// Conversation subject
			thisMsg = messagesCreateSubject(thisMsg);
			thisMsg.avatar = wirez_userGetAvatarPath(thisMsg.senderAvatar, '25');
			thisMsg.text = thisMsg.text.substring(0, 25);
			thisMsg.subject = messagesFixTitle(thisMsg.subject).substring(0, 20);
			$("#messagesRecentTopNavBarListing").append(parseTpl(tpl, thisMsg, true));
		}

	}else{
		Cala.say("No new messages apparently");
	}

	messagesCheckingForNew = false;

}

// If there are new messages, I will put them in the top bar
function _messagesCheckNewTopBarError(data){
	Cala.say("There was an error trying to get new messages");
	messagesCheckingForNew = false;
}

