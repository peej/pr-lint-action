const error = require('../error');

const AVG_FILES_PER_COMMIT = 10;
const AVG_CHANGES_PER_COMMIT = 100;

module.exports = function (pullRequest) {
    if (pullRequest.changed_files / pullRequest.commits > AVG_FILES_PER_COMMIT) {
        throw error(
            'P-BIG1',
            'You have changed a lot of files, maybe you can split your pull request up into more commits that make it easier to review?'
        );
    }

    if (pullRequest.additions + pullRequest.deletions / pullRequest.commits > AVG_CHANGES_PER_COMMIT) {
        throw error(
            'P-BIG2',
            'You have changed a lot of lines, maybe you can split your pull request up into more commits that make it easier to review?'
        );
    }
};