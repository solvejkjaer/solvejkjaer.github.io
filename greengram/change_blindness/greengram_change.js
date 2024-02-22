
var jsPsych = initJsPsych({
  show_progress_bar: true,
  message_progress_bar: ' ',
  on_finish: function() {
      jsPsych.data.get().localSave('csv',participant_id + '_changeblindness.csv');
      //window.location = youtube.com      
    }
  })

var timeline = [];

jsPsych.data.addProperties({start_time: (new Date()).toISOString()});
var participant_id = jsPsych.randomization.randomID(8);
jsPsych.data.addProperties({participant: participant_id});

// welcome and full screen
var enter_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  message: 
    "<p> Misilittaanermut tikilluarit. </p><p> Qujanaq peqataarusukkavit!</p> "+ // Velkommen til eksperimentet. Tak fordi du vil være med!
    "<p> Katuamut gavekorti 60 koruuninik nalilimmik akissarsitinneqassaatit. </p>", // Du vil få et gavekort på 60 kr til Katuaq som betaling.
    //"<p> Misissueqqissaarneq x-minutsit missaani sivisussuseqassaaq. </p>", // Undersøgelsen tager cirka x minutter
  button_label: "Ingerlaqqinniarlutit una tooruk" // Klik her for at fortsætte
};
timeline.push(enter_fullscreen)

// consent
var consent = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 
    "<p> <i>Ingerlaqqigit</i> toorukku misissueqqissaarneq aallartissaaq. </p>"+ // Når du trykker på fortsæt vil forsøget starte.
    "<p> <i>Ingerlaqqigit</i> toorukku atuartariaasippit aamma apeqqutinut akissutippit paasissutissartaat uagut katersorsinnaaneranut aamma akuersissaatit. </p>"+ // Ved at trykke på 'Fortsæt' giver du også os tilladelse til at indsamle data om hvordan du læser og dine svar på nogle spørgsmål. 
    "<p> Paasissutissat tamarmik kinaassuserneqarsinnaanngitsutut toqqorneqassapput. </p>"+ // Alt data vil blive gemt fuldstændig anonymt.
    "<p> Misilittaanermi peqataarusukkunnaassaguit peqataanerit unitsissinnaavat. Kingornatigut paasissutissatit peerneqassapput. </p>"+ // Hvis du ikke længere har lyst til at være med i eksperimentet, kan du afbryde din deltagelse, hvorefter dine data vil blive slettet. 
    // For at modtage dit gavekort på 60 kr. til Katuaq skal du dog fortsætte helt til slutningen af eksperimentet. Når du er færdig bliver der gemt en fil på din computer som du skal sende til os på xxx@mail.com for at få dit gavekort tilsendt.
    "<p> Katuamut gavekorti 60 koruuninik nalilik piniarukku, pisariaqarpoq misilittaanerup naammassinissaata tungaanut peqataanissat. Naammassiguit computererni fili toqqorneqartoq, uatsinnut mailikkut  xxx nassiutissavat. Taamaasillutit gavekorti pissavat. </p>"+
    "<p> Allareernertut, qujanarujussuaq peqataanernut! </p>", // Igen, tusind tak for din deltagelse!
  choices: ['Ingerlaqqigit']
};
timeline.push(consent)

//demographics
var age = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    { prompt: "Qassinik ukioqarpit?",
      options: ["18 - 30", "31 - 50", "51 - 70", "71 - "], 
      required: true
    }
  ],
  button_label: "Ingerlaqqigit",
  on_finish: function(data) {
    data.age = data.response.Q0
  }
}
timeline.push(age)

var language = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    { prompt: "Oqaatsit sorliit ilitsoqqussatut atorpigit?",
      options: ["Kalaallisut", "Qallunaatut", "Kalaallisut qallunaatullu", "Allat"], 
      required: true
    }
  ],
  button_label: "Ingerlaqqigit",
  on_finish: function(data) {
    data.language = data.response.Q0
  }
}
timeline.push(language)

var education = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    { prompt: "Ilinniakkanni sivisunerpaaq sorleq naammassinikuuiuk?",
      options: ["Meeqqat atuarfiat naammassinikuunngilara", "Meeqqat atuarfiat", "Gymnasia", "Naatsumik nangitsilluni ilinniarneq", "Takivallaanngitsumik nangitsilluni ilinniarneq", "Sivisuumik nangitsilluni ilinniarneq"], 
      required: true
    }
  ],
  button_label: "Ingerlaqqigit",
  on_finish: function(data) {
    data.education = data.response.Q0
  }
}
timeline.push(education)

// instructions
var instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: 
      "<p>Misilittaanermi uani kalaallisut oqaaseqatigiinnik atuarnissannik piumaffigineqassaatit.</p>"+ // I dette eksperiment vil du blive bedt om at læse nogle sætninger på grønlandsk.
      "<p>Oqaaseqatigiit ilaat assigiittorujussuupput, illit paasiniassallugu suliassaraat oqaaseqatigiit assigiinnersut imaluunniit assigiinnginnersut.</p>"+ // Nogle af sætningerne ligner hinanden meget, og din opgave er at finde ud af, om sætningerne er helt ens eller ej.
      "<p>Oqaaseqatigiinni oqaatsit ataasiakkaarlugit atuassavatit. Oqaatsimiit oqaatsip tullianut nuutsinniaraangakku computerip naqitassaani akunnilersuut tuussavat.</p>"+ // Du kommer til at læse sætningerne et ord ad gangen. Tryk på mellemrumstasten for at gå videre fra et ord til det næste.
      "<p>Siullermik misiligutitut suliassat sisamaapput.</p>", // Først er der fire øveopgaver.
    choices: ["Aallartinniarlutit una tooruk"], // Klik her for at begynde.
    post_trial_gap: 1000
  };
timeline.push(instructions)

// press space to continue
var press_space = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: " ",
  choices: [" "],
  prompt: "<i>Ingerlaqqinniaruit computerip naqitassaani akunnilersuut tooruk.</i>" // Tryk på mellemrum for at gå videre
};
timeline.push(press_space)

// total score
let totalScore = 0;

// function for making self-paced reading trials
function make_spr_trial(sentence, repeated_sentence, sentence_id, change_type, affix_type, affix, filler_condition, target_word, changed_word, changed_affix, reverse_target_position, sentence_words, target_syllables, correct_response) {
  var sentence_as_word_list = sentence.split(" ") //split the sentence at spaces
  // console.log(reverse_target_position,sentence_words)
  var sentence_as_stimulus_sequence = [] //empty stimulus sequence to start
  for (var word of sentence_as_word_list) { //for each word in sentence_as_word_list
    sentence_as_stimulus_sequence.push({'stimulus': "<p style='font-size:48px'>" + word +" </p>",
    data: {current_word:word}
    }) //add that word in the required format
  }
  var trial = {type: jsPsychHtmlKeyboardResponse, //plug into our template
               timeline:[
                // first fixation
                {stimulus: "<p style='font-size:48px'>+</p>",
               choices: "NO_KEYS",
               trial_duration: jsPsych.randomization.sampleWithReplacement([200, 500, 750, 300, 800, 250],1)},
               // then SPR
                {choices: [" "],
                timeline: sentence_as_stimulus_sequence},
                // then masking
                {stimulus: "<p style='font-size:48px'>############<br>############<br>############</p>",
               choices: "NO_KEYS",
               trial_duration: 500},
              // then change detection
                {type: jsPsychHtmlButtonResponse,
                  stimulus:'<div style="font-size:40px">' + repeated_sentence +"</div>",
                choices:["Aap","Naamik"], // Ja, Nej
                prompt:"<p><em>Oqaaseqatigiit allanngorsimappat?</em></p>", // Er der noget i sætningen der har forandret sig?
                on_finish: function(data) {
                  if (data.response == 0) {
                    data.Ychange_Nchange_response = "yes"
                  } else if (data.response == 1) {
                    data.Ychange_Nchange_response = "no"
                  }
                  if (data.response == 1 && change_type == "no_change")  {
                    totalScore += 1
                  }
                  console.log(totalScore)
                }
                },
                // change detection word click
                {type: jsPsychHtmlButtonResponse,
                  stimulus: " ",
                  choices: function() {
                    // if yes, choose which word has changed
                    // if no, press continue
                    if (jsPsych.data.get().last(1).values()[0].Ychange_Nchange_response === "yes") {
                      var splitted = repeated_sentence.split(" ")
                      var words = []
                      // removing <p> and </p> from the choices
                      for (var i=0; i<splitted.length; i++) {
                        if (splitted[i].startsWith('<')) {
                          continue
                        } else {
                          words.push(splitted[i])
                        }
                      }
                      return words
                    } else {
                      return ["Ingerlaqqigit"]; // Fortsæt
                    }
                  },
                  prompt: function() {
                    if (jsPsych.data.get().last(1).values()[0].Ychange_Nchange_response === "yes") {
                      return "<p>Oqaaseq sorleq allanngorsimava?</p>"; // Hvilket ord har forandret sig?
                    } else {
                      return " ";
                    }
                  },
                  margin_horizontal: '2px',
                  button_html: '<button class="jspsych-btn" style="font-size: 25px";>%choice%</button>',
                  on_finish: function (data) {
                    data.original_sentence = sentence
                    data.repeated_sentence = repeated_sentence
                    data.sentence_id = sentence_id
                    data.correct_change_answer = change_type
                    data.affix_type = affix_type
                    data.target_affix = affix
                    data.filler_condition = filler_condition
                    data.target_word = target_word
                    data.changed_word = changed_word
                    data.changed_affix = changed_affix
                    data.reverse_target_position = reverse_target_position
                    data.sentence_words = sentence_words
                    data.target_syllables = target_syllables
                    data.correct_response = correct_response
                    if (data.response == data.correct_response && jsPsych.data.get().last(2).values()[0].Ychange_Nchange_response === "yes") {
                      totalScore += 1
                    }
                    console.log(totalScore)
                    // console.log(data.response)
                  }
                }
              ]}
  return trial //return the trial you have built
}

// Now it is easy to build multiple trials using this function.

