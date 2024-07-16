const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const c = require('colors');

const ignoreListPath = path.resolve(__dirname, '..', '..', 'config', 'ignore-list.json');

function update(ignoreList) {
    exec('gem outdated', (err, stdout) => {
        if (err) {
            console.error('[ ', c.red('ERR'), ' ]', c.grey(`Error fetching outdated gems: ${err}`));
            return;
        }

        const outdatedGems = stdout.split('\n')
            .filter(line => line.includes('('))
            .map(line => line.split(' ')[0])
            .filter(pkg => !ignoreList.includes(pkg));

        if (outdatedGems.length === 0) {
            console.log('[ ', c.yellow('INFO'), ' ]', c.grey('No gems to update.'));
            return;
        }

        const updateCommand = `gem update ${outdatedGems.join(' ')}`;
        exec(updateCommand, (updateErr, updateStdout, updateStderr) => {
            if (updateErr) {
                console.error('[ ', c.red('ERR'), ' ]', c.grey(`Error updating gems: ${updateErr}`));
                return;
            }
            console.log('[ ', c.green('OK'), ' ]', c.grey('Gems updated successfully:'));
            console.log(updateStdout);
            console.error(updateStderr);
        });
    });
}

function getIgnoreList() {
    try {
        return fs.readJsonSync(ignoreListPath);
    } catch (err) {
        console.error('[ ', c.red('ERR'), ' ]', c.grey(`Error reading ignore list: ${err}`));
        return [];
    }
}

module.exports = {
    update: function () {
        const ignoreList = getIgnoreList();
        update(ignoreList);
    }
};
