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

describe('#diff()', function() {
  it('should use momentjs’ diff method', function() {
    const dr = DateRangeCreate(d1, d2);

    expect(dr.diff('months')).to.equal(3);
    expect(dr.diff('days')).to.equal(92);
    expect(dr.diff()).to.equal(7948800000);
  });

  it('should optionally pass the rounded argument', function() {
    const d1 = new Date(Date.UTC(2011, 4, 1));
    const d2 = new Date(Date.UTC(2011, 4, 5, 12));
    const dr = DateRangeCreate(d1, d2);

    expect(dr.diff('days', true)).to.equal(4.5);
  });
});