// stimuli
var sentences_1 = [
  // sentence 1
  { s1: "Aqagu suliassanik amerlasuunik naammassisassaqarami Hansi suliniarpoq.", s2: "<p> Aqagu suliassanik amerlasuunik </p><p> naammassisassaqarami Hansi sulipallappoq. </p>", sentence_id: '1', change_type: 'change', affix_type: 'lexical', affix: 'niar', filler_condition: 'no', target_word: 'suliniarpoq', changed_word: 'sulipallappoq', changed_affix: 'pallag', reverse_target_position: '1', sentence_words: '6', target_syllables: '5', correct_response: '5'}, // Hans har mange opgaver han skal nå at færdiggøre i morgen, derfor agter han at arbejde / arbejder han hurtigt.
  /*{ s1: "Aqagu suliassanik amerlasuunik naammassisassaqarami Hansi suliniarpoq.", s2: "<p> Aqagu suliassanik amerlasuunik </p><p> naammassisassaqarami Hansi sulivoq. </p>", sentence_id: '1', change_type: 'deletion', affix_type: 'lexical', affix: 'niar', filler_condition: 'no', target_word: 'suliniarpoq', changed_word: 'sulivoq', changed_affix: 'NA', reverse_target_position: '1', sentence_words: '6', target_syllables: '5', correct_response: '5'}, // Hans har mange opgaver han skal nå at færdiggøre i morgen, derfor agter han at arbejde / arbejder han.
  { s1: "Aqagu suliassanik amerlasuunik naammassisassaqarami Hansi suliniarpoq.", s2: "<p> Aqagu suliassanik amerlasuunik </p><p> naammassisassaqarami Hansi suliniarpoq. </p>", sentence_id: '1', change_type: 'no_change', affix_type: 'lexical', affix: 'niar', filler_condition: 'no', target_word: 'suliniarpoq', changed_word: 'suliniarpoq', changed_affix: 'niar', reverse_target_position: '1', sentence_words: '6', target_syllables: '5', correct_response: 'NA'}, // Hans har mange opgaver han skal nå at færdiggøre i morgen, derfor agter han at arbejde.
  { s1: "Aqagu suliassanik amerlasuunik naammassisassaqarami Hansi sulissavoq.", s2: "<p> Aqagu suliassanik amerlasuunik </p><p> naammassisassaqarami Hansi suliumaarpoq. </p>", sentence_id: '1', change_type: 'change', affix_type: 'grammatical', affix: 'ssa', filler_condition: 'no', target_word: 'sulissavoq', changed_word: 'suliumaarpoq', changed_affix: 'jumaar', reverse_target_position: '1', sentence_words: '6', target_syllables: '4', correct_response: '5'}, // Hans har mange opgaver han skal nå at færdiggøre i morgen, derfor skal han arbejde / vil han nok arbejde.
  { s1: "Aqagu suliassanik amerlasuunik naammassisassaqarami Hansi sulissavoq.", s2: "<p> Aqagu suliassanik amerlasuunik </p><p> naammassisassaqarami Hansi sulivoq. </p>", sentence_id: '1', change_type: 'deletion', affix_type: 'grammatical', affix: 'ssa', filler_condition: 'no', target_word: 'sulissavoq', changed_word: 'sulivoq', changed_affix: 'NA', reverse_target_position: '1', sentence_words: '6', target_syllables: '4', correct_response: '5'}, // Hans har mange opgaver han skal nå at færdiggøre i morgen, derfor skal han arbejde / arbejder han.
  { s1: "Aqagu suliassanik amerlasuunik naammassisassaqarami Hansi sulissavoq.", s2: "<p> Aqagu suliassanik amerlasuunik </p><p> naammassisassaqarami Hansi sulissavoq. </p>", sentence_id: '1', change_type: 'no_change', affix_type: 'grammatical', affix: 'ssa', filler_condition: 'no', target_word: 'sulissavoq', changed_word: 'sulissavoq', changed_affix: 'ssa', reverse_target_position: '1', sentence_words: '6', target_syllables: '4', correct_response: 'NA'}, // Hans har mange opgaver han skal nå at færdiggøre i morgen, derfor skal han arbejde.
  // sentence 2 fillers
  { s1: "Igaffimmi nateq saneqangaarmat Minik qulinik ukiulik sanertuarpoq.", s2: "<p> Igaffimmi nateq saneqangaarmat </p><p> Minik qulinik ukiulik sanertuarpoq. </p>", sentence_id: '2', change_type: 'no_change', affix_type: 'lexical', affix: 'juar', filler_condition: 'yes', target_word: 'sanertuarpoq', changed_word: 'sanertuarpoq', changed_affix: 'juar', reverse_target_position: '1', sentence_words: '7', target_syllables: '5', correct_response: 'NA'}, // Køkkengulvet er meget snavset, derfor fejer tiårige Minik hele tiden.
  { s1: "Igaffimmi nateq saneqangaarmat Minik qulinik ukiulik sanernikuuvoq.", s2: "<p> Igaffimmi nateq saneqangaarmat </p><p> Minik qulinik ukiulik sanernikuuvoq. </p>", sentence_id: '2', change_type: 'no_change', affix_type: 'grammatical', affix: 'nikuu', filler_condition: 'yes', target_word: 'sanernikuuvoq', changed_word: 'sanernikuuvoq', changed_affix: 'nikuu', reverse_target_position: '1', sentence_words: '7', target_syllables: '5', correct_response: 'NA'}, // Køkkengulvet er meget snavset, derfor har tiårige Minik (engang) fejet.
  { s1: "Igaffimmi nateq saneqangaarmat Minik qulinik ukiulik saneqqippoq.", s2: "<p> Inimi nateq saneqangaarmat </p><p> Minik qulinik ukiulik saneqqippoq. </p>", sentence_id: '2', change_type: 'change', affix_type: 'lexical', affix: 'qqig', filler_condition: 'yes', target_word: 'Igaffimmi', changed_word: 'Inimi', changed_affix: 'NA', reverse_target_position: '7', sentence_words: '7', target_syllables: '4', correct_response: '0'}, // Køkkengulvet/stuegulvet er meget snavset, derfor fejer Minik igen.
  { s1: "Igaffimmi nateq saneqangaarmat Minik qulinik ukiulik sanersimavoq.", s2: "<p> Igaffimmi nateq saneqangaarmat </p><p> Aputsiaq qulinik ukiulik sanersimavoq. </p>", sentence_id: '2', change_type: 'change', affix_type: 'grammatical', affix: 'sima', filler_condition: 'yes', target_word: 'Minik', changed_word: 'Aputsiaq', changed_affix: 'NA', reverse_target_position: '4', sentence_words: '7', target_syllables: '2', correct_response: '3'}, // Køkkengulvet er meget snavset, derfor har tiårige Minik/Aputsiaq fejet.
  // sentence 3
  { s1: "Aqagu sila ajorniarpasippoq taamaattorli Aputsiaq suli aalisarniarpoq.", s2: "<p> Aqagu sila ajorniarpasippoq taamaattorli </p><p> Aputsiaq suli aalisaqqippoq. </p>", sentence_id: '3', change_type: 'change', affix_type: 'lexical', affix: 'niar', filler_condition: 'no', target_word: 'aalisarniarpoq', changed_word: 'aalisaqqippoq', changed_affix: 'qqig', reverse_target_position: '1', sentence_words: '7', target_syllables: '6', correct_response: '6'}, // Vejret ser ud til at blive dårligt i morgen, men Aputsiaq agter alligevel at fiske / fisker alligevel igen.
  { s1: "Aqagu sila ajorniarpasippoq taamaattorli Aputsiaq suli aalisarniarpoq.", s2: "<p> Aqagu sila ajorniarpasippoq taamaattorli </p><p> Aputsiaq suli aalisarpoq. </p>", sentence_id: '3', change_type: 'deletion', affix_type: 'lexical', affix: 'niar', filler_condition: 'no', target_word: 'aalisarniarpoq', changed_word: 'aalisarpoq', changed_affix: 'NA', reverse_target_position: '1', sentence_words: '7', target_syllables: '6', correct_response: '6'}, // Vejret ser ud til at blive dårligt i morgen, men Aputsiaq agter alligevel at fiske / fisker alligevel.
  { s1: "Aqagu sila ajorniarpasippoq taamaattorli Aputsiaq suli aalisarniarpoq.", s2: "<p> Aqagu sila ajorniarpasippoq taamaattorli </p><p> Aputsiaq suli aalisarniarpoq. </p>", sentence_id: '3', change_type: 'no_change', affix_type: 'lexical', affix: 'niar', filler_condition: 'no', target_word: 'aalisarniarpoq', changed_word: 'aalisarniarpoq', changed_affix: 'niar', reverse_target_position: '1', sentence_words: '7', target_syllables: '6', correct_response: 'NA'}, // Vejret ser ud til at blive dårligt i morgen, men Aputsiaq agter alligevel at fiske.
  { s1: "Aqagu sila ajorniarpasippoq taamaattorli Aputsiaq suli aalisarumaarpoq.", s2: "<p> Aqagu sila ajorniarpasippoq taamaattorli </p><p> Aputsiaq suli aalisarnerpoq. </p>", sentence_id: '3', change_type: 'change', affix_type: 'grammatical', affix: 'jumaar', filler_condition: 'no', target_word: 'aalisarumaarpoq', changed_word: 'aalisarnerpoq', changed_affix: 'ner', reverse_target_position: '1', sentence_words: '7', target_syllables: '6', correct_response: '6'}, // Vejret ser ud til at blive dårligt i morgen, men Aputsiaq vil nok alligevel fiske på et tidspunkt / mon Aputsiaq fisker alligevel.
  { s1: "Aqagu sila ajorniarpasippoq taamaattorli Aputsiaq suli aalisarumaarpoq.", s2: "<p> Aqagu sila ajorniarpasippoq taamaattorli </p><p> Aputsiaq suli aalisarpoq. </p>", sentence_id: '3', change_type: 'deletion', affix_type: 'grammatical', affix: 'jumaar', filler_condition: 'no', target_word: 'aalisarumaarpoq', changed_word: 'aalisarpoq', changed_affix: 'NA', reverse_target_position: '1', sentence_words: '7', target_syllables: '6', correct_response: '6'}, // Vejret ser ud til at blive dårligt i morgen, men Aputsiaq vil nok alligevel fiske på et tidspunt / Aputsiaq fisker alligevel.
  { s1: "Aqagu sila ajorniarpasippoq taamaattorli Aputsiaq suli aalisarumaarpoq.", s2: "<p> Aqagu sila ajorniarpasippoq taamaattorli </p><p> Aputsiaq suli aalisarumaarpoq. </p>", sentence_id: '3', change_type: 'no_change', affix_type: 'grammatical', affix: 'jumaar', filler_condition: 'no', target_word: 'aalisarumaarpoq', changed_word: 'aalisarumaarpoq', changed_affix: 'jumaar', reverse_target_position: '1', sentence_words: '7', target_syllables: '6', correct_response: 'NA'}, // Vejret ser ud til at blive dårligt i morgen, men Aputsiaq vil nok alligevel fiske på et tidspunt.
  // sentence 4 fillers
  { s1: "Naja aatsaaqqippoq ippassaammat festip kingorna innajaannginnami.", s2: "<p> Naja aatsaaqqippoq ippassaammat </p><p> festip kingorna innajaannginnami. </p>", sentence_id: '4', change_type: 'no_change', affix_type: 'lexical', affix: 'qqig', filler_condition: 'yes', target_word: 'aatsaaqqippoq', changed_word: 'aatsaaqqippoq', changed_affix: 'qqig', reverse_target_position: '5', sentence_words: '6', target_syllables: '4', correct_response: 'NA'}, // Naja gaber igen, fordi hun kom så sent i seng i går aftes efter festen.
  { s1: "Naja aatsaarsimavoq ippassaammat festip kingorna innajaannginnami.", s2: "<p> Naja aatsaarsimavoq ippassaammat </p><p> festip kingorna innajaannginnami. </p>", sentence_id: '4', change_type: 'no_change', affix_type: 'grammatical', affix: 'sima', filler_condition: 'yes', target_word: 'aatsaarsimavoq', changed_word: 'aatsaarsimavoq', changed_affix: 'sima', reverse_target_position: '5', sentence_words: '6', target_syllables: '5', correct_response: 'NA'}, // Naja har gabt, fordi hun kom så sent i seng i går aftes efter festen.
  { s1: "Naja aatsaartuarpoq ippassaammat festip kingorna innajaannginnami.", s2: "<p> Naja aatsaartuarpoq ippassaammat </p><p> inuuissiornerup kingorna innajaannginnami. </p>", sentence_id: '4', change_type: 'change', affix_type: 'lexical', affix: 'juar', filler_condition: 'yes', target_word: 'festip', changed_word: 'inuuissiornerup', changed_affix: 'NA', reverse_target_position: '3', sentence_words: '6', target_syllables: '2', correct_response: '3'}, // Naja gaber hele tiden, fordi hun kom så sent i seng i går aftes efter festen/fødselsdagen.
  { s1: "Naja aatsaarnerpoq ippassaammat festip kingorna innajaannginnami.", s2: "<p> Ivalu aatsaarnerpoq ippassaammat </p><p> festip kingorna innajaannginnami. </p>", sentence_id: '4', change_type: 'change', affix_type: 'grammatical', affix: 'ner', filler_condition: 'yes', target_word: 'Naja', changed_word: 'Ivalu', changed_affix: 'NA', reverse_target_position: '6', sentence_words: '6', target_syllables: '2', correct_response: '0'}, // Mon Naja/Ivalu gaber, fordi hun kom så sent i seng i går aftes efter festen.
  // sentence 5
  { s1: "Atsaga kaagiliorunarpoq kisianni illooraga sukkuarartorusunneruvoq aamma mamakujuit allat.", s2: "<p> Atsaga kaagiliortuarpoq kisianni illooraga </p><p> sukkuarartorusunneruvoq aamma mamakujuit allat. </p>", sentence_id: '5', change_type: 'change', affix_type: 'lexical', affix: 'gunar', filler_condition: 'no', target_word: 'kaagiliorunarpoq', changed_word: 'kaagiliortuarpoq', changed_affix: 'juar', reverse_target_position: '7', sentence_words: '8', target_syllables: '7', correct_response: '1'}, // Min tante bager vist kage / bager hele tiden kage, men min fætter vil hellere spise bolsjer og andet slik.
  { s1: "Atsaga kaagiliorunarpoq kisianni illooraga sukkuarartorusunneruvoq aamma mamakujuit allat.", s2: "<p> Atsaga kaagiliorpoq kisianni illooraga </p><p> sukkuarartorusunneruvoq aamma mamakujuit allat. </p>", sentence_id: '5', change_type: 'deletion', affix_type: 'lexical', affix: 'gunar', filler_condition: 'no', target_word: 'kaagiliorunarpoq', changed_word: 'kaagiliorpoq', changed_affix: 'NA', reverse_target_position: '7', sentence_words: '8', target_syllables: '7', correct_response: '1'}, // Min tante bager vist kage / bager kage, men min fætter vil hellere spise bolsjer og andet slik.
  { s1: "Atsaga kaagiliorunarpoq kisianni illooraga sukkuarartorusunneruvoq aamma mamakujuit allat.", s2: "<p> Atsaga kaagiliorunarpoq kisianni illooraga </p><p> sukkuarartorusunneruvoq aamma mamakujuit allat. </p>", sentence_id: '5', change_type: 'no_change', affix_type: 'lexical', affix: 'gunar', filler_condition: 'no', target_word: 'kaagiliorunarpoq', changed_word: 'kaagiliorunarpoq', changed_affix: 'gunar', reverse_target_position: '7', sentence_words: '8', target_syllables: '7', correct_response: 'NA'}, // Min tante bager vist kage, men min fætter vil hellere spise bolsjer og andet slik.
  { s1: "Atsaga kaagiliussavoq kisianni illooraga sukkuarartorusunneruvoq aamma mamakujuit allat.", s2: "<p> Atsaga kaagilioraluarpoq kisianni illooraga </p><p> sukkuarartorusunneruvoq aamma mamakujuit allat. </p>", sentence_id: '5', change_type: 'change', affix_type: 'grammatical', affix: 'ssa', filler_condition: 'no', target_word: 'kaagiliussavoq', changed_word: 'kaagilioraluarpoq', changed_affix: 'galuar', reverse_target_position: '7', sentence_words: '8', target_syllables: '6', correct_response: '1'}, // Min tante skal bage kage / bager ellers kage, men min fætter vil hellere spise bolsjer og andet slik.
  { s1: "Atsaga kaagiliussavoq kisianni illooraga sukkuarartorusunneruvoq aamma mamakujuit allat.", s2: "<p> Atsaga kaagiliorpoq kisianni illooraga </p><p> sukkuarartorusunneruvoq aamma mamakujuit allat. </p>", sentence_id: '5', change_type: 'deletion', affix_type: 'grammatical', affix: 'ssa', filler_condition: 'no', target_word: 'kaagiliussavoq', changed_word: 'kaagiliorpoq', changed_affix: 'NA', reverse_target_position: '7', sentence_words: '8', target_syllables: '6', correct_response: '1'}, // Min tante skal bage kage / bager kage, men min fætter vil hellere spise bolsjer og andet slik.
  { s1: "Atsaga kaagiliussavoq kisianni illooraga sukkuarartorusunneruvoq aamma mamakujuit allat.", s2: "<p> Atsaga kaagiliussavoq kisianni illooraga </p><p> sukkuarartorusunneruvoq aamma mamakujuit allat. </p>", sentence_id: '5', change_type: 'no_change', affix_type: 'grammatical', affix: 'ssa', filler_condition: 'no', target_word: 'kaagiliussavoq', changed_word: 'kaagiliussavoq', changed_affix: 'ssa', reverse_target_position: '7', sentence_words: '8', target_syllables: '6', correct_response: 'NA'}, // Min tante skal bage kage, men min fætter vil hellere spise bolsjer og andet slik.
  // sentence 6 fillers
  { s1: "Assut siallilerniarmat Ivalu aniaarpoq manisallu eqqullugit.", s2: "<p> Assut siallilerniarmat Ivalu </p><p> aniaarpoq manisallu eqqullugit. </p>", sentence_id: '6', change_type: 'no_change', affix_type: 'lexical', affix: 'jaar', filler_condition: 'yes', target_word: 'aniaarpoq', changed_word: 'aniaarpoq', changed_affix: 'jaar', reverse_target_position: '3', sentence_words: '6', target_syllables: '4', correct_response: 'NA'}, // Da det begynder at regne meget, går Ivalu tidligt ud og tager vasketøjet ind.
  { s1: "Assut siallilerniarmat Ivalu anissavoq manisallu eqqullugit.", s2: "<p> Assut siallilerniarmat Ivalu </p><p> anissavoq manisallu eqqullugit. </p>", sentence_id: '6', change_type: 'no_change', affix_type: 'grammatical', affix: 'ssa', filler_condition: 'yes', target_word: 'anissavoq', changed_word: 'anissavoq', changed_affix: 'ssa', reverse_target_position: '3', sentence_words: '6', target_syllables: '4', correct_response: 'NA'}, // Da det begynder at regne meget, vil Ivalu gå ud for at tage vasketøjet ind.
  { s1: "Assut siallilerniarmat Ivalu anipallappoq manisallu eqqullugit.", s2: "<p> Assut siallilerniarmat Ivalu </p><p> anipallappoq tippillu eqqullugit. </p>", sentence_id: '6', change_type: 'change', affix_type: 'lexical', affix: 'pallag', filler_condition: 'yes', target_word: 'manisallu', changed_word: 'tippillu', changed_affix: 'NA', reverse_target_position: '2', sentence_words: '6', target_syllables: '4', correct_response: '4'}, // Da det begynder at regne meget, skynder Ivalu sig ud for at tage vasketøjet/tæpperne med ind.
  { s1: "Assut siallilerniarmat Ivalu aniriikatappoq manisallu eqqullugit.", s2: "<p> Assut siallilerniarmat Hanne </p><p> aniriikatappoq manisallu eqqullugit. </p>", sentence_id: '6', change_type: 'change', affix_type: 'grammatical', affix: 'riikatag', filler_condition: 'yes', target_word: 'Ivalu', changed_word: 'Hanne', changed_affix: 'NA', reverse_target_position: '4', sentence_words: '6', target_syllables: '3', correct_response: '2'}, // Da det begynder at regne meget, er Ivalu/Hanne allerede gået ud for at tage vasketøjet med ind.
  // sentence 7
  { s1: "Aqagu tivoli illoqarfimmut piniarmat nukappiaraq pileriqqippoq.", s2: "<p> Aqagu tivoli illoqarfimmut </p><p> piniarmat nukappiaraq pilerigunarpoq. </p>", sentence_id: '7', change_type: 'change', affix_type: 'lexical', affix: 'qqig', filler_condition: 'no', target_word: 'pileriqqippoq', changed_word: 'pilerigunarpoq', changed_affix: 'gunar', reverse_target_position: '1', sentence_words: '6', target_syllables: '5', correct_response: '5'}, // I morgen kommer tivoli til byen, så drengen glæder sig igen / glæder sig vist.
  { s1: "Aqagu tivoli illoqarfimmut piniarmat nukappiaraq pileriqqippoq.", s2: "<p> Aqagu tivoli illoqarfimmut </p><p> piniarmat nukappiaraq pilerivoq. </p>", sentence_id: '7', change_type: 'deletion', affix_type: 'lexical', affix: 'qqig', filler_condition: 'no', target_word: 'pileriqqippoq', changed_word: 'pilerivoq', changed_affix: 'NA', reverse_target_position: '1', sentence_words: '6', target_syllables: '5', correct_response: '5'}, // I morgen kommer tivoli til byen, så drengen glæder sig igen / glæder sig.
  { s1: "Aqagu tivoli illoqarfimmut piniarmat nukappiaraq pileriqqippoq.", s2: "<p> Aqagu tivoli illoqarfimmut </p><p> piniarmat nukappiaraq pileriqqippoq. </p>", sentence_id: '7', change_type: 'no_change', affix_type: 'lexical', affix: 'qqig', filler_condition: 'no', target_word: 'pileriqqippoq', changed_word: 'pileriqqippoq', changed_affix: 'qqig', reverse_target_position: '1', sentence_words: '6', target_syllables: '5', correct_response: 'NA'}, // I morgen kommer tivoli til byen, så drengen glæder sig igen.
  { s1: "Aqagu tivoli illoqarfimmut piniarmat nukappiaraq pilerilluinnarpoq.", s2: "<p> Aqagu tivoli illoqarfimmut </p><p> piniarmat nukappiaraq pilerissavoq. </p>", sentence_id: '7', change_type: 'change', affix_type: 'grammatical', affix: 'lluinnar', filler_condition: 'no', target_word: 'pilerilluinnarpoq', changed_word: 'pilerissavoq', changed_affix: 'ssa', reverse_target_position: '1', sentence_words: '6', target_syllables: '7', correct_response: '5'}, // I morgen kommer tivoli til byen, så drengen glæder sig helt / vil glæde sig.
  { s1: "Aqagu tivoli illoqarfimmut piniarmat nukappiaraq pilerilluinnarpoq.", s2: "<p> Aqagu tivoli illoqarfimmut </p><p> piniarmat nukappiaraq pilerivoq. </p>", sentence_id: '7', change_type: 'deletion', affix_type: 'grammatical', affix: 'lluinnar', filler_condition: 'no', target_word: 'pilerilluinnarpoq', changed_word: 'pilerivoq', changed_affix: 'NA', reverse_target_position: '1', sentence_words: '6', target_syllables: '7', correct_response: '5'}, // I morgen kommer tivoli til byen, så drengen glæder sig helt / glæder sig.
  { s1: "Aqagu tivoli illoqarfimmut piniarmat nukappiaraq pilerilluinnarpoq.", s2: "<p> Aqagu tivoli illoqarfimmut </p><p> piniarmat nukappiaraq pilerilluinnarpoq. </p>", sentence_id: '7', change_type: 'no_change', affix_type: 'grammatical', affix: 'lluinnar', filler_condition: 'no', target_word: 'pilerilluinnarpoq', changed_word: 'pilerilluinnarpoq', changed_affix: 'lluinnar', reverse_target_position: '1', sentence_words: '6', target_syllables: '7', correct_response: 'NA'}, // I morgen kommer tivoli til byen, så drengen glæder sig helt.
  // sentence 8 fillers
  { s1: "Atuarfimmi issiatilluni niviarsiaraq allattaavimmi allalertorpoq.", s2: "<p> Atuarfimmi issiatilluni niviarsiaraq </p><p> allattaavimmi allalertorpoq. </p>", sentence_id: '8', change_type: 'no_change', affix_type: 'lexical', affix: 'lertor', filler_condition: 'yes', target_word: 'allalertorpoq', changed_word: 'allalertorpoq', changed_affix: 'lertor', reverse_target_position: '1', sentence_words: '5', target_syllables: '5', correct_response: 'NA'}, // Mens pigen sidder i skolen, skriver hun hurtigt i notesbogen.
  { s1: "Atuarfimmi issiatilluni niviarsiaraq allattaavimmi allakkaluarpoq.", s2: "<p> Atuarfimmi issiatilluni niviarsiaraq </p><p> allattaavimmi allakkaluarpoq. </p>", sentence_id: '8', change_type: 'no_change', affix_type: 'grammatical', affix: 'galuar', filler_condition: 'yes', target_word: 'allakkaluarpoq', changed_word: 'allakkaluarpoq', changed_affix: 'galuar', reverse_target_position: '1', sentence_words: '5', target_syllables: '6', correct_response: 'NA'}, // Mens pigen sidder i skolen, skriver hun ellers i notesbogen.
  { s1: "Atuarfimmi issiatilluni niviarsiaraq allattaavimmi allaqqissaarpoq.", s2: "<p> Inimi issiatilluni niviarsiaraq </p><p> allattaavimmi allaqqissaarpoq. </p>", sentence_id: '8', change_type: 'change', affix_type: 'lexical', affix: 'qqissaar', filler_condition: 'yes', target_word: 'Atuarfimmi', changed_word: 'Inimi', changed_affix: 'NA', reverse_target_position: '5', sentence_words: '5', target_syllables: '5', correct_response: '0'}, // Mens pigen sidder i skolen/stuen, skriver hun omhyggeligt i notesbogen.
  { s1: "Atuarfimmi issiatilluni niviarsiaraq allattaavimmi allanerpoq.", s2: "<p> Atuarfimmi issiatilluni nukappiaraq </p><p> allattaavimmi allanerpoq. </p>", sentence_id: '8', change_type: 'change', affix_type: 'grammatical', affix: 'ner', filler_condition: 'yes', target_word: 'niviarsiaraq', changed_word: 'nukappiaraq', changed_affix: 'NA', reverse_target_position: '3', sentence_words: '5', target_syllables: '6', correct_response: '2'}, // Mens pigen/drengen sidder i skolen, skriver hun/han mon i notesbogen.
  // sentence 9
  { s1: "Anorersuarpasilerpoq taamaattumik aataga angerlajaarpoq.", s2: "<p> Anorersuarpasilerpoq taamaattumik </p><p> aataga angerlarniarpoq. </p>", sentence_id: '9', change_type: 'change', affix_type: 'lexical', affix: 'jaar', filler_condition: 'no', target_word: 'angerlajaarpoq', changed_word: 'angerlarniarpoq', changed_affix: 'niar', reverse_target_position: '1', sentence_words: '4', target_syllables: '5', correct_response: '3'}, // Det begynder at trække op til storm, så min bedstefar tager tidligt hjem / agter at tage hjem.
  { s1: "Anorersuarpasilerpoq taamaattumik aataga angerlajaarpoq.", s2: "<p> Anorersuarpasilerpoq taamaattumik </p><p> aataga angerlarpoq. </p>", sentence_id: '9', change_type: 'deletion', affix_type: 'lexical', affix: 'jaar', filler_condition: 'no', target_word: 'angerlajaarpoq', changed_word: 'angerlarpoq', changed_affix: 'NA', reverse_target_position: '1', sentence_words: '4', target_syllables: '5', correct_response: '3'}, // Det begynder at trække op til storm, så min bedstefar tager tidligt hjem / tager hjem.
  { s1: "Anorersuarpasilerpoq taamaattumik aataga angerlajaarpoq.", s2: "<p> Anorersuarpasilerpoq taamaattumik </p><p> aataga angerlajaarpoq. </p>", sentence_id: '9', change_type: 'no_change', affix_type: 'lexical', affix: 'jaar', filler_condition: 'no', target_word: 'angerlajaarpoq', changed_word: 'angerlajaarpoq', changed_affix: 'jaar', reverse_target_position: '1', sentence_words: '4', target_syllables: '5', correct_response: 'NA'}, // Det begynder at trække op til storm, så min bedstefar tager tidligt hjem.
  { s1: "Anorersuarpasilerpoq taamaattumik aataga angerlarumaarpoq.", s2: "<p> Anorersuarpasilerpoq taamaattumik </p><p> aataga angerlarsimavoq. </p>", sentence_id: '9', change_type: 'change', affix_type: 'grammatical', affix: 'jumaar', filler_condition: 'no', target_word: 'angerlarumaarpoq', changed_word: 'angerlarsimavoq', changed_affix: 'sima', reverse_target_position: '1', sentence_words: '4', target_syllables: '6', correct_response: '3'}, // Det begynder at trække op til storm, så min bedstefar vil nok tage hjem / er taget hjem.
  { s1: "Anorersuarpasilerpoq taamaattumik aataga angerlarumaarpoq.", s2: "<p> Anorersuarpasilerpoq taamaattumik </p><p> aataga angerlarpoq. </p>", sentence_id: '9', change_type: 'deletion', affix_type: 'grammatical', affix: 'jumaar', filler_condition: 'no', target_word: 'angerlarumaarpoq', changed_word: 'angerlarpoq', changed_affix: 'NA', reverse_target_position: '1', sentence_words: '4', target_syllables: '6', correct_response: '3'}, // Det begynder at trække op til storm, så min bedstefar vil nok tage hjem / tager hjem.
  { s1: "Anorersuarpasilerpoq taamaattumik aataga angerlarumaarpoq.", s2: "<p> Anorersuarpasilerpoq taamaattumik </p><p> aataga angerlarumaarpoq. </p>", sentence_id: '9', change_type: 'no_change', affix_type: 'grammatical', affix: 'jumaar', filler_condition: 'no', target_word: 'angerlarumaarpoq', changed_word: 'angerlarumaarpoq', changed_affix: 'jumaar', reverse_target_position: '1', sentence_words: '4', target_syllables: '6', correct_response: 'NA'}, // Det begynder at trække op til storm, så min bedstefar vil nok tage hjem.
  // sentence 10 fillers
  { s1: "Nuunuaraq nipangiaarpoq pissutigalugu anaanaminiit nerisinneqarami.", s2: "<p> Nuunuaraq nipangiaarpoq pissutigalugu </p><p> anaanaminiit nerisinneqarami. </p>", sentence_id: '10', change_type: 'no_change', affix_type: 'lexical', affix: 'jaar', filler_condition: 'yes', target_word: 'nipangiaarpoq', changed_word: 'nipangiaarpoq', changed_affix: 'jaar', reverse_target_position: '4', sentence_words: '5', target_syllables: '5', correct_response: 'NA'}, // Babyen tier tidligt stille, fordi den får mad af sin mor.
  { s1: "Nuunuaraq nipangerluinnarpoq pissutigalugu anaanaminiit nerisinneqarami.", s2: "<p> Nuunuaraq nipangerluinnarpoq pissutigalugu </p><p> anaanaminiit nerisinneqarami. </p>", sentence_id: '10', change_type: 'no_change', affix_type: 'grammatical', affix: 'lluinnar', filler_condition: 'yes', target_word: 'nipangerluinnarpoq', changed_word: 'nipangerluinnarpoq', changed_affix: 'lluinnar', reverse_target_position: '4', sentence_words: '5', target_syllables: '7', correct_response: 'NA'}, // Babyen tier helt stille, fordi den får mad af sin mor.
  { s1: "Nuunuaraq nipangilertorpoq pissutigalugu anaanaminiit nerisinneqarami.", s2: "<p> Meeraq nipangilertorpoq pissutigalugu </p><p> anaanaminiit nerisinneqarami. </p>", sentence_id: '10', change_type: 'change', affix_type: 'lexical', affix: 'lertor', filler_condition: 'yes', target_word: 'Nuunuaraq', changed_word: 'Meeraq', changed_affix: 'NA', reverse_target_position: '5', sentence_words: '5', target_syllables: '4', correct_response: '0'}, // Babyen/barnet tier hurtigt stille, fordi den får mad af sin mor.
  { s1: "Nuunuaraq nipangersimavoq pissutigalugu anaanaminiit nerisinneqarami.", s2: "<p> Nuunuaraq nipangersimavoq pissutigalugu </p><p> ataataminiit nerisinneqarami. </p>", sentence_id: '10', change_type: 'change', affix_type: 'grammatical', affix: 'sima', filler_condition: 'yes', target_word: 'anaanaminiit', changed_word: 'ataataminiit', changed_affix: 'NA', reverse_target_position: '2', sentence_words: '5', target_syllables: '5', correct_response: '3'}, // Babyen har tiet stille, fordi den får mad af sin mor/far.
  // sentence 11
  { s1: "Ullumi ualeq naallugu kaffillertoqarmat aanaga qasujaarpoq.", s2: "<p> Ullumi ualeq naallugu </p><p> kaffillertoqarmat aanaga qasugunarpoq. </p>", sentence_id: '11', change_type: 'change', affix_type: 'lexical', affix: 'jaar', filler_condition: 'no', target_word: 'qasujaarpoq', changed_word: 'qasugunarpoq', changed_affix: 'gunar', reverse_target_position: '1', sentence_words: '6', target_syllables: '4', correct_response: '5'}, // I dag har der været kaffemik hele eftermiddagen, så derfor er min bedstemor tidligt træt / derfor virker min bedstemor træt.
  { s1: "Ullumi ualeq naallugu kaffillertoqarmat aanaga qasujaarpoq.", s2: "<p> Ullumi ualeq naallugu </p><p> kaffillertoqarmat aanaga qasuvoq. </p>", sentence_id: '11', change_type: 'deletion', affix_type: 'lexical', affix: 'jaar', filler_condition: 'no', target_word: 'qasujaarpoq', changed_word: 'qasuvoq', changed_affix: 'NA', reverse_target_position: '1', sentence_words: '6', target_syllables: '4', correct_response: '5'}, // I dag har der været kaffemik hele eftermiddagen, så derfor er min bedstemor tidligt træt / derfor er min bedstemor træt.
  { s1: "Ullumi ualeq naallugu kaffillertoqarmat aanaga qasujaarpoq.", s2: "<p> Ullumi ualeq naallugu </p><p> kaffillertoqarmat aanaga qasujaarpoq. </p>", sentence_id: '11', change_type: 'no_change', affix_type: 'lexical', affix: 'jaar', filler_condition: 'no', target_word: 'qasujaarpoq', changed_word: 'qasujaarpoq', changed_affix: 'jaar', reverse_target_position: '1', sentence_words: '6', target_syllables: '4', correct_response: 'NA'}, // I dag har der været kaffemik hele eftermiddagen, så derfor er min bedstemor tidligt træt.
  { s1: "Ullumi ualeq naallugu kaffillertoqarmat aanaga qasuriikatappoq.", s2: "<p> Ullumi ualeq naallugu </p><p> kaffillertoqarmat aanaga qasulluinnarpoq. </p>", sentence_id: '11', change_type: 'change', affix_type: 'grammatical', affix: 'riikatag', filler_condition: 'no', target_word: 'qasuriikatappoq', changed_word: 'qasulluinnarpoq', changed_affix: 'lluinnar', reverse_target_position: '1', sentence_words: '6', target_syllables: '6', correct_response: '5'}, // I dag har der været kaffemik hele eftermiddagen, så derfor er min bedstemor allerede træt / helt træt.
  { s1: "Ullumi ualeq naallugu kaffillertoqarmat aanaga qasuriikatappoq.", s2: "<p> Ullumi ualeq naallugu </p><p> kaffillertoqarmat aanaga qasuvoq. </p>", sentence_id: '11', change_type: 'deletion', affix_type: 'grammatical', affix: 'riikatag', filler_condition: 'no', target_word: 'qasuriikatappoq', changed_word: 'qasuvoq', changed_affix: 'NA', reverse_target_position: '1', sentence_words: '6', target_syllables: '6', correct_response: '5'}, // I dag har der været kaffemik hele eftermiddagen, så derfor er min bedstemor allerede træt / derfor er min bedstemor træt.
  { s1: "Ullumi ualeq naallugu kaffillertoqarmat aanaga qasuriikatappoq.", s2: "<p> Ullumi ualeq naallugu </p><p> kaffillertoqarmat aanaga qasuriikatappoq. </p>", sentence_id: '11', change_type: 'no_change', affix_type: 'grammatical', affix: 'riikatag', filler_condition: 'no', target_word: 'qasuriikatappoq', changed_word: 'qasuriikatappoq', changed_affix: 'riikatag', reverse_target_position: '1', sentence_words: '6', target_syllables: '6', correct_response: 'NA'}, // I dag har der været kaffemik hele eftermiddagen, så derfor er min bedstemor allerede træt.
  // sentence 12 fillers
  { s1: "Ilinniartitsisoq kisitsilluni suliassat pillugit oqaluttuartoq atuartoq uninngaqqissaarpoq.", s2: "<p> Ilinniartitsisoq kisitsilluni suliassat pillugit </p><p> oqaluttuartoq atuartoq uninngaqqissaarpoq. </p>", sentence_id: '12', change_type: 'no_change', affix_type: 'lexical', affix: 'qqissaar', filler_condition: 'yes', target_word: 'uninngaqqissaarpoq', changed_word: 'uninngaqqissaarpoq', changed_affix: 'qqissaar', reverse_target_position: '1', sentence_words: '7', target_syllables: '6', correct_response: 'NA'}, // Mens læreren fortæller om regneopgaverne, sidder eleven helt stille.
  { s1: "Ilinniartitsisoq kisitsilluni suliassat pillugit oqaluttuartoq atuartoq uninnganerpoq.", s2: "<p> Ilinniartitsisoq kisitsilluni suliassat pillugit </p><p> oqaluttuartoq atuartoq uninnganerpoq. </p>", sentence_id: '12', change_type: 'no_change', affix_type: 'grammatical', affix: 'ner', filler_condition: 'yes', target_word: 'uninnganerpoq', changed_word: 'uninnganerpoq', changed_affix: 'ner', reverse_target_position: '1', sentence_words: '7', target_syllables: '5', correct_response: 'NA'}, // Mens læreren fortæller om regneopgaverne, sidder eleven mon stille.
  { s1: "Ilinniartitsisoq kisitsilluni suliassat pillugit oqaluttuartoq atuartoq uninngagunarpoq.", s2: "<p> Ilinniartitsisoq kisitsilluni suliassat pillugit </p><p> oqaluttuartoq ilinniartoq uninngagunarpoq. </p>", sentence_id: '12', change_type: 'change', affix_type: 'lexical', affix: 'gunar', filler_condition: 'yes', target_word: 'atuartoq', changed_word: 'ilinniartoq', changed_affix: 'NA', reverse_target_position: '2', sentence_words: '7', target_syllables: '4', correct_response: '5'}, // Mens læreren fortæller om regneopgaverne, sidder eleven/den studerende vistnok stille.
  { s1: "Ilinniartitsisoq kisitsilluni suliassat pillugit oqaluttuartoq atuartoq uninngalluinnarpoq.", s2: "<p> Inersimasoq kisitsilluni suliassat pillugit </p><p> oqaluttuartoq atuartoq uninngalluinnarpoq. </p>", sentence_id: '12', change_type: 'change', affix_type: 'grammatical', affix: 'lluinnar', filler_condition: 'yes', target_word: 'Ilinniartitsisoq', changed_word: 'Inersimasoq', changed_affix: 'NA', reverse_target_position: '7', sentence_words: '7', target_syllables: '7', correct_response: '0'}, // Mens læreren/den voksne fortæller om regneopgaverne, sidder eleven fuldstændig stille.
  // sentence 13
  { s1: "Ane aperipallappoq kammalaatini atuarfimmiit illoqarfiliaqatigisinnaanerlugit.", s2: "<p> Ane aperilertorpoq kammalaatini </p><p> atuarfimmiit illoqarfiliaqatigisinnaanerlugit. </p>", sentence_id: '13', change_type: 'change', affix_type: 'lexical', affix: 'pallag', filler_condition: 'no', target_word: 'aperipallappoq', changed_word: 'aperilertorpoq', changed_affix: 'lertor', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: '1'}, // Ane skynder sig at spørge / spørger hurtigt, om hun må tage i byen med sine veninder fra skolen.
  { s1: "Ane aperipallappoq kammalaatini atuarfimmiit illoqarfiliaqatigisinnaanerlugit.", s2: "<p> Ane aperivoq kammalaatini </p><p> atuarfimmiit illoqarfiliaqatigisinnaanerlugit. </p>", sentence_id: '13', change_type: 'deletion', affix_type: 'lexical', affix: 'pallag', filler_condition: 'no', target_word: 'aperipallappoq', changed_word: 'aperivoq', changed_affix: 'NA', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: '1'}, // Ane skynder sig at spørge / spørger, om hun må tage i byen med sine veninder fra skolen.
  { s1: "Ane aperipallappoq kammalaatini atuarfimmiit illoqarfiliaqatigisinnaanerlugit.", s2: "<p> Ane aperipallappoq kammalaatini </p><p> atuarfimmiit illoqarfiliaqatigisinnaanerlugit. </p>", sentence_id: '13', change_type: 'no_change', affix_type: 'lexical', affix: 'pallag', filler_condition: 'no', target_word: 'aperipallappoq', changed_word: 'aperipallappoq', changed_affix: 'pallag', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: 'NA'}, // Ane skynder sig at spørge, om hun må tage i byen med sine veninder fra skolen.
  { s1: "Ane aperinikuuvoq kammalaatini atuarfimmiit illoqarfiliaqatigisinnaanerlugit.", s2: "<p> Ane aperiumaarpoq kammalaatini </p><p> atuarfimmiit illoqarfiliaqatigisinnaanerlugit. </p>", sentence_id: '13', change_type: 'change', affix_type: 'grammatical', affix: 'nikuu', filler_condition: 'no', target_word: 'aperinikuuvoq', changed_word: 'aperiumaarpoq', changed_affix: 'jumaar', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: '1'}, // Ane har engang spurgt / vil nok spørge, om hun må tage i byen med sine veninder fra skolen.
  { s1: "Ane aperinikuuvoq kammalaatini atuarfimmiit illoqarfiliaqatigisinnaanerlugit.", s2: "<p> Ane aperivoq kammalaatini </p><p> atuarfimmiit illoqarfiliaqatigisinnaanerlugit. </p>", sentence_id: '13', change_type: 'deletion', affix_type: 'grammatical', affix: 'nikuu', filler_condition: 'no', target_word: 'aperinikuuvoq', changed_word: 'aperivoq', changed_affix: 'NA', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: '1'}, // Ane har engang spurgt / spørger, om hun må tage i byen med sine veninder fra skolen.
  { s1: "Ane aperinikuuvoq kammalaatini atuarfimmiit illoqarfiliaqatigisinnaanerlugit.", s2: "<p> Ane aperinikuuvoq kammalaatini </p><p> atuarfimmiit illoqarfiliaqatigisinnaanerlugit. </p>", sentence_id: '13', change_type: 'no_change', affix_type: 'grammatical', affix: 'nikuu', filler_condition: 'no', target_word: 'aperinikuuvoq', changed_word: 'aperinikuuvoq', changed_affix: 'nikuu', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: 'NA'}, // Ane har engang spurgt, om hun må tage i byen med sine veninder fra skolen.
  // sentence 14 fillers
  { s1: "Malik pisiniarfimmut biilipallappoq kisianni ruuat nungussimapput.", s2: "<p> Malik pisiniarfimmut biilipallappoq </p><p> kisianni ruuat nungussimapput. </p>", sentence_id: '14', change_type: 'no_change', affix_type: 'lexical', affix: 'pallag', filler_condition: 'yes', target_word: 'biilipallappoq', changed_word: 'biilipallappoq', changed_affix: 'pallag', reverse_target_position: '4', sentence_words: '6', target_syllables: '5', correct_response: 'NA'}, // Malik skynder sig at køre i bil hen til supermarkedet, men der er udsolgt af majroer.
  { s1: "Malik pisiniarfimmut biilernikuuvoq kisianni ruuat nungussimapput.", s2: "<p> Malik pisiniarfimmut biilernikuuvoq </p><p> kisianni ruuat nungussimapput. </p>", sentence_id: '14', change_type: 'no_change', affix_type: 'grammatical', affix: 'nikuu', filler_condition: 'yes', target_word: 'biilernikuuvoq', changed_word: 'biilernikuuvoq', changed_affix: 'nikuu', reverse_target_position: '4', sentence_words: '6', target_syllables: '5', correct_response: 'NA'}, // Malik har kørt i bil hen til supermarkedet, men der er udsolgt af majroer.
  { s1: "Malik pisiniarfimmut biililertorpoq kisianni ruuat nungussimapput.", s2: "<p> Piitaq pisiniarfimmut biililertorpoq </p><p> kisianni ruuat nungussimapput. </p>", sentence_id: '14', change_type: 'change', affix_type: 'lexical', affix: 'lertor', filler_condition: 'yes', target_word: 'Malik', changed_word: 'Piitaq', changed_affix: 'NA', reverse_target_position: '6', sentence_words: '6', target_syllables: '2', correct_response: '0'}, // Malik/Peter kører hurtigt i bil hen til supermarkedet, men der er udsolgt af majroer.
  { s1: "Malik pisiniarfimmut biileraluarpoq kisianni ruuat nungussimapput.", s2: "<p> Malik pisiniarfimmut biileraluarpoq </p><p> kisianni agurkit nungussimapput. </p>", sentence_id: '14', change_type: 'change', affix_type: 'grammatical', affix: 'galuar', filler_condition: 'yes', target_word: 'ruuat', changed_word: 'agurkit', changed_affix: 'NA', reverse_target_position: '2', sentence_words: '6', target_syllables: '2', correct_response: '4'}, // Malik kører ellers i bil hen til supermarkedet, men der er udsolgt af majroer/agurker.
  // sentence 15
  { s1: "Nukaga toqqortuarpoq kigutigissartinneq nuannarineq ajoramiuk.", s2: "<p> Nukaga toqqoqqissaarpoq kigutigissartinneq </p><p> nuannarineq ajoramiuk. </p>", sentence_id: '15', change_type: 'change', affix_type: 'lexical', affix: 'juar', filler_condition: 'no', target_word: 'toqqortuarpoq', changed_word: 'toqqoqqissaarpoq', changed_affix: 'qqissaar', reverse_target_position: '4', sentence_words: '5', target_syllables: '5', correct_response: '1'}, // Min lillesøster gemmer sig hele tiden / gemmer sig godt, fordi hun ikke kan lide at få børstet tænder.
  { s1: "Nukaga toqqortuarpoq kigutigissartinneq nuannarineq ajoramiuk.", s2: "<p> Nukaga toqqorpoq kigutigissartinneq </p><p> nuannarineq ajoramiuk. </p>", sentence_id: '15', change_type: 'deletion', affix_type: 'lexical', affix: 'juar', filler_condition: 'no', target_word: 'toqqortuarpoq', changed_word: 'toqqorpoq', changed_affix: 'NA', reverse_target_position: '4', sentence_words: '5', target_syllables: '5', correct_response: '1'}, // Min lillesøster gemmer sig hele tiden / gemmer sig, fordi hun ikke kan lide at få børstet tænder.
  { s1: "Nukaga toqqortuarpoq kigutigissartinneq nuannarineq ajoramiuk.", s2: "<p> Nukaga toqqortuarpoq kigutigissartinneq </p><p> nuannarineq ajoramiuk. </p>", sentence_id: '15', change_type: 'no_change', affix_type: 'lexical', affix: 'juar', filler_condition: 'no', target_word: 'toqqortuarpoq', changed_word: 'toqqortuarpoq', changed_affix: 'juar', reverse_target_position: '4', sentence_words: '5', target_syllables: '5', correct_response: 'NA'}, // Min lillesøster gemmer sig hele tiden, fordi hun ikke kan lide at få børstet tænder.
  { s1: "Nukaga toqqornikuuvoq kigutigissartinneq nuannarineq ajoramiuk.", s2: "<p> Nukaga toqqoriikatappoq kigutigissartinneq </p><p> nuannarineq ajoramiuk. </p>", sentence_id: '15', change_type: 'change', affix_type: 'grammatical', affix: 'nikuu', filler_condition: 'no', target_word: 'toqqornikuuvoq', changed_word: 'toqqoriikatappoq', changed_affix: 'riikatag', reverse_target_position: '4', sentence_words: '5', target_syllables: '5', correct_response: '1'}, // Min lillesøster har engang gemt sig / har allerede gemt sig, fordi hun ikke kan lide at få børstet tænder.
  { s1: "Nukaga toqqornikuuvoq kigutigissartinneq nuannarineq ajoramiuk.", s2: "<p> Nukaga toqqorpoq kigutigissartinneq </p><p> nuannarineq ajoramiuk. </p>", sentence_id: '15', change_type: 'deletion', affix_type: 'grammatical', affix: 'nikuu', filler_condition: 'no', target_word: 'toqqornikuuvoq', changed_word: 'toqqorpoq', changed_affix: 'NA', reverse_target_position: '4', sentence_words: '5', target_syllables: '5', correct_response: '1'}, // Min lillesøster har engang gemt sig / gemmer sig, fordi hun ikke kan lide at få børstet tænder.
  { s1: "Nukaga toqqornikuuvoq kigutigissartinneq nuannarineq ajoramiuk.", s2: "<p> Nukaga toqqornikuuvoq kigutigissartinneq </p><p> nuannarineq ajoramiuk. </p>", sentence_id: '15', change_type: 'no_change', affix_type: 'grammatical', affix: 'nikuu', filler_condition: 'no', target_word: 'toqqornikuuvoq', changed_word: 'toqqornikuuvoq', changed_affix: 'nikuu', reverse_target_position: '4', sentence_words: '5', target_syllables: '5', correct_response: 'NA'}, // Min lillesøster har engang gemt sig, fordi hun ikke kan lide at få børstet tænder.
  // sentence 16 fillers
  { s1: "Nivi qinerniarpoq kisianni apimmat takusaqarpiasinnaanngilaq.", s2: "<p> Nivi qinerniarpoq kisianni </p><p> apimmat takusaqarpiasinnaanngilaq. </p>", sentence_id: '16', change_type: 'no_change', affix_type: 'lexical', affix: 'niar', filler_condition: 'yes', target_word: 'qinerniarpoq', changed_word: 'qinerniarpoq', changed_affix: 'niar', reverse_target_position: '4', sentence_words: '5', target_syllables: '5', correct_response: 'NA'}, // Nivi agter at se sig om, men det er svært at se noget på grund af snevejret.
  { s1: "Nivi qineriikatappoq kisianni apimmat takusaqarpiasinnaanngilaq.", s2: "<p> Nivi qineriikatappoq kisianni </p><p> apimmat takusaqarpiasinnaanngilaq. </p>", sentence_id: '16', change_type: 'no_change', affix_type: 'grammatical', affix: 'riikatag', filler_condition: 'yes', target_word: 'qineriikatappoq', changed_word: 'qineriikatappoq', changed_affix: 'riikatag', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: 'NA'}, // Nivi har allerede set sig om, men det er svært at se noget på grund af snevejret.
  { s1: "Nivi qineqqissaarpoq kisianni apimmat takusaqarpiasinnaanngilaq.", s2: "<p> Ane qineqqissaarpoq kisianni </p><p> apimmat takusaqarpiasinnaanngilaq. </p>", sentence_id: '16', change_type: 'change', affix_type: 'lexical', affix: 'qqissaar', filler_condition: 'yes', target_word: 'Nivi', changed_word: 'Ane', changed_affix: 'NA', reverse_target_position: '5', sentence_words: '5', target_syllables: '2', correct_response: '0'}, // Nivi/Ane ser sig omhyggeligt om, men det er svært at se noget på grund af snevejret.
  { s1: "Nivi qineraluarpoq kisianni apimmat takusaqarpiasinnaanngilaq.", s2: "<p> Nivi qineraluarpoq kisianni </p><p> siallermat takusaqarpiasinnaanngilaq. </p>", sentence_id: '16', change_type: 'change', affix_type: 'grammatical', affix: 'galuar', filler_condition: 'yes', target_word: 'apimmat', changed_word: 'siallermat', changed_affix: 'NA', reverse_target_position: '2', sentence_words: '5', target_syllables: '3', correct_response: '3'}, // Nivi ser sig ellers om, men det er svært at se noget på grund af snevejret/regnvejret.
*/]

