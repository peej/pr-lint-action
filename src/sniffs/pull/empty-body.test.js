const sniff = require('./empty-body');
const pullRequestFixture = require('../../../fixtures/pull-request');

test('Pull request description is empty', () => {
    pullRequestFixture.body = '';

    try {
        expect(sniff(pullRequestFixture)).toBe(false);
    } catch(error) {
        expect(error.code).toBe('P-EMPTY');
    }
});