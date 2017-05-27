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






describe('#intersect()', function() {
  const d5 = new Date(Date.UTC(2011, 2, 2));
  const d6 = new Date(Date.UTC(2011, 4, 4));
  const d7 = new Date(Date.UTC(2011, 6, 6));
  const d8 = new Date(Date.UTC(2011, 8, 8));

  it('should work with [---{==]---} overlaps where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d5, d7);
    const dr2 = DateRangeCreate(d6, d8);

    expect(dr1.intersect(dr2).isSame(DateRangeCreate(d6, d7))).to.be(true);
  });

  it('should work with {---[==}---] overlaps where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d6, d8);
    const dr2 = DateRangeCreate(d5, d7);

    expect(dr1.intersect(dr2).isSame(DateRangeCreate(d6, d7))).to.be(true);
  });

  it('should work with [{===]---} overlaps where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d5, d6);
    const dr2 = DateRangeCreate(d5, d7);

    expect(dr1.intersect(dr2).isSame(DateRangeCreate(d5, d6))).to.be(true);
  });

  it('should work with {[===}---] overlaps where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d5, d7);
    const dr2 = DateRangeCreate(d5, d6);

    expect(dr1.intersect(dr2).isSame(DateRangeCreate(d5, d6))).to.be(true);
  });

  it('should work with [---{===]} overlaps where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d5, d7);
    const dr2 = DateRangeCreate(d6, d7);

    expect(dr1.intersect(dr2).isSame(DateRangeCreate(d6, d7))).to.be(true);
  });

  it('should work with {---[===}] overlaps where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d6, d7);
    const dr2 = DateRangeCreate(d5, d7);

    expect(dr1.intersect(dr2).isSame(DateRangeCreate(d6, d7))).to.be(true);
  });

  it('should work with [---] {---} overlaps where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d5, d6);
    const dr2 = DateRangeCreate(d7, d8);

    expect(dr1.intersect(dr2)).to.be(null);
  });

  it('should work with {---} [---] overlaps where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d7, d8);
    const dr2 = DateRangeCreate(d5, d6);

    expect(dr1.intersect(dr2)).to.be(null);
  });

  it('should work with [---]{---} overlaps where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d5, d6);
    const dr2 = DateRangeCreate(d6, d7);

    expect(dr1.intersect(dr2)).to.be(null);
  });

  it('should work with {---}[---] overlaps where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d6, d7);
    const dr2 = DateRangeCreate(d5, d6);
    expect(dr1.intersect(dr2)).to.be(null);
  });

  it('should work with {--[===]--} overlaps where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d6, d7);
    const dr2 = DateRangeCreate(d5, d8);

    expect(dr1.intersect(dr2).isSame(dr1)).to.be(true);
  });

  it('should work with [--{===}--] overlaps where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d5, d8);
    const dr2 = DateRangeCreate(d6, d7);

    expect(dr1.intersect(dr2).isSame(dr2)).to.be(true);
  });

  it('should work with [{===}] overlaps where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d5, d6);
    const dr2 = DateRangeCreate(d5, d6);

    expect(dr1.intersect(dr2).isSame(dr2)).to.be(true);
  });

  it('should work with [--{}--] overlaps where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d6, d6);
    const dr2 = DateRangeCreate(d5, d7);

    expect(dr1.intersect(dr2).isSame(dr1)).to.be(true);
  });
});
