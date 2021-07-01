import fs from 'fs';
import parseArgumentsIntoOptions from './utils/parseArgumentsIntoOptions';
import promptForMissingOptions from './utils/promptForMissingOptions';
import get from 'lodash/get';
import pjson from '../package.json';
import chalk from 'chalk';
import { createProject } from './main';
const figlet = require('figlet');

export async function cli(args) {
  figlet.text('Hello ZXB!!', { font: 'Big Money-nw' }, function(err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data);
  });

  setTimeout(async () => {
    // 获取参数
    let options = parseArgumentsIntoOptions(args);

    // 打印版本信息
    if (get(options, 'version')) {
      return console.log(chalk.green(`当前cli版本为 : ${pjson.version}`));
    }

    // 补全参数
    options = await promptForMissingOptions(options);
    if (!options.projectName) {
      return console.log(chalk.red(`未传入projectName，创建项目失败！`));
    }
    if (fs.existsSync(options.projectName)) {
      return console.log(chalk.red(`${options.projectName}文件夹已存在，创建项目失败！`));
    }
    await createProject(options);

    figlet.text('success', { font: 'Big Money-nw' }, function(err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      console.log(data);
    });
  }, 500);
}
