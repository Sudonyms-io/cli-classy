const spawn = require("cross-spawn");

const COMMANDS = {
    MOCHA: {
        command: './node_modules/.bin/mocha',
        args: ['-r', 'ts-node/register', 'src/**/*.spec.ts']
    },
    TSC: {
        command: './node_modules/.bin/tsc'
    },
    OPTIONS: {
        stdio: 'inherit'
    }
}

const __test = (done) => {
    const { OPTIONS, MOCHA: { command, args } } = COMMANDS;
    const result = spawn(command, args, OPTIONS);
    done();
}

exports.test = __test;