var sentences_2 = [ 
  // sentence 1 fillers
  { s1: "Aqagu suliassanik amerlasuunik naammassisassaqarami Hansi sulipallappoq.", s2: "<p> Aqagu suliassanik amerlasuunik </p><p> naammassisassaqarami Hansi sulipallappoq. </p>", sentence_id: '1', change_type: 'no_change', affix_type: 'lexical', affix: 'pallag', filler_condition: 'yes', target_word: 'sulipallappoq', changed_word: 'sulipallappoq', changed_affix: 'pallag', reverse_target_position: '1', sentence_words: '6', target_syllables: '5', correct_response: 'NA'}, // Hans har mange opgaver han skal nå at færdiggøre i morgen, derfor arbejder han hurtigt.
  /*{ s1: "Aqagu suliassanik amerlasuunik naammassisassaqarami Hansi suliumaarpoq.", s2: "<p> Aqagu suliassanik amerlasuunik </p><p> naammassisassaqarami Hansi suliumaarpoq. </p>", sentence_id: '1', change_type: 'no_change', affix_type: 'grammatical', affix: 'jumaar', filler_condition: 'yes', target_word: 'suliumaarpoq', changed_word: 'suliumaarpoq', changed_affix: 'jumaar', reverse_target_position: '1', sentence_words: '6', target_syllables: '5', correct_response: 'NA'}, // Hans har mange opgaver han skal nå at færdiggøre i morgen, derfor vil han nok arbejde.
  { s1: "Aqagu suliassanik amerlasuunik naammassisassaqarami Hansi suliniarpoq.", s2: "<p> Aqagu suliniutinik amerlasuunik </p><p> naammassisassaqarami Hansi suliniarpoq. </p>", sentence_id: '1', change_type: 'change', affix_type: 'lexical', affix: 'niar', filler_condition: 'yes', target_word: 'suliassanik', changed_word: 'suliniutinik', changed_affix: 'NA', reverse_target_position: '5', sentence_words: '6', target_syllables: '5', correct_response: '1'}, // Hans har mange opgaver/projekter han skal nå at færdiggøre i morgen, derfor agter han at arbejde.
  { s1: "Aqagu suliassanik amerlasuunik naammassisassaqarami Hansi sulissavoq.", s2: "<p> Aqagu suliassanik amerlasuunik </p><p> naammassisassaqarami Minik sulissavoq. </p>", sentence_id: '1', change_type: 'change', affix_type: 'grammatical', affix: 'ssa', filler_condition: 'yes', target_word: 'Hansi', changed_word: 'Minik', changed_affix: 'NA', reverse_target_position: '2', sentence_words: '6', target_syllables: '2', correct_response: '4'}, // Hans/Minik har mange projekter han skal nå at færdiggøre i morgen, derfor agter han at arbejde.
  // sentence 2 
  { s1: "Igaffimmi nateq saneqangaarmat Minik qulinik ukiulik saneqqippoq.", s2: "<p> Igaffimmi nateq saneqangaarmat </p><p> Minik qulinik ukiulik sanertuarpoq. </p>", sentence_id: '2', change_type: 'change', affix_type: 'lexical', affix: 'qqig', filler_condition: 'no', target_word: 'saneqqippoq', changed_word: 'sanertuarpoq', changed_affix: 'juar', reverse_target_position: '1', sentence_words: '7', target_syllables: '4', correct_response: '6'}, // Køkkengulvet er meget snavset, derfor fejer tiårige Minik igen / hele tiden.
  { s1: "Igaffimmi nateq saneqangaarmat Minik qulinik ukiulik saneqqippoq.", s2: "<p> Igaffimmi nateq saneqangaarmat </p><p> Minik qulinik ukiulik sanerpoq. </p>", sentence_id: '2', change_type: 'deletion', affix_type: 'lexical', affix: 'qqig', filler_condition: 'no', target_word: 'saneqqippoq', changed_word: 'sanerpoq', changed_affix: 'NA', reverse_target_position: '1', sentence_words: '7', target_syllables: '4', correct_response: '6'}, // Køkkengulvet er meget snavset, derfor fejer tiårige Minik igen / fejer tiårige Minik.
  { s1: "Igaffimmi nateq saneqangaarmat Minik qulinik ukiulik saneqqippoq.", s2: "<p> Igaffimmi nateq saneqangaarmat </p><p> Minik qulinik ukiulik saneqqippoq. </p>", sentence_id: '2', change_type: 'no_change', affix_type: 'lexical', affix: 'qqig', filler_condition: 'no', target_word: 'saneqqippoq', changed_word: 'saneqqippoq', changed_affix: 'qqig', reverse_target_position: '1', sentence_words: '7', target_syllables: '4', correct_response: 'NA'}, // Køkkengulvet er meget snavset, derfor fejer tiårige Minik igen.
  { s1: "Igaffimmi nateq saneqangaarmat Minik qulinik ukiulik sanersimavoq.", s2: "<p> Igaffimmi nateq saneqangaarmat </p><p> Minik qulinik ukiulik sanernikuuvoq. </p>", sentence_id: '2', change_type: 'change', affix_type: 'grammatical', affix: 'sima', filler_condition: 'no', target_word: 'sanersimavoq', changed_word: 'sanernikuuvoq', changed_affix: 'nikuu', reverse_target_position: '1', sentence_words: '7', target_syllables: '5', correct_response: '6'}, // Køkkengulvet er meget snavset, derfor har tiårige Minik fejet / har tiårige Minik (engang) fejet.
  { s1: "Igaffimmi nateq saneqangaarmat Minik qulinik ukiulik sanersimavoq.", s2: "<p> Igaffimmi nateq saneqangaarmat </p><p> Minik qulinik ukiulik sanerpoq. </p>", sentence_id: '2', change_type: 'deletion', affix_type: 'grammatical', affix: 'sima', filler_condition: 'no', target_word: 'sanersimavoq', changed_word: 'sanerpoq', changed_affix: 'NA', reverse_target_position: '1', sentence_words: '7', target_syllables: '5', correct_response: '6'}, // Køkkengulvet er meget snavset, derfor har tiårige Minik fejet / fejer tiårige Minik.
  { s1: "Igaffimmi nateq saneqangaarmat Minik qulinik ukiulik sanersimavoq.", s2: "<p> Igaffimmi nateq saneqangaarmat </p><p> Minik qulinik ukiulik sanersimavoq. </p>", sentence_id: '2', change_type: 'no_change', affix_type: 'grammatical', affix: 'sima', filler_condition: 'no', target_word: 'sanersimavoq', changed_word: 'sanersimavoq', changed_affix: 'sima', reverse_target_position: '1', sentence_words: '7', target_syllables: '5', correct_response: 'NA'}, // Køkkengulvet er meget snavset, derfor har tiårige Minik fejet.
  // sentence 3 fillers
  { s1: "Aqagu sila ajorniarpasippoq taamaattorli Aputsiaq suli aalisaqqippoq.", s2: "<p> Aqagu sila ajorniarpasippoq taamaattorli </p><p> Aputsiaq suli aalisaqqippoq. </p>", sentence_id: '3', change_type: 'no_change', affix_type: 'lexical', affix: 'qqig', filler_condition: 'yes', target_word: 'aalisaqqippoq', changed_word: 'aalisaqqippoq', changed_affix: 'qqig', reverse_target_position: '1', sentence_words: '7', target_syllables: '5', correct_response: 'NA'}, // Vejret ser ud til at blive dårligt i morgen, men Aputsiaq fisker alligevel igen.
  { s1: "Aqagu sila ajorniarpasippoq taamaattorli Aputsiaq suli aalisarnerpoq.", s2: "<p> Aqagu sila ajorniarpasippoq taamaattorli </p><p> Aputsiaq suli aalisarnerpoq. </p>", sentence_id: '3', change_type: 'no_change', affix_type: 'grammatical', affix: 'ner', filler_condition: 'yes', target_word: 'aalisarnerpoq', changed_word: 'aalisarnerpoq', changed_affix: 'ner', reverse_target_position: '1', sentence_words: '7', target_syllables: '5', correct_response: 'NA'}, // Vejret ser ud til at blive dårligt i morgen, men mon Aputsiaq fisker alligevel.
  { s1: "Aqagu sila ajorniarpasippoq taamaattorli Aputsiaq suli aalisarniarpoq.", s2: "<p> Aqagu sila ajussanngilaq taamaattorli </p><p> Aputsiaq suli aalisarniarpoq. </p>", sentence_id: '3', change_type: 'change', affix_type: 'lexical', affix: 'niar', filler_condition: 'yes', target_word: 'ajorniarpasippoq', changed_word: 'ajussanngilaq', changed_affix: 'NA', reverse_target_position: '5', sentence_words: '7', target_syllables: '7', correct_response: '2'}, // Vejret ser ud til at blive dårligt/godt i morgen, men Aputsiag agter alligevel at fiske.
  { s1: "Aqagu sila ajorniarpasippoq taamaattorli Aputsiaq suli aalisarumaarpoq.", s2: "<p> Aqagu sila ajorniarpasippoq taamaattorli </p><p> Hansi suli aalisarumaarpoq. </p>", sentence_id: '3', change_type: 'change', affix_type: 'grammatical', affix: 'jumaar', filler_condition: 'yes', target_word: 'Aputsiaq', changed_word: 'Hansi', changed_affix: 'NA', reverse_target_position: '3', sentence_words: '7', target_syllables: '4', correct_response: '4'}, // Vejret ser ud til at blive dårligt i morgen, men Aputsiaq/Hans vil nok fiske alligevel.
  // sentence 4
  { s1: "Naja aatsaartuarpoq ippassaammat festip kingorna innajaannginnami.", s2: "<p> Naja aatsaaqqippoq ippassaammat </p><p> festip kingorna innajaannginnami. </p>", sentence_id: '4', change_type: 'change', affix_type: 'lexical', affix: 'juar', filler_condition: 'no', target_word: 'aatsaartuarpoq', changed_word: 'aatsaaqqippoq', changed_affix: 'qqig', reverse_target_position: '5', sentence_words: '6', target_syllables: '5', correct_response: '1'}, // Naja gaber hele tiden / gaber igen, fordi hun kom så sent i seng i går aftes efter festen.
  { s1: "Naja aatsaartuarpoq ippassaammat festip kingorna innajaannginnami.", s2: "<p> Naja aatsaarpoq ippassaammat </p><p> festip kingorna innajaannginnami. </p>", sentence_id: '4', change_type: 'deletion', affix_type: 'lexical', affix: 'juar', filler_condition: 'no', target_word: 'aatsaartuarpoq', changed_word: 'aatsaarpoq', changed_affix: 'NA', reverse_target_position: '5', sentence_words: '6', target_syllables: '5', correct_response: '1'}, // Naja gaber hele tiden / gaber, fordi hun kom så sent i seng i går aftes efter festen.
  { s1: "Naja aatsaartuarpoq ippassaammat festip kingorna innajaannginnami.", s2: "<p> Naja aatsaartuarpoq ippassaammat </p><p> festip kingorna innajaannginnami. </p>", sentence_id: '4', change_type: 'no_change', affix_type: 'lexical', affix: 'juar', filler_condition: 'no', target_word: 'aatsaartuarpoq', changed_word: 'aatsaartuarpoq', changed_affix: 'juar', reverse_target_position: '5', sentence_words: '6', target_syllables: '5', correct_response: 'NA'}, // Naja gaber hele tiden, fordi hun kom så sent i seng i går aftes efter festen.
  { s1: "Naja aatsaarnerpoq ippassaammat festip kingorna innajaannginnami.", s2: "<p> Naja aatsaarsimavoq ippassaammat </p><p> festip kingorna innajaannginnami. </p>", sentence_id: '4', change_type: 'change', affix_type: 'grammatical', affix: 'ner', filler_condition: 'no', target_word: 'aatsaarnerpoq', changed_word: 'aatsaarsimavoq', changed_affix: 'sima', reverse_target_position: '5', sentence_words: '6', target_syllables: '4', correct_response: '1'}, // Mon Naja gaber / Naja har gabt, fordi hun kom så sent i seng i går aftes efter festen.
  { s1: "Naja aatsaarnerpoq ippassaammat festip kingorna innajaannginnami.", s2: "<p> Naja aatsaarpoq ippassaammat </p><p> festip kingorna innajaannginnami. </p>", sentence_id: '4', change_type: 'deletion', affix_type: 'grammatical', affix: 'ner', filler_condition: 'no', target_word: 'aatsaarnerpoq', changed_word: 'aatsaarpoq', changed_affix: 'NA', reverse_target_position: '5', sentence_words: '6', target_syllables: '4', correct_response: '1'}, // Mon Naja gaber / Naja gaber, fordi hun kom så sent i seng i går aftes efter festen.
  { s1: "Naja aatsaarnerpoq ippassaammat festip kingorna innajaannginnami.", s2: "<p> Naja aatsaarnerpoq ippassaammat </p><p> festip kingorna innajaannginnami. </p>", sentence_id: '4', change_type: 'no_change', affix_type: 'grammatical', affix: 'ner', filler_condition: 'no', target_word: 'aatsaarnerpoq', changed_word: 'aatsaarnerpoq', changed_affix: 'ner', reverse_target_position: '5', sentence_words: '6', target_syllables: '4', correct_response: 'NA'}, // Mon Naja gaber, fordi hun kom så sent i seng i går aftes efter festen.
  // sentence 5 fillers
  { s1: "Atsaga kaagiliortuarpoq kisianni illooraga sukkuarartorusunneruvoq aamma mamakujuit allat.", s2: "<p> Atsaga kaagiliortuarpoq kisianni illooraga </p><p> sukkuarartorusunneruvoq aamma mamakujuit allat. </p>", sentence_id: '5', change_type: 'no_change', affix_type: 'lexical', affix: 'juar', filler_condition: 'yes', target_word: 'kaagiliortuarpoq', changed_word: 'kaagiliortuarpoq', changed_affix: 'juar', reverse_target_position: '7', sentence_words: '8', target_syllables: '7', correct_response: 'NA'}, // Min tante bager hele tiden kage, men min fætter vil hellere spise bolsjer og andet slik.
  { s1: "Atsaga kaagilioraluarpoq kisianni illooraga sukkuarartorusunneruvoq aamma mamakujuit allat.", s2: "<p> Atsaga kaagilioraluarpoq kisianni illooraga </p><p> sukkuarartorusunneruvoq aamma mamakujuit allat. </p>", sentence_id: '5', change_type: 'no_change', affix_type: 'grammatical', affix: 'galuar', filler_condition: 'yes', target_word: 'kaagilioraluarpoq', changed_word: 'kaagilioraluarpoq', changed_affix: 'galuar', reverse_target_position: '7', sentence_words: '8', target_syllables: '8', correct_response: 'NA'}, // Min tante bager ellers kage, men min fætter vil hellere spise bolsjer og andet slik.
  { s1: "Atsaga kaagiliorunarpoq kisianni illooraga sukkuarartorusunneruvoq aamma mamakujuit allat.", s2: "<p> Atsaga kaagiliorunarpoq kisianni aqqaluga </p><p> sukkuarartorusunneruvoq aamma mamakujuit allat. </p>", sentence_id: '5', change_type: 'change', affix_type: 'lexical', affix: 'gunar', filler_condition: 'yes', target_word: 'illooraga', changed_word: 'aqqaluga', changed_affix: 'NA', reverse_target_position: '5', sentence_words: '8', target_syllables: '4', correct_response: '3'}, // Min tante bager vistnok kage, men min fætter/lillebror vil hellere spise bolsjer og andet slik.
  { s1: "Atsaga kaagiliussavoq kisianni illooraga sukkuarartorusunneruvoq aamma mamakujuit allat.", s2: "<p> Akkaga kaagiliussavoq kisianni illooraga </p><p> sukkuarartorusunneruvoq aamma mamakujuit allat. </p>", sentence_id: '5', change_type: 'change', affix_type: 'grammatical', affix: 'ssa', filler_condition: 'yes', target_word: 'Atsaga', changed_word: 'Akkaga', changed_affix: 'NA', reverse_target_position: '8', sentence_words: '8', target_syllables: '3', correct_response: '0'}, // Min tante/onkel skal bage kage, men min fætter vil hellere spise bolsjer og andet slik.
  // sentence 6
  { s1: "Assut siallilerniarmat Ivalu anipallappoq manisallu eqqullugit.", s2: "<p> Assut siallilerniarmat Ivalu </p><p> aniaarpoq manisallu eqqullugit. </p>", sentence_id: '6', change_type: 'change', affix_type: 'lexical', affix: 'pallag', filler_condition: 'no', target_word: 'anipallappoq', changed_word: 'aniaarpoq', changed_affix: 'jaar', reverse_target_position: '3', sentence_words: '6', target_syllables: '5', correct_response: '3'}, // Da det begynder at regne meget, skynder Ivalu sig ud / går Ivalu tidligt ud for at tage vasketøjet med ind.
  { s1: "Assut siallilerniarmat Ivalu anipallappoq manisallu eqqullugit.", s2: "<p> Assut siallilerniarmat Ivalu </p><p> anivoq manisallu eqqullugit. </p>", sentence_id: '6', change_type: 'deletion', affix_type: 'lexical', affix: 'pallag', filler_condition: 'no', target_word: 'anipallappoq', changed_word: 'anivoq', changed_affix: 'NA', reverse_target_position: '3', sentence_words: '6', target_syllables: '5', correct_response: '3'}, // Da det begynder at regne meget, skynder Ivalu sig ud / går Ivalu ud for at tage vasketøjet med ind.
  { s1: "Assut siallilerniarmat Ivalu anipallappoq manisallu eqqullugit.", s2: "<p> Assut siallilerniarmat Ivalu </p><p> anipallappoq manisallu eqqullugit. </p>", sentence_id: '6', change_type: 'no_change', affix_type: 'lexical', affix: 'pallag', filler_condition: 'no', target_word: 'anipallappoq', changed_word: 'anipallappoq', changed_affix: 'pallag', reverse_target_position: '3', sentence_words: '6', target_syllables: '5', correct_response: 'NA'}, // Da det begynder at regne meget, skynder Ivalu sig ud for at tage vasketøjet med ind.
  { s1: "Assut siallilerniarmat Ivalu aniriikatappoq manisallu eqqullugit.", s2: "<p> Assut siallilerniarmat Ivalu </p><p> anissavoq manisallu eqqullugit. </p>", sentence_id: '6', change_type: 'change', affix_type: 'grammatical', affix: 'riikatag', filler_condition: 'no', target_word: 'aniriikatappoq', changed_word: 'anissavoq', changed_affix: 'ssa', reverse_target_position: '3', sentence_words: '6', target_syllables: '6', correct_response: '3'}, // Da det begynder at regne meget, er Ivalu allerede gået ud / vil Ivalu gå ud for at tage vasketøjet med ind.
  { s1: "Assut siallilerniarmat Ivalu aniriikatappoq manisallu eqqullugit.", s2: "<p> Assut siallilerniarmat Ivalu </p><p> anivoq manisallu eqqullugit. </p>", sentence_id: '6', change_type: 'deletion', affix_type: 'grammatical', affix: 'riikatag', filler_condition: 'no', target_word: 'aniriikatappoq', changed_word: 'anivoq', changed_affix: 'NA', reverse_target_position: '3', sentence_words: '6', target_syllables: '6', correct_response: '3'}, // Da det begynder at regne meget, er Ivalu allerede gået ud / går Ivalu ud for at tage vasketøjet med ind.
  { s1: "Assut siallilerniarmat Ivalu aniriikatappoq manisallu eqqullugit.", s2: "<p> Assut siallilerniarmat Ivalu </p><p> aniriikatappoq manisallu eqqullugit. </p>", sentence_id: '6', change_type: 'no_change', affix_type: 'grammatical', affix: 'riikatag', filler_condition: 'no', target_word: 'aniriikatappoq', changed_word: 'aniriikatappoq', changed_affix: 'riikatag', reverse_target_position: '3', sentence_words: '6', target_syllables: '6', correct_response: 'NA'}, // Da det begynder at regne meget, er Ivalu allerede gået ud for at tage vasketøjet med ind.
  // sentence 7 fillers
  { s1: "Aqagu tivoli illoqarfimmut piniarmat nukappiaraq pilerigunarpoq.", s2: "<p> Aqagu tivoli illoqarfimmut </p><p> piniarmat nukappiaraq pilerigunarpoq. </p>", sentence_id: '7', change_type: 'no_change', affix_type: 'lexical', affix: 'gunar', filler_condition: 'yes', target_word: 'pilerigunarpoq', changed_word: 'pilerigunarpoq', changed_affix: 'gunar', reverse_target_position: '1', sentence_words: '6', target_syllables: '6', correct_response: 'NA'}, // I morgen kommer tivoli til byen, så drengen glæder sig vist.
  { s1: "Aqagu tivoli illoqarfimmut piniarmat nukappiaraq pilerissavoq.", s2: "<p> Aqagu tivoli illoqarfimmut </p><p> piniarmat nukappiaraq pilerissavoq. </p>", sentence_id: '7', change_type: 'no_change', affix_type: 'grammatical', affix: 'ssa', filler_condition: 'yes', target_word: 'pilerissavoq', changed_word: 'pilerissavoq', changed_affix: 'ssa', reverse_target_position: '1', sentence_words: '6', target_syllables: '5', correct_response: 'NA'}, // I morgen kommer tivoli til byen, så drengen vil glæde sig.
  { s1: "Aqagu tivoli illoqarfimmut piniarmat nukappiaraq pileriqqippoq.", s2: "<p> Aqagu festivali illoqarfimmut </p><p> piniarmat nukappiaraq pileriqqippoq. </p>", sentence_id: '7', change_type: 'change', affix_type: 'lexical', affix: 'qqig', filler_condition: 'yes', target_word: 'tivoli', changed_word: 'festivali', changed_affix: 'NA', reverse_target_position: '5', sentence_words: '6', target_syllables: '3', correct_response: '1'}, // I morgen kommer tivoli/festivalen til byen, så drengen glæder sig igen.
  { s1: "Aqagu tivoli illoqarfimmut piniarmat nukappiaraq pilerilluinnarpoq.", s2: "<p> Aqagu tivoli illoqarfimmut </p><p> piniarmat niviarsiaraq pilerilluinnarpoq. </p>", sentence_id: '7', change_type: 'change', affix_type: 'grammatical', affix: 'lluinnar', filler_condition: 'yes', target_word: 'nukappiaraq', changed_word: 'niviarsiaraq', changed_affix: 'NA', reverse_target_position: '2', sentence_words: '6', target_syllables: '5', correct_response: '4'}, // I morgen kommer tivoli til byen, så drengen/pigen glæder sig helt.
  // sentence 8
  { s1: "Atuarfimmi issiatilluni niviarsiaraq allattaavimmi allaqqissaarpoq.", s2: "<p> Atuarfimmi issiatilluni niviarsiaraq </p><p> allattaavimmi allalertorpoq. </p>", sentence_id: '8', change_type: 'change', affix_type: 'lexical', affix: 'qqissaar', filler_condition: 'no', target_word: 'allaqqissaarpoq', changed_word: 'allalertorpoq', changed_affix: 'lertor', reverse_target_position: '1', sentence_words: '5', target_syllables: '5', correct_response: '4'}, // Mens pigen sidder i skolen, skriver hun omhyggeligt/hurtigt i notesbogen.
  { s1: "Atuarfimmi issiatilluni niviarsiaraq allattaavimmi allaqqissaarpoq.", s2: "<p> Atuarfimmi issiatilluni niviarsiaraq </p><p> allattaavimmi allappoq. </p>", sentence_id: '8', change_type: 'deletion', affix_type: 'lexical', affix: 'qqissaar', filler_condition: 'no', target_word: 'allaqqissaarpoq', changed_word: 'allappoq', changed_affix: 'NA', reverse_target_position: '1', sentence_words: '5', target_syllables: '5', correct_response: '4'}, // Mens pigen sidder i skolen, skriver hun omhyggeligt i notesbogen / skriver hun i notesbogen.
  { s1: "Atuarfimmi issiatilluni niviarsiaraq allattaavimmi allaqqissaarpoq.", s2: "<p> Atuarfimmi issiatilluni niviarsiaraq </p><p> allattaavimmi allaqqissaarpoq. </p>", sentence_id: '8', change_type: 'no_change', affix_type: 'lexical', affix: 'qqissaar', filler_condition: 'no', target_word: 'allaqqissaarpoq', changed_word: 'allaqqissaarpoq', changed_affix: 'qqissaar', reverse_target_position: '1', sentence_words: '5', target_syllables: '5', correct_response: 'NA'}, // Mens pigen sidder i skolen, skriver hun omhyggeligt i notesbogen.
  { s1: "Atuarfimmi issiatilluni niviarsiaraq allattaavimmi allanerpoq.", s2: "<p> Atuarfimmi issiatilluni niviarsiaraq </p><p> allattaavimmi allakkaluarpoq. </p>", sentence_id: '8', change_type: 'change', affix_type: 'grammatical', affix: 'ner', filler_condition: 'no', target_word: 'allanerpoq', changed_word: 'allakkaluarpoq', changed_affix: 'galuar', reverse_target_position: '1', sentence_words: '5', target_syllables: '4', correct_response: '4'}, // Mens pigen sidder i skolen, skriver hun mon i notesbogen /skriver hun ellers i notesbogen.
  { s1: "Atuarfimmi issiatilluni niviarsiaraq allattaavimmi allanerpoq.", s2: "<p> Atuarfimmi issiatilluni niviarsiaraq </p><p> allattaavimmi allappoq. </p>", sentence_id: '8', change_type: 'deletion', affix_type: 'grammatical', affix: 'ner', filler_condition: 'no', target_word: 'allanerpoq', changed_word: 'allappoq', changed_affix: 'NA', reverse_target_position: '1', sentence_words: '5', target_syllables: '4', correct_response: '4'}, // Mens pigen sidder i skolen, skriver hun mon i notesbogen / skriver hun i notesbogen.
  { s1: "Atuarfimmi issiatilluni niviarsiaraq allattaavimmi allanerpoq.", s2: "<p> Atuarfimmi issiatilluni niviarsiaraq </p><p> allattaavimmi allanerpoq. </p>", sentence_id: '8', change_type: 'no_change', affix_type: 'grammatical', affix: 'ner', filler_condition: 'no', target_word: 'allanerpoq', changed_word: 'allanerpoq', changed_affix: 'ner', reverse_target_position: '1', sentence_words: '5', target_syllables: '4', correct_response: 'NA'}, // Mens pigen sidder i skolen, skriver hun mon i notesbogen.
  // sentence 9 fillers
  { s1: "Anorersuarpasilerpoq taamaattumik aataga angerlarniarpoq.", s2: "<p> Anorersuarpasilerpoq taamaattumik </p><p> aataga angerlarniarpoq. </p>", sentence_id: '9', change_type: 'no_change', affix_type: 'lexical', affix: 'niar', filler_condition: 'yes', target_word: 'angerlarniarpoq', changed_word: 'angerlarniarpoq', changed_affix: 'niar', reverse_target_position: '1', sentence_words: '4', target_syllables: '6', correct_response: 'NA'}, // Det begynder at trække op til storm, så min bedstefar agter at tage hjem.
  { s1: "Anorersuarpasilerpoq taamaattumik aataga angerlarsimavoq.", s2: "<p> Anorersuarpasilerpoq taamaattumik </p><p> aataga angerlarsimavoq. </p>", sentence_id: '9', change_type: 'no_change', affix_type: 'grammatical', affix: 'sima', filler_condition: 'yes', target_word: 'angerlarsimavoq', changed_word: 'angerlarsimavoq', changed_affix: 'sima', reverse_target_position: '1', sentence_words: '4', target_syllables: '6', correct_response: 'NA'}, // Det begynder at trække op til storm, så min bedstefar er taget hjem.
  { s1: "Anorersuarpasilerpoq taamaattumik aataga angerlajaarpoq.", s2: "<p> Anorersuarpasilerpoq taamaattumik </p><p> akkaaga angerlajaarpoq. </p>", sentence_id: '9', change_type: 'change', affix_type: 'lexical', affix: 'jaar', filler_condition: 'yes', target_word: 'aataga', changed_word: 'akkaaga', changed_affix: 'NA', reverse_target_position: '2', sentence_words: '4', target_syllables: '3', correct_response: '2'}, // Det begynder at trække op til storm, så min bedstefar/onkel tager tidligt hjem.
  { s1: "Anorersuarpasilerpoq taamaattumik aataga angerlarumaarpoq.", s2: "<p> Siallerpasilerpoq taamaattumik </p><p> aataga angerlarumaarpoq. </p>", sentence_id: '9', change_type: 'change', affix_type: 'grammatical', affix: 'jumaar', filler_condition: 'yes', target_word: 'Anorersuarpasilerpoq', changed_word: 'Siallerpasilerpoq', changed_affix: 'NA', reverse_target_position: '4', sentence_words: '4', target_syllables: '9', correct_response: '0'}, // Det begynder at trække op til storm/regn, så min bedstefar vil nok tage hjem.
  // sentence 10
  { s1: "Nuunuaraq nipangilertorpoq pissutigalugu anaanaminiit nerisinneqarami.", s2: "<p> Nuunuaraq nipangiaarpoq pissutigalugu </p><p> anaanaminiit nerisinneqarami. </p>", sentence_id: '10', change_type: 'change', affix_type: 'lexical', affix: 'lertor', filler_condition: 'no', target_word: 'nipangilertorpoq', changed_word: 'nipangiaarpoq', changed_affix: 'jaar', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: '1'}, // Babyen tier hurtigt stille / tier tidligt stille, fordi den får mad af sin mor.
  { s1: "Nuunuaraq nipangilertorpoq pissutigalugu anaanaminiit nerisinneqarami.", s2: "<p> Nuunuaraq nipangerpoq pissutigalugu </p><p> anaanaminiit nerisinneqarami. </p>", sentence_id: '10', change_type: 'deletion', affix_type: 'lexical', affix: 'lertor', filler_condition: 'no', target_word: 'nipangilertorpoq', changed_word: 'nipangerpoq', changed_affix: 'NA', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: '1'}, // Babyen tier hurtigt stille / tier stille, fordi den får mad af sin mor.
  { s1: "Nuunuaraq nipangilertorpoq pissutigalugu anaanaminiit nerisinneqarami.", s2: "<p> Nuunuaraq nipangilertorpoq pissutigalugu </p><p> anaanaminiit nerisinneqarami. </p>", sentence_id: '10', change_type: 'no_change', affix_type: 'lexical', affix: 'lertor', filler_condition: 'no', target_word: 'nipangilertorpoq', changed_word: 'nipangilertorpoq', changed_affix: 'lertor', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: 'NA'}, // Babyen tier hurtigt stille, fordi den får mad af sin mor.
  { s1: "Nuunuaraq nipangersimavoq pissutigalugu anaanaminiit nerisinneqarami.", s2: "<p> Nuunuaraq nipangerluinnarpoq pissutigalugu </p><p> anaanaminiit nerisinneqarami. </p>", sentence_id: '10', change_type: 'change', affix_type: 'grammatical', affix: 'sima', filler_condition: 'no', target_word: 'nipangersimavoq', changed_word: 'nipangerluinnarpoq', changed_affix: 'lluinnar', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: '1'}, // Babyen har tiet stille / tier helt stille, fordi den får mad af sin mor.
  { s1: "Nuunuaraq nipangersimavoq pissutigalugu anaanaminiit nerisinneqarami.", s2: "<p> Nuunuaraq nipangerpoq pissutigalugu </p><p> anaanaminiit nerisinneqarami. </p>", sentence_id: '10', change_type: 'deletion', affix_type: 'grammatical', affix: 'sima', filler_condition: 'no', target_word: 'nipangersimavoq', changed_word: 'nipangerpoq', changed_affix: 'NA', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: '1'}, // Babyen har tiet stille / tier stille, fordi den får mad af sin mor.
  { s1: "Nuunuaraq nipangersimavoq pissutigalugu anaanaminiit nerisinneqarami.", s2: "<p> Nuunuaraq nipangersimavoq pissutigalugu </p><p> anaanaminiit nerisinneqarami. </p>", sentence_id: '10', change_type: 'no_change', affix_type: 'grammatical', affix: 'sima', filler_condition: 'no', target_word: 'nipangersimavoq', changed_word: 'nipangersimavoq', changed_affix: 'sima', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: 'NA'}, // Babyen har tiet stille, fordi den får mad af sin mor.
  // sentence 11 fillers
  { s1: "Ullumi ualeq naallugu kaffillertoqarmat aanaga qasugunarpoq.", s2: "<p> Ullumi ualeq naallugu </p><p> kaffillertoqarmat aanaga qasugunarpoq. </p>", sentence_id: '11', change_type: 'no_change', affix_type: 'lexical', affix: 'gunar', filler_condition: 'yes', target_word: 'qasugunarpoq', changed_word: 'qasugunarpoq', changed_affix: 'gunar', reverse_target_position: '1', sentence_words: '6', target_syllables: '4', correct_response: 'NA'}, // I dag har der været kaffemik hele eftermiddagen, så derfor virker min bedstemor træt.
  { s1: "Ullumi ualeq naallugu kaffillertoqarmat aanaga qasulluinnarpoq.", s2: "<p> Ullumi ualeq naallugu </p><p> kaffillertoqarmat aanaga qasulluinnarpoq. </p>", sentence_id: '11', change_type: 'no_change', affix_type: 'grammatical', affix: 'lluinnar', filler_condition: 'yes', target_word: 'qasulluinnarpoq', changed_word: 'qasulluinnarpoq', changed_affix: 'lluinnar', reverse_target_position: '1', sentence_words: '6', target_syllables: '6', correct_response: 'NA'}, // I dag har der været kaffemik hele eftermiddagen, så derfor er min bedstemor helt træt.
  { s1: "Ullumi ualeq naallugu kaffillertoqarmat aanaga qasujaarpoq.", s2: "<p> Ullumi ualeq naallugu </p><p> kaffillertoqarmat atsaga qasujaarpoq. </p>", sentence_id: '11', change_type: 'change', affix_type: 'lexical', affix: 'jaar', filler_condition: 'yes', target_word: 'aanaga', changed_word: 'atsaga', changed_affix: 'NA', reverse_target_position: '2', sentence_words: '6', target_syllables: '3', correct_response: '4'}, // I dag har der været kaffemik hele eftermiddagen, så derfor er min bedstemor/tante tidligt træt.
  { s1: "Ullumi ualeq naallugu kaffillertoqarmat aanaga qasuriikatappoq.", s2: "<p> Ullumi unnuk naallugu </p><p> kaffillertoqarmat aanaga qasuriikatappoq. </p>", sentence_id: '11', change_type: 'change', affix_type: 'grammatical', affix: 'riikatag', filler_condition: 'yes', target_word: 'ualeq', changed_word: 'unnuk', changed_affix: 'NA', reverse_target_position: '5', sentence_words: '6', target_syllables: '3', correct_response: '1'}, // I dag har der været kaffemik hele eftermiddagen/aftenen, så derfor er min bedstemor allerede træt.
  // sentence 12
  { s1: "Ilinniartitsisoq kisitsilluni suliassat pillugit oqaluttuartoq atuartoq uninngagunarpoq.", s2: "<p> Ilinniartitsisoq kisitsilluni suliassat pillugit </p><p> oqaluttuartoq atuartoq uninngaqqissaarpoq. </p>", sentence_id: '12', change_type: 'change', affix_type: 'lexical', affix: 'gunar', filler_condition: 'no', target_word: 'uninngagunarpoq', changed_word: 'uninngaqqissaarpoq', changed_affix: 'qqissaar', reverse_target_position: '1', sentence_words: '7', target_syllables: '6', correct_response: '6'}, // Mens læreren fortæller om regneopgaverne, sidder eleven vistnok stille / sidder eleven helt stille.
  { s1: "Ilinniartitsisoq kisitsilluni suliassat pillugit oqaluttuartoq atuartoq uninngagunarpoq.", s2: "<p> Ilinniartitsisoq kisitsilluni suliassat pillugit </p><p> oqaluttuartoq atuartoq uninngavoq. </p>", sentence_id: '12', change_type: 'deletion', affix_type: 'lexical', affix: 'gunar', filler_condition: 'no', target_word: 'uninngagunarpoq', changed_word: 'uninngavoq', changed_affix: 'NA', reverse_target_position: '1', sentence_words: '7', target_syllables: '6', correct_response: '6'}, // Mens læreren fortæller om regneopgaverne, sidder eleven vistnok stille / sidder eleven stille.
  { s1: "Ilinniartitsisoq kisitsilluni suliassat pillugit oqaluttuartoq atuartoq uninngagunarpoq.", s2: "<p> Ilinniartitsisoq kisitsilluni suliassat pillugit </p><p> oqaluttuartoq atuartoq uninngagunarpoq. </p>", sentence_id: '12', change_type: 'no_change', affix_type: 'lexical', affix: 'gunar', filler_condition: 'no', target_word: 'uninngagunarpoq', changed_word: 'uninngagunarpoq', changed_affix: 'gunar', reverse_target_position: '1', sentence_words: '7', target_syllables: '6', correct_response: 'NA'}, // Mens læreren fortæller om regneopgaverne, sidder eleven vistnok stille.
  { s1: "Ilinniartitsisoq kisitsilluni suliassat pillugit oqaluttuartoq atuartoq uninngalluinnarpoq.", s2: "<p> Ilinniartitsisoq kisitsilluni suliassat pillugit </p><p> oqaluttuartoq atuartoq uninnganerpoq. </p>", sentence_id: '12', change_type: 'change', affix_type: 'grammatical', affix: 'lluinnar', filler_condition: 'no', target_word: 'uninngalluinnarpoq', changed_word: 'uninnganerpoq', changed_affix: 'ner', reverse_target_position: '1', sentence_words: '7', target_syllables: '7', correct_response: '6'}, // Mens læreren fortæller om regneopgaverne, sidder eleven fuldstændig stille / sidder eleven mon stille.
  { s1: "Ilinniartitsisoq kisitsilluni suliassat pillugit oqaluttuartoq atuartoq uninngalluinnarpoq.", s2: "<p> Ilinniartitsisoq kisitsilluni suliassat pillugit </p><p> oqaluttuartoq atuartoq uninngavoq. </p>", sentence_id: '12', change_type: 'deletion', affix_type: 'grammatical', affix: 'lluinnar', filler_condition: 'no', target_word: 'uninngalluinnarpoq', changed_word: 'uninngavoq', changed_affix: 'NA', reverse_target_position: '1', sentence_words: '7', target_syllables: '7', correct_response: '6'}, // Mens læreren fortæller om regneopgaverne, sidder eleven fuldstændig stille / sidder eleven stille.
  { s1: "Ilinniartitsisoq kisitsilluni suliassat pillugit oqaluttuartoq atuartoq uninngalluinnarpoq.", s2: "<p> Ilinniartitsisoq kisitsilluni suliassat pillugit </p><p> oqaluttuartoq atuartoq uninngalluinnarpoq. </p>", sentence_id: '12', change_type: 'no_change', affix_type: 'grammatical', affix: 'lluinnar', filler_condition: 'no', target_word: 'uninngalluinnarpoq', changed_word: 'uninngalluinnarpoq', changed_affix: 'lluinnar', reverse_target_position: '1', sentence_words: '7', target_syllables: '7', correct_response: 'NA'}, // Mens læreren fortæller om regneopgaverne, sidder eleven fuldstændig stille.
  // sentence 13 fillers
  { s1: "Ane aperilertorpoq kammalaatini atuarfimmiit illoqarfiliaqatigisinnaanerlugit.", s2: "<p> Ane aperilertorpoq kammalaatini </p><p> atuarfimmiit illoqarfiliaqatigisinnaanerlugit. </p>", sentence_id: '13', change_type: 'no_change', affix_type: 'lexical', affix: 'lertor', filler_condition: 'yes', target_word: 'aperilertorpoq', changed_word: 'aperilertorpoq', changed_affix: 'lertor', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: 'NA'}, // Ane spørger hurtigt, om hun må tage i byen med sine veninder fra skolen.
  { s1: "Ane aperiumaarpoq kammalaatini atuarfimmiit illoqarfiliaqatigisinnaanerlugit.", s2: "<p> Ane aperiumaarpoq kammalaatini </p><p> atuarfimmiit illoqarfiliaqatigisinnaanerlugit. </p>", sentence_id: '13', change_type: 'no_change', affix_type: 'grammatical', affix: 'jumaar', filler_condition: 'yes', target_word: 'aperiumaarpoq', changed_word: 'aperiumaarpoq', changed_affix: 'jumaar', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: 'NA'}, // Ane vil nok spørge, om hun må tage i byen med sine veninder fra skolen.
  { s1: "Ane aperipallappoq kammalaatini atuarfimmiit illoqarfiliaqatigisinnaanerlugit.", s2: "<p> Nivi aperipallappoq kammalaatini </p><p> atuarfimmiit illoqarfiliaqatigisinnaanerlugit. </p>", sentence_id: '13', change_type: 'change', affix_type: 'lexical', affix: 'pallag', filler_condition: 'yes', target_word: 'Ane', changed_word: 'Nivi', changed_affix: 'NA', reverse_target_position: '5', sentence_words: '5', target_syllables: '2', correct_response: '0'}, // Ane/Nivi skynder sig at spørge, om hun må tage i byen med sine veninder fra skolen.
  { s1: "Ane aperinikuuvoq kammalaatini atuarfimmiit illoqarfiliaqatigisinnaanerlugit.", s2: "<p> Ane aperinikuuvoq kammalaatini </p><p> klubbimiit illoqarfiliaqatigisinnaanerlugit. </p>", sentence_id: '13', change_type: 'change', affix_type: 'grammatical', affix: 'nikuu', filler_condition: 'yes', target_word: 'atuarfimmiit', changed_word: 'klubbimiit', changed_affix: 'NA', reverse_target_position: '2', sentence_words: '5', target_syllables: '5', correct_response: '3'}, // Ane har engang spurgt, om hun må tage i byen med sine veninder fra skolen/klubben.
  // sentence 14
  { s1: "Malik pisiniarfimmut biililertorpoq kisianni ruuat nungussimapput.", s2: "<p> Malik pisiniarfimmut biilipallappoq </p><p> kisianni ruuat nungussimapput. </p>", sentence_id: '14', change_type: 'change', affix_type: 'lexical', affix: 'lertor', filler_condition: 'no', target_word: 'biililertorpoq', changed_word: 'biilipallappoq', changed_affix: 'pallag', reverse_target_position: '4', sentence_words: '6', target_syllables: '5', correct_response: '2'}, // Malik kører hurtigt i bil / skynder sig at køre i bil hen til supermarkedet, men der er udsolgt af majroer.
  { s1: "Malik pisiniarfimmut biililertorpoq kisianni ruuat nungussimapput.", s2: "<p> Malik pisiniarfimmut biilerpoq </p><p> kisianni ruuat nungussimapput. </p>", sentence_id: '14', change_type: 'deletion', affix_type: 'lexical', affix: 'lertor', filler_condition: 'no', target_word: 'biililertorpoq', changed_word: 'biilerpoq', changed_affix: 'NA', reverse_target_position: '4', sentence_words: '6', target_syllables: '5', correct_response: '2'}, // Malik kører hurtigt i bil / kører i bil hen til supermarkedet, men der er udsolgt af majroer.
  { s1: "Malik pisiniarfimmut biililertorpoq kisianni ruuat nungussimapput.", s2: "<p> Malik pisiniarfimmut biililertorpoq </p><p> kisianni ruuat nungussimapput. </p>", sentence_id: '14', change_type: 'no_change', affix_type: 'lexical', affix: 'lertor', filler_condition: 'no', target_word: 'biililertorpoq', changed_word: 'biililertorpoq', changed_affix: 'lertor', reverse_target_position: '4', sentence_words: '6', target_syllables: '5', correct_response: 'NA'}, // Malik kører hurtigt i bil hen til supermarkedet, men der er udsolgt af majroer.
  { s1: "Malik pisiniarfimmut biileraluarpoq kisianni ruuat nungussimapput.", s2: "<p> Malik pisiniarfimmut biilernikuuvoq </p><p> kisianni ruuat nungussimapput. </p>", sentence_id: '14', change_type: 'change', affix_type: 'grammatical', affix: 'galuar', filler_condition: 'no', target_word: 'biileraluarpoq', changed_word: 'biilernikuuvoq', changed_affix: 'nikuu', reverse_target_position: '4', sentence_words: '6', target_syllables: '6', correct_response: '2'}, // Malik kører ellers i bil / har kørt i bil hen til supermarkedet, men der er udsolgt af majroer.
  { s1: "Malik pisiniarfimmut biileraluarpoq kisianni ruuat nungussimapput.", s2: "<p> Malik pisiniarfimmut biilerpoq </p><p> kisianni ruuat nungussimapput. </p>", sentence_id: '14', change_type: 'deletion', affix_type: 'grammatical', affix: 'galuar', filler_condition: 'no', target_word: 'biileraluarpoq', changed_word: 'biilerpoq', changed_affix: 'NA', reverse_target_position: '4', sentence_words: '6', target_syllables: '6', correct_response: '2'}, // Malik kører ellers i bil / kører i bil hen til supermarkedet, men der er udsolgt af majroer.
  { s1: "Malik pisiniarfimmut biileraluarpoq kisianni ruuat nungussimapput.", s2: "<p> Malik pisiniarfimmut biileraluarpoq </p><p> kisianni ruuat nungussimapput. </p>", sentence_id: '14', change_type: 'no_change', affix_type: 'grammatical', affix: 'galuar', filler_condition: 'no', target_word: 'biileraluarpoq', changed_word: 'biileraluarpoq', changed_affix: 'galuar', reverse_target_position: '4', sentence_words: '6', target_syllables: '6', correct_response: 'NA'}, // Malik kører ellers i bil hen til supermarkedet, men der er udsolgt af majroer.
  // sentence 15 fillers
  { s1: "Nukaga toqqoqqissaarpoq kigutigissartinneq nuannarineq ajoramiuk.", s2: "<p> Nukaga toqqoqqissaarpoq kigutigissartinneq </p><p> nuannarineq ajoramiuk. </p>", sentence_id: '15', change_type: 'no_change', affix_type: 'lexical', affix: 'qqissaar', filler_condition: 'yes', target_word: 'toqqoqqissaarpoq', changed_word: 'toqqoqqissaarpoq', changed_affix: 'qqissaar', reverse_target_position: '4', sentence_words: '5', target_syllables: '5', correct_response: 'NA'}, // Min lillesøster gemmer sig godt, fordi hun ikke kan lide at få børstet tænder.
  { s1: "Nukaga toqqoriikatappoq kigutigissartinneq nuannarineq ajoramiuk.", s2: "<p> Nukaga toqqoriikatappoq kigutigissartinneq </p><p> nuannarineq ajoramiuk. </p>", sentence_id: '15', change_type: 'no_change', affix_type: 'grammatical', affix: 'riikatag', filler_condition: 'yes', target_word: 'toqqoriikatappoq', changed_word: 'toqqoriikatappoq', changed_affix: 'riikatag', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: 'NA'}, // Min lillesøster har allerede gemt sig, fordi hun ikke kan lide at få børstet tænder.
  { s1: "Nukaga toqqortuarpoq kigutigissartinneq nuannarineq ajoramiuk.", s2: "<p> Aqqaluga toqqortuarpoq kigutigissartinneq </p><p> nuannarineq ajoramiuk. </p>", sentence_id: '15', change_type: 'change', affix_type: 'lexical', affix: 'juar', filler_condition: 'yes', target_word: 'Nukaga', changed_word: 'Aqqaluga', changed_affix: 'NA', reverse_target_position: '5', sentence_words: '5', target_syllables: '3', correct_response: '0'}, // Min lillesøster/lillebror gemmer sig hele tiden, fordi hun/han ikke kan lide at få børstet tænder.
  { s1: "Nukaga toqqornikuuvoq kigutigissartinneq nuannarineq ajoramiuk.", s2: "<p> Nukaga toqqornikuuvoq illaartinneq </p><p> nuannarineq ajoramiuk. </p>", sentence_id: '15', change_type: 'change', affix_type: 'grammatical', affix: 'nikuu', filler_condition: 'yes', target_word: 'kigutigissartinneq', changed_word: 'illaartinneq', changed_affix: 'NA', reverse_target_position: '3', sentence_words: '5', target_syllables: '7', correct_response: '2'}, // Min lillesøster har engang gemt sig, fordi hun ikke kan lide at få børstet tænder / redt hår.
  // sentence 16
  { s1: "Nivi qineqqissaarpoq kisianni apimmat takusaqarpiasinnaanngilaq.", s2: "<p> Nivi qinerniarpoq kisianni </p><p> apimmat takusaqarpiasinnaanngilaq. </p>", sentence_id: '16', change_type: 'change', affix_type: 'lexical', affix: 'qqissaar', filler_condition: 'no', target_word: 'qineqqissaarpoq', changed_word: 'qinerniarpoq', changed_affix: 'niar', reverse_target_position: '4', sentence_words: '5', target_syllables: '5', correct_response: '1'}, // Nivi ser sig omhyggeligt om / agter at se sig om, men det er svært at se noget på grund af snevejret.
  { s1: "Nivi qineqqissaarpoq kisianni apimmat takusaqarpiasinnaanngilaq.", s2: "<p> Nivi qinerpoq kisianni </p><p> apimmat takusaqarpiasinnaanngilaq. </p>", sentence_id: '16', change_type: 'deletion', affix_type: 'lexical', affix: 'qqissaar', filler_condition: 'no', target_word: 'qineqqissaarpoq', changed_word: 'qinerpoq', changed_affix: 'NA', reverse_target_position: '4', sentence_words: '5', target_syllables: '5', correct_response: '1'}, // Nivi ser sig omhyggeligt om / ser sig om, men det er svært at se noget på grund af snevejret.
  { s1: "Nivi qineqqissaarpoq kisianni apimmat takusaqarpiasinnaanngilaq.", s2: "<p> Nivi qineqqissaarpoq kisianni </p><p> apimmat takusaqarpiasinnaanngilaq. </p>", sentence_id: '16', change_type: 'no_change', affix_type: 'lexical', affix: 'qqissaar', filler_condition: 'no', target_word: 'qineqqissaarpoq', changed_word: 'qineqqissaarpoq', changed_affix: 'qqissaar', reverse_target_position: '4', sentence_words: '5', target_syllables: '5', correct_response: 'NA'}, // Nivi ser sig omhyggeligt om, men det er svært at se noget på grund af snevejret.
  { s1: "Nivi qineraluarpoq kisianni apimmat takusaqarpiasinnaanngilaq.", s2: "<p> Nivi qineriikatappoq kisianni </p><p> apimmat takusaqarpiasinnaanngilaq. </p>", sentence_id: '16', change_type: 'change', affix_type: 'grammatical', affix: 'galuar', filler_condition: 'no', target_word: 'qineraluarpoq', changed_word: 'qineriikatappoq', changed_affix: 'riikatag', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: '1'}, // Nivi ser sig ellers om / har allerede set sig om, men det er svært at se noget på grund af snevejret.
  { s1: "Nivi qineraluarpoq kisianni apimmat takusaqarpiasinnaanngilaq.", s2: "<p> Nivi qinerpoq kisianni </p><p> apimmat takusaqarpiasinnaanngilaq. </p>", sentence_id: '16', change_type: 'deletion', affix_type: 'grammatical', affix: 'galuar', filler_condition: 'no', target_word: 'qineraluarpoq', changed_word: 'qinerpoq', changed_affix: 'NA', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: '1'}, // Nivi ser sig ellers om / ser sig om, men det er svært at se noget på grund af snevejret.
  { s1: "Nivi qineraluarpoq kisianni apimmat takusaqarpiasinnaanngilaq.", s2: "<p> Nivi qineraluarpoq kisianni </p><p> apimmat takusaqarpiasinnaanngilaq. </p>", sentence_id: '16', change_type: 'no_change', affix_type: 'grammatical', affix: 'galuar', filler_condition: 'no', target_word: 'qineraluarpoq', changed_word: 'qineraluarpoq', changed_affix: 'galuar', reverse_target_position: '4', sentence_words: '5', target_syllables: '6', correct_response: 'NA'}, // Nivi ser sig ellers om, men det er svært at se noget på grund af snevejret.
*/]
 
