Package.describe({
  name: "mgorczynski:jade-export",
  summary: "Jade templating for angular 1 and 2",
  version: "1.0.0",
  git: 'https://github.com/gooor/jade-export'
});

Package.onUse(
  function(api) {
    api.use('isobuild:compiler-plugin@1.0.0');
  }
);

Package.registerBuildPlugin({
  name: "compileJadeAngular",
  sources: [
    'plugin.js'
  ],
  use: [
    'isobuild:compiler-plugin@1.0.0'
  ],
  npmDependencies : {
    'html-minifier': '0.7.2',
    'jade': '1.11.0'
  }
});
