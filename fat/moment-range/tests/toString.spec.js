/**
 * @flow
 */

import expect from 'expect.js';

import { DateRange,DateRangeCreate } from '../fat/date-range';
import * as fake  from '../fat/fake'



describe('#toString()', function() {
  it('should be a correctly formatted ISO8601 Time Interval', function() {
    const start = new Date('2015-01-17T09:50:04+00:00');
    const end   = new Date('2015-04-17T08:29:55+00:00');
    const dr = DateRangeCreate(start, end);

    expect(dr.toString()).to.equal(start.toString() + '/' + end.toString());
  });
});