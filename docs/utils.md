---
title: 说明
order: 1
group:
  path: /utils
  title: 工具库
  order: 3
---

# 前端工具库

## 安装

```
yarn add @firesoon/common
```

## 提供方法

- `request`：接口请求方法
- `downloadFile`：文件下载方法
- `downloadFileBlob`：文件下载方法（基于 Blob）
- `theme`：默认主题色 less 变量
- `isDeepEqual`：深度比较对象是否相等;
- `isNil`：是否为 null 或 undefined
- `numberFormat`：千分位格式化的数字
- `uuidFast`：生成 uuid
- `trim`：去除字符串头尾空格或指定字符
- `trimStart`：去除字符串头部空格或指定字符
- `trimEnd`：去除字符串尾部空格或指定字符
- `phoneEncrypt`：手机号码脱敏
- `randomNum`：生成指定范围[min, max]的随机数
- `getUrlParam`：获取 url 参数
- `treeToArray`：平铺树形结构
- `isEmptyObject`：判断`object`是否为空
- `isEmail`：判断是否为邮箱地址
- `isIdCard`：判断是否为身份证号
- `isPhoneNum`：判断是否为手机号
- `isUrl`：判断是否为 URL 地址
- `exportDom`：dom 生成图片并导出，目前只支持导出 img 和 pdf
- `calculate`：加减乘除计算方法，为了解决 js 计算精度问题

## 更新记录

### V 1.0.0
