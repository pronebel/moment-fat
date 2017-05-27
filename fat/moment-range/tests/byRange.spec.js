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




describe('#byRange', function() {
  it('should return a valid iterator', function() {
    const d1 = new Date(Date.UTC(2012, 2, 1));
    const d2 = new Date(Date.UTC(2012, 2, 5));
    const d3 = new Date(Date.UTC(2012, 2, 15));
    const d4 = new Date(Date.UTC(2012, 2, 16));
    const dr1 = DateRangeCreate(d1, d2);
    const dr2 = DateRangeCreate(d3, d4);

    // Splat
    const i1 = dr1.byRange(dr2);
    expect([...i1].length).to.be(5);

    // For/of
    const i2 = dr1.byRange(dr2);
    let i = 0;
    for (let n of i2) {
      i++;
    }
    expect(i).to.be(5);

    // Array.from
    const i3 = dr1.byRange(dr2);
    const acc = Array.from(i3);
    expect(acc.length).to.be(5);
  });

  it('should iterate correctly by range', function() {
    const d1 = new Date(Date.UTC(2012, 2, 1));
    const d2 = new Date(Date.UTC(2012, 2, 5));
    const dr1 = DateRangeCreate(d1, d2);
    const dr2 = 1000 * 60 * 60 * 24;

    const acc = Array.from(dr1.byRange(dr2));

    expect(acc.length).to.eql(5);
    expect(acc[0].getUTCDate()).to.eql(1);
    expect(acc[1].getUTCDate()).to.eql(2);
    expect(acc[2].getUTCDate()).to.eql(3);
    expect(acc[3].getUTCDate()).to.eql(4);
    expect(acc[4].getUTCDate()).to.eql(5);
  });

  it('should iterate correctly by duration', function() {
    const d1 = new Date(Date.UTC(2014, 9, 6, 0, 0));
    const d2 = new Date(Date.UTC(2014, 9, 6, 23, 59));
    const dr1 = DateRangeCreate(d1, d2);
    const dr2 = 1000*15*60 //(15, 'minutes');

    const acc = Array.from(dr1.byRange(dr2));

    expect(acc.length).to.eql(96);
    expect(acc[0].getMinutes()).to.eql(0);
    expect(acc[95].getMinutes()).to.eql(45);
  });

  it('should not include .end in the iteration if exclusive is set to true when iterating by range', function() {
    const my1 = new Date('2014-04-02T00:00:00.000Z');
    const my2 = new Date('2014-04-04T00:00:00.000Z');
    const dr1 = DateRangeCreate(my1, my2);
    const dr2 = DateRangeCreate(my1, new Date('2014-04-03T00:00:00.000Z'));
    let acc;

    acc = Array.from(dr1.byRange(dr2)).map(m => m.getFullYear()+"-"+(m.getMonth()+1)+"-"+m.getDate());
    expect(acc).to.eql(['2014-4-2', '2014-4-3', '2014-4-4']);

    acc = Array.from(dr1.byRange(dr2, { exclusive: false })).map(m => m.getFullYear()+"-"+(m.getMonth()+1)+"-"+m.getDate());
    expect(acc).to.eql(['2014-4-2', '2014-4-3', '2014-4-4']);

    acc = Array.from(dr1.byRange(dr2, { exclusive: true })).map(m => m.getFullYear()+"-"+(m.getMonth()+1)+"-"+m.getDate());
    expect(acc).to.eql(['2014-4-2', '2014-4-3']);
  });

  it('should iterate correctly by a given step', function() {
    const d1 = new Date(Date.UTC(2012, 2, 2));
    const d2 = new Date(Date.UTC(2012, 2, 6));
    const dr1 = DateRangeCreate(d1, d2);
    const dr2 = 1000 * 60 * 60 * 24;

    const acc = Array.from(dr1.byRange(dr2, { step: 2 })).map(m => m.getDate());

    expect(acc).to.eql(['2', '4', '6']);
  });

  it('should iterate correctly by a given step when exclusive', function() {
    const d1 = new Date(Date.UTC(2012, 2, 2));
    const d2 = new Date(Date.UTC(2012, 2, 6));
    const dr1 = DateRangeCreate(d1, d2);
    const dr2 = 1000 * 60 * 60 * 24;

    const acc = Array.from(dr1.byRange(dr2, { exclusive: true, step: 2 })).map(m =>m.getDate());

    expect(acc).to.eql(['2', '4']);
  });
});
