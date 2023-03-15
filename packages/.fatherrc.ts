export default {
  target: 'browser',
  cjs: { type: 'babel', lazy: true },
  disableTypeCheck: true,
  // extraBabelPlugins: [
  //   [
  //     'babel-plugin-import',
  //     { libraryName: '@firesoon/antd', libraryDirectory: 'es', style: true },
  //     'antd',
  //   ],
  // ],
};
