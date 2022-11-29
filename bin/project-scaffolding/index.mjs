#!/usr/bin/env node
import { exec } from 'child_process';
import yargs from 'yargs';
import chalk from 'chalk';
import { createFile, createFolder } from './Helper.mjs';
import { prettier_text } from './text/prettierrc.mjs';
import { html_text } from './text/indexhtml.mjs';
const parser = yargs(process.argv.slice(2)).options({
    n: { type: 'string', demandOption: true, alias: 'name' },
    t: {
        type: 'string',
        demandOption: true,
        alias: 'type',
        choices: ['typescript', 'javascript', 'bookmarklet'],
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
        switch (argv.t) {
            case 'typescript':
                createFolder('./', `${argv.n}`).then(async (folderPath) => {
                    chalk.default.green(`Created folder ${folderPath}`);
                    exec('npm init -y && npm i -D prettier && npm i -D gulp && npm i -D gulp-replace && npm i -D gulp-uglify && npm i -D gulp-concat && npm i -D gulp-ignore', {
                        cwd: `${folderPath}`,
                    }, () => { });
                    createFolder(folderPath, 'src').then(async (srcPath) => {
                        createFolder(srcPath, 'ts').then(async (tsPath) => {
                            createFile(tsPath, 'index', scriptType, 'console.log("Hello World");');
                        });
                        createFolder(srcPath, styleType).then(async (cssPath) => {
                            createFile(cssPath, 'main', styleType, '');
                        });
                    });
                    createFile(folderPath, 'index', 'html', html_text);
                    createFile(folderPath, '.prettierrc', 'json', prettier_text);
                });
                break;
            case 'javascript':
                createFolder('./', `${argv.n}`).then(async (folderPath) => {
                    chalk.default.green(`Created folder ${folderPath}`);
                    createFolder(folderPath, 'assets').then(async (assetsPath) => {
                        createFolder(assetsPath, scriptType).then(async (jsPath) => {
                            createFile(jsPath, 'index', scriptType, 'console.log("Hello World");');
                        });
                        createFolder(assetsPath, styleType).then(async (cssPath) => {
                            createFile(cssPath, 'main', styleType, '');
                        });
                    });
                    createFile(folderPath, 'index', 'html', html_text);
                    createFile(folderPath, '.prettierrc', 'json', prettier_text);
                });
                break;
            case 'bookmarklet':
                createFile('./', `${argv.n}`, 'js', 'console.log("Hello World");');
                createFile('./', `${argv.n}`, 'html', html_text);
                break;
            default:
                break;
        }
    }
    catch (err) {
        console.log(err);
    }
};
initProject();
