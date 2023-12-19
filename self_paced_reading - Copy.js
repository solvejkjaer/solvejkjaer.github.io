
var jsPsych = initJsPsych({
  show_progress_bar: true,
  message_progress_bar: ' ',
  on_finish: function() {
      jsPsych.data.get().localSave('csv',participant_id + '_selfpacedreading.csv');      
    }
  })

var timeline = [];

jsPsych.data.addProperties({start_time: (new Date()).toISOString()});
var participant_id = jsPsych.randomization.randomID(8);
jsPsych.data.addProperties({participant: participant_id});

// velkommen og fuld skærm
var enter_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  message: "<p>Velkommen til eksperimentet.</p><p>Tak fordi du vil v&aeligre med!</p>",
  button_label: "Klik her for at forts&aeligtte"
};
timeline.push(enter_fullscreen)

/*
// samtykke
var consent = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 'samtykkerklaering',
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
    data.education = data.response.Q0
  }
}
timeline.push(dyslexia)
*/

// instruktioner
var instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: 
      "<p>I dette eksperiment vil du blive bedt om at l&aeligse nogle s&aeligtninger.</p>"+
      "<p>S&aeligtningerne skal l&aeligses &eacutet ord ad gangen. Du trykker p&aring mellemrum for at g&aring videre fra ord til ord.</p>"+
      "<p>Efter nogle af s&aeligtningerne vil der v&aeligre forst&aringelsessp&oslashrgsm&aringl.<p>"+
      "<p>F&oslashrst er der to &oslashveopgaver.</p>",
    choices: ["Klik her for at begynde"],
    post_trial_gap: 1000
  };
timeline.push(instructions)

// funktion til at lave self-paced reading trials
function make_spr_trial(sentence_context, sentence, sentence_id, context_type, target_phrase, target_word, filler_condition, target_syllables, question, answer_1, answer_2, correct_response) {
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
                // så tre asterisker
                {stimulus: "<p style='font-size:48px'>* * *</p>",
                choices: "NO_KEYS",
                trial_duration: 500},
              // så forståelsesspørgsmål
                {type: jsPsychHtmlButtonResponse,
                  stimulus: function () {
                    // Define the regular stimulus
                    var regularStimulus = '<div style="font-size:40px">' + question + "</div>";
                    // Randomly choose whether to use the regular stimulus or a different one
                    window.useRegularStimulus = Math.random() > 0.75;
                    // If using the regular stimulus, return it; otherwise, return a different stimulus
                    return window.useRegularStimulus ? regularStimulus : '<div style="font-size:40px">Different Stimulus</div>';
                  },
                  choices: function () {
                    // Define regular choices
                    var regularChoices = [answer_1, answer_2];
                    // Define different choices
                    var differentChoices = ['Forts&aeligt'];
                    // Return choices based on whether regular or different stimulus was used
                    return window.useRegularStimulus ? regularChoices : differentChoices;
                  },
                on_finish: function(data) {
                  data.context = sentence_context
                  data.sentence = sentence
                    data.sentence_id = sentence_id
                    data.context_type = context_type
                    data.target_phrase = target_phrase
                    data.target_word = target_word
                    data.filler_condition = filler_condition
                    data.target_syllables = target_syllables
                    data.question = question
                    data.answer_1 = answer_1
                    data.answer_2 = answer_2
                    data.correct_response = correct_response
                }
                }
              ]}
  return trial 
}

// stimuli
var sentences = [ 
// item 1
{ s1: "Mette sp&oslashrger hvad jeg vil have at drikke.", s2: "Jeg siger at jeg gerne vil have en kop sort kaffe med m&aeliglk.", sentence_id: '1', context_type: 'neutral', target_phrase: 'en kop sort kaffe', target_word: 'kaffe', filler_condition: 'no', target_syllables: '2', question: '<p>Hvad vil jeg have i kaffen?</p>', answer_1: 'Sukker', answer_2: 'M&aeliglk', correct_response: '1'},
{ s1: "Mette sp&oslashrger hvad jeg vil have at drikke. ", s2: "Jeg siger at jeg gerne vil have en kop sort kaffe med m&aeliglk.", sentence_id: '1', context_type: 'neutral', target_phrase: 'en kop sort kaffe', target_word: 'kaffe', filler_condition: 'no', target_syllables: '2', question: '<p>Hvad vil jeg have i kaffen?</p>', answer_1: 'Sukker', answer_2: 'M&aeliglk', correct_response: '1'}, 
{ s1: "Mette sp&oslashrger hvad jeg vil have at drikke. ", s2: "Jeg siger at jeg gerne vil have en kop sort kaffe med m&aeliglk.", sentence_id: '1', context_type: 'neutral', target_phrase: 'en kop sort kaffe', target_word: 'kaffe', filler_condition: 'no', target_syllables: '2', question: '<p>Hvad vil jeg have i kaffen?</p>', answer_1: 'Sukker', answer_2: 'M&aeliglk', correct_response: '1'}, 
{ s1: "Mette sp&oslashrger hvad jeg vil have at drikke. ", s2: "Jeg siger at jeg gerne vil have en kop sort kaffe med m&aeliglk.", sentence_id: '1', context_type: 'neutral', target_phrase: 'en kop sort kaffe', target_word: 'kaffe', filler_condition: 'no', target_syllables: '2', question: '<p>Hvad vil jeg have i kaffen?</p>', answer_1: 'Sukker', answer_2: 'M&aeliglk', correct_response: '1'},  
]

// randomisering
sentences = jsPsych.randomization.repeat(sentences, 1);

/*
// øve-trials
var spr_trial_1 = make_spr_trial("Jeg henter en kande vand i bryggerset for at vande potteplanten i stuen.",
'p1','practice','NA', 'NA', 'no', 'NA', '<p>Hvor henter jeg vand?</p>', 'Bryggerset', 'K&oslashkkenet', '0')
var spr_trial_2 = make_spr_trial("Katten ser en fugl ude i tr&aeliget. Den kradser for at komme ud paa terassen.",
'p2','practice','NA', 'NA', 'no', 'NA', '<p>Hvor er fuglen?</p>', 'Tr&aeliget', 'Terassen', '0')

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
*/

// eksperiment start
var experiment_start = {
  type: jsPsychHtmlButtonResponse,
  stimulus: "<p>Nu begynder det rigtige eksperiment.</p>",
  choices: ["Klik her for at begynde"],
  post_trial_gap: 1000
};
timeline.push(experiment_start)

for (var i in sentences) {
  timeline.push(make_spr_trial(sentences[i]["s1"], sentences[i]["s2"], sentences[i]['sentence_id'], sentences[i]['context_type'],sentences[i]['target_phrase'], sentences[i]['target_word'], sentences[i]['filler_condition'], sentences[i]['target_syllables'], sentences[i]['question'], sentences[i]['answer_1'], sentences[i]['answer_2'], sentences[i]['correct_response']))
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