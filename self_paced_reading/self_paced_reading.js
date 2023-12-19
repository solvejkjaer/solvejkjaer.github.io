
var jsPsych = initJsPsych({
  show_progress_bar: true,
  message_progress_bar: ' ',
  on_finish: function() {
      jsPsych.data.get().localSave('csv',participant_id + '_selfpacedreading.csv');      
    }
  })

  var version = jsPsych.version();
  console.log(version);

var timeline = [];

jsPsych.data.addProperties({start_time: (new Date()).toISOString()});
var participant_id = jsPsych.randomization.randomID(8);
jsPsych.data.addProperties({participant: participant_id});

// velkommen og fuld skærm
var enter_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  message: "<p>Velkommen til dette eksperiment om s&aeligtningsprocessering.</p><p>Tak fordi du vil v&aeligre med!</p>",
  button_label: "Klik her for at forts&aeligtte"
};
timeline.push(enter_fullscreen)

// samtykke
var consent = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 
      "<p>N&aringr du trykker p&aring Forts&aeligt vil fors&oslashget starte.</p>"+
      "<p>Ved at trykke p&aring Forts&aeligt giver du samtidig tilladelse til, at der m&aring "+
      "indsamles data om din l&aeligsetid og dine svar p&aring nogle l&aeligsesp&oslashrgsm&aringl.</p>"+
      "<p>Disse data vil blive brugt til min eksamensopgave i Lingvistisk Emne. Alt vil blive gemt fuldst&aeligndig anonymt.</p>"+
      "<p>Du kan tr&aeligkke dit samtykke tilbage b&aringde f&oslashr, under og efter eksperimentet "+
      "(ved at kontakte mig p&aring solvej.kjaer@gmail.com), hvorefter dine data vil blive slettet.</p>"+
      "<p>Igen, tusind tak for din deltagelse!</p>",
  choices: ['Forts&aeligt']
};
timeline.push(consent)

//demografi
var age = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    { prompt: "Hvor gammel er du?",
      options: ["18 - 30", "31 - 50", "51 - 70", "71 - "], 
      required: true
    }
  ],
  button_label: "Fortsaet",
  on_finish: function(data) {
    data.age = data.response.Q0
  }
}
timeline.push(age)

var language = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    { prompt: "Er dit modersm&aringl dansk?",
      options: ["Ja", "Nej"], 
      required: true
    }
  ],
  button_label: "Fortsaet",
  on_finish: function(data) {
    data.language = data.response.Q0
  }
}
timeline.push(language)

var dyslexia = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    { prompt: "Er du ordblind?",
      options: ["Ja", "Nej"], 
      required: true
    }
  ],
  button_label: "Fortsaet",
  on_finish: function(data) {
    data.dyslexia = data.response.Q0
  }
}
timeline.push(dyslexia)

// instruktioner
var instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: 
      "<p>I dette eksperiment vil du blive bedt om at l&aeligse nogle s&aeligtninger.</p>"+
      "<p>Nogle af s&aeligtningerne skal l&aeligses &eacutet ord ad gangen. Du trykker p&aring mellemrum for at g&aring videre fra ord til ord og fra s&aeligtning til s&aeligtning.</p>"+
      "<p>Efter nogle af s&aeligtningerne vil der v&aeligre forst&aringelsessp&oslashrgsm&aringl.<p>"+
      "<p>F&oslashrst er der to &oslashveopgaver.</p>",
    choices: ["Klik her for at begynde"],
    post_trial_gap: 1000
  };
timeline.push(instructions)

