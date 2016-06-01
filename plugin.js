var minify = Npm.require('html-minifier').minify;
var jade = Npm.require('jade');
var jadeOpts = {pretty: false, compileDebug: false};

function JadeCompiler() {}
JadeCompiler.prototype.processFilesForTarget = function (files) {
  files.forEach(function (file) {
    var newPath = file.getPathInPackage();
    newPath = newPath.replace(/\\/g, "/");
    newPath = newPath.replace(".ng.jade", ".html").replace(".jade", ".html");
    var inputFilePath = file.getPathInPackage();

    var output = jade.compile(file.getContentsAsString(), jadeOpts)();
    var minifiedHtml = output.replace(/'/g, "\\'");
    var results = "exports['default'] = '" + minifiedHtml + "'; exports.template = exports['default']; module.exports = exports";

    file.addJavaScript({
      sourcePath: inputFilePath,
      data: results,
      path: newPath,
     });
  });
};

Plugin.registerCompiler({
  extensions: ["jade", "tpl.jade"],
  filenames: []
}, function () {
  var compiler  = new JadeCompiler();
  return compiler;
});
