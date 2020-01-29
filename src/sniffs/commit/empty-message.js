const error = require('../error');

module.exports = function (commit) {
    if (commit.commit.message === '') {
        throw error('C-EMSG', 'You have a commit without a commit message, you should add a message to help explain your changes.');
    }
};