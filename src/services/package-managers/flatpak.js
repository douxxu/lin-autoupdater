const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const c = require('colors');

const ignoreListPath = path.resolve(__dirname, '..', '..', 'config', 'ignore-list.json');

function update(ignoreList) {
    exec('flatpak list --app', (err, stdout) => {
        if (err) {
            console.error('[ ', c.red('ERR'), ' ]', c.grey(`Error fetching flatpak packages: ${err}`));
            return;
        }

        const installedFlatpaks = stdout.split('\n')
            .slice(1)
            .map(line => line.split('\t')[0])
            .filter(pkg => !ignoreList.includes(pkg));

        if (installedFlatpaks.length === 0) {
            console.log('[ ', c.yellow('INFO'), ' ]', c.grey('No flatpaks to update.'));
            return;
        }

        const updateCommand = `flatpak update -y ${installedFlatpaks.join(' ')}`;
        exec(updateCommand, (updateErr, updateStdout, updateStderr) => {
            if (updateErr) {
                console.error('[ ', c.red('ERR'), ' ]', c.grey(`Error updating flatpaks: ${updateErr}`));
                return;
            }
            console.log('[ ', c.green('OK'), ' ]', c.grey('Flatpaks updated successfully:'));
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
