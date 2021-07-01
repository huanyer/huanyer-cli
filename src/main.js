import chalk from 'chalk';
import fs from 'fs';
// 用于递归复制文件
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';
import get from 'lodash/get';

// 递归拷贝文件
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    // 是否覆盖原有内容
    clobber: false,
  });
}
async function changeProjectInfo(options) {
  try {
    [
      '/src/config/index.ts',
      '/.env.development',
      '/.env.production',
      '/package.json',
    ].forEach(filePath => {
      let fileContent = fs.readFileSync(
        options.targetDirectory + filePath,
        'utf8'
      );
      fileContent = fileContent
        .toString()
        .replace('projectName-template', options.projectName)
        .replace('appCode-template', options.appCode);
      fs.writeFileSync(options.targetDirectory + filePath, fileContent, 'utf8');
    });

    return true;
  } catch (error) {
    console.log(chalk.red(error));
    return false;
  }
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: get(
      options,
      'targetDirectory',
      path.resolve(process.cwd(), get(options, 'projectName'))
    ),
  };

  const currentFileUrl = import.meta.url;

  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname.replace(/^\//, ''),
    '../../templates',
    options.projectType === 'pc' ? 'pc-template' : 'mobile-templates'
  );

  options.templateDirectory = templateDir;

  const tasks = new Listr([
    {
      title: '拉取项目',
      task: () => copyTemplateFiles(options),
    },
    {
      title: '相关信息注入',
      task: () => changeProjectInfo(options),
    },
    {
      title: '安装依赖',
      enabled: ctx => options.runInstall,
      task: () =>
        projectInstall({
          cwd: options.targetDirectory,
        }),
      skip: () =>
        !options.runInstall ? '未安装依赖，输入 --install 可自动安装依赖！' : undefined,
    },
  ]);

  await tasks.run();
  console.log(chalk.green('项目已设置成功，加油干吧，打工人！'));
  return true;
}
