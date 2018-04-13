//chunk id 7
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