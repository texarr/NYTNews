$(document).ready(function() {
    var fromMonthVal = 1;
    var toMonthVal = 1;
    // options from date.js
    var fromMonth = $('.from-month');
    for (var i = 1; i <= 12; i++) {
        var value = $('<option>', {class: "option", value: i}).text(i);
        fromMonth.append(value);
    }

    var toMonth = $('.to-month');
    for (var i = 1; i <= 12; i++) {
        var value = $('<option>', {class: "option", value: i}).text(i);
        if (i === 12) {
            value.attr('selected', true);
        }
        toMonth.append(value);
    }

    fromMonth.on('change', function() {
        // disable toMonth values < this value
        for (var i = this.value-1; i >= 0; i--) {
            toMonth["0"].children[i].setAttribute('disabled', true);
        }
        // enable toMonth values > this value
        for (var i = this.value; i < toMonth["0"].children.length; i++) {
            $(toMonth["0"].children[i]).attr('disabled', false);
        }
        fromMonthVal = this.value;
    });

    toMonth.on('change', function() {
        // disable fromMonth values > this.value
        for (var i = this.value; i < fromMonth["0"].children.length; i++) {
            fromMonth["0"].children[i].setAttribute('disabled', true);
        }
        // enable fromMonth.values < this.value
        for (var i = 0; i < this.value; i++) {
            $(fromMonth["0"].children[i]).attr('disabled', false);
        }
        toMonthVal = this.value;
    });
});
