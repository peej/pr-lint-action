const error = require('../error');

module.exports = function (commit) {
    if (!commit.commit.message.match(/^\[([A-Z]+-[0-9]+|BOYSCOUT|GIRLSCOUT)] /)) {
        throw error('C-JIRA', 'A commit message does not start with a Jira issue number, you should reword that commit to include an issue number.');
    }
};