import moment from 'moment';
import Symbol from 'es6-symbol';

import * as fake  from './fake'

//-----------------------------------------------------------------------------
// Constants
//-----------------------------------------------------------------------------

const INTERVALS = {
    year: true,
    quarter: true,
    month: true,
    week: true,
    day: true,
    hour: true,
    minute: true,
    second: true
};


//-----------------------------------------------------------------------------
// Date Ranges
//-----------------------------------------------------------------------------

export class DateRange {
    constructor(start, end) {// fake
        let s = start;
        let e = end;

        if (arguments.length === 1 || end === undefined) {
            if (typeof start === 'object' && start.length === 2) {
                [s, e] = start;
            }
            else if (typeof start === 'string') {
                [s, e] = start.split('/');
            }
        }

        this.start = (s === null) ? new Date(-8640000000000000) : new Date(s);
        this.end = (e === null) ? new Date(8640000000000000) : new Date(e);
    }

    adjacent(other) { // fake
        const sameStartEnd = fake.isSame(this.start, other.end);
        const sameEndStart = fake.isSame(this.end, other.start);

        return (sameStartEnd && (other.start.valueOf() <= this.start.valueOf())) || (sameEndStart && (other.end.valueOf() >= this.end.valueOf()));
    }

    add(other) { // fake
        if (this.overlaps(other)) {
            return new this.constructor(fake.min(this.start, other.start), fake.max(this.end, other.end));
        }

        return null;
    }

    by(interval, options = {exclusive: false, step: 1}) {// change
        const range = this;

        return {
            [Symbol.iterator]() {
                const exclusive = options.exclusive || false;
                const step = options.step || 1;
                const diff = Math.abs(fake.diff(range.start,range.end, interval)) / step;
                let iteration = 0;

                return {
                    next() {
                        const current = fake.add(fake.clone(range.start),(iteration * step), interval);
                        const done = exclusive
                            ? !(iteration < diff)
                            : !(iteration <= diff);

                        iteration++;

                        return {
                            done,
                            value: (done ? undefined : current)
                        };
                    }
                };
            }
        };
    }

    byRange(interval, options = {exclusive: false, step: 1}) { //change
        const range = this;
        const step = options.step || 1;
        const diff = this.valueOf() / interval.valueOf() / step;
        const exclusive = options.exclusive || false;
        const unit = Math.floor(diff);
        let iteration = 0;

        return {
            [Symbol.iterator]() {
                if (unit === Infinity) {
                    return {done: true};
                }

                return {
                    next() {
                        const current = new Date(range.start.valueOf() + (interval.valueOf() * iteration * step));
                        const done = ((unit === diff) && exclusive)
                            ? !(iteration < unit)
                            : !(iteration <= unit);

                        iteration++;

                        return {
                            done,
                            value: (done ? undefined : current)
                        };
                    }
                };
            }
        };
    }

    center() { // change
        const center = this.start.valueOf() + this.diff() / 2;

        return new Date(center);
    }


    clone() { // no change
        return new this.constructor(this.start, this.end);
    }

    contains(other, options = {exclusive: false}) { // no change
        const start = this.start.valueOf();
        const end = this.end.valueOf();
        let oStart = other.valueOf();
        let oEnd = other.valueOf();

        if (other instanceof DateRange) {
            oStart = other.start.valueOf();
            oEnd = other.end.valueOf();
        }

        const startInRange = (start < oStart) || ((start <= oStart) && !options.exclusive);
        const endInRange = (end > oEnd) || ((end >= oEnd) && !options.exclusive);

        return (startInRange && endInRange);
    }

    diff(unit, rounded) { // fake
        return fake.diff(this.end, this.start, unit, rounded);
    }

    duration(unit, rounded) { // no change
        return this.diff(unit, rounded);
    }

    intersect(other) { //no change
        const start = this.start.valueOf();
        const end = this.end.valueOf();
        const oStart = other.start.valueOf();
        const oEnd = other.end.valueOf();

        if ((start <= oStart) && (oStart < end) && (end < oEnd)) {
            return new this.constructor(oStart, end);
        }
        else if ((oStart < start) && (start < oEnd) && (oEnd <= end)) {
            return new this.constructor(start, oEnd);
        }
        else if ((oStart < start) && (start <= end) && (end < oEnd)) {
            return this;
        }
        else if ((start <= oStart) && (oStart <= oEnd) && (oEnd <= end)) {
            return other;
        }

        return null;
    }

