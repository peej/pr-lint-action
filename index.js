import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set myToken with the GitHub Secret Token
    // myToken: ${{ secrets.GITHUB_TOKEN }}
    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    const myToken = core.getInput('myToken');

    const octokit = new github.GitHub(myToken);

    if (github.context.eventName === 'push') {
        const pushPayload = github.context.payload;
        core.info(`The head commit is: ${pushPayload.head}`);
    }
}

run();