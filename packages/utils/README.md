### 安装
npm i @firesoon/wx


### 工具库
phoneEncrypt: 手机号脱敏

### CJS 引入

import { phoneEncrypt } from '@firesoon/wx';
console.log(phoneEncrypt(13400001234))

### ESM 引入
const { phoneEncrypt } = require('@firesoon/wx');
console.log(phoneEncrypt(13400001234))
