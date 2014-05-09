/**
 * Created by 张帅 on 2014/5/9.
 */

var myAfterHooks = function () {
    this.After(function (callback) {
        // Again, "this" is set to the World instance the scenario just finished
        // playing with.

        // We can then do some cleansing:


        // Release control:
        this.browser.end(callback);
    });
};

module.exports = myAfterHooks;