// assigning participant randomly to either group 1 or 2  
var random_number = Math.random()
console.log("Random number: " + random_number)
if (random_number > 0.5) {
  sentences = sentences_1
  jsPsych.data.addProperties({group: 1});
  // console.log("group 1")
}
else {
  sentences = sentences_2
  jsPsych.data.addProperties({group: 2});
  // console.log("group 2")
}

  function splitToNChunks(array, n) {
    let result = [];
    for (let i = n; i > 0; i--) {
        result.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return result;
  }
  
  // randomisation
  let no_fill = [];
  let fill = [];
  
  // split into fillers and non-fillers
  for (var i in sentences) {
    if (sentences[i]["filler_condition"] == "no") {
      no_fill.push(sentences[i])
    }
    if (sentences[i]["filler_condition"] == "yes") {
      fill.push(sentences[i])
    }
  }
  // shuffle fillers
  fill = jsPsych.randomization.repeat(fill, 1);
  // shuffle non-fillers
  no_fill = jsPsych.randomization.repeat(no_fill, 1);
  // split to chunks
  chunks_filler = splitToNChunks(fill, 4)
  chunks_no_filler = splitToNChunks(no_fill, 4)
  // concatenate chunks and shuffle each of the four chunks separately
  all_sentences = jsPsych.randomization.repeat(chunks_filler[0].concat(chunks_no_filler[0]), 1).concat(jsPsych.randomization.repeat(chunks_filler[1].concat(chunks_no_filler[1]), 1), 
  jsPsych.randomization.repeat(chunks_filler[2].concat(chunks_no_filler[2]), 1), jsPsych.randomization.repeat(chunks_filler[3].concat(chunks_no_filler[3]), 1))
  console.log(all_sentences)


// four practice trials
var spr_trial_1 = make_spr_trial("Piitaq kommunemut maalaarpoq kisianni sanaartorneq unitsinneqanngilaq.","<p> Piitaq borgmesterimut maalaarpoq kisianni </p><p> sanaartorneq unitsinneqanngilaq. </p>", // Peter klager til kommunen/borgmesteren men byggeriet bliver ikke stoppet.
'p1','change_practice','root', 'kommunemut', 'no', 'kommunemut', 'borgmesterimut', 'NA', '5', '6', '4', 'NA')
var spr_trial_2 = make_spr_trial("Johanne igavoq unnugu amerlasuunik pulaartoqarniarami.","<p> Johanne igavoq unnugu </p><p> amerlasuunik pulaartoqarniarami. </p>", // Johanne laver mad fordi hun får mange gæster i aften.
'p2','no_change_practice','NA', 'NA', 'no', 'NA', 'NA', 'NA', 'NA', '5', 'NA', 'NA')
var spr_trial_3 = make_spr_trial("Nuka sapaatip akunnera kingulleq ilaquttani pulaarlugit Sisimiuniippoq.","<p> Nuka sapaatip akunnera kingulleq </p><p> ilaquttani pulaarlugit Ilulissaniippoq. </p>", // Nuka har været i Sismiut/Ilulissat i sidste uge for at besøge sin familie.
'p3','change_practice','root', 'Sisimiuniippoq', 'no', 'Sisimiuniippoq', 'Ilulissaniippoq', 'NA', '1', '7', '6', 'NA')
var spr_trial_4 = make_spr_trial("Nina umiatsiamik pisisimavoq taava angalaarsinnaavoq.","<p> Nina umiatsiamik pisisimavoq </p><p> taava angalaarsinnaavoq. </p>", // Nina har købt en båd så hun kan sejle ud på tur.
'p4','no_change_practice','NA', 'NA', 'no', 'NA', 'NA', 'NA', 'NA', '5', 'NA', 'NA')

timeline.push(spr_trial_1)

// feedback practice trial 1
var feedback_trial_1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    var previousResponse = jsPsych.data.getLastTrialData().values()[0].response;
    console.log('Previous Response:', previousResponse);
    // display different stimuli based on the previous response
    if (previousResponse === 1) {
      return '<p><span style="color: green">Eqqorpoq!</span></p><p>Oqaaseq <i>kommunemut</i>-mit <i>borgmesterimut</i>-mut allanngortinneqarsimavoq.</p>'; // Rigtigt! Ordet kommune var ændret til borgmester
    } else {
      return '<p><span style="color: red">Eqqunngilaq!</span></p><p>Oqaaseq <i>kommunemut</i>-mit <i>borgmesterimut</i>-mut allanngortinneqarsimavoq.</p>'; // Forkert! Ordet kommune var ændret til borgmester
    }
  },
  choices: ['Ingerlaqqigit'] // Fortsæt
}
timeline.push(feedback_trial_1)

