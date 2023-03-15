import { defineConfig } from 'father';
export default defineConfig({
  cjs: {
    output: 'lib',
    platform: 'browser',
    transformer: 'babel',
  },
  esm: {
    output: 'es',
    platform: 'browser',
    transformer: 'babel',
  },
  // extraBabelPlugins: [
  //   [
  //     'babel-plugin-import',
  //     {
  //       libraryName: '@firesoon/antd',
  //       libraryDirectory: 'es',
  //       style: true,
  //     },
  //   ],
  // ],
  targets: {
    ie: 10,
  },
});
