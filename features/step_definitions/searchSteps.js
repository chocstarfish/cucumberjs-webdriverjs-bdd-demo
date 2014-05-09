/**
 * Created by 张帅 on 2014/5/8.
 */
var sharedSteps = module.exports = function () {
    this.World = require("../support/world.js").World;

    var tmpResult = null;


    this.When(/^我浏览网址"([^"]*)"$/, function (url, next) {
        // express the regexp above with the code you wish you had
        this.browser
            .url(url)
            .call(next);
    });

    this.When(/^我在搜索框中输入"(.*)"并按百度一下按钮$/, function (keyword, next) {
        var self = this;
        var expect = this.expect;
        this.browser.setValue('#kw1', keyword, function (err) {
            expect(err).to.be.null;
            self.browser.click('#su1', function (err) {
                expect(err).to.be.null;
                next();
            })
        });
    });

    this.Then(/^我可以看到百度为我找到相关结果约(.*)个$/, function (result, next) {
        var assert = this.assert;
        var selector = '//*[@id="page"]/span';
        this.browser
            .waitFor(selector)
            .getText(selector, function (err, text) {
                if (err) {
                    return next(err);
                }

                assert.equal('百度为您找到相关结果约' + result + '个', text, '结果是' + result + '，而是' + text);

                next();
            })
    });


};