timeline.push(spr_trial_2)

// feedback practice trial 2
var feedback_trial_2 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    var previousPreviousResponse = jsPsych.data.get().last(2).values()[0].response;
    console.log('Previous previous Response:', previousPreviousResponse);
    // display different stimuli based on the previous response
    if (previousPreviousResponse === 1) {
      return '<p><span style="color: green">Eqqorpoq!</span></p><p>Oqaaseqatigiinni allanngortoqarsimanngilaq.</p>'; // Rigtigt! Der var ingen ændring i sætningen
    } else {
      return '<p><span style="color: red">Eqqunngilaq!</span></p><p>Oqaaseqatigiinni allanngortoqarsimanngilaq.</p>'; // Forkert! Der var ingen ændring i sætningen
    }
  },
  choices: ['Ingerlaqqigit'] // Fortsæt
}
timeline.push(feedback_trial_2)

timeline.push(spr_trial_3)

// feedback practice trial 3
var feedback_trial_3 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    var previousResponse = jsPsych.data.getLastTrialData().values()[0].response;
    console.log('Previous Response:', previousResponse);
    // display different stimuli based on the previous response
    if (previousResponse === 6) {
      return '<p><span style="color: green">Eqqorpoq!</span></p><p>Oqaaseq <i>Sisimiuniippoq</i>-mit <i>Ilulissaniippoq</i>-mut allanngortinneqarsimavoq.</p>'; // Rigtigt! Ordet kommune var ændret til borgmester
    } else {
      return '<p><span style="color: red">Eqqunngilaq!</span></p><p>Oqaaseq <i>Sisimiuniippoq</i>-mit <i>Ilulissaniippoq</i>-mut allanngortinneqarsimavoq.</p>'; // Forkert! Ordet kommune var ændret til borgmester
    }
  },
  choices: ['Ingerlaqqigit'] // Fortsæt
}
timeline.push(feedback_trial_3)

