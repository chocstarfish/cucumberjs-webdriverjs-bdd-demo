/**
 * Created by 张帅 on 2014/5/8.
 */
var webdriverjs = require('webdriverjs'),
    assert = require('assert');

var sharedSteps = module.exports = function () {

    var client = webdriverjs.remote({ desiredCapabilities: {browserName: 'chrome'}, logLevel: 'silent' });
    var tmpResult = null;
    client.init();


    this.When(/^我浏览网址"([^"]*)"$/, function (url, next) {
        // express the regexp above with the code you wish you had
        client
            .url(url)
            .call(next);
    });

    this.When(/^我在搜索框中输入"(.*)"并按百度一下按钮$/, function (keyword, next) {
        client.setValue('#kw1', keyword, function () {
            client.click('#su1', function () {
                next();
            })
        });
    });

    this.Then(/^我可以看到百度为我找到相关结果约(.*)个$/, function (result, next) {
        var selector = '//*[@id="page"]/span';
        client
            .waitFor(selector)
            .getText(selector, function (err, text) {
                if (err) {
                    return next(err);
                }

                assert(text == '百度为您找到相关结果约' + result + '个', '结果是' + result + '，而是' + text);

                client.end();
                next();
            })
    });


};