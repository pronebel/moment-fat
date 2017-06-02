function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function monthDiff(date1,date2){
    var eom, ret;
    ret = (date2.getFullYear() - date1.getFullYear()) * 12;
    ret += date2.getMonth() - date1.getMonth();
    eom =  (new Date(date2.getFullYear(), date1.getMonth() + 1, 0)).getDate();
    ret += (date2.getDate() / eom) - (date1.getDate() / eom);
    return ret
}
/**
 *
 * @param delta: millisecond
 * @param units
 * @returns {number}
 */
export function duration(delta,units){
    let output = units === 'seconds' ? delta / 1e3 : // 1000
        units === 'minutes' ? delta / 6e4 : // 1000 * 60
            units === 'hours' ? delta / 36e5 : // 1000 * 60 * 60
                units === 'days' ? delta / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'weeks' ? delta / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                        delta;
    return output;
}
export function dateDuration (date1,date2,units,asFloat){

    let output ;

    if(units&&units.toLowerCase().indexOf("s")!=units.length-1){
        units = units.toLowerCase()+'s';
    }


    if (units === 'years' || units === 'months' || units === 'quarters') {
        output = monthDiff(date1, date2);
        if (units === 'quarters') {
            output = output / 3;
        } else if (units === 'years') {
            output = output / 12;
        }
    } else {
        output = duration(Math.floor(date1 - date2),units);


    }
    return asFloat ? output : absFloor(output);

}

