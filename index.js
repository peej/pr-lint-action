import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set githubToken with the GitHub Secret Token
    // githubToken: ${{ secrets.GITHUB_TOKEN }}
    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    const githubToken = core.getInput('repo-token');

    const octokit = new github.GitHub(githubToken);

    if (github.context.eventName === 'push') {
        const pushPayload = github.context.payload;
        core.info(`The head commit is: ${pushPayload.head}`);
        core.setOutput('head', pushPayload.head);
    }
}

run();