timeline.push(spr_trial_4)

// feedback practice trial 4
var feedback_trial_4 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    var previousPreviousResponse = jsPsych.data.get().last(2).values()[0].response;
    console.log('Previous previous Response:', previousPreviousResponse);
    // display different stimuli based on the previous response
    if (previousPreviousResponse === 1) {
      return '<p><span style="color: green">Eqqorpoq!</span></p><p>Oqaaseqatigiinni allanngortoqarsimanngilaq.</p>'; // Rigtigt! Der var ingen ændring i sætningen
    } else {
      return '<p><span style="color: red">Eqqunngilaq!</span></p><p>Oqaaseqatigiinni allanngortoqarsimanngilaq.</p>'; // Forkert! Der var ingen ændring i sætningen
    }
  },
  choices: ['Ingerlaqqigit'] // Fortsæt
}
timeline.push(feedback_trial_4)


// experiment start
var experiment_start = {
  type: jsPsychHtmlButtonResponse,
  stimulus: "<p>Massakkut misilittaaneq eqqortoq aallartippoq.</p>", // Nu begynder det rigtige eksperiment.
  choices: ["Aallartinniarlutit una tooruk"], // Klik her for at begynde.
  post_trial_gap: 1000
};
timeline.push(experiment_start)

for (var i in sentences) {
  timeline.push(make_spr_trial(sentences[i]["s1"],sentences[i]["s2"],
  sentences[i]['sentence_id'], sentences[i]['change_type'],sentences[i]['affix_type'], sentences[i]['affix'], sentences[i]['filler_condition'], sentences[i]['target_word'], sentences[i]['changed_word'], sentences[i]['changed_affix'], sentences[i]['reverse_target_position'], sentences[i]['sentence_words'], sentences[i]['target_syllables'], sentences[i]['correct_response']))
}

