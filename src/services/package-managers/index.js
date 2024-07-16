const { execSync } = require('child_process');
const apt = require('./apt');
const aptget = require('./apt-get');
const npm = require('./npm');
const pip = require('./pip');
const gem = require('./gem');
const snap = require('./snap');
const flatpak = require('./flatpak');
const dnf = require('./dnf');
const pacman = require('./pacman');
const brew = require('./brew');

function isCommandAvailable(command) {
    try {
        execSync(`command -v ${command}`, { stdio: 'ignore' });
        return true;
    } catch (error) {
        return false;
    }
}

const availablePackageManagers = { //if you want a package manager to not update, remove the right line here
    apt: isCommandAvailable('apt') ? apt : null,
    aptget: isCommandAvailable('apt-get') ? aptget : null,
    npm: isCommandAvailable('npm') ? npm : null,
    pip: isCommandAvailable('pip') ? pip : null,
    gem: isCommandAvailable('gem') ? gem : null,
    snap: isCommandAvailable('snap') ? snap : null,
    flatpak: isCommandAvailable('flatpak') ? flatpak : null,
    dnf: isCommandAvailable('dnf') ? dnf : null,
    pacman: isCommandAvailable('pacman') ? pacman : null,
    brew: isCommandAvailable('brew') ? brew : null,
};

module.exports = availablePackageManagers;
