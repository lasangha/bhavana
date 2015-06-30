// Path to the sounds
var soundsPath = "http://app.lasangha.org/www/audio/meditations/";

// The current audio file to be played
var audioFilePath = "";

// Shows the player
function Bhavana_startMeditation(code, time){

    say("I am showing the player");

    $("#bhavana_selectMeditationIntention").fadeOut('slow', function(){
		$("#bhavana_meditationInstructions").fadeIn('slow', function(){
			$("#sessionsPlayer").fadeIn('slow');
		});
	});
	if(time > 0){
		say("Add time to the causes");
		Bhavana_addToCause(time, code);
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
			console.log(data);
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
	if(Cala.paramsGet("x", "") != "bhavana/sessions"){
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
			r: "causes_get_max_time",
			w: "bhavana",
			iam: Cala_IAM,
		   	sessionKey: Cala_SESSION_KEY
		},
		success: function (data){
			if(typeof data.resp == 'object'){
				console.log("Got information about the times");
				$("#causesTotalMinutes").html(data.resp.totalTime);
				$("#causesCause").html(data.resp.name);
				console.log(data.resp.totalTime);
			}
		},
		error: function(){
			console.log("Something wrong?");
		}
	});
}

/*****************************************************************************/
//
// Privacy and settings
//
//////////////////////////////////////////////////////////////////////////////

// Stores the privacy settings for this person in this device
function Bhavana_privacyGlobalSet(){

    //Which setting was selected
    var privacyOption = $("#bhavana_privacyGlobalMeditations").val();
    Cala.say("User selected privacy option: " + privacyOption);
    keyStore("bhavana_privacyGlobalMeditations", privacyOption);
}

// Gets the privacy settings for this person in this device
function Bhavana_privacyGlobalGet(){

    //Which setting was selected
    var privacyOption = keyGet("bhavana_privacyGlobalMeditations", 1);
    $("#bhavana_privacyGlobalMeditations").val(privacyOption);
}

/*****************************************************************************/
//
// Sessions
//
//////////////////////////////////////////////////////////////////////////////

// I will take you to the last visited page of the course
function Bhavana_gotoLastSessionPage(){

	// Where I'm I?
	var thisPage = document.URL;

	console.log("I am in page: " + thisPage);

	// Where was I?
	var lastValue = keyGet("var_bhavana_lastPage", "startMeOver");

	// If there is a last location, I'll go there
	if(lastValue === undefined || lastValue == "startMeOver"){
		say("Nothing set");
		iGoTo("?x=bhavana/c_intro");
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

	if(sessionId === null || sessionId < 0){
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
	$("#meditationSource").attr("src", audioFilePath).detach().appendTo("#meditationPlayer");

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
	if(sessionId === 0){
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
function Bhavana_addToCause(_totalTime, _causeCode){

	say("I will submit this time to the causes?");

    // Lets see first if the user wants to participate in global meditations
    var privacyOption = keyGet("bhavana_privacyGlobalMeditations", 0);

	$.ajax({
		type: 'GET',
		url: Cala_apiUrl,
		dataType: "json",
		data: {
			iam: Cala_IAM,
			sessionKey: Cala_SESSION_KEY,
			w: "bhavana",
			r: "causes_add_to",
			causeCode: _causeCode,
			totalTime: _totalTime
		},
		success: function (data) {
			say(data);
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


	if(chartLabels.length === 0){
		$("#myCharts").html("No hay datos en este momento");
	}else{

        console.log("hello >>>> " + chartLabels.length);

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
		};

		var ctx = document.getElementById(canvasId).getContext("2d");
		window.myLine = new Chart(ctx).Line(lineChartData, {responsive: true});
	}
}

// Get all meditation times per day, for me?
function getAllMeditationTimesPerDay(){

	$.ajax({
		type: 'GET',
		url: Cala_apiUrl,
		dataType: "json",
		data: {
			w: "bhavana",
			r: "bhavana_meditations_get_group_meditations",
		ini: 7, //Start 7 days ago
		},
        success: function (allDetails) {
            var newData = {
                labels: allDetails.resp.dates,
        datasets: [
    {
        label: "Solo Meditando",
        fillColor: "rgba(231,77,30,0.2)",
        strokeColor: "rgba(231,77,30,1)",
        pointColor: "rgba(231,77,30,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(255,255,153,1)",
        data: allDetails.resp.details.Ninguna
    },
    {
        label: "Paz",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(255,255,153,1)",
        pointColor: "rgba(255,255,153,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(255,255,153,1)",
        data: allDetails.resp.details.Paz
    },
    {
        label: "Humildad",
        fillColor: "rgba(51,255,153,0.2)",
        strokeColor: "rgba(51,255,153,1)",
        pointColor: "rgba(51,255,153,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(51,255,153,1)",
        data: allDetails.resp.details.Humildad
    },
    {
        label: "Compasión",
        fillColor: "rgba(76,153,0,0.2)",
        strokeColor: "rgba(76,153,0,1)",
        pointColor: "rgba(76,153,0,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(76,153,0,1)",
        data: allDetails.resp.details['Compasi\u00f3n']
    }
    ]
            };
            var ctx = document.getElementById("myChart").getContext("2d");
            var options = {
                responsive: true,
                multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
                legendTemplate : "<ul class=\"list-group <%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li class=\"list-group-item\"><span style=\"background-color:<%=datasets[i].strokeColor%>\">&nbsp;&nbsp;</span>&nbsp;<%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
            };
            window.myGroupTimesChart = new Chart(ctx).Line(newData, options);
            document.getElementById("groupTimesChart").innerHTML = myGroupTimesChart.generateLegend();
        }
    });

}

// Get my meditation times per day
function getMyMeditationTimesPerDay(){

    say("Lets get the times");

    $.ajax({
        type: 'GET',
        url: Cala_apiUrl,
        dataType: "json",
        data: {
            iam: Cala_IAM,
        sessionKey: Cala_SESSION_KEY,
        r: "bhavana_meditations_get_my_times",
        w: "bhavana",
        goBack: 7 //Start 7 days ago
        },
        success: function (response) {
            if(response.resp != ERROR_DB_NO_RESULTS_FOUND){
                createChart("Meditación por día", "myChart", response.resp.labels, response.resp.times, 'lines');
            }
            else{
                Cala.say("Nothing found");
            }
        },
        error: function(){
            Cala.say("Error");
        }
    });

}

// Get my meditation times per cause
function getMyMeditationTimesPerCause(){

    say("Lets get the meditation chart per cause");

    $.ajax({
        type: 'GET',
        url: Cala_apiUrl,
        dataType: "json",
        data: {
            iam: Cala_IAM,
        sessionKey: Cala_SESSION_KEY,
        r: "bhavana_meditations_get_my_times_per_cause",
        w: "bhavana"
        },
        success: function (response) {
            if(response.resp != ERROR_DB_NO_RESULTS_FOUND){

                Cala.say("Got good information for the pie" + response.resp);

                var options = {legendTemplate: "<ul class=\"list-group <%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li class=\"list-group-item\"><span style=\"background-color:<%=segments[i].fillColor%>\">&nbsp;<%=segments[i].value%>&nbsp;</span>&nbsp;<%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"};
                var ctx = document.getElementById('chartPiePerCause').getContext('2d');
                var perCausePieChart = new Chart(ctx).Pie(response.resp, options);
                document.getElementById("Bhavana_meditationTimesPerCauseLegend").innerHTML = perCausePieChart.generateLegend();

            }
            else{
                Cala.say("Nothing found");
            }
        },
        error: function(){
            Cala.say("Error");
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


