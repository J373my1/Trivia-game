 var questions = [{
    question: "Which composer was born in the Baroque Era?",
    choices: ["Robert Schumann", 
              "Richard Wagner", 
              "Johann Sebastian Bach",
              "Ludwig Van Beethoven"],
    correctAnswer: 2
  }, 
     {
      question: "Which composer gradually became deaf during his lifetime?",
    choices: ["Cesar Franck",
              "Ludwig Van Beethoven", 
              "Richard Strauss",
              "Ray Charles"],
    correctAnswer: 1
  },
     {
      question: "Who composed the song that is currently playing?",
    choices: ["Cesar Franck",
              "Ludwig Van Beethoven", 
              "Richard Strauss",
              "J. S. Bach"],
    correctAnswer: 3
  },
     {
      question: "Which composer created the Etudes Op. 10 and Op. 25?",
    choices: ["Cesar Franck",
              "Ludwig Van Beethoven", 
              "Richard Strauss",
              "Frederick Chopin"],
    correctAnswer: 3
  },
    {
      question: "Who composed 'The Four Seasons'?",
    choices: ["George Handel",
              "Antonio Vivaldi", 
              "Henry Purcell",
              "Joseph Haydn"],
    correctAnswer: 1
  },
    {
        question: "Who was known as a child prodigy?",
    choices: ["George Handel",
              "Wolfgang Amadeus Mozart", 
              "Franz Liszt",
              "Joseph Haydn"],
    correctAnswer: 1
  },
    {
        question: "How many days did it take George Handel to write 'Messiah'?",
    choices: ["50",
              "80", 
              "24",
              "10"],
    correctAnswer: 2

  }];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                                       
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}