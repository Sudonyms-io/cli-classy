const del = require('del');
const spawn = require("cross-spawn");
const { series } = require('gulp');
const tscConfig = require('./tsconfig.json');
const { magentaBright, blueBright, greenBright } = require('ansi-colors');
const path = require('path');

// Console formatting helpers
const f_args = (args) => (args.join) ? magentaBright(`[${args.join("] [")}]`) : magentaBright(args);   // format command args in console.
const f_cmd = (value) => greenBright(path.basename(value));

const COMMAND_CONFIG = {
    CLEAN: {
        paths: [
            tscConfig.compilerOptions.outDir
        ]
    },
    TEST: {
        command: './node_modules/.bin/mocha',
        args: ['-r', 'ts-node/register', '.src/**/*.spec.ts']
    },
    COMPILE: {
        command: './node_modules/.bin/tsc',
        paths: tscConfig.include
    },
    SPAWN: {
        stdio: 'inherit'
    }
}

const __clean = (done) => {
    const { paths } = COMMAND_CONFIG.CLEAN;
    return del(paths);
}
__clean.description = `Cleans the project output directories at ${f_args(COMMAND_CONFIG.CLEAN.paths)}.`
exports.clean = __clean;

const __compile = (done) => {
    const { SPAWN: OPTIONS, COMPILE: { command } } = COMMAND_CONFIG;
    const result = spawn(command, OPTIONS);
    done();
}
__compile.description = `Compiles the project source files at ${f_args(COMMAND_CONFIG.COMPILE.paths)}.`;
exports.compile = __compile;

const __test = (done) => {
    const { SPAWN: OPTIONS, TEST: { command, args } } = COMMAND_CONFIG;
    const result = spawn(command, args, OPTIONS);
    done();
}
__test.description = `Runs test program ${f_cmd(COMMAND_CONFIG.TEST.command)} ${f_args(COMMAND_CONFIG.TEST.args)}.`
exports.test = __test;

const __build = series([__clean, __compile]);
__build.description = `Cleans and compiles the project.`
exports.build = __build;