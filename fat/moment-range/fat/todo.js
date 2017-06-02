
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
