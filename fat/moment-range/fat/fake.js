import moment from 'moment';


export let isSame = function (sdata, input, units) {
    return moment(sdata).isSame(input, units);
}

export let min = function () {
    var args = [].slice.call(arguments, 0);
    return Math.min(args);
}
export let max = function () {
    var args = [].slice.call(arguments, 0);
    return Math.max(args);
}