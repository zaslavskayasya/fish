(function() {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function(css) {
			var node = this;

			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		}; 
	}

})();
 
(function() {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();

if (!Object.assign) {
	Object.defineProperty(Object, 'assign', {
		enumerable: false,
		configurable: true,
		writable: true,
		value: function(target, firstSource) {
			'use strict';
			if (target === undefined || target === null) {
				throw new TypeError('Cannot convert first argument to object');
			}

			var to = Object(target);
			for (var i = 1; i < arguments.length; i++) {
				var nextSource = arguments[i];
				if (nextSource === undefined || nextSource === null) {
					continue;
				}

				var keysArray = Object.keys(Object(nextSource));
				for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
					var nextKey = keysArray[nextIndex];
					var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
					if (desc !== undefined && desc.enumerable) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}
			return to;
		}
	});
}
(function(w, d, undefined) {
  'use strict';
  function polyfill() {
    if ('scrollBehavior' in d.documentElement.style) {
      return;
    }
    var Element = w.HTMLElement || w.Element;
    var SCROLL_TIME = 468;
    var original = {
      scroll: w.scroll || w.scrollTo,
      scrollBy: w.scrollBy,
      elScroll: Element.prototype.scroll || scrollElement,
      scrollIntoView: Element.prototype.scrollIntoView
    };
    var now = w.performance && w.performance.now
      ? w.performance.now.bind(w.performance) : Date.now;
    function scrollElement(x, y) {
      this.scrollLeft = x;
      this.scrollTop = y;
    }
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }
    function shouldBailOut(x) {
      if (typeof x !== 'object'
            || x === null
            || x.behavior === undefined
            || x.behavior === 'auto'
            || x.behavior === 'instant') {
        return true;
      }
      if (typeof x === 'object'
            && x.behavior === 'smooth') {
        return false;
      }
      throw new TypeError('behavior not valid');
    }
    function findScrollableParent(el) {
      var isBody;
      var hasScrollableSpace;
      var hasVisibleOverflow;
      do {
        el = el.parentNode;
        isBody = el === d.body;
        hasScrollableSpace =
          el.clientHeight < el.scrollHeight ||
          el.clientWidth < el.scrollWidth;
        hasVisibleOverflow =
          w.getComputedStyle(el, null).overflow === 'visible';
      } while (!isBody && !(hasScrollableSpace && !hasVisibleOverflow));
      isBody = hasScrollableSpace = hasVisibleOverflow = null;
      return el;
    }
    function step(context) {
      var time = now();
      var value;
      var currentX;
      var currentY;
      var elapsed = (time - context.startTime) / SCROLL_TIME;
      elapsed = elapsed > 1 ? 1 : elapsed;
      value = ease(elapsed);
      currentX = context.startX + (context.x - context.startX) * value;
      currentY = context.startY + (context.y - context.startY) * value;
      context.method.call(context.scrollable, currentX, currentY);
      if (currentX !== context.x || currentY !== context.y) {
        w.requestAnimationFrame(step.bind(w, context));
      }
    }
    function smoothScroll(el, x, y) {
      var scrollable;
      var startX;
      var startY;
      var method;
      var startTime = now();
      if (el === d.body) {
        scrollable = w;
        startX = w.scrollX || w.pageXOffset;
        startY = w.scrollY || w.pageYOffset;
        method = original.scroll;
      } else {
        scrollable = el;
        startX = el.scrollLeft;
        startY = el.scrollTop;
        method = scrollElement;
      }
      step({
        scrollable: scrollable,
        method: method,
        startTime: startTime,
        startX: startX,
        startY: startY,
        x: x,
        y: y
      });
    }
    w.scroll = w.scrollTo = function() {
      if (shouldBailOut(arguments[0])) {
        original.scroll.call(
          w,
          arguments[0].left || arguments[0],
          arguments[0].top || arguments[1]
        );
        return;
      }
      smoothScroll.call(
        w,
        d.body,
        ~~arguments[0].left,
        ~~arguments[0].top
      );
    };
    w.scrollBy = function() {
      if (shouldBailOut(arguments[0])) {
        original.scrollBy.call(
          w,
          arguments[0].left || arguments[0],
          arguments[0].top || arguments[1]
        );
        return;
      }
      smoothScroll.call(
        w,
        d.body,
        ~~arguments[0].left + (w.scrollX || w.pageXOffset),
        ~~arguments[0].top + (w.scrollY || w.pageYOffset)
      );
    };
    Element.prototype.scroll = Element.prototype.scrollTo = function() {
      if (shouldBailOut(arguments[0])) {
        original.elScroll.call(
            this,
            arguments[0].left || arguments[0],
            arguments[0].top || arguments[1]
        );
        return;
      }
      smoothScroll.call(
          this,
          this,
          arguments[0].left,
          arguments[0].top
      );
    };
    Element.prototype.scrollBy = function() {
      var arg0 = arguments[0];
      if (typeof arg0 === 'object') {
        this.scroll({
          left: arg0.left + this.scrollLeft,
          top: arg0.top + this.scrollTop,
          behavior: arg0.behavior
        });
      } else {
        this.scroll(
          this.scrollLeft + arg0,
          this.scrollTop + arguments[1]
        );
      }
    };
    Element.prototype.scrollIntoView = function() {
      if (shouldBailOut(arguments[0])) {
        original.scrollIntoView.call(this, arguments[0] || true);
        return;
      }
      var scrollableParent = findScrollableParent(this);
      var parentRects = scrollableParent.getBoundingClientRect();
      var clientRects = this.getBoundingClientRect();
      if (scrollableParent !== d.body) {
        smoothScroll.call(
          this,
          scrollableParent,
          scrollableParent.scrollLeft + clientRects.left - parentRects.left,
          scrollableParent.scrollTop + clientRects.top - parentRects.top
        );
        w.scrollBy({
          left: parentRects.left,
          top: parentRects.top,
          behavior: 'smooth'
        });
      } else {
        w.scrollBy({
          left: clientRects.left,
          top: clientRects.top,
          behavior: 'smooth'
        });
      }
    };
  }
  if (typeof exports === 'object') {
    module.exports = { polyfill: polyfill };
  } else {
    polyfill();
  }
})(window, document);


function $$(selector, context, callback) {
	if (typeof context !== "function") {
		context = context || document;
	} else {
		callback = context;
		context = document;
	}
	var elements = context.querySelectorAll(selector);
	elements = Array.prototype.slice.call(context.querySelectorAll(selector));

	if (typeof callback === "function") {

		elements.forEach(function(item, index, array) {
			callback(item, index, array)
		});

	}
	return elements;
}

function addCss(els,css){
	var addCssToEl = function(el){
		Object.assign(el.style, css);
	}
	if (Array.isArray(els)) {
		for (var i = els.length - 1; i >= 0; i--) {
			addCssToEl(els[i]);
		}
	}else{
		addCssToEl(els);
	}

}

function getElementIndex(node) {
	var index = 0;
	while ((node = node.previousElementSibling)) {
		index++;
	}
	return index;
}

function h_el(els) {
	if (Array.isArray(els)) {
		if (els.length > 0) return true;
	}
	return false;
}

var getJSON = function(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);

	xhr.responseType = 'text';

	xhr.onload = function() {
		var status = xhr.status;
		if (status === 200) {
			callback(null, xhr.response);
		} else {
			callback(status, xhr.response);
		}
	};
	xhr.send();
};