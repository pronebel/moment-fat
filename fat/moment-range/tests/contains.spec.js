/**
 * @flow
 */

import expect from 'expect.js';

import { DateRange,DateRangeCreate } from '../fat/date-range';
import * as fake  from '../fat/fake'



const d1 = new Date(Date.UTC(2011, 2, 5));
const d2 = new Date(Date.UTC(2011, 5, 5));
const d3 = new Date(Date.UTC(2011, 4, 9));
const d4 = new Date(Date.UTC(1988, 0, 1));

const m1 = new Date('06-05-1996');
const m2 = new Date('11-05-1996');
const m3 = new Date('08-12-1996');
const m4 = new Date('01-01-2012');


describe('#contains()', function() {
  it('should work with Date objects', function() {
    const dr = DateRangeCreate(d1, d2);

    expect(dr.contains(d3)).to.be(true);
    expect(dr.contains(d4)).to.be(false);
  });

  it('should work with Moment objects', function() {
    const dr = DateRangeCreate(m1, m2);

    expect(dr.contains(m3)).to.be(true);
    expect(dr.contains(m4)).to.be(false);
  });

  it('should work with DateRange objects', function() {
    const dr1 = DateRangeCreate(m1, m4);
    const dr2 = DateRangeCreate(m3, m2);

    expect(dr1.contains(dr2)).to.be(true);
    expect(dr2.contains(dr1)).to.be(false);
  });

  it('should be an inclusive comparison', function() {
    const dr1 = DateRangeCreate(m1, m4);

    expect(dr1.contains(m1)).to.be(true);
    expect(dr1.contains(m4)).to.be(true);
    expect(dr1.contains(dr1)).to.be(true);
  });

  it('should be exlusive when the exclusive param is set', function() {
    const dr1 = DateRangeCreate(m1, m2);

    expect(dr1.contains(dr1, { exclusive: true })).to.be(false);
    expect(dr1.contains(dr1, { exclusive: false })).to.be(true);
    expect(dr1.contains(dr1)).to.be(true);
    expect(dr1.contains(m2, { exclusive: true })).to.be(false);
    expect(dr1.contains(m2, { exclusive: false })).to.be(true);
    expect(dr1.contains(m2)).to.be(true);
  });
});


