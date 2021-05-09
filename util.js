var glob = require("glob")
global["include_dir"] = function (dirName) {
  var files = glob.sync(`${dirName}/**/*.js`);
  for (var i = 0; i < files.length; i++) {
    var file = files[i].split(".").slice(0, -1).join(".");
    console.log(file);
    require("./" + file);
  }
}