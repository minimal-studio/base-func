import doczPluginNetlify from "docz-plugin-netlify";
import { css } from 'docz-plugin-css';
import themeConfig from './docz/theme-config/config';

export default {
  // dest: 'docz-dist',
  title: 'Basic Helper',
  description: '语义化辅助函数库',
  indexHtml: 'docz/index.html',
  wrapper: 'docz/wrapper',
  codeSandbox: false,
  hashRouter: true,
  typescript: true,
  files: '**/*.mdx',
  htmlContext: {
    head: {
      links: [{
        rel: 'stylesheet',
        // href: 'https://codemirror.net/theme/dracula.css'
        href: 'https://codemirror.net/theme/mdn-like.css'
      }],
    },
  },
  themeConfig,
  menu: [
    'Getting Started / 开始',
    'Array / 数组',
    'Number / 数字处理',
    'Call / 调用',
    'Datetime / 时间处理',
    'Debounce / 防抖',
    'EventEmitter / 订阅发布',
    'Filter / 过滤器',
    'Generation / 数据产出',
    'Money / 金钱处理',
    'Other / 其他',
  ],
  // modifyBundlerConfig: (config) => {
  //   config.resolve.extensions.push('.scss');
  //   config.module.rules.push({
  //     test: /\.scss$/,
  //     use: ["style-loader", "css-loader", "sass-loader"]
  //   });
  //   return config;
  // },
  plugins: [
    doczPluginNetlify(),
    css({
      preprocessor: 'sass',
    })
  ]
};
