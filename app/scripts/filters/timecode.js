(function () {
    function timecode () {
        return function (seconds) {
            var timer = buzz.toTimer(seconds);
            return timer;
        };
    }

    angular
        .module('blocJams')
        .filter('timecode', timecode);
})();
