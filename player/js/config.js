var storage = require('electron-json-storage');
var config = require('./config.json');

function Config() {
    if (!(this instanceof Config)) return new Config();
}

Config.prototype.get = function(key,cb) {
    storage.get(key,function(err,data) {
        if (err || (!data)) {
            if (config.hasOwnProperty(key)) return cb(null,config[key]);
            return cb(new Error(),undefined);
        }
        return cb(null,data);
    });
};

Config.prototype.set = function(key,value,cb) {
    storage.set(key,value,cb);
};

Config.prototype.clear = function(cb) {
    storage.clear(cb);
};

Config.prototype.remove = function (key,cb) {
    storage.remove(key,cb);
};

module.exports = Config;
