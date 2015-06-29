// Youtube, This is all here because I could not put it inside the Bhavana object
var bhavana_thisVideoId    = 'M7lc1UVf-VE';

//2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

//tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    Cala.say("Creating the player");
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
    Cala.say("Player is done and ready");
    player.cueVideoById({'videoId': bhavana_thisVideoId, 'suggestedQuality': 'small'});
    //event.target.playVideo();
    $("#bhavana_waitingForVideo").hide('slow');
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
    Cala.say("Player state" + player.getPlayerState());
    if (event.data == YT.PlayerState.ENDED) {
        Bhavana_Session.registerTime();
        Cala.say("Video is finished");
    }
}

function stopVideo() {
    Cala.say("Video stoped");
    player.stopVideo();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

// Samatha 1 - Tranquilidad
var Bhavana_Categories = {
    samatha: {
        title: "Samatha",
        desc: "Tranquilidad, volviendo al cuerpo.",
        duration: 9,
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
        say("Looking for cat: " + cat);
        if(categories.hasOwnProperty(cat)){
            //Do nothing really
            say("Got category:" + cat);
            this.setSessionStuff(categories[cat]);
            this.dets.cat = cat;
        }else{
            say("Category does not exist :(");
            this.dets.cat = false;
        }
        return this;
    },
    getSessionId: function(){
        if(this.dets.cat !== false){
            this.dets.id = Cala.paramsGet("sessionId", "1");
            console.log("Got session id: " + this.dets.id);
            if(this.dets.id > this.dets.sessions.length){
                say("This is not a valid session");
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
            bhavana_thisVideoId = this.dets.sessions[this.dets.id - 1];
            return this;
        }
    },
    setPager: function(categories){
        // Get the possition in the array of key of this category
        sessions = Object.keys(categories);
        sessionsPos = sessions.indexOf(this.dets.cat);
        console.log("SessionsPos: " + sessionsPos + " sessions: " + sessions.length);

        // Next?
        if(this.dets.id >= this.dets.sessions.length){
            say("This is the last of this series");

            /* Temporary solution, when I add more series this should be fixed too, 
             * use sessionsPos > lenght of the categories to find out if the end has been reached
             */

            // Are there more series?
            if(sessionsPos >= (sessions.length - 1)){
                $("#goNext").attr("href", "?x=bhavana/c_vidaDiariaEnd");
            }else{
                $("#goNext").attr("href", "?x=bhavana/sessions&sessionId=1&cat="+sessions[parseInt(sessionsPos) + 1]);
            }
        }
        else{
            say("There are more sessions to go...");
            $("#goNext").attr("href", "?x=bhavana/sessions&sessionId=" +(parseInt(this.dets.id) + 1 )+"&cat="+this.dets.cat);
        }

        // Back
        // There are places to go back
        if(this.dets.id > 1){
            say("There are more sessions to go back to in this category");
            $("#goBack").attr("href", "?x=bhavana/sessions&sessionId=" +(parseInt(this.dets.id) - 1 )+"&cat="+this.dets.cat);
        }
        else{
            // Is this the first of the sessions?
            if(sessionsPos === 0){
                say("This is the first of the series, going back to the main page");
                backPath = "?x=index";
            }
            // Lets find out go goes before
            else{
                say("Which is the previews category?");
                backPath = "?x=bhavana/sessions&sessionId=" + categories[this.dets.cat].sessions.length + "&cat="+sessions[parseInt(sessionsPos) -1];
            }
            $("#goBack").attr("href", backPath);
        }
    },
    hidePlayer: function(){
        //$("#sessionsPlayer").hide();
        //$("#bhavana_selectMeditationIntention").hide();
        return this;
    },
    registerTime: function(){
        Cala.say("Registering times");
        Bhavana_addToCause(this.dets.duration, this.dets.code);
    },
    // Starts the meditation, it actually loads the video and registers the code
    startMeditation: function(code){

        say("Creating the player and loading the video");

        // Store the code
        this.dets.code = code;

        // Hide and show things
        $("#bhavana_selectMeditationIntention").fadeOut('slow', function(){
            $("#bhavana_meditationInstructions").fadeIn('slow', function(){
                $("#bhavana_waitingForVideo").show('slow');
                Cala.say("--------------------------------->>>> Running youtube api");
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

// I'm I logged in?
if(Cala.userLogedIn() === false){
    Tpl_msgInfo("Ingrese si desea que estas meditaciones queden grabadas en su historial.");
}else{
    Cala.say(2);
}



