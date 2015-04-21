// Samatha 2 - Momento
var tranquilidadMomento = [];
tranquilidadMomento.push({desc:"¿Cómo se siente este momento?", cat:"Volver al momento"});
tranquilidadMomento.push({desc:"¿Hacia dónde se dirige el presente?", cat:"Volver al momento"});
tranquilidadMomento.push({desc:"¿Cuánto tiempo dura este instante?", cat:"Volver al momento"});
tranquilidadMomentoDets = {next: "s_s_backToTheMind.html", 
	prev: "s_s_backToTheBody.html",
	thisIs: "s_s_backToTheMoment.html",
	audios:"backToTheMoment",
	cat: "Tranquilidad",
	subCat: "Volver al momento"};

// Set the details for this session
function setBackToTheMoment(){
	console.log("Setting el momento as the session");
	setSessionDetails(tranquilidadMomento, tranquilidadMomentoDets);
}
