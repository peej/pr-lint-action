const sniff = require('./empty-message');
const commitFixture = require('../../../fixtures/commit');

test('Commit message is empty', () => {
    commitFixture.commit.message = '';

    try {
        expect(sniff(commitFixture)).toBe(false);
    } catch(error) {
        expect(error.code).toBe('C-EMSG');
    }
});