    isEqual(other) { // fake
        return fake.isSame(this.start,other.start) && fake.isSame(this.end,other.end);
    }

    isSame(other) { // no change
        return this.isEqual(other);
    }

    overlaps(other, options = {adjacent: false}) {  //no change
        const intersect = (this.intersect(other) !== null);

        if (options.adjacent && !intersect) {
            return this.adjacent(other);
        }

        return intersect;
    }

    reverseBy(interval, options = {exclusive: false, step: 1}) { // change fake
        const range = this;

        return {
            [Symbol.iterator]() {
                const exclusive = options.exclusive || false;
                const step = options.step || 1;
                const diff = Math.abs(fake.diff(range.start,range.end, interval)) / step;
                let iteration = 0;

                return {
                    next() {
                        const current = fake.subtract(fake.clone(range.end),(iteration * step), interval);
                        const done = exclusive
                            ? !(iteration < diff)
                            : !(iteration <= diff);

                        iteration++;

                        return {
                            done,
                            value: (done ? undefined : current)
                        };
                    }
                };
            }
        };
    }

    reverseByRange(interval, options = {exclusive: false, step: 1}) {  // change
        const range = this;
        const step = options.step || 1;
        const diff = this.valueOf() / interval.valueOf() / step;
        const exclusive = options.exclusive || false;
        const unit = Math.floor(diff);
        let iteration = 0;

        return {
            [Symbol.iterator]() {
                if (unit === Infinity) {
                    return {done: true};
                }

                return {
                    next() {
                        const current = new Date(range.end.valueOf() - (interval.valueOf() * iteration * step));
                        const done = ((unit === diff) && exclusive)
                            ? !(iteration < unit)
                            : !(iteration <= unit);

                        iteration++;

                        return {
                            done,
                            value: (done ? undefined : current)
                        };
                    }
                };
            }
        };
    }

    subtract(other) {  // no change
        const start = this.start.valueOf();
        const end = this.end.valueOf();
        const oStart = other.start.valueOf();
        const oEnd = other.end.valueOf();

        if (this.intersect(other) === null) {
            return [this];
        }
        else if ((oStart <= start) && (start < end) && (end <= oEnd)) {
            return [];
        }
        else if ((oStart <= start) && (start < oEnd) && (oEnd < end)) {
            return [new this.constructor(oEnd, end)];
        }
        else if ((start < oStart) && (oStart < end) && (end <= oEnd)) {
            return [new this.constructor(start, oStart)];
        }
        else if ((start < oStart) && (oStart < oEnd) && (oEnd < end)) {
            return [new this.constructor(start, oStart), new this.constructor(oEnd, end)];
        }
        else if ((start < oStart) && (oStart < end) && (oEnd < end)) {
            return [new this.constructor(start, oStart), new this.constructor(oStart, end)];
        }

        return [];
    }

    toDate() { // change
        return [this.start, this.end];
    }

    toString() { // change
        return this.start.toString() + '/' + this.end.toString();
    }

    valueOf() { // no change
        return this.end.valueOf() - this.start.valueOf();
    }
}


//-----------------------------------------------------------------------------
// Moment Extensions
//-----------------------------------------------------------------------------

export function DateRangeCreate(start, end) {
    return new DateRange(start, end);
}


export function extendMoment(moment) {
    /**
     * Build a date range.
     */
    moment.range = function range(start, end) {
        const m = this;

        if (INTERVALS.hasOwnProperty(start)) {
            return new DateRange(moment(m).startOf(start), moment(m).endOf(start));
        }

        return new DateRange(start, end);
    };

    /**
     * Alias of static constructor.
     */
    moment.fn.range = moment.range;

    /**
     * Expose constructor
     */
    moment.range.constructor = DateRange;

    /**
     * Check if the current moment is within a given date range.
     */
    moment.fn.within = function (range) {
        return range.contains(this.toDate());
    };

    return moment;
}
