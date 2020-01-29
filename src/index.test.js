const core = require('@actions/core');
const github = require('@actions/github');

jest.mock('@actions/core');
jest.mock('@actions/github');

const octokit = {};

beforeEach(() => {
    octokit.pulls = {
        listCommits: jest.fn()
    };
    octokit.repos = {
        getCommit: jest.fn()
    };
    octokit.issues = {
        createComment: jest.fn()
    };
    github.context = {
        eventName: 'pull_request',
        payload: {
            repository: {
                owner: {
                    login: 'userName'
                },
                name: 'repoName'
            },
            pull_request: {
                number: 1
            }
        }
    };
});

test('Run should complete successfully', () => {
    core.getInput.mockReturnValue('fakeToken');
    github.GitHub.mockReturnValue(octokit);

    require('./index');

    expect(core.setOutput).toBeCalled();
});