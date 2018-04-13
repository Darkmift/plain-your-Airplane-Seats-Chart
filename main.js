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

    for (let index = 0; index < SeatRow.length; index++) {
        // console.log(SeatRow.charAt(index) + index);
        switch (SeatRow.charAt(index)) {
            case 'S':
                makeSeat(seatRowNum, seatNameNum, gridPanel, 'Column');
                break;
            case '_':
                makeSeat(seatRowNum, seatNameNum, gridPanel, 'Aisle');
                seatNameNum--;
                break;
        }
        seatNameNum++;
    }
    seatNameNum = 1;
    //create the plane seats and aisles
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
    if (seatName === 'Column') {
        return divMaker(gridPanel, seatName + ': ' + colDigit);
    }
    //assign id to seats
    var SeatId = rowDigit.toString() + colDigit.toString();
    if (colDigit === 10) {
        SeatId = (rowDigit + 1).toString() + '0';
    }
    return divMaker(gridPanel, seatName + ': ' + rowDigit + '-' + colDigit).attr('id', SeatId);
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
    if (~text.indexOf("Seat")) {
        return $('<div>', {
            text: text,
            class: "seat",
            price: 100,
            leftOfIsle: false,
            click: function(e) {
                e.preventDefault();
                console.log('clicked on price:' + $(this).attr("price"));
                var choseChair = $(event.target);
                choseChair.toggleClass('red');
                // if ($(this).next().is(".red")) {
                //     $(this).attr("price", 200);
                //     $(this).next().attr("price", 200);
                //     //console.log('this: ' + $(this).attr("price"), 'next: ', $(this).next().attr("price"));
                //     //console.log($(this)[0].attributes.price.value);
                // }
                // if ($(this).prev().is(".red")) {
                //     $(this).attr("price", 200);
                //     $(this).prev().attr("price", 200);
                //     //console.log('this: ' + $(this).attr("price"), 'prev: ' + $(this).prev().attr("price"));
                //     //console.log($(this)[0].attributes.price.value);
                // }
            },
            width: widthPX,
        }).appendTo(gridPanel);
    }
    if (~text.indexOf("Column")) {
        return div.addClass('colHead').appendTo(gridPanel);
    }
    if (text === '') {
        return div.addClass('aisle').appendTo(gridPanel);
    }
    return div.appendTo(gridPanel);
}


///pricing stuff
var btns = $('<div>', {
    class: "input-group-btn",
    css: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "1rem"
    },
});

var priceBtn = $('<button>', {
    class: "price btn btn-default",
    text: "Price",
    css: { marginRight: "1rem" },
    click: function(e) {

        if ($('bold')) {
            $('bold').remove();
        }
        var basePrice = 100;
        var multiPrice = 200;
        var totalPrice = 0;

        chosenSeats = $('*.red');
        var numChairs = Number(chosenSeats.length);
        //init selected seats
        var seatsToBuy = [];
        var chosenSeatsId = [];
        var chosenSeatsName = [];
        //grab id of all selected seats and add to chosenSeatsId array as numbers
        for (let i = 0; i < chosenSeats.length; i++) {
            seatsToBuy[i] = {
                id: Number(chosenSeats[i].attributes.id.value),
                name: chosenSeats[i].innerText,
                price: basePrice
            }
            chosenSeatsId[i] = Number(chosenSeats[i].attributes.id.value);
            chosenSeatsName[i] = chosenSeats[i].innerText;
        }
        console.log(seatsToBuy);
        //set cumulative price
        for (let index = 0; index < seatsToBuy.length; index++) {
            //init +1counter set to 0 if num is greater than array length
            var indexPlusOne = (index == seatsToBuy.length - 1 ? 0 : index + 1);
            //ignore if seat is 10th in row
            if (seatsToBuy[index].id % 10 !== 0) {
                //check if seats next to each other and seat(i) is not left of aisle
                if (index < seatsToBuy.length) {
                    console.log('indexPlusOne: ' + indexPlusOne);
                    // console.log('seatsToBuy[index].id: ' + seatsToBuy[index].id);
                    // console.log(seatsToBuy[indexPlusOne].id + '<<the +1/ and>>' + seatsToBuy[index].id);
                    if ((seatsToBuy[indexPlusOne].id - seatsToBuy[index].id) === 1) {
                        //console.log(idIndexString);
                        // console.log('seat: ' + seatsToBuy[index].name + 'and ' + seatsToBuy[index + 1].name + ' are next to each other');
                        //graveyard chunk Id 7
                        console.log('#' + seatsToBuy[index].id);
                        if (!$('#' + seatsToBuy[index].id).next().is(".aisle")) {
                            //console.log('seat: ' + seatsToBuy[index].name + ' is left of isle');
                            console.log('seat: ' + seatsToBuy[index].name + 'and ' + seatsToBuy[index + 1].name + ' are next to each other');
                            seatsToBuy[index].price = 200;
                            seatsToBuy[index + 1].price = 200;
                        }
                    }
                }
            } else {
                //console.log('is %10: ' + seatsToBuy[index].id);
            }
        }
        //calc total cost
        var totalPrice = 0;
        var seatTextBillDL = $('<dl>');
        var seatTextBillDT = $('<dt>', {
            text: 'Bill BreakDown',
        }).appendTo(seatTextBillDL);

        for (let index = 0; index < seatsToBuy.length; index++) {
            console.log('seat: ' + seatsToBuy[index].name + ' Price of seat: ' + seatsToBuy[index].price);
            seatTextBillDL.append($('<dd>', {
                text: 'seat: ' + seatsToBuy[index].name + ' Price of seat: ' + seatsToBuy[index].price,
            }));
            //seatTextBill = seatTextBill + '<dd>seat: ' + seatsToBuy[index].name + ' Price of seat: ' + seatsToBuy[index].price + '<dd>';
            totalPrice = totalPrice + seatsToBuy[index].price;
        }
        console.log('totalPrice: ' + totalPrice);



        //console.log(totalPrice);
        resPrice = $('<bold>', {
            text: "Your calculated price for " + numChairs + " people is " + totalPrice + " $ .",
            css: {
                fontSize: "20px",
                marginTop: "2rem"
            }
        });
        seatTextBillDL.appendTo(resPrice);
        resPrice.appendTo(container);
    },
});
priceBtn.appendTo(btns);

var resetBtn = $('<button>', {
    class: "reset btn btn-default",
    text: "Reset",
    css: { marginLeft: "1rem" },
    click: function(e) {
        $('.red').removeClass('red');
        $('bold').empty();
    },
});
resetBtn.appendTo(btns);
btns.appendTo(container);


///test
var contents = [
    { name: 'a', type: 1 },
    { name: 'b', type: 5 },
    { name: 'c', type: 2 },
    { name: 'd', type: 1 }
];

contents.map((content, index, array) => {
    switch (content.type) {
        case 1:
            console.log("type is one and next type is: ", array[index + 1] ? array[index + 1].type : 'empty');
            break;
        case 2:
            console.log("type is two")
            break;
    }
});