// funktion til at lave self-paced reading trials
function make_spr_trial(sentence_context, sentence, sentence_id, context_type, frequency, target_phrase, target_word, filler_condition, target_syllables, question, answer_1, answer_2, correct_response) {
  var sentence_as_word_list = sentence.split(" ") // del sætningen op ved mellemrum
  var sentence_as_stimulus_sequence = [] // tom stimulus sequence til at starte med
  for (var word of sentence_as_word_list) { // for hvert ord i sentence_as_word_list
    sentence_as_stimulus_sequence.push({'stimulus': "<p style='font-size:48px'>" + word +" </p>",
    data: {current_word:word}
    })
  }
  var trial = {type: jsPsychHtmlKeyboardResponse, 
               timeline:[
                // først kontekst
                {stimulus: '<div style="font-size:40px">' + sentence_context + "</div>",
                choices: [" "]},
                // så fikseringskryds
                {stimulus: "<p style='font-size:48px'>+</p>",
                choices: "NO_KEYS",
                trial_duration: jsPsych.randomization.sampleWithReplacement([200, 500, 750, 300, 800, 250],1)}, // jeg varierer varigheden af fikseringskrydset
                // så self-paced reading
                {choices: [" "],
                timeline: sentence_as_stimulus_sequence},
               ],
              };
              // forståelsesspørgsmål 25% af gangene
              if (Math.random() <= 0.25) {
              trial.timeline.push({ stimulus: "<p style='font-size:48px'>* * *</p>", choices: "NO_KEYS", trial_duration: 500 });
              trial.timeline.push({
                type: jsPsychHtmlButtonResponse,
                stimulus: question,
                choices: [answer_1, answer_2],
                on_finish: function (data) {
                  data.context = sentence_context;
                  data.sentence = sentence;
                  data.sentence_id = sentence_id;
                  data.context_type = context_type;
                  data.frequency = frequency;
                  data.target_phrase = target_phrase;
                  data.target_word = target_word;
                  data.filler_condition = filler_condition;
                  data.target_syllables = target_syllables;
                  data.question = question;
                  data.answer_1 = answer_1;
                  data.answer_2 = answer_2;
                  data.correct_response = correct_response;
                  },
              });
              }
              // ellers bare de tre asterisker
              else {
              trial.timeline.push({
                stimulus: "<p style='font-size:48px'>* * *</p>", 
                choices: "NO_KEYS", 
                trial_duration: 500,
                on_finish: function (data) {
                  data.context = sentence_context;
                  data.sentence = sentence;
                  data.sentence_id = sentence_id;
                  data.context_type = context_type;
                  data.frequency = frequency;
                  data.target_phrase = target_phrase;
                  data.target_word = target_word;
                  data.filler_condition = filler_condition;
                  data.target_syllables = target_syllables;
                  data.question = question;
                  data.answer_1 = answer_1;
                  data.answer_2 = answer_2;
                  data.correct_response = correct_response;
                },
              },)
              }
            return trial;
          }

// samme funktion, bare til øve-trials (dvs. altid med forståelsesspørgsmål)
function make_spr_practice_trial(sentence_context, sentence, sentence_id, context_type, frequency, target_phrase, target_word, filler_condition, target_syllables, question, answer_1, answer_2, correct_response) {
  var sentence_as_word_list = sentence.split(" ") // del sætningen op ved mellemrum
  var sentence_as_stimulus_sequence = [] // tom stimulus sequence til at starte med
  for (var word of sentence_as_word_list) { // for hvert ord i sentence_as_word_list
    sentence_as_stimulus_sequence.push({'stimulus': "<p style='font-size:48px'>" + word +" </p>",
    data: {current_word:word}
    })
  }
  var trial = {type: jsPsychHtmlKeyboardResponse, 
               timeline:[
                // først kontekst
                {stimulus: '<div style="font-size:40px">' + sentence_context + "</div>",
                choices: [" "]},
                // så fikseringskryds
                {stimulus: "<p style='font-size:48px'>+</p>",
                choices: "NO_KEYS",
                trial_duration: jsPsych.randomization.sampleWithReplacement([200, 500, 750, 300, 800, 250],1)}, // jeg varierer varigheden af fikseringskrydset
                // så self-paced reading
                {choices: [" "],
                timeline: sentence_as_stimulus_sequence},
               ],
              };
              // forståelsesspørgsmål
              trial.timeline.push({ stimulus: "<p style='font-size:48px'>* * *</p>", choices: "NO_KEYS", trial_duration: 500 });
              trial.timeline.push({
                type: jsPsychHtmlButtonResponse,
                stimulus: question,
                choices: [answer_1, answer_2],
                on_finish: function (data) {
                  data.context = sentence_context;
                  data.sentence = sentence;
                  data.sentence_id = sentence_id;
                  data.context_type = context_type;
                  data.frequency = frequency;
                  data.target_phrase = target_phrase;
                  data.target_word = target_word;
                  data.filler_condition = filler_condition;
                  data.target_syllables = target_syllables;
                  data.question = question;
                  data.answer_1 = answer_1;
                  data.answer_2 = answer_2;
                  data.correct_response = correct_response;
                  },
              });
            return trial;
          }

