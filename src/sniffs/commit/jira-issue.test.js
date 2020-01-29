const sniff = require('./jira-issue');
const commitFixture = require('../../../fixtures/commit');

test('Commit messages does not start with a Jira issue number', () => {
    commitFixture.commit.message = 'Test';

    expect(() => { sniff(commitFixture) }).toThrow();
});

test('Commit messages must start with a Jira issue number', () => {
    commitFixture.commit.message = '[ABC-123] Test';

    expect(() => { sniff(commitFixture) }).not.toThrow();
});

test('Allow boyscout commits', () => {
    commitFixture.commit.message = '[BOYSCOUT] Test';

    expect(() => { sniff(commitFixture) }).not.toThrow();
});

test('Allow girlscout commits', () => {
    commitFixture.commit.message = '[GIRLSCOUT] Test';

    expect(() => { sniff(commitFixture) }).not.toThrow();
});