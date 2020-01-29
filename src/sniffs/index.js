module.exports = {
    pull: {
        'big-pr': require('./pull/big-pr'),
        'empty-body': require('./pull/empty-body'),
    },
    commit: {
        'empty-commit': require('./commit/empty-commit'),
        'empty-message': require('./commit/empty-message'),
        'jira-issue': require('./commit/jira-issue'),
        'no-merge-commits': require('./commit/no-merge-commits'),
    }
};
