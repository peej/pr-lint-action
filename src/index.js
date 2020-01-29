const core = require('@actions/core');
const github = require('@actions/github');
const sniffs = require('./sniffs');

async function removeExistingComments(octokit, owner, repo, pullRequestNumber) {
    return octokit.issues.listComments({
        owner,
        repo,
        issue_number: pullRequestNumber
    }).then(response => {
        core.info(JSON.stringify(response));
        const comments = response.data;
        const promises = [];

        for (const comment of comments) {
            core.info(JSON.stringify(comment));

            if (comment.user.type === 'Bot') {
                promises.push(octokit.pulls.deleteComment({
                    owner,
                    repo,
                    comment_id: comment.id
                }));
            }
        }

        return Promise.all(promises);
    });
}

module.exports = function () {
    const githubToken = core.getInput('token');

    const octokit = new github.GitHub(githubToken);

    if (github.context.eventName !== 'pull_request') {
        return Promise.resolve();
    }

    const payload = github.context.payload;
    const owner = payload.repository.owner.login;
    const repo = payload.repository.name;
    const pullRequest = payload.pull_request;

    const promises = [];

    core.info(`Checking pull request #${pullRequest.number}`);

    //await removeExistingComments(octokit, owner, repo, pullRequest.number);

    for (const name in sniffs.pull) {
        const sniff = sniffs.pull[name];

        promises.push(new Promise(() => {
            core.info(`Running sniff: ${name}`);
            try {
                return sniff(pullRequest);
            } catch (error) {
                core.info(`${error.code}: ${error.message}`);

                return error;
            }
        }));
    }

    promises.push(octokit.pulls.listCommits({
        owner,
        repo,
        pull_number: pullRequest.number
    }).then(response => {
        const promises = [];
        const commits = response.data;

        for (const commitData of commits) {
            core.info(`Checking commit ${commitData.sha}`);

            promises.push(octokit.repos.getCommit({
                owner,
                repo,
                ref: commitData.sha
            }).then(response => {
                const promises = [];
                const commit = response.data;

                for (const name in sniffs.commit) {
                    const sniff = sniffs.commit[name];

                    promises.push(new Promise(() => {
                        core.info(`Running sniff: ${name}`);
                        try {
                            return sniff(commit);
                        } catch (error) {
                            core.info(`${error.code}: ${error.message}`);

                            return error;
                        }
                    }));
                }

                return Promise.all(promises);
            }));
        }

        return Promise.all(promises);
    }));

    return Promise.all(promises).then((results) => {
        core.info(JSON.stringify(results));

        const messages = results.flat().filter().map(error => {
            return error.message;
        });

        return octokit.issues.createComment({
            owner,
            repo,
            issue_number: pullRequest.number,
            body: messages.join("\n")
        });
    }).then(() => {
        core.setOutput('output', 'Done');
    });
};
