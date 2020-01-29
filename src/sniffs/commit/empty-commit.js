const error = require('../error');

module.exports = function (commit) {
    if (commit.files.length === 0) {
        throw error(
            'C-EMPTY',
            'You have a commit that contains no changes, consider rebasing to discard this useless commit.'
        );
    }
};