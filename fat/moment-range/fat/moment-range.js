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

        this.start = (s === null) ? new Date(-8640000000000000) : (s===undefined?new Date():new Date(s));
        this.end = (e === null) ? new Date(8640000000000000) :  (e===undefined?new Date():new Date(e));
    }

    adjacent(other) { // fake
        const sameStartEnd = this.start.valueOf()=== other.end.valueOf();
        const sameEndStart = this.end.valueOf() === other.start.valueOf();

        return (sameStartEnd && (other.start.valueOf() <= this.start.valueOf())) || (sameEndStart && (other.end.valueOf() >= this.end.valueOf()));
    }

    add(other) { // fake
        if (this.overlaps(other)) {
            return new this.constructor(Math.min(this.start, other.start), Math.max(this.end, other.end));
        }

        return null;
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

    diff() { // fake
        return Math.floor(this.end.valueOf() - this.start.valueOf());
    }

    duration() { // no change
        return this.diff();
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
        return (this.start.valueOf() === other.start.valueOf()) &&
            (this.end.valueOf() === other.end.valueOf());
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

export function DateRangeCreate(start, end) {
    return new DateRange(start, end);
}
window.DateRange = DateRangeCreate;
