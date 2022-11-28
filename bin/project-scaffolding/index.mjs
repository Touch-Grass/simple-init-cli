#!/usr/bin/env node
import { exec } from 'child_process';
exec('npm init -y', () => {
    exec('npm install gulp gulp-replace gulp-uglify gulp-concat gulp-ignore', () => { });
});
import yargs from 'yargs';
import chalk from 'chalk';
import { createFile, createFolder } from './Helper.mjs';
import { prettier_text } from './text/prettierrc.mjs';
import { html_text } from './text/indexhtml.mjs';
import { gulp_text } from './text/gulpfile.mjs';
import { tsconfig } from './text/tsconfig.mjs';
const parser = yargs(process.argv.slice(2)).options({
    n: { type: 'string', demandOption: true, alias: 'name' },
    t: {
        type: 'string',
        demandOption: true,
        alias: 'type',
        choices: ['typescript', 'javascript'],
    },
    c: {
        type: 'string',
        alias: 'css',
        choices: ['css', 'scss', 'sass'],
        default: 'css',
    },
});
const type = new Map([
    ['typescript', 'ts'],
    ['javascript', 'js'],
    ['css', 'css'],
    ['scss', 'scss'],
    ['sass', 'sass'],
]);
const initProject = async () => {
    try {
        const argv = await parser.argv;
        const scriptType = type.get(argv.t);
        const styleType = type.get(argv.c);
        createFolder('./', `${argv.n}`).then(async (folderPath) => {
            chalk.default.green(`Created folder ${folderPath}`);
            createFolder(folderPath, 'src').then(async (srcPath) => {
                createFolder(srcPath, 'ts').then(async (tsPath) => {
                    createFile(tsPath, 'index', scriptType, 'console.log("Hello World");');
                });
                createFolder(srcPath, styleType).then(async (cssPath) => {
                    createFile(cssPath, 'main', styleType, '');
                });
            });
            createFolder(folderPath, 'dist').then(async () => { });
            createFile(folderPath, 'index', 'html', html_text);
            createFile(folderPath, '.prettierrc', 'json', prettier_text);
            createFile(folderPath, 'gulpfile', 'js', gulp_text);
            createFile(folderPath, 'tsconfig', 'json', tsconfig);
        });
    }
    catch (err) {
        console.log(err);
    }
};
initProject();
