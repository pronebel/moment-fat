/**
 * @flow
 */

import expect from 'expect.js';

import { DateRange,DateRangeCreate } from '../fat/date-range';
import * as fake  from '../fat/fake'

function isDate(date){
    return date instanceof Date
}


const d1 = new Date(Date.UTC(2011, 2, 5));
const d2 = new Date(Date.UTC(2011, 5, 5));
const d3 = new Date(Date.UTC(2011, 4, 9));
const d4 = new Date(Date.UTC(1988, 0, 1));

const sStart = '1996-08-12T00:00:00.000Z';
const sEnd = '2012-01-01T00:00:00.000Z';

describe('constructor', function() {
    it('should allow initialization with date string', function() {
        const dr = DateRangeCreate(sStart, sEnd);

        expect(isDate(dr.start)).to.be(true);
        expect(isDate(dr.end)).to.be(true);
    });

    it('should allow initialization with Date object', function() {
        const dr = DateRangeCreate(d1, d2);

        expect(isDate(dr.start)).to.be(true);
        expect(isDate(dr.end)).to.be(true);
    });

    /*
    todo: check to readme
    it('should allow initialization with Moment object', function() {
     const dr = moment.range(m1, m2);

     expect(moment.isMoment(dr.start)).to.be(true);
     expect(moment.isMoment(dr.end)).to.be(true);
     });*/

    it('should allow initialization with an ISO 8601 Time Interval string', function() {// TODO: CHECK  native date support ?
        const start = '2015-01-17T09:50:04+00:00';
        const end   = '2015-04-17T08:29:55+00:00';
        const dr = DateRangeCreate(start + '/' + end);

        expect(fake.isSame(new Date(start),dr.start)).to.be(true);
        expect(fake.isSame(new Date(end),dr.end)).to.be(true);
    });

    it('should allow initialization with an array', function() {
        const dr = DateRangeCreate([d1, d2]);

        expect(fake.isSame(d1,dr.start)).to.be(true);
        expect(fake.isSame(d2,dr.end)).to.be(true);
    });

    it('should allow initialization with open-ended ranges', function() {
        let dr = DateRangeCreate(null, d1);

        expect(isDate(dr.start)).to.be(true);

        dr = DateRangeCreate(d1, null);

        expect(isDate(dr.end)).to.be(true);
    });

    it('should allow initialization without any arguments', function() {
        const dr = DateRangeCreate();

        expect(isDate(dr.start)).to.be(true);
        expect(isDate(dr.end)).to.be(true);
    });

    it('should allow initialization with undefined arguments', function() {
        const dr = DateRangeCreate(undefined, undefined);

        expect(isDate(dr.start)).to.be(true);
        expect(isDate(dr.end)).to.be(true);
    });

    /*
       todo: 支持  某 年 季 度 月 天 时分 秒
    it('should allow initialization with moment interval strings', function() {
     const date = moment('2016-12-12T11:12:18.607');
     const quarterStart = moment('2016-10-01T00:00:00.000');
     const quarterEnd = moment('2016-12-31T23:59:59.999');
     const r = date.range('quarter');

     expect(r.start.isSame(quarterStart)).to.be(true);
     expect(r.end.isSame(quarterEnd)).to.be(true);
     });*/
});
