/**
 * @flow
 */

import expect from 'expect.js';

import { DateRange,DateRangeCreate } from '../fat/date-range';
import * as fake  from '../fat/fake'

describe('#subtract()', function() {
  const d5 = new Date(Date.UTC(2011, 2, 2));
  const d6 = new Date(Date.UTC(2011, 4, 4));
  const d7 = new Date(Date.UTC(2011, 6, 6));
  const d8 = new Date(Date.UTC(2011, 8, 8));

  it('should turn [--{==}--] into (--) (--) where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d5, d8);
    const dr2 = DateRangeCreate(d6, d7);

    expect(dr1.subtract(dr2)).to.eql([DateRangeCreate(d5, d6), DateRangeCreate(d7, d8)]);
  });

  it('should turn {--[==]--} into () where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d6, d7);
    const dr2 = DateRangeCreate(d5, d8);

    expect(dr1.subtract(dr2)).to.eql([]);
  });

  it('should turn {[==]} into () where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d5, d6);
    const dr2 = DateRangeCreate(d5, d6);

    expect(dr1.subtract(dr2)).to.eql([]);
  });

  it('should turn [--{==]--} into (--) where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d5, d7);
    const dr2 = DateRangeCreate(d6, d8);

    expect(dr1.subtract(dr2)).to.eql([DateRangeCreate(d5, d6)]);
  });

  it('should turn [--{==]} into (--) where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d5, d7);
    const dr2 = DateRangeCreate(d6, d7);

    expect(dr1.subtract(dr2)).to.eql([DateRangeCreate(d5, d6)]);
  });

  it('should turn {--[==}--] into (--) where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d6, d8);
    const dr2 = DateRangeCreate(d5, d7);

    expect(dr1.subtract(dr2)).to.eql([DateRangeCreate(d7, d8)]);
  });

  it('should turn {[==}--] into (--) where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d6, d8);
    const dr2 = DateRangeCreate(d6, d7);

    expect(dr1.subtract(dr2)).to.eql([DateRangeCreate(d7, d8)]);
  });

  it('should turn [--] {--} into (--) where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d5, d6);
    const dr2 = DateRangeCreate(d7, d8);

    expect(dr1.subtract(dr2)).to.eql([dr1]);
  });

  it('should turn {--} [--] into (--) where (a=[], b={})', function() {
    const dr1 = DateRangeCreate(d7, d8);
    const dr2 = DateRangeCreate(d5, d6);

    expect(dr1.subtract(dr2)).to.eql([dr1]);
  });

  it('should turn [--{==}--] into (--) where (a=[], b={})', function() {
    const o = DateRangeCreate('2015-04-07T00:00:00+00:00/2015-04-08T00:00:00+00:00');
    const s = DateRangeCreate('2015-04-07T17:12:18+00:00/2015-04-07T17:12:18+00:00');
    const subtraction = o.subtract(s);
    const a = DateRangeCreate('2015-04-07T00:00:00+00:00/2015-04-07T17:12:18+00:00');
    const b = DateRangeCreate('2015-04-07T17:12:18+00:00/2015-04-08T00:00:00+00:00');

    expect(fake.isSame(subtraction[0].start,a.start)).to.be(true);
    expect(fake.isSame(subtraction[0].end,a.end)).to.be(true);
    expect(fake.isSame(subtraction[1].start,b.start)).to.be(true);
    expect(fake.isSame(subtraction[1].end,b.end)).to.be(true);
  });
});




