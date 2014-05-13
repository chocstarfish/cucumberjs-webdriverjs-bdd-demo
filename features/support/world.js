/**
 * Created by 张帅 on 2014/5/9.
 */
var expect = require('chai').expect;
var assert = require('chai').assert;
var webdriverjs = require("webdriverjs");
var client = webdriverjs.remote({
    desiredCapabilities: {
        // You may choose other browsers
        // http://code.google.com/p/selenium/wiki/DesiredCapabilities
        browserName: 'firefox'
    },
    // webdriverjs has a lot of output which is generally useless
    // However, if anything goes wrong, remove this to see more details
    logLevel: 'silent'
});

client.addCommand('hasText', function (selector, text, callback) {
    this.getText(selector, function (error, result) {
        expect(result).to.have.string(text);
        callback();
    });
});

client.addCommand('waitUntilVisible', function (element, callback) {
    var self = this;

    function checkElement() {
        self.isVisible(element, function (error, result) {
            if (result === true) {
                callback();
            } else {
                setTimeout(checkElement, 500);
            }
        });
    }

    checkElement();
});

client.init();


var World = function World(callback) {
    this.assert = assert;
    this.expect = expect;
    this.browser = client; // this.browser will be available in step definitions

    this.visit = function (url, callback) {
        this.browser.url(url, callback);
    };

    callback(); // tell Cucumber we're finished and to use 'this' as the world instance
};

module.exports = function () {
    this.registerHandler('AfterFeatures', function (e, done) {
        client.end(done);
    });
};

module.exports.World = World;