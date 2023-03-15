"use strict";

var _utils = require("@wxshylion/utils");
// 写了一个utils工具库,并在pkg1模块中进行测试

// esm - 注意，import方式需要babel插件编译

// cjs
// const { phoneEncrypt } = require('@wxshylion/utils');

console.log((0, _utils.phoneEncrypt)('13409985180'));