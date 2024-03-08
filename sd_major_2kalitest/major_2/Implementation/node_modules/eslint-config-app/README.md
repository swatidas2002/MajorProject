<!-- # eslint-config-app -->

[![npm version][version-img]][npm-url]
[![npm downloads][downloads-img]][npm-url]
[![GitHub open issues][issues-open-img]][issues-url]
[![GitHub close issues][issues-close-img]][issues-url]

## 自定义配置eslint，支持`es6`、`react`、`flow`、`babel`

## 安装

In your js project directory:

```
npm install --save-dev eslint-config-app
```

## 建议
git提供了hook功能,在提交代码(commit)前触发执行脚本

[husky](https://github.com/typicode/husky)方便的为项目接入git hook

使用:

安装husky `npm i --save-dev husky`

在package.json中定义

```
"scripts": {
    "precommit": "eslint ."
}
```

## 常见问题

### 1.webpack配置了resolve.alias(别名路径解析),会导致eslint如下错误

`unable to resolve to path to module 'xxx'`

### 解决办法:

安装eslint-import-resolver-webpack package
在当前项目.eslintrc.js文件中加上


```
settings: {
    'import/resolver': {
        webpack: {
            //为webpack的文件路径
            config: 'build/webpack.config.dev.babel.js',
        },
    },
},

```

### 2. eslint issue: absolute imports should come before relative 

### 解决办法：

```
'import/first': ['error', 'DISABLE-absolute-first'],
```

[npm-url]: https://www.npmjs.com/package/eslint-config-app
[version-img]: https://img.shields.io/npm/v/eslint-config-app.svg
[downloads-img]: https://img.shields.io/npm/dt/eslint-config-app.svg
[issues-open-img]: https://img.shields.io/github/issues-raw/xuqinggang/eslint-config-app.svg?maxAge=2592000
[issues-close-img]: https://img.shields.io/github/issues-closed-raw/xuqinggang/eslint-config-app.svg?maxAge=2592000
[issues-url]: https://github.com/xuqinggang/eslint-config-app/issues
