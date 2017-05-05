/*!
 * flugrid - version 0.1.2
 *
 * Made with ❤ by Steve Ottoz so@dev.so
 *
 * Copyright (c) 2017 Steve Ottoz
 */
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.Flugrid = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  /**
   * Flugrid class
   */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Flugrid = function () {

    /**
     * Flugrid constructor
     * @param  {Object} [] - an object containing all the options for Flugrid
     * @return {Object}    - a Flugrid instance
     */
    function Flugrid() {
      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref$container = _ref.container;
      var container = _ref$container === undefined ? '.flugrid' : _ref$container;
      var _ref$items = _ref.items;
      var items = _ref$items === undefined ? '.flugrid-item' : _ref$items;
      var _ref$gutter = _ref.gutter;
      var gutter = _ref$gutter === undefined ? 0 : _ref$gutter;
      var _ref$auto = _ref.auto;
      var auto = _ref$auto === undefined ? false : _ref$auto;
      var _ref$rtl = _ref.rtl;
      var rtl = _ref$rtl === undefined ? false : _ref$rtl;

      _classCallCheck(this, Flugrid);

      // set the options
      this.set({
        container: container,
        items: items,
        gutter: gutter,
        rtl: rtl
      });
      this.auto = !!auto;
      this.init();
    }

    /**
     * init function
     */


    _createClass(Flugrid, [{
      key: 'init',
      value: function init() {
        if (this.auto) {
          this.build();
          this.resizeHandler = this.build.bind(this);
          window.addEventListener('resize', this.resizeHandler);
        }
      }
    }, {
      key: 'set',
      value: function set() {
        var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var _ref2$container = _ref2.container;
        var container = _ref2$container === undefined ? this.container : _ref2$container;
        var _ref2$items = _ref2.items;
        var items = _ref2$items === undefined ? this.items : _ref2$items;
        var _ref2$gutter = _ref2.gutter;
        var gutter = _ref2$gutter === undefined ? this.gutter : _ref2$gutter;
        var _ref2$rtl = _ref2.rtl;
        var rtl = _ref2$rtl === undefined ? this.rtl : _ref2$rtl;

        this.container = container instanceof Node ? container : document.querySelector(container);
        this.items = this.container ? [].slice.call(items instanceof NodeList ? items : this.container.querySelectorAll(items), 0) : [];
        this.gutter = isFinite(parseInt(gutter)) ? parseInt(gutter) : 0;
        this.rtl = !!rtl;
      }
    }, {
      key: 'build',
      value: function build() {
        var _this = this;

        return new Promise(function (resolve, reject) {
          if (_this.container && _this.items.length) {
            _this.container.style.width = '';

            var containerWidth = _this.container.getBoundingClientRect().width;
            var itemWidth = _this.items[0].getBoundingClientRect().width + _this.gutter;
            var cols = Math.max(Math.floor((containerWidth - _this.gutter) / itemWidth), 1);
            var itemsGutter = [];
            var itemsX = [];

            _this.container.style.width = itemWidth * cols + _this.gutter + 'px';;
            _this.container.style.position = 'relative';

            for (var i = 0; i < cols; i++) {
              itemsX.push(i * itemWidth + _this.gutter);
              itemsGutter.push(_this.gutter);
            }

            if (_this.rtl) {
              itemsX.reverse();
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = _this.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                var itemIndex = itemsGutter.slice(0).sort(function (a, b) {
                  return a - b;
                }).shift();
                itemIndex = itemsGutter.indexOf(itemIndex);

                var posX = parseInt(itemsX[itemIndex]);
                var posY = parseInt(itemsGutter[itemIndex]);

                item.style.position = 'absolute';
                item.style.webkitBackfaceVisibility = item.style.backfaceVisibility = 'hidden';
                item.style.transformStyle = 'preserve-3d';
                item.style.transform = 'translate3D(' + posX + 'px, ' + posY + 'px, 0)';

                itemsGutter[itemIndex] += item.getBoundingClientRect().height + _this.gutter;
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            var containerHeight = itemsGutter.slice(0).sort(function (a, b) {
              return a - b;
            }).pop();

            _this.container.style.height = containerHeight + 'px';
          }
          resolve(_this);
        });
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.container.style.position = '';
        this.container.style.width = '';
        this.container.style.height = '';
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var item = _step2.value;

            item.style.position = '';
            item.style.webkitBackfaceVisibility = item.style.backfaceVisibility = '';
            item.style.transformStyle = '';
            item.style.transform = '';
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.reset();
        if (this.auto) {
          window.removeEventListener('resize', this.resizeHandler);
        }
      }
    }]);

    return Flugrid;
  }();

  exports.default = Flugrid;
  module.exports = exports['default'];
});