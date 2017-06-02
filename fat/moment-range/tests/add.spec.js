/**
 * @flow
 */

import expect from 'expect.js';

import { DateRange,DateRangeCreate } from '../fat/date-range';
import * as fake  from '../fat/fake'


describe('#add()', function() {
    const d5 = new Date(Date.UTC(2011, 2, 2));
    const d6 = new Date(Date.UTC(2011, 4, 4));
    const d7 = new Date(Date.UTC(2011, 6, 6));
    const d8 = new Date(Date.UTC(2011, 8, 8));

    it('should add ranges with [---{==]---} overlaps where (a=[], b={})', function() {
        const dr1 = DateRangeCreate(d5, d7);
        const dr2 = DateRangeCreate(d6, d8);
        expect(fake.isSame(dr1.add(dr2),DateRangeCreate(d5, d8))).to.be(true);
    });

    it('should add ranges with {---[==}---] overlaps where (a=[], b={})', function() {
        const dr1 = DateRangeCreate(d6, d8);
        const dr2 = DateRangeCreate(d5, d7);

        expect(fake.isSame(dr1.add(dr2),DateRangeCreate(d5, d8))).to.be(true);
    });

    it('should add ranges with [{===]---} overlaps where (a=[], b={})', function() {
        const dr1 = DateRangeCreate(d5, d6);
        const dr2 = DateRangeCreate(d5, d7);

        expect(fake.isSame(dr1.add(dr2),DateRangeCreate(d5, d7))).to.be(true);
    });

    it('should add ranges with {[===}---] overlaps where (a=[], b={})', function() {
        const dr1 = DateRangeCreate(d5, d7);
        const dr2 = DateRangeCreate(d5, d6);

        expect(fake.isSame(dr1.add(dr2),DateRangeCreate(d5, d7))).to.be(true);
    });

    it('should add ranges with [---{===]} overlaps where (a=[], b={})', function() {
        const dr1 = DateRangeCreate(d5, d7);
        const dr2 = DateRangeCreate(d6, d7);

        expect(fake.isSame(dr1.add(dr2),DateRangeCreate(d5, d7))).to.be(true);
    });

    it('should add ranges with {---[===}] overlaps where (a=[], b={})', function() {
        const dr1 = DateRangeCreate(d6, d7);
        const dr2 = DateRangeCreate(d5, d7);

        expect(fake.isSame(dr1.add(dr2),DateRangeCreate(d5, d7))).to.be(true);
    });

    it('should not add ranges with [---] {---} overlaps where (a=[], b={})', function() {
        const dr1 = DateRangeCreate(d5, d6);
        const dr2 = DateRangeCreate(d7, d8);

        expect(dr1.add(dr2)).to.be(null);
    });

    it('should not add ranges with {---} [---] overlaps where (a=[], b={})', function() {
        const dr1 = DateRangeCreate(d7, d8);
        const dr2 = DateRangeCreate(d5, d6);

        expect(dr1.add(dr2)).to.be(null);
    });

    it('should not add ranges with [---]{---} overlaps where (a=[], b={})', function() {
        const dr1 = DateRangeCreate(d5, d6);
        const dr2 = DateRangeCreate(d6, d7);

        expect(dr1.add(dr2)).to.be(null);
    });

    it('should not add ranges with {---}[---] overlaps where (a=[], b={})', function() {
        const dr1 = DateRangeCreate(d6, d7);
        const dr2 = DateRangeCreate(d5, d6);

        expect(dr1.add(dr2)).to.be(null);
    });

    it('should add ranges {--[===]--} overlaps where (a=[], b={})', function() {
        const dr1 = DateRangeCreate(d6, d7);
        const dr2 = DateRangeCreate(d5, d8);

        expect(fake.isSame(dr1.add(dr2),DateRangeCreate(d5, d8))).to.be(true);
    });

    it('should add ranges [--{===}--] overlaps where (a=[], b={})', function() {
        const dr1 = DateRangeCreate(d5, d8);
        const dr2 = DateRangeCreate(d6, d7);

        expect(fake.isSame(dr1.add(dr2),DateRangeCreate(d5, d8))).to.be(true);
    });

    it('should add ranges [{===}] overlaps where (a=[], b={})', function() {
        const dr1 = DateRangeCreate(d5, d6);
        const dr2 = DateRangeCreate(d5, d6);

        expect(fake.isSame(dr1.add(dr2),DateRangeCreate(d5, d6))).to.be(true);
    });
});