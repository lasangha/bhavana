// Retiro - Bienvenida
var retiroIntro = [];
retiroIntro.push({desc:"Bienvenidos a su retiro personal de meditación"});
introBodyDets = {next: "s_s_backToTheBody.html",
	prev: "index.html",
	thisIs: "s_i_intro.html",
	audios:"retreatIntro",
	cat: "Introducción",
	subCat: "Bienvenida"};

// Set the details for this session
function setIntro(){
	console.log("Setting bienvenida/introduccion as the session");
	setSessionDetails(retiroIntro, introBodyDets);
}
