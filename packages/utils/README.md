前端工具库

## @firesoon/common

### 安装

```text
npm install @firesoon/common --save-dev
```

### 提供方法
- `isDeepEqual`：深度比较对象是否相等;
- `isNil`：是否为null或undefined
- `numberFormat`：千分位格式化的数字
- `uuidFast`：生成uuid
- `trim`：去除字符串头尾空格或指定字符
- `trimStart`：去除字符串头部空格或指定字符
- `trimEnd`：去除字符串尾部空格或指定字符
- `phoneEncrypt`：手机号码脱敏
- `isEmptyObject`：判断`obj`是否为空
- `randomNum`：生成指定范围[min, max]的随机数
- `isEmail`：判断是否为邮箱地址
- `isIdCard`：判断是否为身份证号
- `isPhoneNum`：判断是否为手机号
- `isUrl`：判断是否为URL地址
- `getUrlParam`：获取url参数
- `treeToArray`：平铺树形结构
- `theme`：默认主题色less变量
- `downloadFile`：文件下载方法
- `request`：接口请求方法

### request、downloadFile方法使用（services文件）
```javascript
import { downloadFile } from '@firesoon/common';
import request from '@firesoon/common/lib/request';
import { prefix, appPlatform } from '@/utils/config';
// 修改默认配置
request.extendOptions({
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  }, 
  prefix
});

// 平台接口配置prefix
export function getUserInfo() {
  return request('user/toUserInfo', {
    prefix: appPlatform,
    method: 'POST',
  });
}

// post请求
export function postRuleTypeDict(params) {
  return request.post(`audit/exec/postRuleTypeDict`, {
    data: params,
  });
}

// get请求
export function getRuleTypeDict(params) {
  return request(`audit/exec/getRuleTypeDict`, {
    params,
  });
}

/**
 * 文件下载
 * @param param 
 * @returns 
 */
 export function exportRuleExecDetail(params) {
  return downloadFile('audit/exec/exportRuleExecDetail', prefix, params)
}
```

### theme方法使用（.umirc.ts文件）
```javascript
import theme from '@firesoon/common/lib/theme';

export default defineConfig({
  ...,
  theme
})
```