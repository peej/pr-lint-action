const sniff = require('./no-merge-commits');
const commitFixture = require('../../../fixtures/commit');

test('Merge commits are not allowed', () => {
    commitFixture.parents = [ {}, {} ];

    try {
        expect(sniff(commitFixture)).toBe(false);
    } catch(error) {
        expect(error.code).toBe('C-MERGE');
    }
});