(function () {
    /**
    * @function seekBar
    * @desc Callback function; will execute when directive is instantiated in view
    * @param $document (needed to bind/unbind mousemove/mouseup events)
    */
    function seekBar($document) {
        /**
        * @function calculatePercent
        * @desc Calculates percentage along seek bar where click-event occurred
        * @param {Object} seekBar (= directive), click-event
        * @returns percent (number); needed for scope.onClickSeekbar
        */
        var calculatePercent = function (seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };

        return {
            templateUrl: '/templates/directives/seek_bar.html', // Template where directive will be used
            replace: true, // Directive element <seek-bar> will be replaced with HTML template (rather than inserted between tags)
            restrict: 'E', // Treats directive as element
            scope: { }, // Creates isolated scope exclusively for this directive
            link: function (scope, element, attributes) {
                scope.value = 0; // Holds value of seek bar (either song or volume)
                scope.max = 100;
                /**
                * @desc Holds element that matches seekBar directive as jQuery object
                * @type {Object}
                */
                var seekBar = $(element);
                /**
                * @function percentString
                * @desc Calculates percentage of filled portion of seek bar
                * @returns string with percentage as value
                */
                var percentString = function () {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + '%';
                };
                /**
                * @function scope.fillStyle
                * @desc Returns width of seek bar filling portion which is injected as CSS style in fill `class`
                * @returns {Object}
                */
                scope.fillStyle = function () {
                    return {width: percentString()};
                };
                /**
                * @function scope.onClickSeekbar
                * @desc Updates seek bar value when user clicks on seek bar
                */
                scope.onClickSeekBar = function (event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };
                /**
                * @function scope.trackThumb
                * @desc Updates seek bar value as user drags seek bar thumb by binding events to mouseup and mousemove
                */
                scope.trackThumb = function () {
                    $document.bind('mousemove.thumb', function (event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function () {
                            scope.value = percent * scope.max;
                        });
                    });
                    $document.bind('mouseup.thumb', function () {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
            }
        };
    }

    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();
