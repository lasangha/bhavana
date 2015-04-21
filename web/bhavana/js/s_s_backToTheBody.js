// Samatha 1 - Tranquilidad
var tranquilidadBody = [];
tranquilidadBody.push({desc:"¿De quién es el cuerpo?", cat:"Volver al cuerpo"});
tranquilidadBody.push({desc:"¿Cómo se siente este cuerpo?", cat:"Volver al cuerpo"});
tranquilidadBody.push({desc:"¿Dónde está el cuerpo?", cat:"Volver al cuerpo"});
tranquilidadBodyDets = {next: "s_s_backToTheMoment.html",
	prev: "s_i_intro.html",
	thisIs: "s_s_backToTheBody.html",
	audios:"backToTheBody",
	cat: "Tranquilidad",
	subCat: "Volver al cuerpo"};

// Set the details for this session
function setTranquilidad(){
	console.log("Setting tranquilidad as the session");
	setSessionDetails(tranquilidadBody, tranquilidadBodyDets);
}
