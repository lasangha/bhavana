// For today random thing to do

// Main topics to observe
var bhavana_forTodayMainTopics = ['Generosidad', 'Moral', 'Renunciamiento', 'Sabiduría', 'Energía',
    'Paciencia', 'Verdad', 'Determinación', 'Amor Compasivo', 'Ecuanimidad'];

// Generate and place the main topic
$("#bhavana_forTodayMainTopic").html(bhavana_forTodayMainTopics[4]);

// For todays

/*
 * var bhavana_forTodayTasks = [];
var bhavana_forTodayQuotes = [];

bhavana_forTodayTasks.push('Deje ir las barreras, observe aquello que nos une a todos los seres.');
bhavana_forTodayQuotes.push('El engaño fundamental de la humanidades suponer que Yo estoy aquí y tú estás allí afuera. -Yasutani Roshi');
*/

// Random number
var q = Math.floor((Math.random() * 6)) + 1;
console.log("Using random task: " + q);
var bhavana_forTodayTasks = [
{0: 'Deje ir las barreras, observe aquello que nos une a todos los seres.',
    1: 'El engaño fundamental de la humanidades suponer que Yo estoy aquí y tú estás allí afuera. -Yasutani Roshi'},
{0: 'Observe sin juzgar, sin evaluar. Con la mente abierta a todo aquello que suceda.',
    1: 'La habilidad de observar sin evaluar es la forma más elevada de inteligencia -Krishnamurti'},
{0: 'Deje ir el pasado, no limite el futuro con ataduras, esté presente en cada momento y sea libre para ser feliz.',
    1: 'Así como una serpiente cambia de piel, debemos dejar atrás el pasado una y otra vez -Buda'},
{0: 'Observe sus problemas, estúdielos, sin juzgarlos, sin cuestionarlos, simplemente, obsérvelos. ¿Cuáles son reales? ¿Cuáles imaginarios?',
    1: 'El hombre no está preocupado por los problemas reales tanto como por sus ansiedades imaginadas sobre los problemas reales. - Epictelo'},
{0: 'Observe su mente, en todo momento, en toda respiración, con cada movimiento, solo observe y esté atento a lo que pasa por ella.',
    1: 'Vigile sus pensamientos; estos se convierten en palabras. Vigile sus palabras; estos se convierten en acciones. Vigile sus acciones; estos se convierten en hábitos. Vigile sus hábitos; estos se convierten en carácter. Vigile su carácter; este se convierte en su destino." - Upanishads'},
{0: 'Reconozca sus estados de animo, no huya de ellos, acéptelos y déjelos ir tranquilamente, haga la paz con ellos.',
    1: 'Cuando comienzas a escuchar el sonido del silencio, es una señal de vacío - del silencio de la mente. Es algo a lo que siempre puedes recurrir. - Ajahn Sumedho'},
{0: 'Haga una pausa antes de reaccionar, tome su tiempo para observar su mente y responder con calma ante las situaciones del día.',
    1: 'Los sentimientos vienen y van como nubes en un cielo ventoso. La respiración consciente es mi ancla. - Thích Nhất Hạnh'}];

$("#bhavana_forTodayText").html(bhavana_forTodayTasks[q][0]);
$("#bhavana_forTodayQuote").html(bhavana_forTodayTasks[q][1]);

