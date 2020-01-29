const sniff = require('./empty-commit');
const commitFixture = require('../../../fixtures/commit');

test('Commit is empty', () => {
    commitFixture.files = [];

    try {
        expect(sniff(commitFixture)).toBe(false);
    } catch(error) {
        expect(error.code).toBe('C-EMPTY');
    }
});