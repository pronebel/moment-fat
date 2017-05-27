
/**
 * @flow
 */

import expect from 'expect.js';

import { DateRange,DateRangeCreate } from '../fat/moment-range';
import * as fake  from '../fat/fake'

function isDate(date){
    return date instanceof Date
}


const d1 = new Date(Date.UTC(2011, 2, 5));
const d2 = new Date(Date.UTC(2011, 5, 5));
const d3 = new Date(Date.UTC(2011, 4, 9));
const d4 = new Date(Date.UTC(1988, 0, 1));
//const m1 = moment.utc('06-05-1996', 'MM-DD-YYYY');
//const m2 = moment.utc('11-05-1996', 'MM-DD-YYYY');
//const m3 = moment.utc('08-12-1996', 'MM-DD-YYYY');
//const m4 = moment.utc('01-01-2012', 'MM-DD-YYYY');
const sStart = '1996-08-12T00:00:00.000Z';
const sEnd = '2012-01-01T00:00:00.000Z';





describe('#valueOf()', function() {
  it('should be the value of the range in milliseconds', function() {
    const dr = DateRangeCreate(d1, d2);

    expect(dr.valueOf()).to.eql(d2.getTime() - d1.getTime());
  });

  it('should correctly coerce to a number', function() {
    const dr1 = DateRangeCreate(d4, d2);
    const dr2 = DateRangeCreate(d3, d2);

    expect((dr1 > dr2)).to.be(true);
  });
});


