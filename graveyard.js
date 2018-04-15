////CSS TEST
$('<style>', {
    text: '.seat{ width:' + (Math.ceil((container.width()) / numColumns) - 2) + ';}',
}).appendTo($('head'));
////CSS TEST END

//chunk id 6
//create the plane columns
for (let index = 0; index < SeatRow.length; index++) {
    // console.log(SeatRow.charAt(index) + index);
    switch (SeatRow.charAt(index)) {
        case 'S':
            makeSeat(seatRowNum, seatNameNum, colhead, 'Column').css('top', $(this).scrollTop() + "px");
            break;
        case '_':
            makeSeat(seatRowNum, seatNameNum, colhead, 'Aisle').css('top', $(this).scrollTop() + "px");
            seatNameNum--;
            break;
    }
    seatNameNum++;
}

//graveyard chunk 6B
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

//chunk id 7
console.log(idIndexString);
console.log('seat: ' + seatsToBuy[index].name + 'and ' + seatsToBuy[index + 1].name + ' are next to each other');
var idIndexString = $('#' + index).length ? '#' + index : 0;
console.log('idindexstring' + idIndexString);
console.log('idindexlenght: ' + $(idIndexString).length);
if ($(idIndexString).length) {
    console.log('idindexstring' + $(idIndexString)[0].id);
    console.log(index);
    if ($(idIndexString).next().is(".aisle") == false) {
        console.log('seat: ' + seatsToBuy[index].name + 'and ' + seatsToBuy[index + 1].name + ' are next to each other');
    }
}

//chunk id 8
if ($(this).next().is(".red")) {
    $(this).attr("price", 200);
    $(this).next().attr("price", 200);
    //console.log('this: ' + $(this).attr("price"), 'next: ', $(this).next().attr("price"));
    //console.log($(this)[0].attributes.price.value);
}
if ($(this).prev().is(".red")) {
    $(this).attr("price", 200);
    $(this).prev().attr("price", 200);
    //console.log('this: ' + $(this).attr("price"), 'prev: ' + $(this).prev().attr("price"));
    //console.log($(this)[0].attributes.price.value);
}

//chunk 9
function divMaker(gridPanel, text) {
    var widthPX = Math.ceil((container.width() * 0.985) / numColumns) - 1;
    if (numColumns > 7) {
        widthPX = Math.ceil((container.width() * 0.985) / numColumns) - 1;
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
                //graveyard chunk id 8
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

//graveyard chunk id 11
console.log('indexPlusOne: ' + indexPlusOne);
console.log('seatsToBuy[index].id: ' + seatsToBuy[index].id);
console.log(seatsToBuy[indexPlusOne].id + '<<the +1/ and>>' + seatsToBuy[index].id);

//graveyard chunk id 12
totalDiv = $('<b>', {
    text: totalPrice,
}).css({
    'background-color': 'white',
    'border-radius': '2px'
});