const error = require('../error');

module.exports = function (pullRequest) {
    if (pullRequest.body === '') {
        throw error('P-EMPTY', 'Perhaps it would make it easier for reviewers if you added a description?');
    }
};