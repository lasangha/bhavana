// Samatha 3 - Mente
var tranquilidadMente = [];
tranquilidadMente.push({desc:"¿Quién piensa?"});
tranquilidadMente.push({desc:"¿Dónde está el pensamiento?"});
tranquilidadMente.push({desc:"¿Cómo se siente la mente?"});
tranquilidadMenteDets = {next: "end.html", 
	prev: "s_s_backToTheMoment.html",
	thisIs: "s_s_backToTheMind.html",
	audios:"backToTheMind",
	cat: "Tranquilidad",
	subCat: "Volver a la mente"};


// Set the details for this session
function setBackToTheMind(){
	console.log("Setting tranquilidad de la mente as the session");
	setSessionDetails(tranquilidadMente, tranquilidadMenteDets);
}
