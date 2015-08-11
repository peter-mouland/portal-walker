require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={"version":"0.0.0"}

},{}],2:[function(require,module,exports){
var app = require('../../app.json');
module.exports = app.version;

},{"../../app.json":1}],"the-maze-cube":[function(require,module,exports){
// By default JS dependency is handled using CommonJS and browserify
// please see 'docs/API.md#scripts' for more info
//
// You may need other components. i.e. Run and uncomment the following :
// $ bower install dependency-name --save
// var dependency = require('../../bower_components/dependency-name/src/scripts/index');


//example function
function Main(){
    this.version = require('./utils/version.js');//keep this : each component exposes its version
}

Main.prototype.sum = function(args){
    var total = 0;
    args.forEach(function(int){
        total += int;
    });
    return total;
};

Main.prototype.write = function(args){
  document.getElementById('demo-functional').innerHTML = this.sum(args);
};


//example export
module.exports = Main;
},{"./utils/version.js":2}]},{},["the-maze-cube"]);
