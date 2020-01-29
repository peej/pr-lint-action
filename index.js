const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    const githubToken = core.getInput('token');

    const octokit = new github.GitHub(githubToken);

    if (github.context.eventName === 'pull_request') {
        const payload = github.context.payload;
        const owner = payload.repository.owner.login;
        const repo = payload.repository.name;

        core.debug(JSON.stringify(payload));

        const pullRequest = payload.pull_request;

        await octokit.issues.createComment({
            owner,
            repo,
            issue_number: pullRequest.number,
            body: 'Have you thought about this that and the other?'
        });

        octokit.pulls.listCommits({
            owner,
            repo,
            pull_number: pullRequest.number
        }).then(commits => {
            core.debug(JSON.stringify(commits));
        }).then(() => {
            core.setOutput('output', 'Done');
        });
    }
}

run();