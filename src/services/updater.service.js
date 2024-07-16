const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const packageManagers = require('./package-managers');
const c = require('colors');

const serviceFilePath = '/etc/systemd/system/lin-autoupdater.service'; 

function enableService() {

    const serviceContent = `
    [Unit]
    Description=Linux Auto Updater - https://github.com/douxxu/Lin-autoupdater
    
    [Service]
    ExecStart=node ${path.join(__dirname, '..', 'index.js')} update
    Restart=always
    
    [Install]
    WantedBy=multi-user.target
    `;

    fs.writeFileSync(serviceFilePath, serviceContent);

    exec('systemctl daemon-reload', (err) => {
        if (err) {
            console.error('[ ', c.red('ERR'), ' ]', c.grey(`Error reloading systemd: ${err}`));
        } else {
            console.log('[ ', c.green('OK'), ' ]', c.grey('Systemd daemon reloaded.'));
            exec('systemctl enable lin-autoupdater', (err) => {
                if (err) {
                    console.error('[ ', c.red('ERR'), ' ]', c.grey(`Error enabling service: ${err}`));
                } else {
                    console.log('[ ', c.green('OK'), ' ]', c.grey('Auto-update service enabled.'));
                }
            });
        }
    });
}

function disableService() {

    exec(`systemctl disable lin-autoupdater && rm ${serviceFilePath}`, (err) => {
        if (err) {
            console.error('[ ', c.red('ERR'), ' ]', c.grey(`Error disabling service: ${err}`));
        } else {
            fs.removeSync(serviceFilePath);
            console.log('[ ', c.green('OK'), ' ]', c.grey('Auto-update service disabled.'));
        }
    });
}

function updatePackages() {
    for (const [manager, instance] of Object.entries(packageManagers)) {
        if (instance) {
            console.log('[ ', c.yellow('INFO'), ' ]', c.grey(`Updating packages for ${manager}...`));
            instance.update();
        }
    }
}

function showInfoOnStart() {


console.log('[ ', c.yellow('INFO'), ' ]', c.grey('|============================================|'));
console.log('[ ', c.yellow('INFO'), ' ]', c.grey('|                                            |'));
console.log('[ ', c.yellow('INFO'), ' ]', c.grey('|Lin-Autoupdater                             |'));
console.log('[ ', c.yellow('INFO'), ' ]', c.grey('|Github: github.com/douxxu/Lin-Autoupdater   |'));
console.log('[ ', c.yellow('INFO'), ' ]', c.grey('|Npmjs: npmjs.org/package/Lin-Autoupdater    |'));
console.log('[ ', c.yellow('INFO'), ' ]', c.grey('|Project is under a MIT license              |'));
console.log('[ ', c.yellow('INFO'), ' ]', c.grey('|                                            |'));
console.log('[ ', c.yellow('INFO'), ' ]', c.grey('|============================================|'));

}

module.exports = {
    enableService,
    disableService,
    updatePackages,
    showInfoOnStart
};
