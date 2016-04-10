var LRU = require('../lib/lru');

var expect = require('chai').expect;

describe('LRU', function() {

    describe('new', function() {

        it('should return undefined on any value when new', function() {
            var lru = new LRU(5);

            expect(lru.fetch('dummy')).to.eq(undefined);
        });

    });

    describe('#fetch', function() {

        it('should fetch a value just stored', function() {
            var lru = new LRU(5);

            expect(lru.store('some', 'data')).to.eq(undefined);

            expect(lru.fetch('some')).to.eq('data');
        });

        it('should fetch a value stored some time ago', function() {
            var lru = new LRU(5);

            expect(lru.store('some', 'data')).to.eq(undefined);
            expect(lru.store('another', 'datum')).to.eq(undefined);
            expect(lru.store('third', 'datadata')).to.eq(undefined);

            expect(lru.fetch('another')).to.eq('datum');
            expect(lru.fetch('some')).to.eq('data');
        });

        it('should not fetch a value (return undefined) stored too long ago', function() {
            var lru = new LRU(5);

            expect(lru.store('one', 'data1')).to.eq(undefined);
            expect(lru.store('two', 'data2')).to.eq(undefined);
            expect(lru.store('three', 'data3')).to.eq(undefined);
            expect(lru.store('four', 'data4')).to.eq(undefined);
            expect(lru.store('five', 'data5')).to.eq(undefined);
            expect(lru.store('six', 'data6')).to.eq(undefined);

            expect(lru.fetch('five')).to.eq('data5');
            expect(lru.fetch('one')).to.eq(undefined);
        });

        it('should fetch a value stored long ago, but frequently accessed', function() {
            var lru = new LRU(5);

            expect(lru.store('one', 'data1')).to.eq(undefined);
            expect(lru.store('two', 'data2')).to.eq(undefined);
            expect(lru.store('three', 'data3')).to.eq(undefined);
            expect(lru.fetch('one')).to.eq('data1');
            expect(lru.store('four', 'data4')).to.eq(undefined);
            expect(lru.store('five', 'data5')).to.eq(undefined);
            expect(lru.store('six', 'data6')).to.eq(undefined);

            expect(lru.fetch('five')).to.eq('data5');
            expect(lru.fetch('one')).to.eq('data1');
            expect(lru.fetch('two')).to.eq(undefined);
        });

    });

});
