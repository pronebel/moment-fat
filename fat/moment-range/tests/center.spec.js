/**
 * @flow
 */

import expect from 'expect.js';

import { DateRange,DateRangeCreate } from '../fat/date-range';
import * as fake  from '../fat/fake'



describe('#center()', function() {
  it('should use momentjs’ center method', function() {
    const d1 = new Date(Date.UTC(2011, 2, 5));
    const d2 = new Date(Date.UTC(2011, 3, 5));
    const dr = DateRangeCreate(d1, d2);

    expect(dr.center().valueOf()).to.equal(1300622400000);
  });
});