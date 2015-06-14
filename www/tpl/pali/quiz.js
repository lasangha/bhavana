var Bhavana_paliQuiz = [
{
    pali: 'Bhūpālo bhuñjati',
    english: 'no se todavía1'
},
{
    pali: 'Puttā sayanti',
    english: 'no se todavía2'
},
{
    pali: 'Vāṇijā sayanti',
    english: 'no se todavía3'
},
{
    pali: 'Buddho passati',
    english: 'no se todavía4'
},
{
    pali: 'Buddho passati',
    english: 'no se todavía4'
},
{
    pali: 'Buddho passati',
    english: 'no se todavía4'
},
{
    pali: 'Buddho passati',
    english: 'no se todavía4'
},
{
    pali: 'Buddho passati',
    english: 'no se todavía4'
},
{
    pali: 'Buddho passati',
    english: 'no se todavía4'
},
{
    pali: 'Buddho passati',
    english: 'no se todavía4'
}
]

/**
 * Generate the question and wait for the answer
 * I will do it random
 */
function Bhavana_quizGenerateQuestion(){

    $("#bhavana_quiz_answer").hide('slow',
            function(){
                q = Math.floor((Math.random() * (Bhavana_paliQuiz.length - 1)) + 1);
                console.log("Got the question number: " + q);
                $("#bhavana_quiz_question").html(Bhavana_paliQuiz[q].pali);
                $("#bhavana_quiz_answer").html(Bhavana_paliQuiz[q].english);
            });
}

function Bhavana_quizDisplayAnswer(){
    $("#bhavana_quiz_answer").show('slow');
}

// Auto start
Bhavana_quizGenerateQuestion();
