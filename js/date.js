$(document).ready(function() {
    // options from date.js
    var fromMonth = $('.from-month');
    for (var i = 1; i <= 12; i++) {
        var value = $('<option>', {value: i}).text(i);
        fromMonth.append(value);
    }

    var toMonth = $('.to-month');
    for (var i = 1; i <= 12; i++) {
        var value = $('<option>', {value: i}).text(i);
        if (i === 12) {
            value.attr('selected', true);
        }
        toMonth.append(value);
    }

});
