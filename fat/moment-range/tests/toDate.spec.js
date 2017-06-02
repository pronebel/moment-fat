/**
 * @flow
 */

import expect from 'expect.js';

import { DateRange,DateRangeCreate } from '../fat/date-range';
import * as fake  from '../fat/fake'

function isDate(date){
    return date instanceof Date
}


const d1 = new Date(Date.UTC(2011, 2, 5));
const d2 = new Date(Date.UTC(2011, 5, 5));
const d3 = new Date(Date.UTC(2011, 4, 9));
const d4 = new Date(Date.UTC(1988, 0, 1));

describe('#toDate()', function() {
  it('should be a array like [dateObject, dateObject]', function() {
    const dr = DateRangeCreate(d1, d2);
    const drTodate = dr.toDate();

    expect(drTodate.length).to.eql(2);
    expect(drTodate[0].valueOf()).to.eql(d1.valueOf());
    expect(drTodate[1].valueOf()).to.eql(d2.valueOf());
  });
});
