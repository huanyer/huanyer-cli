import inquirer from 'inquirer';
import get from 'lodash/get';
export default async function promptForMissingOptions(options) {
  // if (options.skipPrompts) {
  //   return {
  //     ...options,
  //     template: get(options, 'template', 'javascript'),
  //   };
  // }

  const questions = [];
  questions.push(
    {
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称：',
    },
    {
      type: 'input',
      name: 'appCode',
      message: '请输入appCode：',
    },
    {
      type: 'list',
      name: 'projectType',
      message: '请选择项目类型（pc|mobile）：',
      choices: ['pc'],
      default: 'pc',
    }
  );

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    ...answers,
  };
}
