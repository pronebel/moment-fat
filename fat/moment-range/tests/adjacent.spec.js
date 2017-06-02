/**
 * @flow
 */

import expect from 'expect.js';

import { DateRange,DateRangeCreate } from '../fat/date-range';
import * as fake  from '../fat/fake'



const d1 = new Date(Date.UTC(2011, 2, 5));
const d2 = new Date(Date.UTC(2011, 5, 5));
const d3 = new Date(Date.UTC(2011, 4, 9));
const d4 = new Date(Date.UTC(1988, 0, 1));


describe('#adjacent', function() {
    it('should correctly indicate when ranges aren\'t adjacent', function() {
        const a = DateRangeCreate(d4, d1);
        const b = DateRangeCreate(d3, d2);

        expect(a.adjacent(b)).to.be(false);
    });

    it('should correctly indicate when a.start == b.start', function() {
        const a = new Date(2016,2,15);
        const b =  new Date(2016,2,29);
        const c = new Date(2016,2,15);
        const d =  new Date(2016,2,30);

        const range1 = DateRangeCreate(a, b);
        const range2 = DateRangeCreate(c, d);

        expect(range1.adjacent(range2)).to.be(false);
    });

    it('should correctly indicate when a.start == b.end', function() {

        const a = new Date(2016,2,15);
        const b =  new Date(2016,2,29);
        const c = new Date(2016,2,10);
        const d =  new Date(2016,2,15);
        const range1 = DateRangeCreate(a, b);
        const range2 = DateRangeCreate(c, d);

        expect(range1.adjacent(range2)).to.be(true);
    });

    it('should correctly indicate when a.end == b.start', function() {

        const a = new Date(2016,2,15);
        const b =  new Date(2016,2,20);
        const c = new Date(2016,2,20);
        const d =  new Date(2016,2,25);
        const range1 = DateRangeCreate(a, b);
        const range2 = DateRangeCreate(c, d);

        expect(range1.adjacent(range2)).to.be(true);
    });

    it('should correctly indicate when a.end == b.end', function() {

        const a = new Date(2016,2,15);
        const b =  new Date(2016,2,20);
        const c = new Date(2016,2,10);
        const d =  new Date(2016,2,20);
        const range1 = DateRangeCreate(a, b);
        const range2 = DateRangeCreate(c, d);


        expect(range1.adjacent(range2)).to.be(false);
    });
});
