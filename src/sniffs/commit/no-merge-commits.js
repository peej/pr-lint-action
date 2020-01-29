const error = require('../error');

module.exports = function (commit) {
    if (commit.parents.length > 1) {
        throw error('C-MERGE', 'You have a merge commit in your PR, you should rebase your branch to squash away the merge.');
    }
};