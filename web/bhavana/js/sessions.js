// Samatha 1 - Tranquilidad
var Bhavana_Categories = {
	samatha: {
		title: "Samatha",
		desc: "Tranquilidad, volviendo al cuerpo.",
		sessions: ['_rRoD28-WgU', '2FS6AsNCy3I', 'Yy8nWIiP4_M']
	},
	vipassana: {
		title: "Vipassana",
		desc: "Introspección",
		sessions: ['_rRoD28-WgU', '2FS6AsNCy3I', 'Yy8nWIiP4_M']
	}};

var Bhavana_Session = {

	dets: {
		title: "noName",
		desc: "Description",
		sessions: [],
		id: 0,
		cat: false
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
			$("#sessionDesc").html(this.dets.desc);
			$("#sessionsPlayer").html(this.playerCreate(this.dets.sessions[this.dets.id - 1]));
			return this;
		}
	},
	playerCreate: function(id){
		return '<iframe class="Cala_videosResponsive" src="https://www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen></iframe>';

	},
	setPager: function(categories){
		// Get the possition in the array of key of this category
		sessions = Object.keys(categories);
		sessionsPos = sessions.indexOf(this.dets.cat);
		console.log(sessionsPos);
		console.log(sessions);

		// Next?
		if(this.dets.id >= this.dets.sessions.length){
			say("This is the last of this series");
			$("#goNext").attr("href", "?x=sessions&sessionId=1&cat="+sessions[parseInt(sessionsPos) + 1]);
		}
		else{
			say("There are more sessions to go...");
			$("#goNext").attr("href", "?x=sessions&sessionId=" +(parseInt(this.dets.id) + 1 )+"&cat="+this.dets.cat);
		}

		// Back
		// There are places to go back
		if(this.dets.id > 1){
			say("There are more sessions to go back to in this category");
			$("#goBack").attr("href", "?x=sessions&sessionId=" +(parseInt(this.dets.id) - 1 )+"&cat="+this.dets.cat);
		}
		else{
			// Is this the first of the sessions?
			if(sessionsPos == 0){
				say("This is the first of the series, going back to the main page");
				backPath = "?x=index";
			}
			// Lets find out go goes before
			else{
				say("Which is the previews category?");
				backPath = "?x=sessions&sessionId=" + categories[this.dets.cat].sessions.length + "&cat="+sessions[parseInt(sessionsPos) -1]
			}
			$("#goBack").attr("href", backPath);
		}
	},
	hidePlayer: function(){
		$("#sessionsPlayer").hide();
		return this;
	},
	boot: function(categories){
		this.hidePlayer().getCategory(categories).getSessionId().loadSession().setPager(categories);
	}
}

Bhavana_Session.boot(Bhavana_Categories);
Bhavana_storeThisPage();

