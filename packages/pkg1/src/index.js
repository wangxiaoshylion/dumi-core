// 写了一个utils工具库,并在pkg1模块中进行测试

// esm - 注意，import方式需要babel插件编译
import { phoneEncrypt } from '@wxshylion/utils';

// cjs
// const { phoneEncrypt } = require('@wxshylion/utils');

console.log(phoneEncrypt('13409985180'));
