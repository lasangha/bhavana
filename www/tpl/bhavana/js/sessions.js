// Youtube, This is all here because I could not put it inside the Bhavana object
var bhavana_thisVideoId    = 'UD-iWHfq-hY';
var bhavana_meditationTotalTime = 0;

//2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

//tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    console.log("Creating the player");
    player = new YT.Player('sessionsPlayer', {
        height: '390',
           width: '640',
           videoId: bhavana_thisVideoId,
           events: {
               'onReady': onPlayerReady,
           'onStateChange': onPlayerStateChange
           }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    console.log("Player is done and ready");
    player.cueVideoById({'videoId': bhavana_thisVideoId, 'suggestedQuality': 'small'});
    //event.target.playVideo();
    $("#bhavana_waitingForVideo").hide('slow');
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {

    console.log("Player state" + player.getPlayerState());

    // Count only on pauses or end
    if (event.data == YT.PlayerState.ENDED || event.data == YT.PlayerState.PAUSED) {
        console.log("Adding time");

        // Time in the video in minutes
        currentTime = (Math.floor(player.getCurrentTime() / 60));

        // Only if this is more than 1 minute
        if(currentTime >= 1){
            totalTime = currentTime - bhavana_meditationTotalTime;
            console.log("Time is: " + currentTime + " last: " + bhavana_meditationTotalTime + " total: " + totalTime);

            // This should be given in minutes, I wil only do it if it is more than 1
            if(totalTime < 1){
                console.log("Not enought time");
                return false;
            }

            // Register the time in the system
            Bhavana_Session.registerTime(totalTime);
            // Bring time up to speed
            bhavana_meditationTotalTime = currentTime;

        }else{
            console.log("Less than a minute");
        }
    }

}

function stopVideo() {
    console.log("Video stoped");
    player.stopVideo();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

// Samatha 1 - Tranquilidad
var Bhavana_Categories = {
    samatha: {
        title: "Samatha",
        desc: "Tranquilidad, volviendo al cuerpo.",
        sessions: ['SKejPyKEugI', 'gVp5UJ-AlGQ', 'MzXxa5j3aSo', '1FFeB-zXerc', '3ucVT8Vcp-s', 'i1UsmfBfCwE', 'eOCDcu29lLQ', 'TVBaruAy42c', 'CX_S6ODW7FM', 'WvjRjzdVpOw']
    },
    vipassana: {
        title: "Vipassana",
        desc: "Introspección y descubrimiento de la mente.",
        duration: 15,
        sessions: ['8luztS3gsCU', 'dUeFtXXan0w', 'g5gQpJRbpXQ', 'C44O4U5iNU4', 'o2j9srT_OWo', '9Jo69GLmZH4', 'ezeBJrcwyj0', 'IlwQw9pyEPA', 'vA9yR7UPtnI', 'tfKiYSviV7w']
    }
};

var Bhavana_Session = {

    dets: {
        title: "noName",
        desc: "Description",
        sessions: [],
        id: 0,
        duration: 0,
        cat: false,
        code: 'non' //For this meditation session
    },
    setSessionStuff: function(_dets){
        console.log("setting stuff");
        this.dets = _dets;
        return this;
    },
    getCategory: function(categories){
        // The requested category
        cat = Cala.paramsGet("cat", 'samatha');
        console.log("Looking for cat: " + cat);
        if(categories.hasOwnProperty(cat)){
            //Do nothing really
            console.log("Got category:" + cat);
            this.setSessionStuff(categories[cat]);
            this.dets.cat = cat;
        }else{
            console.log("Category does not exist :(");
            this.dets.cat = false;
        }
        return this;
    },
    getSessionId: function(){
        if(this.dets.cat !== false){
            this.dets.id = Cala.paramsGet("sessionId", "1");
            console.log("Got session id: " + this.dets.id);
            if(this.dets.id > this.dets.sessions.length){
                console.log("This is not a valid session");
                this.dets.id = 0;
            }
        }
        return this;
    },
    loadSession: function(){
        if(this.dets.id > 0){
            console.log("Setting session");
            $("#sessionTitle").html(this.dets.title);
            $("#sessionNumber").html("# " + this.dets.id);
            $("#sessionDesc").html(this.dets.desc);
            //bhavana_thisVideoId = this.dets.sessions[this.dets.id - 1];
        }
        return this;
    },
    setPager: function(categories){
        // Get the possition in the array of key of this category
        sessions = Object.keys(categories);
        sessionsPos = sessions.indexOf(this.dets.cat);
        console.log("SessionsPos: " + sessionsPos + " sessions: " + sessions.length);

        // Next?
        if(this.dets.id >= this.dets.sessions.length){
            console.log("This is the last of this series");

            // Are there more series?
            if(sessionsPos >= (sessions.length - 1)){
                $("#goNext").attr("href", "?x=bhavana/c_vidaDiariaEnd");
            }else{
                $("#goNext").attr("href", "?x=bhavana/sessions&sessionId=1&cat="+sessions[parseInt(sessionsPos) + 1]);
            }
        }
        else{
            console.log("There are more sessions to go...");
            $("#goNext").attr("href", "?x=bhavana/sessions&sessionId=" +(parseInt(this.dets.id) + 1 )+"&cat="+this.dets.cat);
        }

        // Back
        // There are places to go back
        if(this.dets.id > 1){
            console.log("There are more sessions to go back to in this category");
            $("#goBack").attr("href", "?x=bhavana/sessions&sessionId=" +(parseInt(this.dets.id) - 1 )+"&cat="+this.dets.cat);
        }
        else{
            // Is this the first of the sessions?
            if(sessionsPos === 0){
                console.log("This is the first of the series, going back to the main page");
                backPath = "?x=index";
            }
            // Lets find out go goes before
            else{
                console.log("Which is the previews category?");
                backPath = "?x=bhavana/sessions&sessionId=" + categories[this.dets.cat].sessions.length + "&cat="+sessions[parseInt(sessionsPos) -1];
            }
            $("#goBack").attr("href", backPath);
        }
        return this;
    },
    hidePlayer: function(){
        //$("#sessionsPlayer").hide();
        //$("#bhavana_selectMeditationIntention").hide();
        return this;
    },
    registerTime: function(time){
        console.log("Registering times");
        Bhavana_addToCause(time, this.dets.code, bhavana_thisVideoId);
        return this;
    },
    // Starts the meditation, it actually loads the video and registers the code
    startMeditation: function(code){

        console.log("Creating the player and loading the video");

        // Store the code
        this.dets.code = code;

        // Hide and show things
        $("#bhavana_selectMeditationIntention").fadeOut('slow', function(){
            $("#bhavana_meditationInstructions").fadeIn('slow', function(){
                $("#bhavana_waitingForVideo").show('slow');
                console.log("Running youtube api");
                tag.src = "https://www.youtube.com/iframe_api";
            });
        });
        return false;
    },

    boot: function(categories){
        this.hidePlayer().getCategory(categories).getSessionId().loadSession().setPager(categories);
    }
};

Bhavana_Session.boot(Bhavana_Categories);
Bhavana_storeThisPage();

