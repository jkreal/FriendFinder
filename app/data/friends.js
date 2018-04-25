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
    if(checkChecked()) {
        post(checkChecked());
    } else {
        //alert goes here
    }
});

function post(scores) {
    console.log(scores);
    //post api
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

function addQuestion(row, header) {

    var parent = $('<div>');
    $(parent).attr('class', 'panel panel-info' + ' question-box-' + row);

    var child = $('<div>');
    $(child).attr('class', 'panel-heading');
    $(child).text(header);

    var text = $('<p>');
    $(text).text('This is the question text Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo a vel nostrum itaque at quod accusantium accusamus deleniti quas porro, obcaecati cumque! Eos necessitatibus optio reprehenderit recusandae vero aliquam facere');

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
        addQuestion(i, 'Question ' + i);
    }
}
