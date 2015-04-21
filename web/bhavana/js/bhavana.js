// Path to the sounds
var soundsPath = "http://app.lasangha.org/www/audio/meditations/";

// The current audio file to be played
var audioFilePath = "";

// Shows the player
function Bhavana_showPlayer(time){

	say("I am showing the player");
	$("#sessionsPlayer").show();
	if(time > 0){
		say("Add time to the causes");
		Bhavana_addToCause(time);
	}
}

// Send a contact email
function sendMail(){

	console.log("Sending an email");
	console.log($('#myName').val());

	/*if(!checkConnection()){
	  console.log("No connectivity");
	  alert("Lo sentimos, pero se requiere de una conexión a internet para llevar a cabo esta función.");
	  return false;
	  }*/

	$.ajax({
		type: 'POST',
		url: 'http://app.lasangha.org/api/mailer.php',
		dataType: "json",
		data: {
			from: $('#myName').val(),
		email: $('#myEmail').val(),
		msg: $('#text').val(),
		},
		success: function (data) {
			console.log(data)
		}
	});
	return false;

}


// End of tools
/*****************************************************************************/


/*****************************************************************************/
// Navigation
//////////////////////////////////////////////////////////////////////////////

function Bhavana_storeThisPage(){

	// Re set this page
	thisPage = document.URL;

	console.log("Storing this page: >>>>> " + thisPage);

	// Is this an storable page?
	if(Cala.paramsGet("x", "") != "sessions"){
		console.log("I shall not store this page!");
		return false;
	}
	else{
		keyStore("var_bhavana_lastPage", thisPage);
	}
}

// End of navigation
/*****************************************************************************/

// I retrieve the medatitation with most meditated time
function getMeditationMaxCauseTime(){

	console.log("I will get the cause with more minutes meditated...");

	//if(checkConnection() == true){

	console.log("Getting times");

	//Lets make the connection
	$.ajax({
		type: 'GET',
		url: Cala_apiUrl,
		dataType: "json",
		data: {
			r: "mcauses_get_max_time",
			w: "bhavana",
			iam: _IAM,
		   	sessionKey: _SESSION_KEY
		},
		success: function (data){
			if(typeof data.resp == 'object'){
				console.log("Got information about the times");
				$("#causesTotalMinutes").html(data.resp.totalTime);
				$("#causesCause").html(data.resp.name);
				console.log(data.resp.totalTime)
			}
		},
		error: function(){
			console.log("Something wrong?");
		}
	});
}

/*****************************************************************************/
// Sessions
//////////////////////////////////////////////////////////////////////////////

// I will take you to the last visited page of the course
function Bhavana_gotoLastSessionPage(){

	// Where I'm I?
	var thisPage = document.URL;

	console.log("I am in page: " + thisPage);

	// Where was I?
	var lastValue = keyGet("var_bhavana_lastPage");

	// If there is a last location, I'll go there
	if(lastValue == null){
		say("Nothing set");
		iGoTo("?x=c_intro");
	}
	else{
		say("Going to: " + lastValue);
		iGoTo(lastValue);
	}

	return false;

}

//@deprecated
function getSessionId(){

	console.log("Getting the session Id");

	sessionId = getKey("sessionId");

	if(sessionId == null || sessionId < 0){
		sessionId = '0';
		storeKey("sessionId", sessionId);
	}
}

// Set the id of the new section that is comming
//@deprecated
function setId(newSessionId){
	console.log("Setting the sessionId: " + newSessionId);
	storeKey("sessionId", newSessionId);
}

// Set sessions details
//@deprecated
function setSessionDetails(subjects, subjectsDets){

	getSessionId();

	console.log("Setting subjects with sessionId: " + sessionId);

	// Did I go too far?
	if(sessionId > (Object.keys(subjects).length - 1)){
		console.log("The person is requesting a page beyond the scope of this session, I will reach my end");
		sessionId = (Object.keys(subjects).length - 1);
	}
	// Path to the audio
	audioFilePath = soundsPath + subjectsDets.audios + "_" + sessionId + ".mp3";

	console.log("Setting subjects width sessionId: " + sessionId);
	console.log("Audio file: " + audioFilePath);

	$("#sessionId").text(parseInt(sessionId) + 1);
	$("#sessionDesc").text(subjects[sessionId].desc);
	$("#meditationSource").attr("src", audioFilePath).detach().appendTo("#meditationPlayer");;

	// Next and back
	// If this is the end, I will use the next section
	if(sessionId == (Object.keys(subjects).length - 1)){
		console.log("I am at my limit, I will link to the next section");
		$("#nextSession").attr("href", subjectsDets.next);
		$("#nextSession").attr("onClick", "setId(0);");
	}
	else{
		console.log("I still have things to do here");
		$("#nextSession").attr("href", subjectsDets.thisIs + "?id=" + (1 + parseInt(sessionId)));
		$("#nextSession").attr("onClick", "setId(" + (1 + parseInt(sessionId)) + ");");
	}
	// If this is the first id I will link to the previews section
	if(sessionId == 0){
		console.log("I am at the beggining, I will link to the previews section");
		$("#prevSession").attr("href", subjectsDets.prev);
		$("#prevSession").attr("onClick", "setId(-1);");
	}
	else{
		console.log("I am somewhere in the middle of this section");
		$("#prevSession").attr("href", subjectsDets.thisIs + "?id=" + (sessionId - 1));
		$("#prevSession").attr("onClick", "setId(" + (sessionId - 1) + ");");
	}

}

