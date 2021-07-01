/**
 * 通用方法封装
 */
import dayjs from 'dayjs';
import store from '@/store';

interface UrlParamsProps {
  key?: string;
  href?: string;
}
interface ErrorLogProps {
  errorType: string;
  error?: string;
  errorInfo?: string;
}

/**
 * 获取url中？拼接数据
 * key 为希望获取值的键，默认返回整个对象
 * href 为希望处理的url地址，默认使用window.location.href
 * @param params UrlParamsProps
 */
export function urlParams(params: UrlParamsProps) {
  const queryStr = params.href
    ? params.href.split('?')
    : window.location.href.split('?');
  if (queryStr[1]) {
    const paramsObj = queryStr[1].split('&');
    const obj: any = {};
    paramsObj.forEach(item => {
      const _itme = item.split('=');
      obj[_itme[0]] = decodeURIComponent(_itme[1]);
    });
    return params.key ? obj[params.key] : obj;
  }
}

/**
 * 字符串加密
 * 简单的加密方法
 * @param code - 待处理的字符串
 */
export function compile(code: string): string {
  let c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return c;
}

/**
 * 字符串解谜
 * 对应上面的字符串加密方法
 * @param code - 待处理的字符串
 */
export function uncompile(code: string): string {
  let c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}
