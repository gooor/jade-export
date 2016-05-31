var minify = Npm.require('html-minifier').minify;
var jade = Npm.require('jade');
var jadeOpts = {pretty:true, compileDebug:false};

function JadeCompiler() {}
JadeCompiler.prototype.processFilesForTarget = function (files) {
  files.forEach(function (file) {
    var newPath = file.getPathInPackage();
    newPath = newPath.replace(/\\/g, "/");
    newPath = newPath.replace(".ng.jade", ".html").replace(".jade", ".html");
    var inputFilePath = file.getPathInPackage();

    var output = jade.compile(file.getContentsAsString(), jadeOpts)();
    var minifiedHtml = minify(output.replace(/'/g, "\\'"), {
      collapseWhitespace : true,
      conservativeCollapse : true,
      removeComments : true,
      minifyJS : true,
      minifyCSS: true,
      processScripts : ['text/ng-template']
    });
    var results = "exports['default'] = '" + minifiedHtml + "'; module.exports = exports['default']";

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