// experiment done
var done = {
    type: jsPsychHtmlButtonResponse,
    choices: ['Naammassivoq'], // Afslut
    stimulus: function() {
      return "<p>Naammassivutit! Qujanaq peqataarusukkavit.</p><p> Pointit <span style='color: blue'>" + totalScore + "/80</span> eqqorsimavatit.</p><p>Naammassiumallugu una tooruk."; // Nu er du færdig! Tak fordi du ville være med. Du har fået x/y point. Klik for at afslutte.
    }
    };
timeline.push(done)

// ____________SENTENCE RATING________________
// ___________________________________________

// instructions
var instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 
    "<p> Misilittaanerup immikkoortuata aappaanni, aamma kalaallisut oqaaseqatigiinnik atuaqquneqassaatit. </p>"+ // I den næste del af eksperimentet vil du igen blive bedt om at læse nogle sætninger på grønlandsk.
    "<p> Oqaaseqatigiit naliginnaaneri nalilertassavatit. </p>"+ // Du skal vurdere hvor normal sætningen er.
    "<p> Kalaallisut oqallorippallaanngittup tamanna oqaatigissavaa? Immaqaluunniit kalaallisut oqallorittup kalaallisut oqaaseqatigiit taamatut oqaatigissavai? </p>"+ // Lyder det som noget en nybegynder i grønlandsk ville sige? Eller er det noget en flydende grønlandsktaler ville sige?
    "<p> Assersuutigalugu oqaaseqatigiit uku kalaallisut oqallorittup imatut oqaatigissavai: <span style='color: green'>Ullaaq makikkama atisalersorpunga.</span></p>"+ // Denne her sætning lyder fx som en flydende grønlandsktaler: Da jeg stod op i morges tog jeg tøj på.
    "<p> Oqaaseqatigiillu kalaallisut oqallorippallaanngittup imatut oqaatigissavai: <span style='color: red'>Aviisimut anaanaga atuaqquara.</span></p>"+ // Og sådan her ville en nybegynder sige: Jeg beder avisen om at læse min mor. (skulle have været anaanannut aviisi atuaqquara)
    "<p> Oqaaseqatigiillu kalaallisut oqaatsitigut pikkorilaartup imatut oqaatigissavai: <span style='color: orange'>Ullut tamaasa ullaakkut allaffinnut sikkilerpunga.</span></p>", // Og sådan her ville én der er middelgod (lidt god) til grønlandsk sige: ”Hver dag om morgenen cykler jeg til kontoret.” (korrekt sætning bortset fra at der mangler habituelt -tar)
  choices: ["Aallartinniarlutit una tooruk"], // Klik her for at begynde.
  post_trial_gap: 1000
};
timeline.push(instructions)

// function for making rating trial
function make_rating_trial(sentence, sentence_id, affix_type, affix) {
var trial = {type: jsPsychHtmlKeyboardResponse,
             timeline:[
              {type: jsPsychHtmlSliderResponse,
                stimulus:'<div style="font-size:40px"><p>' + sentence +"</p></div>",
              labels:["Kalaallisut oqallorinngittup", "Kalaallisut oqallorippaallaanngittup","Kalaallisut oqallorittup"], // Nybegynder (ikke god til grønlandsk), middelgod taler (lidt god til grønlandsk), flydende taler (god til grønlandsk)
              button_label: "Ingerlaqqigit",
              require_movement: true,
              prompt:"<p><em>Kiap oqaaseqatigiit ukua oqaatigisinnaavai?</em></p>", // Hvem kunne have sagt denne sætning?
                on_finish: function (data) {
                  data.sentence = sentence
                  data.sentence_id = sentence_id
                  data.affix_type = affix_type
                  data.affix = affix
                }
              }
            ]}
return trial //return the trial you have built
}

// stimuli
var sentences_rating_1 = [
// sentence 2 - "Køkkengulvet er meget snavset, derfor fejer tiårige Minik."
{ s1: "<p> Igaffimmi nateq saneqangaarmat Minik qulinik </p><p> ukiulik saneqqippoq. </p>", sentence_id: '2', affix_type: 'lexical', affix: 'qqig'}, // fejer igen
/*{ s1: "<p> Igaffimmi nateq saneqangaarmat Minik qulinik </p><p> ukiulik sanertuarpoq. </p>", sentence_id: '2', affix_type: 'lexical', affix: 'juar'}, // fejer hele tiden
{ s1: "<p> Igaffimmi nateq saneqangaarmat Minik qulinik </p><p> ukiulik sanersimavoq. </p>", sentence_id: '2', affix_type: 'grammatical', affix: 'sima'}, // har fejet
{ s1: "<p> Igaffimmi nateq saneqangaarmat Minik qulinik </p><p> ukiulik sanernikuuvoq. </p>", sentence_id: '2', affix_type: 'grammatical', affix: 'nikuu'}, // har engang fejet
{ s1: "<p> Igaffimmi nateq saneqangaarmat Minik qulinik </p><p> ukiulik sanerpoq. </p>", sentence_id: '2', affix_type: 'NA', affix: 'NA'}, // fejer
// sentence 4 - "Naja gaber, fordi hun kom så sent i seng i går aftes efter festen."
{ s1: "<p> Naja aatsaartuarpoq ippassaammat festip </p><p> kingorna innajaannginnami. </p>", sentence_id: '4', affix_type: 'lexical', affix: 'juar'}, // gaber hele tiden
{ s1: "<p> Naja aatsaaqqippoq ippassaammat festip </p><p> kingorna innajaannginnami. </p>", sentence_id: '4', affix_type: 'lexical', affix: 'qqig'}, // gaber igen
{ s1: "<p> Naja aatsaarnerpoq ippassaammat festip </p><p> kingorna innajaannginnami. </p>", sentence_id: '4', affix_type: 'grammatical', affix: 'ner'}, // mon hun gaber
{ s1: "<p> Naja aatsaarsimavoq ippassaammat festip </p><p> kingorna innajaannginnami. </p>", sentence_id: '4', affix_type: 'grammatical', affix: 'sima'}, // har gabt
{ s1: "<p> Naja aatsaarpoq ippassaammat festip </p><p> kingorna innajaannginnami. </p>", sentence_id: '4', affix_type: 'NA', affix: 'NA'}, // gaber
// sentence 6 - "Da det begynder at regne meget, går Ivalu ud og tager vasketøjet ind."
{ s1: "<p> Assut siallilerniarmat Ivalu anipallappoq </p><p> manisallu eqqullugit. </p>", sentence_id: '6', affix_type: 'lexical', affix: 'pallag'}, // skynder sig ud
{ s1: "<p> Assut siallilerniarmat Ivalu aniaarpoq </p><p> manisallu eqqullugit. </p>", sentence_id: '6', affix_type: 'lexical', affix: 'jaar'}, // går tidligt ud
{ s1: "<p> Assut siallilerniarmat Ivalu aniriikatappoq </p><p> manisallu eqqullugit. </p>", sentence_id: '6', affix_type: 'grammatical', affix: 'riikatag'}, // er allerede gået ud
{ s1: "<p> Assut siallilerniarmat Ivalu anissavoq </p><p> manisallu eqqullugit. </p>", sentence_id: '6', affix_type: 'grammatical', affix: 'ssa'}, // vil gå ud
{ s1: "<p> Assut siallilerniarmat Ivalu anivoq </p><p> manisallu eqqullugit. </p>", sentence_id: '6', affix_type: 'NA', affix: 'NA'}, // går ud
// sentence 8 - "Mens pigen sidder i skolen, skriver hun i notesbogen."
{ s1: "<p> Atuarfimmi issiatilluni niviarsiaraq </p><p> allattaavimmi allaqqissaarpoq. </p>", sentence_id: '8', affix_type: 'lexical', affix: 'qqissaar'}, // skriver omhyggeligt
{ s1: "<p> Atuarfimmi issiatilluni niviarsiaraq </p><p> allattaavimmi allalertorpoq. </p>", sentence_id: '8', affix_type: 'lexical', affix: 'lertor'}, // skriver hurtigt
{ s1: "<p> Atuarfimmi issiatilluni niviarsiaraq </p><p> allattaavimmi allanerpoq. </p>", sentence_id: '8', affix_type: 'grammatical', affix: 'ner'}, // mon hun skriver
{ s1: "<p> Atuarfimmi issiatilluni niviarsiaraq </p><p> allattaavimmi allakkaluarpoq. </p>", sentence_id: '8', affix_type: 'grammatical', affix: 'galuar'}, // skriver ellers
{ s1: "<p> Atuarfimmi issiatilluni niviarsiaraq </p><p> allattaavimmi allappoq. </p>", sentence_id: '8', affix_type: 'NA', affix: 'NA'}, // skriver
// sentence 10 - "Babyen tier stille, fordi den får mad af sin mor."
{ s1: "<p> Nuunuaraq nipangilertorpoq pissutigalugu </p><p> anaanaminiit nerisinneqarami. </p>", sentence_id: '10', affix_type: 'lexical', affix: 'lertor'}, // tier hurtigt stille
{ s1: "<p> Nuunuaraq nipangiaarpoq pissutigalugu </p><p> anaanaminiit nerisinneqarami. </p>", sentence_id: '10', affix_type: 'lexical', affix: 'jaar'}, // tier tidligt stille
{ s1: "<p> Nuunuaraq nipangersimavoq pissutigalugu </p><p> anaanaminiit nerisinneqarami. </p>", sentence_id: '10', affix_type: 'grammatical', affix: 'sima'}, // har tiet stille
{ s1: "<p> Nuunuaraq nipangerluinnarpoq pissutigalugu </p><p> anaanaminiit nerisinneqarami. </p>", sentence_id: '10', affix_type: 'grammatical', affix: 'lluinnar'}, // tier helt stille
{ s1: "<p> Nuunuaraq nipangerpoq pissutigalugu </p><p> anaanaminiit nerisinneqarami. </p>", sentence_id: '10', affix_type: 'NA', affix: 'NA'}, // tier stille
// sentence 12 - "Mens læreren fortæller om regneopgaverne, sidder eleven stille."
{ s1: "<p> Ilinniartitsisoq kisitsilluni suliassat pillugit </p><p> oqaluttuartoq atuartoq uninngagunarpoq. </p>", sentence_id: '12', affix_type: 'lexical', affix: 'gunar'}, // sidder vistnok stille
{ s1: "<p> Ilinniartitsisoq kisitsilluni suliassat pillugit </p><p> oqaluttuartoq atuartoq uninngaqqissaarpoq. </p>", sentence_id: '12', affix_type: 'lexical', affix: 'qqissaar'}, // sidder helt stille
{ s1: "<p> Ilinniartitsisoq kisitsilluni suliassat pillugit </p><p> oqaluttuartoq atuartoq uninngalluinnarpoq. </p>", sentence_id: '12', affix_type: 'grammatical', affix: 'lluinnar'}, // sidder fuldstændig stille
{ s1: "<p> Ilinniartitsisoq kisitsilluni suliassat pillugit </p><p> oqaluttuartoq atuartoq uninnganerpoq. </p>", sentence_id: '12', affix_type: 'grammatical', affix: 'ner'}, // mon de sidder stille
{ s1: "<p> Ilinniartitsisoq kisitsilluni suliassat pillugit </p><p> oqaluttuartoq atuartoq uninngavoq. </p>", sentence_id: '12', affix_type: 'NA', affix: 'NA'}, // sidder stille
// sentence 14 - "Malik kører i bil hen til supermarkedet, men der er udsolgt af majroer."
{ s1: "<p> Malik pisiniarfimmut biililertorpoq kisianni </p><p> ruuat nungussimapput. </p>", sentence_id: '14', affix_type: 'lexical', affix: 'lertor'}, // kører hurtigt i bil
{ s1: "<p> Malik pisiniarfimmut biilipallappoq kisianni </p><p> ruuat nungussimapput. </p>", sentence_id: '14', affix_type: 'lexical', affix: 'pallag'}, // skynder sig at køre i bil
{ s1: "<p> Malik pisiniarfimmut biileraluarpoq kisianni </p><p> ruuat nungussimapput. </p>", sentence_id: '14', affix_type: 'grammatical', affix: 'galuar'}, // kører ellers i bil
{ s1: "<p> Malik pisiniarfimmut biilernikuuvoq kisianni </p><p> ruuat nungussimapput. </p>", sentence_id: '14', affix_type: 'grammatical', affix: 'nikuu'}, // har kørt i bil
{ s1: "<p> Malik pisiniarfimmut biilerpoq kisianni </p><p> ruuat nungussimapput.", sentence_id: '14', affix_type: 'NA', affix: 'NA'}, // kører i bil
// sentence 16 - "Nivi ser sig om, men det er svært at se noget på grund af snevejret."
{ s1: "<p> Nivi qineqqissaarpoq kisianni apimmat </p><p> takusaqarpiasinnaanngilaq. </p>", sentence_id: '16', affix_type: 'lexical', affix: 'qqissaar'}, // ser sig omhyggeligt om
{ s1: "<p> Nivi qinerniarpoq kisianni apimmat </p><p> takusaqarpiasinnaanngilaq. </p>", sentence_id: '16', affix_type: 'lexical', affix: 'niar'}, // har tænkt sig at se sig om
{ s1: "<p> Nivi qineraluarpoq kisianni apimmat </p><p> takusaqarpiasinnaanngilaq. </p>", sentence_id: '16', affix_type: 'grammatical', affix: 'galuar'}, // ser sig ellers om
{ s1: "<p> Nivi qineriikatappoq kisianni apimmat </p><p> takusaqarpiasinnaanngilaq. </p>", sentence_id: '16', affix_type: 'grammatical', affix: 'riikatag'}, // har allerede set sig om
{ s1: "<p> Nivi qinerpoq kisianni apimmat </p><p> takusaqarpiasinnaanngilaq. </p>", sentence_id: '16', affix_type: 'NA', affix: 'NA'}, // ser sig om
// ungrammatical sentence 1 - "Nina har købt (1. person-endelse) en båd, så hun kan sejle ud på tur."
{ s1: "<p> Nina umiatsiamik pisisimavunga taava </p><p> angalaarsinnaavoq. </p>", sentence_id: 'ungram_1', affix_type: 'NA', affix: 'NA'},
// ungrammatical sentence 2 - "Johanne laver mad (3. person pluralis-endelse), fordi hun får mange gæster i aften."
{ s1: "<p> Johanne igapput unnugu amerlasuunik </p><p> pulaartoqarniarami. </p>", sentence_id: 'ungram_2', affix_type: 'NA', affix: 'NA'},
// ungrammatical sentence 3 - "Peter klager (1. person-endelse) til kommunen, men byggeriet bliver ikke stoppet."
{ s1: "<p> Piitaq kommunemut maalaarpunga kisianni </p><p> sanaartorneq unitsinneqanngilaq. </p>", sentence_id: 'ungram_3', affix_type: 'NA', affix: 'NA'},
// ungrammatical sentence 4 - "Nuka har været i Sisimiut (3. person pluralis-endelse) i sidste uge for at besøge sin familie."
*/{ s1: "<p> Nuka sapaatip akunnera kingulleq ilaquttani </p><p> pulaarlugit Sisimiuniipput. </p>", sentence_id: 'ungram_4', affix_type: 'NA', affix: 'NA'},
]

