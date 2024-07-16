const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const c = require('colors');

const ignoreListPath = path.resolve(__dirname, '..', '..', 'config', 'ignore-list.json');

function update(ignoreList) {
    exec('pip list --outdated --format=json', (err, stdout) => {
        if (err) {
            console.error('[ ', c.red('ERR'), ' ]', c.grey(`Error fetching outdated packages: ${err}`));
            return;
        }

        const outdatedPackages = JSON.parse(stdout);
        const packagesToUpdate = outdatedPackages
            .map(pkg => pkg.name)
            .filter(pkg => !ignoreList.includes(pkg));

        if (packagesToUpdate.length === 0) {
            console.log('[ ', c.yellow('INFO'), ' ]', c.grey('No pip packages to update.'));
            return;
        }

        const updateCommand = `pip install --upgrade ${packagesToUpdate.join(' ')}`; //if you get this error: "× This environment is externally managed", put this in the command: --break-system-packages
        exec(updateCommand, (updateErr, updateStdout, updateStderr) => {
            if (updateErr) {
                console.error('[ ', c.red('ERR'), ' ]', c.grey(`Error updating packages: ${updateErr}`));
                return;
            }
            console.log('[ ', c.green('OK'), ' ]', c.grey('Pip packages updated successfully:'));
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
