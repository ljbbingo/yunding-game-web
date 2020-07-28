(function () {
    var nconf;
    nconf = require("./" + (process.env.NODE_ENV || "development") + "/index.json");
    console.log("当前环境:",process.env.NODE_ENV)
    module.exports = nconf;
}).call(this);