var sentences_rating_2 = [
// sentence 1 - "Hans har mange opgaver han skal nå at færdiggøre i morgen, derfor arbejder han."
{ s1: "<p> Aqagu suliassanik amerlasuunik naammassisassaqarami </p><p> Hansi suliniarpoq. </p>", sentence_id: '1', affix_type: 'lexical', affix: 'niar'}, // agter at arbejde
/*{ s1: "<p> Aqagu suliassanik amerlasuunik naammassisassaqarami </p><p> Hansi sulipallappoq. </p>", sentence_id: '1', affix_type: 'lexical', affix: 'pallag'}, // arbejder hurtigt
{ s1: "<p> Aqagu suliassanik amerlasuunik naammassisassaqarami </p><p> Hansi sulissavoq. </p>", sentence_id: '1', affix_type: 'grammatical', affix: 'ssa'}, // skal arbejde
{ s1: "<p> Aqagu suliassanik amerlasuunik naammassisassaqarami </p><p> Hansi suliumaarpoq. </p>", sentence_id: '1', affix_type: 'grammatical', affix: 'jumaar'}, // vil nok arbejde
{ s1: "<p> Aqagu suliassanik amerlasuunik naammassisassaqarami </p><p> Hansi sulivoq. </p>", sentence_id: '1', affix_type: 'NA', affix: 'NA'}, // arbejder
// sentence 3 - "Vejret ser ud til at blive dårligt i morgen, men Aputsiaq fisker alligevel."
{ s1: "<p> Aqagu sila ajorniarpasippoq taamaattorli Aputsiaq </p><p> suli aalisarniarpoq. </p>", sentence_id: '3', affix_type: 'lexical', affix: 'niar'}, // agter at fiske
{ s1: "<p> Aqagu sila ajorniarpasippoq taamaattorli Aputsiaq </p><p> suli aalisaqqippoq. </p>", sentence_id: '3', affix_type: 'lexical', affix: 'qqig'}, // fisker igen
{ s1: "<p> Aqagu sila ajorniarpasippoq taamaattorli Aputsiaq </p><p> suli aalisarumaarpoq. </p>", sentence_id: '3', affix_type: 'grammatical', affix: 'jumaar'}, // vil nok fiske på et tidspunkt
{ s1: "<p> Aqagu sila ajorniarpasippoq taamaattorli Aputsiaq </p><p> suli aalisarnerpoq. </p>", sentence_id: '3', affix_type: 'grammatical', affix: 'ner'}, // mon han fisker
{ s1: "<p> Aqagu sila ajorniarpasippoq taamaattorli Aputsiaq </p><p> suli aalisarpoq. </p>", sentence_id: '3', affix_type: 'NA', affix: 'NA'}, // fisker
// sentence 5 - "Hunden gør, fordi der kommer mennesker forbi ude på vejen."
{ s1: "<p> Atsaga kaagiliorunarpoq kisianni illooraga </p><p> sukkuarartorusunneruvoq aamma mamakujuit allat. </p>", sentence_id: '5', affix_type: 'lexical', affix: 'gunar'}, // bager vistnok kage
{ s1: "<p> Atsaga kaagiliortuarpoq kisianni illooraga </p><p> sukkuarartorusunneruvoq aamma mamakujuit allat. </p>", sentence_id: '5', affix_type: 'lexical', affix: 'juar'}, // bager hele tiden kage
{ s1: "<p> Atsaga kaagiliussavoq kisianni illooraga </p><p> sukkuarartorusunneruvoq aamma mamakujuit allat. </p>", sentence_id: '5', affix_type: 'grammatical', affix: 'ssa'}, // skal bage kage
{ s1: "<p> Atsaga kaagilioraluarpoq kisianni illooraga </p><p> sukkuarartorusunneruvoq aamma mamakujuit allat. </p>", sentence_id: '5', affix_type: 'grammatical', affix: 'galuar'}, // bager ellers kage
{ s1: "<p> Atsaga kaagiliorpoq kisianni illooraga </p><p> sukkuarartorusunneruvoq aamma mamakujuit allat. </p>", sentence_id: '5', affix_type: 'NA', affix: 'NA'}, // bager kage
// sentence 7 - "I morgen kommer tivoli til byen, så drengen glæder sig."
{ s1: "<p> Aqagu tivoli illoqarfimmut piniarmat </p><p> nukappiaraq pileriqqippoq. </p>", sentence_id: '7', affix_type: 'lexical', affix: 'qqig'}, // glæder sig igen
{ s1: "<p> Aqagu tivoli illoqarfimmut piniarmat </p><p> nukappiaraq pilerigunarpoq. </p>", sentence_id: '7', affix_type: 'lexical', affix: 'gunar'}, // glæder sig vist
{ s1: "<p> Aqagu tivoli illoqarfimmut piniarmat </p><p> nukappiaraq pilerilluinnarpoq. </p>", sentence_id: '7', affix_type: 'grammatical', affix: 'lluinnar'}, // glæder sig helt
{ s1: "<p> Aqagu tivoli illoqarfimmut piniarmat </p><p> nukappiaraq pilerissavoq. </p>", sentence_id: '7', affix_type: 'grammatical', affix: 'ssa'}, // vil glæde sig
{ s1: "<p> Aqagu tivoli illoqarfimmut piniarmat </p><p> nukappiaraq pilerivoq. </p>", sentence_id: '7', affix_type: 'NA', affix: 'NA'}, // glæder sig
// sentence 9 - "Det begynder at trække op til storm, derfor tager min bedstefar hjem."
{ s1: "<p> Anorersuarpasilerpoq taamaattumik aataga </p><p> angerlajaarpoq. </p>", sentence_id: '9', affix_type: 'lexical', affix: 'jaar'}, // tager tidligt hjem
{ s1: "<p> Anorersuarpasilerpoq taamaattumik aataga </p><p> angerlarniarpoq. </p>", sentence_id: '9', affix_type: 'lexical', affix: 'niar'}, // agter at tage hjem
{ s1: "<p> Anorersuarpasilerpoq taamaattumik aataga </p><p> angerlarumaarpoq. </p>", sentence_id: '9', affix_type: 'grammatical', affix: 'jumaar'}, // vil nok tage hjem på et tidspunkt
{ s1: "<p> Anorersuarpasilerpoq taamaattumik aataga </p><p> angerlarsimavoq. </p>", sentence_id: '9', affix_type: 'grammatical', affix: 'sima'}, // er taget hjem
{ s1: "<p> Anorersuarpasilerpoq taamaattumik aataga </p><p> angerlarpoq. </p>", sentence_id: '9', affix_type: 'NA', affix: 'NA'}, // tager hjem
// sentence 11 - "I dag har der været kaffemik hele eftermiddagen, så derfor er min bedstemor træt."
{ s1: "<p> Ullumi ualeq naallugu kaffillertoqarmat </p><p> aanaga qasujaarpoq. </p>", sentence_id: '11', affix_type: 'lexical', affix: 'jaar'}, // er tidligt træt
{ s1: "<p> Ullumi ualeq naallugu kaffillertoqarmat </p><p> aanaga qasugunarpoq. </p>", sentence_id: '11', affix_type: 'lexical', affix: 'gunar'}, // virker træt
{ s1: "<p> Ullumi ualeq naallugu kaffillertoqarmat </p><p> aanaga qasuriikatappoq. </p>", sentence_id: '11', affix_type: 'grammatical', affix: 'riikatag'}, // er allerede træt
{ s1: "<p> Ullumi ualeq naallugu kaffillertoqarmat </p><p> aanaga qasulluinnarpoq. </p>", sentence_id: '11', affix_type: 'grammatical', affix: 'lluinnar'}, // er helt træt
{ s1: "<p> Ullumi ualeq naallugu kaffillertoqarmat </p><p> aanaga qasuvoq. </p>", sentence_id: '11', affix_type: 'NA', affix: 'NA'}, // er træt
// sentence 13 - "Ane spørger om hun må tage i byen med sine veninder fra skolen."
{ s1: "<p> Ane aperipallappoq kammalaatini atuarfimmiit </p><p> illoqarfiliaqatigisinnaanerlugit. </p>", sentence_id: '13', affix_type: 'lexical', affix: 'pallag'}, // skynder sig at spørge
{ s1: "<p> Ane aperilertorpoq kammalaatini atuarfimmiit </p><p> illoqarfiliaqatigisinnaanerlugit. </p>", sentence_id: '13', affix_type: 'lexical', affix: 'lertor'}, // spørger hurtigt
{ s1: "<p> Ane aperinikuuvoq kammalaatini atuarfimmiit </p><p> illoqarfiliaqatigisinnaanerlugit. </p>", sentence_id: '13', affix_type: 'grammatical', affix: 'nikuu'}, // har på et tidspunkt spurgt
{ s1: "<p> Ane aperiumaarpoq kammalaatini atuarfimmiit </p><p> illoqarfiliaqatigisinnaanerlugit. </p>", sentence_id: '13', affix_type: 'grammatical', affix: 'jumaar'}, // vil nok spørge på et tidspunkt
{ s1: "<p> Ane aperivoq kammalaatini atuarfimmiit </p><p> illoqarfiliaqatigisinnaanerlugit. </p>", sentence_id: '13', affix_type: 'NA', affix: 'NA'}, // spørger
// sentence 15 - "Min lillesøster gemmer sig, fordi hun ikke kan lide at få børstet tænder."
{ s1: "<p> Nukaga toqqortuarpoq kigutigissartinneq </p><p> nuannarineq ajoramiuk. </p>", sentence_id: '15', affix_type: 'lexical', affix: 'juar'}, // gemmer sig hele tiden
{ s1: "<p> Nukaga toqqoqqissaarpoq kigutigissartinneq </p><p> nuannarineq ajoramiuk. </p>", sentence_id: '15', affix_type: 'lexical', affix: 'qqissaar'}, // gemmer sig godt
{ s1: "<p> Nukaga toqqornikuuvoq kigutigissartinneq </p><p> nuannarineq ajoramiuk. </p>", sentence_id: '15', affix_type: 'grammatical', affix: 'nikuu'}, // har engang gemt sig
{ s1: "<p> Nukaga toqqoriikatappoq kigutigissartinneq </p><p> nuannarineq ajoramiuk. </p>", sentence_id: '15', affix_type: 'grammatical', affix: 'riikatag'}, // har allerede gemt sig
{ s1: "<p> Nukaga toqqorpoq kigutigissartinneq </p><p> nuannarineq ajoramiuk. </p>", sentence_id: '15', affix_type: 'NA', affix: 'NA'}, // gemmer sig
// ungrammatical sentence 1 - "Nina har købt (1. person-endelse) en båd, så hun kan sejle ud på tur."
{ s1: "<p> Nina umiatsiamik pisisimavunga taava </p><p> angalaarsinnaavoq. </p>", sentence_id: 'ungram_1', affix_type: 'NA', affix: 'NA'},
// ungrammatical sentence 2 - "Johanne laver mad (3. person pluralis-endelse), fordi hun får mange gæster i aften."
{ s1: "<p> Johanne igapput unnugu amerlasuunik </p><p> pulaartoqarniarami. </p>", sentence_id: 'ungram_2', affix_type: 'NA', affix: 'NA'},
// ungrammatical sentence 3 - "Peter klager (1. person-endelse) til kommunen, men byggeriet bliver ikke stoppet."
{ s1: "<p> Piitaq kommunemut maalaarpunga kisianni sanaartorneq </p><p> unitsinneqanngilaq. </p>", sentence_id: 'ungram_3', affix_type: 'NA', affix: 'NA'},
// ungrammatical sentence 4 - "Nuka har været i Sisimiut (3. person pluralis-endelse) i sidste uge for at besøge sin familie."
{ s1: "<p> Nuka sapaatip akunnera kingulleq ilaquttani </p><p> pulaarlugit Sisimiuniipput. </p>", sentence_id: 'ungram_4', affix_type: 'NA', affix: 'NA'},
*/]

// setting sentences_rating variable depending on whether participant is group 1 or 2
if (random_number > 0.5) {
  sentences_rating = sentences_rating_1
}
else {
  sentences_rating = sentences_rating_2
}

// randomise!
sentences_rating = jsPsych.randomization.repeat(sentences_rating, 1);

for (var i in sentences_rating) {
  timeline.push(make_rating_trial(sentences_rating[i]["s1"],sentences_rating[i]['sentence_id'], sentences_rating[i]['affix_type'], sentences_rating[i]['affix']))
}


// experiment done
var done_2 = {
type: jsPsychHtmlButtonResponse,
choices: ['Naammassivoq'], // Afslut
stimulus:
  "<p> <i>Naammassivoq</i> toorukku fili computerernut downloaderneqassaaq. </p>"+ // Når du trykker ”afslut” vil der blive downloadet en fil på din computer.
  "<p> Fili ammassanngilat allanngortilluguluunniit. </p>"+ // Lad være med at åbne filen eller ændre på den.
  "<p> Gavekorti* piniarukku, fili uunga nassiutissavat: crv510@hum.ku.dk </p>"+ // Du skal sende filen til denne mail for at modtage dit gavekort: crv510@hum.ku.dk
  "<p> Apeqqutissaqaruit mailimut tassunga aamma attaveqarsinnaavutit. </p>"+ // Det er også denne mail du kan kontakte, hvis du har nogen spørgsmål.
  "<p> Eqqaamallugu emaili allattornissaa <i>Naammassivoq</i> tuunnginnerani. </p>"+ // Husk at skrive mailadressen ned inden du trykker afslut.
  "<p> Allareernertut, qujanarujussuaq peqataanernut! </p>"+ // Igen tusind tak for din deltagelse!
  "<p> <span style='font-size: 12px'>*Gavekorti Akileraartarnermut Aqutsisoqarfimmut nalunaarutigineqassaaq.</span> </p>", // Gavekortet skal indberettes til Skat.
};
timeline.push(done_2)

jsPsych.run(timeline)