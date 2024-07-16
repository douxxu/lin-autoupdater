const { enableService, disableService, updatePackages, showInfoOnStart } = require('./services/updater.service');
const c = require('colors');

const args = process.argv.slice(2);

if (args.length === 0) {
    showInfoOnStart();
    console.log('[ ', c.red('ERR'), ' ]', c.grey('No command provided. Use enable, disable, or update.'));
    process.exit(1);
}

const command = args[0];

switch (command) {
    case 'enable':
        showInfoOnStart();
        enableService();
        break;
    case 'disable':
        showInfoOnStart();
        disableService();
        break;
    case 'update':
        showInfoOnStart();
        updatePackages();
        break;
    default:
        console.log('[ ', c.red('ERR'), ' ]', c.grey('Unknown command. Use enable, disable, or update.'));
        break;
}
