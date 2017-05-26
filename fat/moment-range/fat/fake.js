import moment from 'moment';


export let isSame = function (sdate, input, units) {
    return moment(sdate).isSame(input, units);
}

export let min = function () {
    var args = [].slice.call(arguments, 0);
    return Math.min(args);
}
export let max = function () {
    var args = [].slice.call(arguments, 0);
    return Math.max(args);
}

export let clone = function (date) {
    return new Date(date.valueOf());
}

export let diff = function (sdate,input, units, asFloat) {
    return moment(sdate).isSame(input, units,asFloat);
}

export let add = function (sdate,val,units) {
    return moment(sdate).add(val,units).toDate()
}
export let subtract = function (sdate,val,units) {
    return moment(sdate).subtract(val,units).toDate()
}