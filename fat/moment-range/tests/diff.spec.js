/**
 * @flow
 */

import expect from 'expect.js';

import { DateRange,DateRangeCreate } from '../fat/date-range';
import * as fake  from '../fat/fake'


const d1 = new Date(Date.UTC(2011, 2, 5));
const d2 = new Date(Date.UTC(2011, 5, 5));

describe('#diff()', function() {

    it('should optionally pass the rounded argument', function() {
        const d1 = new Date(Date.UTC(2011, 4, 1));
        const d2 = new Date(Date.UTC(2011, 4, 2));
        const dr = DateRangeCreate(d1, d2);

        expect(dr.diff()).to.equal(24*60*60*1000);
    });
});