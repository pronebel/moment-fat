/**
 * @flow
 */

import expect from 'expect.js';

import { DateRange,DateRangeCreate } from '../fat/date-range';
import * as fake  from '../fat/fake'



const sStart = '1996-08-12T00:00:00.000Z';
const sEnd = '2012-01-01T00:00:00.000Z';

describe('#clone()', function() {
    it('should deep clone range', function() {
        const dr1 = DateRangeCreate(sStart, sEnd);
        const dr2 = dr1.clone();

        fake.add(dr2.start,2,'days');
        expect(dr1.start).to.not.equal(dr2.start);
    });
});