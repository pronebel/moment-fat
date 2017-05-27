

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







describe('#reverseBy', function() {
  it('should return a valid iterator', function() {
    const d1 = new Date(Date.UTC(2012, 2, 1));
    const d2 = new Date(Date.UTC(2012, 2, 5));
    const dr1 = DateRangeCreate(d1, d2);

    // Splat
    const i1 = dr1.reverseBy('day');
    expect([...i1].length).to.be(5);

    // For/of
    const i2 = dr1.reverseBy('day');
    let i = 0;
    for (let n of i2) {
      i++;
    }
    expect(i).to.be(5);

    // Array.from
    const i3 = dr1.reverseBy('day');
    const acc = Array.from(i3);
    expect(acc.length).to.be(5);
  });

  it('should iterate correctly by shorthand string', function() {
    const d1 = new Date(Date.UTC(2012, 2, 1));
    const d2 = new Date(Date.UTC(2012, 2, 5));
    const dr1 = DateRangeCreate(d1, d2);

    const i1 = dr1.reverseBy('days');
    const acc = Array.from(i1);

    expect(acc.length).to.eql(5);
    expect(acc[0].getUTCDate()).to.eql(5);
    expect(acc[1].getUTCDate()).to.eql(4);
    expect(acc[2].getUTCDate()).to.eql(3);
    expect(acc[3].getUTCDate()).to.eql(2);
    expect(acc[4].getUTCDate()).to.eql(1);
  });

  it('should iterate correctly by year over a Date-constructed range when leap years are involved', function() {
    const d1 = new Date(Date.UTC(2011, 1, 1));
    const d2 = new Date(Date.UTC(2013, 1, 1));
    const dr1 = DateRangeCreate(d1, d2);

    const i1 = dr1.reverseBy('years');
    const acc = Array.from(i1).map(m => m.getUTCFullYear());

    expect(acc).to.eql([2013, 2012, 2011]);
  });

  // it('should iterate correctly by year over a moment()-constructed range when leap years are involved', function() {
  //   const dr1 = DateRangeCreate(moment('2011', 'YYYY'), moment('2013', 'YYYY'));
  //
  //   const i1 = dr1.reverseBy('years');
  //   const acc = Array.from(i1).map(m => m.year());
  //
  //   expect(acc).to.eql([2013, 2012, 2011]);
  // });

  it('should iterate correctly by month over a moment()-constructed range when leap years are involved', function() {
    //const dr1 = DateRangeCreate(moment.utc('2012-01', 'YYYY-MM'), moment.utc('2012-03', 'YYYY-MM'));
    const dr1 = DateRangeCreate(new Date(Date.UTC(2012,0,1)),new Date(Date.UTC(2012,2)));
    const i1 = dr1.reverseBy('months');
    const acc = Array.from(i1).map(m => m.getUTCFullYear()+"-"+(m.getUTCMonth()+1));

    expect(acc).to.eql(['2012-3', '2012-2', '2012-1']);
  });

  it('should iterate correctly by month over a Date-contstructed range when leap years are involved', function() {
    const d1 = new Date(Date.UTC(2012, 0, 1));
    const d2 = new Date(Date.UTC(2012, 2, 28));
    const dr1 = DateRangeCreate(d1, d2);

    const i1 = dr1.reverseBy('months');
    const acc = Array.from(i1).map(m =>  m.getUTCFullYear()+"-"+(m.getUTCMonth()+1));

    expect(acc).to.eql(['2012-3', '2012-2', '2012-1']);
  });

  it('should not include .start in the iteration if exclusive is set to true when iterating by string', function() {
    const my1 = new Date('2014-04-02T00:00:00');
    const my2 = new Date('2014-04-04T23:59:59');
    const dr1 = DateRangeCreate(my1, my2);
    const options = { exclusive: true };
    let acc;

    acc = Array.from(dr1.reverseBy('d', options)).map(m => m.getFullYear()+"-"+(m.getMonth()+1)+"-"+m.getDate());
    expect(acc).to.eql(['2014-4-4', '2014-4-3']);

    acc = Array.from(dr1.reverseBy('d')).map(m => m.getFullYear()+"-"+(m.getMonth()+1)+"-"+m.getDate());
    expect(acc).to.eql(['2014-4-4', '2014-4-3', '2014-4-2']);
  });

  it('should be exlusive when using by with minutes as well', function() {
    const d1 = new Date('2014-01-01T00:00:00.000Z');
    const d2 = new Date('2014-01-01T00:06:00.000Z');
    const dr = DateRangeCreate(d1, d2);
    const options = { exclusive: true };
    let acc;

    acc = Array.from(dr.reverseBy('m')).map(m => m.getUTCMinutes());
    expect(acc).to.eql(['6', '5', '4', '3', '2', '1', '0']);

    acc = Array.from(dr.reverseBy('m', options)).map(m => m.getUTCMinutes());
    expect(acc).to.eql(['6', '5', '4', '3', '2', '1']);
  });

  it('should correctly iterate by a given step', function() {
    const my1 = new Date('2014-04-02T00:00:00.000Z');
    const my2 = new Date('2014-04-08T00:00:00.000Z');
    const dr1 = DateRangeCreate(my1, my2);

    const acc = Array.from(dr1.reverseBy('days', { step: 2 })).map(m => m.getUTCDate());
    expect(acc).to.eql(['8', '6', '4', '2']);
  });

  it('should correctly iterate by a given step when exclusive', function() {
    const my1 = new Date('2014-04-02T00:00:00.000Z');
    const my2 = new Date('2014-04-08T00:00:00.000Z');
    const dr1 = DateRangeCreate(my1, my2);

    const acc = Array.from(dr1.reverseBy('days', { exclusive: true, step: 2 })).map(m => m.getUTCDate());
    expect(acc).to.eql(['8', '6', '4']);
  });
});