// stimuli
var sentences = [ 
// item 1
{ s1: "Peter cykler afsted om aftenen.", s2: "Det har sneet i l&oslashbet af dagen s&aring vejen er glat.", sentence_id: '1', context_type: 'congruent', frequency: 'high', target_phrase: 'i l&oslashbet af dagen', target_word: 'dagen', filler_condition: 'no', target_syllables: '2', question: '<p>Hvorn&aringr cykler Peter afsted?</p>', answer_1: 'om aftenen', answer_2: 'om morgenen', correct_response: '0'},
{ s1: "Jakob k&oslashrer afsted om morgenen.", s2: "Det har sneet i l&oslashbet af dagen s&aring vejen er glat.", sentence_id: '1', context_type: 'incongruent', frequency: 'high', target_phrase: 'i l&oslashbet af dagen', target_word: 'dagen', filler_condition: 'no', target_syllables: '2', question: '<p>Hvem k&oslashrer afsted?</p>', answer_1: 'Peter', answer_2: 'Jakob', correct_response: '1'}, 
{ s1: "Gitte cykler afsted igen.", s2: "Det har sneet i l&oslashbet af dagen s&aring vejen er glat.", sentence_id: '1', context_type: 'neutral', frequency: 'high', target_phrase: 'i l&oslashbet af dagen', target_word: 'dagen', filler_condition: 'no', target_syllables: '2', question: '<p>Hvad er glat?</p>', answer_1: 'vejen', answer_2: 'stien', correct_response: '0'}, 
{ s1: "Sofie k&oslashrer afsted om morgenen.", s2: "Det har sneet i l&oslashbet af natten s&aring vejen er glat.", sentence_id: '1', context_type: 'congruent', frequency: 'low', target_phrase: 'i l&oslashbet af natten', target_word: 'natten', filler_condition: 'no', target_syllables: '2', question: '<p>Hvordan har vejret v&aeligret?</p>', answer_1: 'regn', answer_2: 'sne', correct_response: '1'},
{ s1: "Anne cykler afsted om aftenen.", s2: "Det har sneet i l&oslashbet af natten s&aring vejen er glat.", sentence_id: '1', context_type: 'incongruent', frequency: 'low', target_phrase: 'i l&oslashbet af natten', target_word: 'natten', filler_condition: 'no', target_syllables: '2', question: '<p>Hvordan kommer Anne afsted?</p>', answer_1: 'cykler', answer_2: 'k&oslashrer', correct_response: '0'}, 
{ s1: "Mikkel k&oslashrer afsted igen.", s2: "Det har sneet i l&oslashbet af natten s&aring vejen er glat.", sentence_id: '1', context_type: 'neutral', frequency: 'low', target_phrase: 'i l&oslashbet af natten', target_word: 'natten', filler_condition: 'no', target_syllables: '2', question: '<p>Hvem k&oslashrer afsted?</p>', answer_1: 'Jakob', answer_2: 'Mikkel', correct_response: '1'},  
// item 2
{ s1: "Sarah er dygtig til at bruge Excel.", s2: "Det er det der g&oslashr det muligt at l&oslashse opgaven.", sentence_id: '2', context_type: 'congruent', frequency: 'high', target_phrase: 'der g&oslashr det muligt', target_word: 'muligt', filler_condition: 'no', target_syllables: '2', question: '<p>Hvem er dygtig til Excel?</p>', answer_1: 'Sarah', answer_2: 'Lene', correct_response: '0'}, 
{ s1: "Jonas er d&aringrlig til at bruge Excel.", s2: "Det er det der g&oslashr det muligt at l&oslashse opgaven.", sentence_id: '2', context_type: 'incongruent', frequency: 'high', target_phrase: 'der g&oslashr det muligt', target_word: 'muligt', filler_condition: 'no', target_syllables: '2', question: '<p>Hvad er Jonas d&aringrlig til?</p>', answer_1: 'PowerPoint', answer_2: 'Excel', correct_response: '1'},  
{ s1: "Matilde har valgt at bruge PowerPoint.", s2: "Det er det der g&oslashr det muligt at l&oslashse opgaven.", sentence_id: '2', context_type: 'neutral', frequency: 'high', target_phrase: 'der g&oslashr det muligt', target_word: 'muligt', filler_condition: 'no', target_syllables: '2', question: '<p>Hvad skal Matilde l&oslashse?</p>', answer_1: 'opgaven', answer_2: 'problemet', correct_response: '0'}, 
{ s1: "Martin er d&aringrlig til at bruge PowerPoint.", s2: "Det er det der g&oslashr det sv&aeligrt at l&oslashse opgaven.", sentence_id: '2', context_type: 'congruent', frequency: 'low', target_phrase: 'der g&oslashr det sv&aeligrt', target_word: 'sv&aeligrt', filler_condition: 'no', target_syllables: '1', question: '<p>Hvem skal l&oslashse opgaven?</p>', answer_1: 'Jonas', answer_2: 'Martin', correct_response: '1'},  
{ s1: "Emilie er dygtig til at bruge PowerPoint.", s2: "Det er det der g&oslashr det sv&aeligrt at l&oslashse opgaven.", sentence_id: '2', context_type: 'incongruent', frequency: 'low', target_phrase: 'der g&oslashr det sv&aeligrt', target_word: 'sv&aeligrt', filler_condition: 'no', target_syllables: '1', question: '<p>Hvad skal Emilie l&oslashse?</p>', answer_1: 'opgaven', answer_2: 'problemet', correct_response: '0'}, 
{ s1: "Nikolaj har valgt at bruge Excel.", s2: "Det er det der g&oslashr det sv&aeligrt at l&oslashse opgaven.", sentence_id: '2', context_type: 'neutral', frequency: 'low', target_phrase: 'der g&oslashr det sv&aeligrt', target_word: 'sv&aeligrt', filler_condition: 'no', target_syllables: '1', question: '<p>Hvad har Nikolaj valgt at bruge?</p>', answer_1: 'PowerPoint', answer_2: 'Excel', correct_response: '1'},  
// item 3
{ s1: "Eleverne forst&aringr godt andengradsligninger.", s2: "Men det kan v&aeligre sv&aeligrt at l&oslashse dem.", sentence_id: '3', context_type: 'congruent', frequency: 'high', target_phrase: 'det kan v&aeligre sv&aeligrt', target_word: 'sv&aeligrt', filler_condition: 'no', target_syllables: '1', question: '<p>Hvem forst&aringr godt andengradsligninger?</p>', answer_1: 'eleverne', answer_2: 'b&oslashrnene', correct_response: '0'}, 
{ s1: "B&oslashrnene forst&aringr ikke f&oslashrstegradsligninger.", s2: "Men det kan v&aeligre sv&aeligrt at l&oslashse dem.", sentence_id: '3', context_type: 'incongruent', frequency: 'high', target_phrase: 'det kan v&aeligre sv&aeligrt', target_word: 'sv&aeligrt', filler_condition: 'no', target_syllables: '1', question: '<p>Hvad forst&aringr b&oslashrnene ikke?</p>', answer_1: 'andengradsligninger', answer_2: 'f&oslashrstegradsligninger', correct_response: '1'},  
{ s1: "De studerende har delte meninger om andengradsligninger.", s2: "Men det kan v&aeligre sv&aeligrt at l&oslashse dem.", sentence_id: '3', context_type: 'neutral', frequency: 'high', target_phrase: 'det kan v&aeligre sv&aeligrt', target_word: 'sv&aeligrt', filler_condition: 'no', target_syllables: '1', question: '<p>Hvem har delte meninger?</p>', answer_1: 'de studerende', answer_2: 'eleverne', correct_response: '0'}, 
{ s1: "De studerende forst&aringr ikke andengradsligninger.", s2: "Men det kan v&aeligre muligt at l&oslashse dem.", sentence_id: '3', context_type: 'congruent', frequency: 'low', target_phrase: 'det kan v&aeligre muligt', target_word: 'muligt', filler_condition: 'no', target_syllables: '2', question: '<p>Hvad skal l&oslashses?</p>', answer_1: 'f&oslashrstegradsligninger', answer_2: 'andengradsligninger', correct_response: '1'},  
{ s1: "Eleverne forst&aringr godt andengradsligninger.", s2: "Men det kan v&aeligre muligt at l&oslashse dem.", sentence_id: '3', context_type: 'incongruent', frequency: 'low', target_phrase: 'det kan v&aeligre muligt', target_word: 'muligt', filler_condition: 'no', target_syllables: '2', question: '<p>Hvem forst&aringr godt andengradsligninger?</p>', answer_1: 'eleverne', answer_2: 'de studerende', correct_response: '0'}, 
{ s1: "B&oslashrnene har delte meninger om f&oslashrstegradsligninger.", s2: "Men det kan v&aeligre muligt at l&oslashse dem.", sentence_id: '3', context_type: 'neutral', frequency: 'low', target_phrase: 'det kan v&aeligre muligt', target_word: 'muligt', filler_condition: 'no', target_syllables: '2', question: '<p>Hvad skal l&oslashses?</p>', answer_1: 'andengradsligninger', answer_2: 'f&oslashrstegradsligninger', correct_response: '1'},  
// item 4
{ s1: "Hans skriver koncentreret p&aring sin roman.", s2: "Det m&aring v&aeligre en god id&eacute han har f&aringet.", sentence_id: '4', context_type: 'congruent', frequency: 'high', target_phrase: 'v&aeligre en god id&eacute', target_word: 'id&eacute', filler_condition: 'no', target_syllables: '2', question: '<p>Hvem skriver?</p>', answer_1: 'Hans', answer_2: 'Noah', correct_response: '0'}, 
{ s1: "Magnus h&aelignger ud med sin klassekammerat.", s2: "Det m&aring v&aeligre en god id&eacute han har f&aringet.", sentence_id: '4', context_type: 'incongruent', frequency: 'high', target_phrase: 'v&aeligre en god id&eacute', target_word: 'id&eacute', filler_condition: 'no', target_syllables: '2', question: '<p>Hvem h&aelignger Magnus ud med?</p>', answer_1: 'en fodboldkammerat', answer_2: 'en klassekammerat', correct_response: '1'},  
{ s1: "Noah cykler glad hen ad vejen.", s2: "Det m&aring v&aeligre en god id&eacute han har f&aringet.", sentence_id: '4', context_type: 'neutral', frequency: 'high', target_phrase: 'v&aeligre en god id&eacute', target_word: 'id&eacute', filler_condition: 'no', target_syllables: '2', question: '<p>Hvad laver Noah?</p>', answer_1: 'cykler', answer_2: 'l&oslashber', correct_response: '0'}, 
{ s1: "Markus h&aelignger ud med sin klassekammerat.", s2: "Det m&aring v&aeligre en god ven han har f&aringet.", sentence_id: '4', context_type: 'congruent', frequency: 'low', target_phrase: 'v&aeligre en god ven', target_word: 'ven', filler_condition: 'no', target_syllables: '1', question: '<p>Hvem h&aelignger ud med sin klassekammerat?</p>', answer_1: 'Tobias', answer_2: 'Markus', correct_response: '1'},  
{ s1: "Simon skriver koncentreret p&aring sin roman.", s2: "Det m&aring v&aeligre en god ven han har f&aringet.", sentence_id: '4', context_type: 'incongruent', frequency: 'low', target_phrase: 'v&aeligre en god ven', target_word: 'ven', filler_condition: 'no', target_syllables: '1', question: '<p>Hvad skriver Simon p&aring?</p>', answer_1: 'roman', answer_2: 'opgave', correct_response: '0'}, 
{ s1: "Tobias cykler glad hen ad vejen.", s2: "Det m&aring v&aeligre en god ven han har f&aringet.", sentence_id: '4', context_type: 'neutral', frequency: 'low', target_phrase: 'v&aeligre en god ven', target_word: 'ven', filler_condition: 'no', target_syllables: '1', question: '<p>Hvor cykler Tobias?</p>', answer_1: 'stien', answer_2: 'vejen', correct_response: '1'},  
// item 5
{ s1: "&AEligbleskiverne ser gode ud oppefra.", s2: "Men p&aring den anden side bliver de br&aeligndte.", sentence_id: '5', context_type: 'congruent', frequency: 'high', target_phrase: 'p&aring den anden side', target_word: 'side', filler_condition: 'no', target_syllables: '2', question: '<p>Hvad ser godt ud?</p>', answer_1: '&aeligbleskiverne', answer_2: 'pandekagerne', correct_response: '0'}, 
{ s1: "Pandekagerne bliver gode med denne teknik.", s2: "Men p&aring den anden side bliver de br&aeligndte.", sentence_id: '5', context_type: 'incongruent', frequency: 'high', target_phrase: 'p&aring den anden side', target_word: 'side', filler_condition: 'no', target_syllables: '2', question: '<p>Hvad bliver pandekagerne?</p>', answer_1: 'kolde', answer_2: 'br&aeligndte', correct_response: '1'},  
{ s1: "&AEligbleskiverne steger i panden.", s2: "Men p&aring den anden side bliver de br&aeligndte.", sentence_id: '5', context_type: 'neutral', frequency: 'high', target_phrase: 'p&aring den anden side', target_word: 'side', filler_condition: 'no', target_syllables: '2', question: '<p>Hvor er &aeligbleskiverne?</p>', answer_1: 'panden', answer_2: 'fadet', correct_response: '0'}, 
{ s1: "Pandekagerne bliver gode med denne teknik.", s2: "Men p&aring den anden m&aringde bliver de br&aeligndte.", sentence_id: '5', context_type: 'congruent', frequency: 'low', target_phrase: 'p&aring den anden m&aringde', target_word: 'm&aringde', filler_condition: 'no', target_syllables: '2', question: '<p>Hvad bliver godt med denne teknik?</p>', answer_1: '&aeligbleskiverne', answer_2: 'pandekagerne', correct_response: '1'},  
{ s1: "&AEligbleskiverne ser gode ud oppefra.", s2: "Men p&aring den anden m&aringde bliver de br&aeligndte.", sentence_id: '5', context_type: 'incongruent', frequency: 'low', target_phrase: 'p&aring den anden m&aringde', target_word: 'm&aringde', filler_condition: 'no', target_syllables: '2', question: '<p>Hvad bliver &aeligbleskiverne?</p>', answer_1: 'br&aeligndte', answer_2: 'kolde', correct_response: '0'}, 
{ s1: "Pandekagerne steger p&aring panden.", s2: "Men p&aring den anden m&aringde bliver de br&aeligndte.", sentence_id: '5', context_type: 'neutral', frequency: 'low', target_phrase: 'p&aring den anden m&aringde', target_word: 'm&aringde', filler_condition: 'no', target_syllables: '2', question: '<p>Hvad g&oslashr pandekagerne?</p>', answer_1: 'afk&oslashler', answer_2: 'steger', correct_response: '1'},  
// filler 1
{ s1: "Hanna henter to kopper i skabet.", s2: "Hun h&aeliglder kaffe op til Peter og sig selv.", sentence_id: 'f1', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvor henter Hanna kopperne?</p>', answer_1: 'skabet', answer_2: 'hylden', correct_response: '0'}, 
{ s1: "Emil henter to glas i skabet.", s2: "Han h&aeliglder saft op til Peter og sig selv.", sentence_id: 'f1', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvad henter Emil?</p>', answer_1: 'kopper', answer_2: 'glas', correct_response: '1'},  
{ s1: "Tina henter to kopper fra hylden.", s2: "Hun h&aeliglder kaffe op til Peter og sig selv.", sentence_id: 'f1', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvem h&aeliglder Tina kaffe op til?</p>', answer_1: 'Peter', answer_2: 'Emil', correct_response: '0'}, 
{ s1: "Frederik henter to glas i skabet.", s2: "Han h&aeliglder saft op til Peter og sig selv.", sentence_id: 'f1', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvem henter glassene?</p>', answer_1: 'Peter', answer_2: 'Frederik', correct_response: '1'},  
// filler 2
{ s1: "De &aeligldre mennesker venter p&aring bussen.", s2: "Men der g&aringr lang tid f&oslashr den kommer.", sentence_id: 'f2', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvad venter de &aeligldre mennesker p&aring?</p>', answer_1: 'bussen', answer_2: 'metroen', correct_response: '0'}, 
{ s1: "De unge mennesker venter p&aring metroen.", s2: "Men der g&aringr lang tid f&oslashr den kommer.", sentence_id: 'f2', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvor l&aelignge g&aringr der?</p>', answer_1: 'kort tid', answer_2: 'lang tid', correct_response: '1'},  
{ s1: "De &aeligldre mennesker venter p&aring metroen.", s2: "Der g&aringr ikke lang tid f&oslashr den kommer.", sentence_id: 'f2', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvem venter p&aring metroen?</p>', answer_1: 'de &aeligldre', answer_2: 'de unge', correct_response: '0'}, 
{ s1: "De unge mennesker venter p&aring bussen.", s2: "Der g&aringr ikke lang tid f&oslashr den kommer.", sentence_id: 'f2', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvad venter de unge mennesker p&aring?</p>', answer_1: 'metroen', answer_2: 'bussen', correct_response: '1'},  
// filler 3
{ s1: "Kartoflerne skal koge ret l&aelignge.", s2: "Men de m&aring ikke blive for mosede.", sentence_id: 'f3', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvad skal kartoflerne?</p>', answer_1: 'koge', answer_2: 'bage', correct_response: '0'}, 
{ s1: "&AEligggene skal koge ret l&aelignge.", s2: "Men de m&aring ikke blive for h&aringrde.", sentence_id: 'f3', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvad skal koge?</p>', answer_1: 'kartoflerne', answer_2: '&aeligggene', correct_response: '1'},  
{ s1: "Pastaerne skal koge ret l&aelignge.", s2: "Men de m&aring ikke blive for bl&oslashde.", sentence_id: 'f3', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvad m&aring pastaerne ikke blive?</p>', answer_1: 'bl&oslashde', answer_2: 'h&aringrde', correct_response: '0'}, 
{ s1: "Kartoflerne skal koge ret kort tid.", s2: "Men de m&aring ikke blive for h&aringrde.", sentence_id: 'f3', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvad skal koge?</p>', answer_1: '&aeligggene', answer_2: 'kartoflerne', correct_response: '1'},  
// filler 4
{ s1: "Lone k&oslashber et rugbr&oslashd hos bageren.", s2: "Det er m&oslashrkt og med gr&aeligskarkerner.", sentence_id: 'f4', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvad k&oslashber Lone?</p>', answer_1: 'et rugbr&oslashd', answer_2: 'et franskbr&oslashd', correct_response: '0'}, 
{ s1: "Linda k&oslashber et franskbr&oslashd hos bageren.", s2: "Det er lyst og med gr&aeligskarkerner.", sentence_id: 'f4', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvad er franskbr&oslashdet med?</p>', answer_1: 'solsikkekerner', answer_2: 'gr&aeligskarkerner', correct_response: '1'},  
{ s1: "Lars k&oslashber et rugbr&oslashd hos bageren.", s2: "Det er m&oslashrkt og med solsikkekerner.", sentence_id: 'f4', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvem k&oslashber rugbr&oslashd?</p>', answer_1: 'Lars', answer_2: 'Mads', correct_response: '0'}, 
{ s1: "Mads k&oslashber et franskbr&oslashd i Brugsen.", s2: "Det er lyst og med solsikkekerner.", sentence_id: 'f4', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvor k&oslashber Mads franskbr&oslashd?</p>', answer_1: 'bageren', answer_2: 'Brugsen', correct_response: '1'},  
// filler 5
{ s1: "Signe arbejder ved sin b&aeligrbare computer.", s2: "Men de larmende b&oslashrn forstyrrer hende.", sentence_id: 'f5', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvem arbejder?</p>', answer_1: 'Signe', answer_2: 'Karla', correct_response: '0'}, 
{ s1: "Karla arbejder ved sin station&aeligre computer.", s2: "Men de larmende maskiner forstyrrer hende.", sentence_id: 'f5', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvad er Karlas computer?</p>', answer_1: 'b&aeligrbar', answer_2: 'station&aeligr', correct_response: '1'},  
{ s1: "Sofus arbejder ved sin b&aeligrbare computer.", s2: "Men de larmende maskiner forstyrrer ham.", sentence_id: 'f5', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvad larmer?</p>', answer_1: 'maskiner', answer_2: 'b&oslashrn', correct_response: '0'}, 
{ s1: "Niels arbejder ved sin station&aeligre computer.", s2: "Men de larmende b&oslashrn forstyrrer ham.", sentence_id: 'f5', context_type: 'NA', frequency: 'NA', target_phrase: 'NA', target_word: 'NA', filler_condition: 'yes', target_syllables: 'NA', question: '<p>Hvem bliver forstyrret?</p>', answer_1: 'Sofus', answer_2: 'Niels', correct_response: '1'},  
]

// randomisering
sentences = jsPsych.randomization.repeat(sentences, 1);

// øve-trials
var spr_trial_1 = make_spr_practice_trial("Mette henter en kande vand i bryggerset.", "Hun vil vande planten i stuen.",
'p1','practice','NA', 'NA', 'NA', 'no', 'NA', '<p>Hvor henter Mette vand?</p>', 'Bryggerset', 'K&oslashkkenet', '0')
var spr_trial_2 = make_spr_practice_trial("Katten ser en fugl ude i tr&aeliget.", "Den kradser for at komme ud p&aring terassen.",
'p2','practice','NA', 'NA', 'NA', 'no', 'NA', '<p>Hvor er fuglen?</p>', 'Tr&aeliget', 'Terassen', '0')

timeline.push(spr_trial_1)

// feedback på øve-trial 1
var feedback_trial_1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    var previousResponse = jsPsych.data.getLastTrialData().values()[0].response;
    console.log('Previous Response:', previousResponse);
    // vist forskelligt stimuli afhængigt af den forrige respons
    if (previousResponse === 0) {
      return '<p><span style="color: green">Korrekt!</span></p>';
    } else {
      return '<p><span style="color: red">Forkert!</span></p>'; 
    }
  },
  choices: ['Forts&aeligt'] 
}
timeline.push(feedback_trial_1)

timeline.push(spr_trial_2)

// feedback på øve-trial 2
var feedback_trial_2 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    var previousResponse = jsPsych.data.getLastTrialData().values()[0].response;
    console.log('Previous Response:', previousResponse);
    // vist forskelligt stimuli afhængigt af den forrige respons
    if (previousResponse === 0) {
      return '<p><span style="color: green">Korrekt!</span></p>';
    } else {
      return '<p><span style="color: red">Forkert!</span></p>'; 
    }
  },
  choices: ['Forts&aeligt'] 
}
timeline.push(feedback_trial_2)

// eksperiment start
var experiment_start = {
  type: jsPsychHtmlButtonResponse,
  stimulus: "<p>Nu begynder det rigtige eksperiment.</p>",
  choices: ["Klik her for at begynde"],
  post_trial_gap: 1000
};
timeline.push(experiment_start)

for (var i in sentences) {
  timeline.push(make_spr_trial(sentences[i]["s1"], sentences[i]["s2"], sentences[i]['sentence_id'], sentences[i]['context_type'], sentences[i]['frequency'], sentences[i]['target_phrase'], sentences[i]['target_word'], sentences[i]['filler_condition'], sentences[i]['target_syllables'], sentences[i]['question'], sentences[i]['answer_1'], sentences[i]['answer_2'], sentences[i]['correct_response']))
}

// eksperiment slut
var done = {
    type: jsPsychHtmlButtonResponse,
    choices: ['Afslut'],
    stimulus: function() {
      return "<p>Det var det! Tak fordi du ville v&aeligre med.</p><p>Klik for at afslutte."; 
    }
    };
timeline.push(done)

jsPsych.run(timeline);