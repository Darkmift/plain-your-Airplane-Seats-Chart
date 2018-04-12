console.log('js online');
let Column;
let Row;
//columns #
let numColumns;
//rows #
let numRows;
//container of chart
var container = $('#SeatChartContainer');
//dimensions for generated chart
const winVH = $('#SeatChartContainer').height();
const winVW = $('#SeatChartContainer').width();
//init seat row
let SeatRow;
var widthPX;
$("form").submit(function(e) {
    //prevent submit
    e.preventDefault();
    console.log('form clicked');

    Column = $('#columns');
    Row = $('#rows');
    // bind valus to columns and rows
    numColumns = Number(Column.val());
    numRows = Number(Row.val());

    //validate Columns
    switch (true) {
        case (numColumns > 10):
            setAlert(Column, '10 columns is the max allowed.');
            break;
        case (numColumns < 4):
            setAlert(Column, '4 columns is the min allowed.');
            break;
        default:
            break;

    }

    //validate Rows
    switch (true) {
        case (numRows < 10):
            setAlert(Row, '10 rows is the min allowed.');
            break;
        case (numRows > 75):
            setAlert(Row, '75 rows is the max allowed.');
            break;
        default:
            break;
    }

    //return false if above triggered
    if (
        numColumns > 12 ||
        numColumns < 4 ||
        numRows > 75 ||
        numRows < 10
    ) {
        return false;
    }

    //remove previous chart if any
    if ($('.grid-panel')) {
        $('.grid-panel').remove();
    }

    //make panel grid
    let gridPanel = $('<div>').addClass("grid-panel").css({
        // "border": "1px solid black",
        // 'margin': '3px',
        "clear": "both"
    });

    switch (numColumns) {
        case 4:
            SeatRow = 'SS_SS';
            numColumns = numColumns + 1;
            break;
        case 5:
            SeatRow = 'S_SSS_S';
            numColumns = numColumns + 2;
            break;
        case 6:
            SeatRow = 'SS_SS_SS';
            numColumns = numColumns + 2;
            break;
        case 7:
            SeatRow = 'SS_SSS_SS';
            numColumns = numColumns + 2;
            break;
        case 8:
            SeatRow = 'SS_SSSS_SS';
            numColumns = numColumns + 2;
            break;
        case 9:
            SeatRow = 'SSS_SSS_SSS';
            numColumns = numColumns + 2;
            break;
        case 10:
            SeatRow = 'SSS_SSSS_SSS';
            numColumns = numColumns + 2;
            break;
    }
    console.log(numColumns);
    var seatRowNum = 1;
    var seatNameNum = 1;
    for (let i = 0; i < numRows; i++) {
        for (let index = 0; index < SeatRow.length; index++) {
            // console.log(SeatRow.charAt(index) + index);
            switch (SeatRow.charAt(index)) {
                case 'S':
                    makeSeat(seatRowNum, seatNameNum, gridPanel, 'Seat');
                    break;
                case '_':
                    makeSeat(seatRowNum, seatNameNum, gridPanel, 'Aisle');
                    seatNameNum--;
                    break;
            }
            seatNameNum++;
        }
        $('<hr>').css({
            "width": "100%",
            "height": "1px",
            "margin": 0,
            'visibility': 'hidden'
        }).appendTo(gridPanel);
        seatRowNum++;
        seatNameNum = 1;
    }
    console.log('container: ' + container.width());
    console.log('numColumns: ' + numColumns);
    gridPanel.appendTo(container);
});

function makeSeat(rowDigit, colDigit, gridPanel, seatName) {
    var ABCArray = []
    if (seatName === 'Aisle') {
        return divMaker(gridPanel, '').css('border', '1px solid transparent!important');
    }
    if (seatName === 'Col') {
        return divMaker(gridPanel, seatName + ': ' + rowDigit);
    }
    return divMaker(gridPanel, seatName + ': ' + rowDigit + '-' + colDigit);
}

function setAlert(ColOrRow, Msg) {
    ColOrRow.parent().parent().addClass('has-error');
    $('<div>', {
        text: Msg,
    }).addClass('alert alert-danger row').insertAfter($('form')).fadeTo(3000, 500).slideUp(500, function() {
        $(this).slideUp(500);
        setTimeout(function() {
            $('.alert-danger').remove();
            ColOrRow.parent().parent().removeClass('has-error');
        }, 3000);
    });
}

function genCharArray(charA, charZ) {
    var a = [],
        i = charA.charCodeAt(0),
        j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return JSON.stringify(a);
}
// console.log(genCharArray('a', 'z'));

function divMaker(gridPanel, text) {
    var widthPX = Math.ceil((container.width() * 0.985) / numColumns);
    if (numColumns > 7) {
        widthPX = Math.ceil((container.width() * 0.985) / numColumns);
    }
    console.log('widthPX: ' + widthPX);
    var div = $('<div>', {
        text: text,
        class: "seat",
        click: function(e) {
            e.preventDefault();
        },
        width: widthPX,
    });
    if (text === '') {
        return div.addClass('aisle').appendTo(gridPanel);
    }
    return div.appendTo(gridPanel);
}