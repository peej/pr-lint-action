const sniff = require('./big-pr');
const pullRequestFixture = require('../../../fixtures/pull-request');

test('Pull request contains a good amount of changes', () => {
    pullRequestFixture.additions = 5;
    pullRequestFixture.deletions = 5;
    pullRequestFixture.changed_files = 20;
    pullRequestFixture.commits = 2;

    expect(sniff(pullRequestFixture));
});

test('Pull request contains too many changed files in too few commits', () => {
    pullRequestFixture.additions = 5;
    pullRequestFixture.deletions = 5;
    pullRequestFixture.changed_files = 20;
    pullRequestFixture.commits = 1;

    try {
        expect(sniff(pullRequestFixture)).toBe(false);
    } catch(error) {
        expect(error.code).toBe('P-BIG1');
    }
});

test('Pull request contains too many changed lines in too few commits', () => {
    pullRequestFixture.additions = 50;
    pullRequestFixture.deletions = 51;
    pullRequestFixture.changed_files = 1;
    pullRequestFixture.commits = 1;

    try {
        expect(sniff(pullRequestFixture)).toBe(false);
    } catch(error) {
        expect(error.code).toBe('P-BIG2');
    }
});