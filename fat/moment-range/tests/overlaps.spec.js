/**
 * @flow
 */

import expect from 'expect.js';

import { DateRange,DateRangeCreate } from '../fat/date-range';
import * as fake  from '../fat/fake'

function isDate(date){
    return date instanceof Date
}


//todo: check Date String format sort
const m1 = new Date('06-05-1996');
const m2 = new Date('11-05-1996');
const m3 = new Date('08-12-1996');
const m4 = new Date('01-01-2012');





describe('#overlaps()', function() {
  it('should work with DateRange objects', function() {
    const dr1 = DateRangeCreate(m1, m2);
    const dr2 = DateRangeCreate(m3, m4);
    const dr3 = DateRangeCreate(m2, m4);
    const dr4 = DateRangeCreate(m1, m3);

    expect(dr1.overlaps(dr2)).to.be(true);
    expect(dr1.overlaps(dr3)).to.be(false);
    expect(dr4.overlaps(dr3)).to.be(false);
  });

  it('should indicate if ranges overlap if the options is passed in', function() {
    const a = new Date('15-Mar-2016');
    const b = new Date('20-Mar-2016');
    const c = new Date('20-Mar-2016');
    const d = new Date('25-Mar-2016');

    const range1 = DateRangeCreate(a, b);
    const range2 = DateRangeCreate(c, d);

    expect(range1.overlaps(range2)).to.be(false);
    expect(range1.overlaps(range2, { adjacent: false })).to.be(false);
    expect(range1.overlaps(range2, { adjacent: true })).to.be(true);
  });
});




