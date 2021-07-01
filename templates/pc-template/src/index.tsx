import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from '@/router';
import { Provider } from 'react-redux';
import store from '@/store';
// 全局样式
import '@/assets/styles/index.less';
// antd 除日期外其他组件中文格式化
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
// antd日期组件格式化为中文
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
);
