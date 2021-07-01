import arg from 'arg';
import get from 'lodash/get';
// 解析命令行参数 rawArgs即 process.argv
export default function(rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      // '--yes': Boolean,
      '--install': Boolean,
      '--version': Boolean,
      // '-y': '--yes',
      '-i': '--install',
      '-v': '--version',
    },
    {
      // process.argv除了前两个，其余的元素才是额外的命令行参数
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: get(args, '--yes', false), // 快速跳过配置
    version: get(args, '--version', false),
    // template: args._[0],
    runInstall: get(args, '--install', false), // 拷贝后自动安装依赖
  };
}
