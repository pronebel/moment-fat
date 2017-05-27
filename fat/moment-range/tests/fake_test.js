/**
 * @flow
 */

import expect from 'expect.js';

import { DateRange,DateRangeCreate } from '../fat/moment-range';
import * as fake  from '../fat/fake'

function isDate(date){
  return date instanceof Date
}

describe('DateRange', function() {
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






  // describe('#reverseBy', function() {
  //   it('should return a valid iterator', function() {
  //     const d1 = new Date(Date.UTC(2012, 2, 1));
  //     const d2 = new Date(Date.UTC(2012, 2, 5));
  //     const dr1 = moment.range(d1, d2);
  //
  //     // Splat
  //     const i1 = dr1.reverseBy('day');
  //     expect([...i1].length).to.be(5);
  //
  //     // For/of
  //     const i2 = dr1.reverseBy('day');
  //     let i = 0;
  //     for (let n of i2) {
  //       i++;
  //     }
  //     expect(i).to.be(5);
  //
  //     // Array.from
  //     const i3 = dr1.reverseBy('day');
  //     const acc = Array.from(i3);
  //     expect(acc.length).to.be(5);
  //   });
  //
  //   it('should iterate correctly by shorthand string', function() {
  //     const d1 = new Date(Date.UTC(2012, 2, 1));
  //     const d2 = new Date(Date.UTC(2012, 2, 5));
  //     const dr1 = moment.range(d1, d2);
  //
  //     const i1 = dr1.reverseBy('days');
  //     const acc = Array.from(i1);
  //
  //     expect(acc.length).to.eql(5);
  //     expect(acc[0].utc().date()).to.eql(5);
  //     expect(acc[1].utc().date()).to.eql(4);
  //     expect(acc[2].utc().date()).to.eql(3);
  //     expect(acc[3].utc().date()).to.eql(2);
  //     expect(acc[4].utc().date()).to.eql(1);
  //   });
  //
  //   it('should iterate correctly by year over a Date-constructed range when leap years are involved', function() {
  //     const d1 = new Date(Date.UTC(2011, 1, 1));
  //     const d2 = new Date(Date.UTC(2013, 1, 1));
  //     const dr1 = moment.range(d1, d2);
  //
  //     const i1 = dr1.reverseBy('years');
  //     const acc = Array.from(i1).map(m => m.utc().year());
  //
  //     expect(acc).to.eql([2013, 2012, 2011]);
  //   });
  //
  //   it('should iterate correctly by year over a moment()-constructed range when leap years are involved', function() {
  //     const dr1 = moment.range(moment('2011', 'YYYY'), moment('2013', 'YYYY'));
  //
  //     const i1 = dr1.reverseBy('years');
  //     const acc = Array.from(i1).map(m => m.year());
  //
  //     expect(acc).to.eql([2013, 2012, 2011]);
  //   });
  //
  //   it('should iterate correctly by month over a moment()-constructed range when leap years are involved', function() {
  //     const dr1 = moment.range(moment.utc('2012-01', 'YYYY-MM'), moment.utc('2012-03', 'YYYY-MM'));
  //
  //     const i1 = dr1.reverseBy('months');
  //     const acc = Array.from(i1).map(m => m.utc().format('YYYY-MM'));
  //
  //     expect(acc).to.eql(['2012-03', '2012-02', '2012-01']);
  //   });
  //
  //   it('should iterate correctly by month over a Date-contstructed range when leap years are involved', function() {
  //     const d1 = new Date(Date.UTC(2012, 0, 1));
  //     const d2 = new Date(Date.UTC(2012, 2, 28));
  //     const dr1 = moment.range(d1, d2);
  //
  //     const i1 = dr1.reverseBy('months');
  //     const acc = Array.from(i1).map(m => m.utc().format('YYYY-MM'));
  //
  //     expect(acc).to.eql(['2012-03', '2012-02', '2012-01']);
  //   });
  //
  //   it('should not include .start in the iteration if exclusive is set to true when iterating by string', function() {
  //     const my1 = moment.utc('2014-04-02T00:00:00');
  //     const my2 = moment.utc('2014-04-04T23:59:59');
  //     const dr1 = moment.range(my1, my2);
  //     const options = { exclusive: true };
  //     let acc;
  //
  //     acc = Array.from(dr1.reverseBy('d', options)).map(m => m.utc().format('YYYY-MM-DD'));
  //     expect(acc).to.eql(['2014-04-04', '2014-04-03']);
  //
  //     acc = Array.from(dr1.reverseBy('d')).map(m => m.utc().format('YYYY-MM-DD'));
  //     expect(acc).to.eql(['2014-04-04', '2014-04-03', '2014-04-02']);
  //   });
  //
  //   it('should be exlusive when using by with minutes as well', function() {
  //     const d1 = moment('2014-01-01T00:00:00.000Z');
  //     const d2 = moment('2014-01-01T00:06:00.000Z');
  //     const dr = moment.range(d1, d2);
  //     const options = { exclusive: true };
  //     let acc;
  //
  //     acc = Array.from(dr.reverseBy('m')).map(m => m.utc().format('mm'));
  //     expect(acc).to.eql(['06', '05', '04', '03', '02', '01', '00']);
  //
  //     acc = Array.from(dr.reverseBy('m', options)).map(m => m.utc().format('mm'));
  //     expect(acc).to.eql(['06', '05', '04', '03', '02', '01']);
  //   });
  //
  //   it('should correctly iterate by a given step', function() {
  //     const my1 = moment('2014-04-02T00:00:00.000Z');
  //     const my2 = moment('2014-04-08T00:00:00.000Z');
  //     const dr1 = moment.range(my1, my2);
  //
  //     const acc = Array.from(dr1.reverseBy('days', { step: 2 })).map(m => m.utc().format('DD'));
  //     expect(acc).to.eql(['08', '06', '04', '02']);
  //   });
  //
  //   it('should correctly iterate by a given step when exclusive', function() {
  //     const my1 = moment('2014-04-02T00:00:00.000Z');
  //     const my2 = moment('2014-04-08T00:00:00.000Z');
  //     const dr1 = moment.range(my1, my2);
  //
  //     const acc = Array.from(dr1.reverseBy('days', { exclusive: true, step: 2 })).map(m => m.utc().format('DD'));
  //     expect(acc).to.eql(['08', '06', '04']);
  //   });
  // });
  //
  // describe('#byRange', function() {
  //   it('should return a valid iterator', function() {
  //     const d1 = new Date(Date.UTC(2012, 2, 1));
  //     const d2 = new Date(Date.UTC(2012, 2, 5));
  //     const d3 = new Date(Date.UTC(2012, 2, 15));
  //     const d4 = new Date(Date.UTC(2012, 2, 16));
  //     const dr1 = moment.range(d1, d2);
  //     const dr2 = moment.range(d3, d4);
  //
  //     // Splat
  //     const i1 = dr1.byRange(dr2);
  //     expect([...i1].length).to.be(5);
  //
  //     // For/of
  //     const i2 = dr1.byRange(dr2);
  //     let i = 0;
  //     for (let n of i2) {
  //       i++;
  //     }
  //     expect(i).to.be(5);
  //
  //     // Array.from
  //     const i3 = dr1.byRange(dr2);
  //     const acc = Array.from(i3);
  //     expect(acc.length).to.be(5);
  //   });
  //
  //   it('should iterate correctly by range', function() {
  //     const d1 = new Date(Date.UTC(2012, 2, 1));
  //     const d2 = new Date(Date.UTC(2012, 2, 5));
  //     const dr1 = moment.range(d1, d2);
  //     const dr2 = 1000 * 60 * 60 * 24;
  //
  //     const acc = Array.from(dr1.byRange(dr2));
  //
  //     expect(acc.length).to.eql(5);
  //     expect(acc[0].utc().date()).to.eql(1);
  //     expect(acc[1].utc().date()).to.eql(2);
  //     expect(acc[2].utc().date()).to.eql(3);
  //     expect(acc[3].utc().date()).to.eql(4);
  //     expect(acc[4].utc().date()).to.eql(5);
  //   });
  //
  //   it('should iterate correctly by duration', function() {
  //     const d1 = new Date(Date.UTC(2014, 9, 6, 0, 0));
  //     const d2 = new Date(Date.UTC(2014, 9, 6, 23, 59));
  //     const dr1 = moment.range(d1, d2);
  //     const dr2 = moment.duration(15, 'minutes');
  //
  //     const acc = Array.from(dr1.byRange(dr2));
  //
  //     expect(acc.length).to.eql(96);
  //     expect(acc[0].minute()).to.eql(0);
  //     expect(acc[95].minute()).to.eql(45);
  //   });
  //
  //   it('should not include .end in the iteration if exclusive is set to true when iterating by range', function() {
  //     const my1 = moment('2014-04-02T00:00:00.000Z');
  //     const my2 = moment('2014-04-04T00:00:00.000Z');
  //     const dr1 = moment.range(my1, my2);
  //     const dr2 = moment.range(my1, moment('2014-04-03T00:00:00.000Z'));
  //     let acc;
  //
  //     acc = Array.from(dr1.byRange(dr2)).map(m => m.utc().format('YYYY-MM-DD'));
  //     expect(acc).to.eql(['2014-04-02', '2014-04-03', '2014-04-04']);
  //
  //     acc = Array.from(dr1.byRange(dr2, { exclusive: false })).map(m => m.utc().format('YYYY-MM-DD'));
  //     expect(acc).to.eql(['2014-04-02', '2014-04-03', '2014-04-04']);
  //
  //     acc = Array.from(dr1.byRange(dr2, { exclusive: true })).map(m => m.utc().format('YYYY-MM-DD'));
  //     expect(acc).to.eql(['2014-04-02', '2014-04-03']);
  //   });
  //
  //   it('should iterate correctly by a given step', function() {
  //     const d1 = new Date(Date.UTC(2012, 2, 2));
  //     const d2 = new Date(Date.UTC(2012, 2, 6));
  //     const dr1 = moment.range(d1, d2);
  //     const dr2 = 1000 * 60 * 60 * 24;
  //
  //     const acc = Array.from(dr1.byRange(dr2, { step: 2 })).map(m => m.utc().format('DD'));
  //
  //     expect(acc).to.eql(['02', '04', '06']);
  //   });
  //
  //   it('should iterate correctly by a given step when exclusive', function() {
  //     const d1 = new Date(Date.UTC(2012, 2, 2));
  //     const d2 = new Date(Date.UTC(2012, 2, 6));
  //     const dr1 = moment.range(d1, d2);
  //     const dr2 = 1000 * 60 * 60 * 24;
  //
  //     const acc = Array.from(dr1.byRange(dr2, { exclusive: true, step: 2 })).map(m => m.utc().format('DD'));
  //
  //     expect(acc).to.eql(['02', '04']);
  //   });
  // });

 });
