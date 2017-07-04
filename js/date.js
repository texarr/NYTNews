$(document).ready(function() {
    var fromDayVal = 1;
    var toDayVal = 1;
    // options from date.js
    var fromDay = $('.from-day');
    for (var i = 1; i <= 31; i++) {
        var value = $('<option>', {class: "option", value: i}).text(i);
        fromDay.append(value);
    }

    var toDay = $('.to-day');
    for (var i = 1; i <= 31; i++) {
        var value = $('<option>', {class: "option", value: i}).text(i);
        if (i === 31) {
            value.attr('selected', true);
        }
        toDay.append(value);
    }

    fromDay.on('change', function() {
        // disable toDay values < this value
        for (var i = this.value-1; i >= 0; i--) {
            toDay["0"].children[i].setAttribute('disabled', true);
        }
        // enable toDay values > this value
        for (var i = this.value; i < toDay["0"].children.length; i++) {
            $(toDay["0"].children[i]).attr('disabled', false);
        }
        fromDayVal = this.value;
    });

    toDay.on('change', function() {
        // disable fromDay values > this.value
        for (var i = this.value; i < fromDay["0"].children.length; i++) {
            fromDay["0"].children[i].setAttribute('disabled', true);
        }
        // enable fromDay.values < this.value
        for (var i = 0; i < this.value; i++) {
            $(fromDay["0"].children[i]).attr('disabled', false);
        }
        toDayVal = this.value;
    });
});
