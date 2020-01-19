module.exports = function(api) {
  api.cache(true);
  const presets = [
    // 类似.babelrc.js中的presets
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: 3
      }
    ],
    "@babel/preset-react"
  ];
  const plugins = [
    // 类似.babelrc.js中的plugins
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css" // `style: true` 会加载 less 文件
      }
    ],
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ], // 配置对装饰器的支持
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: true
      }
    ] // 支持类属性的插件
  ];
  return {
    presets,
    plugins
  };
};
