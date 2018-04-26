var questions = ['How likely is it for you to be romantically involved with a food item someday (or right now!)?'
    , 'Which number is the coolest'
    , 'On a scale of 1 to 7, how would you rate the hair on your chinny-chin-chin?'
    , 'Do you prefer larger numbers or smaller numbers?'
    , 'How many days of the week do you shower?'
    , 'Which number is closer to negative infinity?'
    , 'How would you rate the amount of pain you are in right now?'
    , 'How many feet tall are you, rounding to the nearest whole number?'
    , 'Use the number line to describe your love for country "music".'
    , 'How many cents under would you let a customer get away with while paying for something?']

$(document).ready(function () {
    //do things when ready
    $('.match-panel').empty();

    appendQuestions();

    $('input.answer-btn').prettyCheckable({
        color: 'red'
    });
});

$(document).on("click", "#survey-btn", function () {
    event.preventDefault();
    if (checkChecked()) {
        post(checkChecked());
    } else {
        alert('You must answer every question!');
    }
});

function post(scores) {
    var data = {
        scores: JSON.stringify(scores)
    }

    $.post("/api/friends/match", data, function (res) {
        displayMatch(JSON.parse(res));
    });
}

function displayMatch(person) {
    $('.match-panel').empty();
    $('#survey-btn').hide();

    var img = $('<img>');
    img.attr('src', person.img);
    img.css('width', '20em');
    img.css('height', '20em');

    var text = $('<h4>');
    $(text).text('You matched with...');

    var name = $('<h2>');
    name.text(person.name);

    $('.match-panel').append(img);
    $('.match-panel').append(text);
    $('.match-panel').append(name);
}

function checkChecked() {
    var scores = [];

    for (var i = 1; i < $('.match-panel').children().length + 1; ++i) {
        for (var j = 1; j < $('#answer-btns-' + i).children().length + 1; ++j) {
            if ($('#answer-' + i + j).is(':checked')) {
                scores.push(j);
            }
        }
    }

    if (scores.length > 9) {
        return scores;
    } else {
        return false;
    }

};

function addQuestion(row, header, question) {

    var parent = $('<div>');
    $(parent).attr('class', 'panel panel-info' + ' question-box-' + row);

    var child = $('<div>');
    $(child).attr('class', 'panel-heading');
    $(child).text(header);

    var text = $('<p>');
    $(text).text(question);

    $(parent).append(child);
    $(parent).append(text);

    var buttons = $('<div>');
    $(buttons).attr('class', 'answer-btns');
    $(buttons).attr('id', 'answer-btns-' + row);

    for (var i = 1; i < 8; i++) {
        var buttondiv = $('<div>');
        $(buttondiv).attr('class', 'abutton');

        var button = $('<input>');
        $(button).attr('class', 'answer-btn');
        $(button).attr('id', 'answer-' + row + i);
        $(button).attr('type', 'radio');
        $(button).attr('name', 'answer-radio-row-' + row);
        $(button).attr('value', i);

        var header = $('<h4>');
        $(header).text(i);

        $(button).prettyCheckable();

        $(buttondiv).append(header);
        $(buttondiv).append(button);
        $(buttons).append(buttondiv);

    }

    $(parent).append(buttons);
    $('.match-panel').append(parent);

}

function appendQuestions() {
    for (var i = 1; i < 11; ++i) {
        addQuestion(i, 'Question ' + i, questions[i-1]);
    }
}