// Add meditation times to the causes
function Bhavana_addToCause(time){

	say("I will submit this time to the causes");

	$.ajax({
		type: 'GET',
		url: Cala_apiUrl,
		dataType: "json",
		data: {
			iam: _IAM,
			sessionKey: _SESSION_KEY,
			w: "bhavana",
			r: "causes_add_to",
			causeCode: $('#cause').val(),
			totalTime: time,
			email: keyGet("myEmail", "buddha@lasangha.org"),
		},
		success: function (data) {
			say(data)
		}
	});
}

// End of sessions
/*****************************************************************************/


/*****************************************************************************/
// Reports/Charts
//////////////////////////////////////////////////////////////////////////////

function createChart(chartTitle, canvasId, chartLabels, chartData, type){

	console.log("Creating chart");

	console.log("hello >>>> " + chartLabels.length);

	if(chartLabels.length == 0){
		$("#myCharts").html("No hay datos en este momento");
	}else{

		var lineChartData = {
			labels : chartLabels,
			datasets : [
			{
				label: chartTitle,
				fillColor: "rgba(76,153,0,0.2)",
				strokeColor: "rgba(76,153,0,1)",
				pointColor: "rgba(76,153,0,1)",
				pointStrokeColor : "#fff",
				pointHighlightFill : "#fff",
				pointHighlightStroke: "rgba(76,153,0,1)",
				data : chartData
			}
			]
		}

		var ctx = document.getElementById(canvasId).getContext("2d");
		window.myLine = new Chart(ctx).Line(lineChartData, {responsive: true});
	}
}

// Get all meditation times per day
function getAllMeditationTimesPerDay(){

	/*
	   if(checkConnection(false) == false){
	   console.log("No connectivity");
	   alert("Lo sentimos, pero se requiere de una conexión a internet para llevar a cabo esta función.");
	   return false;
	   }
	   */
	console.log("There is connexion, lets get the times");

	$.ajax({
		type: 'GET',
		url: apiPath,
		dataType: "json",
		data: {
			what: "getAllMeditationTimesPerDay",
		ini: 7, //Start 7 days ago
		},
		success: function (allDetails) {

			var newData = {
				labels: allDetails.dates,
		datasets: [
	{
		label: "Paz",
		fillColor: "rgba(220,220,220,0.2)",
		strokeColor: "rgba(255,255,153,1)",
		pointColor: "rgba(255,255,153,1)",
		pointStrokeColor: "#fff",
		pointHighlightFill: "#fff",
		pointHighlightStroke: "rgba(255,255,153,1)",
		data: allDetails.details['Paz']
	},
	{
		label: "Humildad",
		fillColor: "rgba(51,255,153,0.2)",
		strokeColor: "rgba(51,255,153,1)",
		pointColor: "rgba(51,255,153,1)",
		pointStrokeColor: "#fff",
		pointHighlightFill: "#fff",
		pointHighlightStroke: "rgba(51,255,153,1)",
		data: allDetails.details['Humildad']
	},
	{
		label: "Compasión",
		fillColor: "rgba(76,153,0,0.2)",
		strokeColor: "rgba(76,153,0,1)",
		pointColor: "rgba(76,153,0,1)",
		pointStrokeColor: "#fff",
		pointHighlightFill: "#fff",
		pointHighlightStroke: "rgba(76,153,0,1)",
		data: allDetails.details['Compasi\u00f3n']
	}
	]
			};
			//createChart("Meditaciones grupales por día", "myChart", details.labels, details.times, 'lines');
			var ctx = document.getElementById("myChart").getContext("2d");
			var options = {
				responsive: true,
				multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
				legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
			}
			window.myLine = new Chart(ctx).Line(newData, options);

		}
	});

}

// Get my meditation times per day
function getMyMeditationTimesPerDay(){
	/*
	   if(checkConnection(false) == false){
	   console.log("No connectivity");
	   alert("Lo sentimos, pero se requiere de una conexión a internet para llevar a cabo esta función.");
	   return false;
	   }
	   */
	console.log("There is connexion, lets get the times");

	$.ajax({
		type: 'GET',
		url: apiPath,
		dataType: "json",
		data: {
			what: "getMyMeditationTimes",
		ini: 7, //Start 7 days ago
		email: getKey("myEmail", "buddha@lasangha.org")
		},
		success: function (details) {
			createChart("Meditación por día", "myChart", details.labels, details.times, 'lines');
			//console.log("Esta es la data" + details.times);
		}
	});

}

function createMap(){

	console.log("creating the map");

	var styleFunction = function(feature, resolution) {
		style = [new ol.style.Style({
			image: new ol.style.Circle({
				radius: 25,
				fill: new ol.style.Fill({
					color: 'rgba(255, 153, 0, 0.4)'
				}),
				stroke: new ol.style.Stroke({
					color: 'rgba(255, 204, 0, 0.2)',
				width: 1
				})
			})
		})];
		return style;
	};

	var map = new ol.Map({
		target: 'myMap',
		layers: [
		new ol.layer.Tile({
			source: new ol.source.OSM()
		}),
			new ol.layer.Vector({
				source: new ol.source.GeoJSON({
					projection: 'EPSG:3857',
				url: apiPath + '?what=getMeditationLocations'
				})
			})
	],
		view: new ol.View({
			center: [0, 0],
		zoom: 1
		}),
	});
}

// End of reports/charts
/*****************************************************************************/


