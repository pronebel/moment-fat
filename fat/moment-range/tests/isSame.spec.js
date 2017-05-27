


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






describe('#isSame()', function() {
  it('should true if the start and end of both DateRange objects equal', function() {
    const dr1 = DateRangeCreate(d1, d2);
    const dr2 = DateRangeCreate(d1, d2);

    expect(dr1.isSame(dr2)).to.be(true);
  });

  it('should false if the starts differ between objects', function() {
    const dr1 = DateRangeCreate(d1, d3);
    const dr2 = DateRangeCreate(d2, d3);

    expect(dr1.isSame(dr2)).to.be(false);
  });

  it('should false if the ends differ between objects', function() {
    const dr1 = DateRangeCreate(d1, d2);
    const dr2 =DateRangeCreate(d1, d3);

    expect(dr1.isSame(dr2)).to.be(false);
  });
});

