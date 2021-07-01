#!/usr/bin/env node
require = require('esm')(module /*, options*/);

// 属性会返回一个数组，其中包含当 Node.js 进程被启动时传入的命令行参数
require('../src/cli').cli(process.argv);
