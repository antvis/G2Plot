/**
 * Create By Bruce Too
 * On 2020-02-14
 */
/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
// @ts-nocheck

// TODO rewrite with typescript @brucetoo

/*!
 * wordcloud2.js
 * http://timdream.org/wordcloud2.js/
 *
 * Copyright 2011 - 2013 Tim Chien
 * Released under the MIT license
 */

'use strict';

import { get, isNil } from '@antv/util';

// setImmediate
if (!window.setImmediate) {
  window.setImmediate = (function setupSetImmediate() {
    return (
      window.msSetImmediate ||
      window.webkitSetImmediate ||
      window.mozSetImmediate ||
      window.oSetImmediate ||
      (function setupSetZeroTimeout() {
        if (!window.postMessage || !window.addEventListener) {
          return null;
        }

        var callbacks = [undefined];
        var message = 'zero-timeout-message';

        // Like setTimeout, but only takes a function argument.  There's
        // no time argument (always zero) and no arguments (you have to
        // use a closure).
        var setZeroTimeout = function setZeroTimeout(callback) {
          var id = callbacks.length;
          callbacks.push(callback);
          window.postMessage(message + id.toString(36), '*');

          return id;
        };

        window.addEventListener(
          'message',
          function setZeroTimeoutMessage(evt) {
            // Skipping checking event source, retarded IE confused this window
            // object with another in the presence of iframe
            if (
              typeof evt.data !== 'string' ||
              evt.data.substr(0, message.length) !== message /* ||
            evt.source !== window */
            ) {
              return;
            }

            evt.stopImmediatePropagation();

            var id = parseInt(evt.data.substr(message.length), 36);
            if (!callbacks[id]) {
              return;
            }

            callbacks[id]();
            callbacks[id] = undefined;
          },
          true
        );

        /* specify clearImmediate() here since we need the scope */
        window.clearImmediate = function clearZeroTimeout(id) {
          if (!callbacks[id]) {
            return;
          }

          callbacks[id] = undefined;
        };

        return setZeroTimeout;
      })() ||
      // fallback
      function setImmediateFallback(fn) {
        window.setTimeout(fn, 0);
      }
    );
  })();
}

if (!window.clearImmediate) {
  window.clearImmediate = (function setupClearImmediate() {
    return (
      window.msClearImmediate ||
      window.webkitClearImmediate ||
      window.mozClearImmediate ||
      window.oClearImmediate ||
      // "clearZeroTimeout" is implement on the previous block ||
      // fallback
      function clearImmediateFallback(timer) {
        window.clearTimeout(timer);
      }
    );
  })();
}

// Check if WordCloud can run on this browser
var isSupported = (function isSupported() {
  var canvas = document.createElement('canvas');
  if (!canvas || !canvas.getContext) {
    return false;
  }

  var ctx = canvas.getContext('2d');
  if (!ctx.getImageData) {
    return false;
  }
  if (!ctx.fillText) {
    return false;
  }

  if (!Array.prototype.some) {
    return false;
  }
  if (!Array.prototype.push) {
    return false;
  }

  return true;
})();

// Find out if the browser impose minium font size by
// drawing small texts on a canvas and measure it's width.
var minFontSize = (function getMinFontSize() {
  if (!isSupported) {
    return;
  }

  var ctx = document.createElement('canvas').getContext('2d');

  // start from 20
  var size = 20;

  // two sizes to measure
  var hanWidth, mWidth;

  while (size) {
    ctx.font = size.toString(10) + 'px sans-serif';
    if (ctx.measureText('\uFF37').width === hanWidth && ctx.measureText('m').width === mWidth) {
      return size + 1;
    }

    hanWidth = ctx.measureText('\uFF37').width;
    mWidth = ctx.measureText('m').width;

    size--;
  }

  return 0;
})();

// Based on http://jsfromhell.com/array/shuffle
var shuffleArray = function shuffleArray(arr) {
  for (var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x) {}
  return arr;
};

var WordCloud = function WordCloud(elements, options) {
  if (!isSupported) {
    return;
  }

  if (!Array.isArray(elements)) {
    elements = [elements];
  }

  elements.forEach(function (el, i) {
    if (typeof el === 'string') {
      elements[i] = document.getElementById(el);
      if (!elements[i]) {
        throw 'The element id specified is not found.';
      }
    } else if (!el.tagName && !el.appendChild) {
      throw 'You must pass valid HTML elements, or ID of the element.';
    }
  });

  /* Default values to be overwritten by options object */
  var settings = {
    data: [],
    fontFamily: '"Trebuchet MS", "Heiti TC", "微軟正黑體", ' + '"Arial Unicode MS", "Droid Fallback Sans", sans-serif',
    fontWeight: 'normal',
    color: 'random-dark',

    minFontSize: minFontSize, // browser's min font size default
    maxFontSize: 60, // max font size default is 60

    clearCanvas: true,
    backgroundColor: '#fff', // opaque white = rgba(255, 255, 255, 1)

    gridSize: 8,
    drawOutOfBound: false,
    origin: null,

    drawMask: false,
    maskColor: 'rgba(255,0,0,0.3)',
    maskGapWidth: 0.3,

    wait: 0,
    abortThreshold: 0, // disabled
    abort: function noop() {},

    minRotation: -Math.PI / 2,
    maxRotation: Math.PI / 2,
    rotateRatio: 0.5,
    rotationSteps: 1,

    shuffle: true,

    shape: 'circle',
    ellipticity: 1,

    active: true,
    animatable: true,
    selected: -1,
    shadowColor: '#333',
    shadowBlur: 10,
    fontScale: 1.2,
    classes: null,

    onWordCloudHover: null,
    onWordCloudClick: null,
  };

  const interactionItems = [];

  if (options) {
    for (var key in options) {
      if (key === 'wordStyle') {
        for (let fontKey in options[key]) {
          if (fontKey in settings) {
            settings[fontKey] = options[key][fontKey];
          }
        }
      } else {
        if (key in settings) {
          settings[key] = options[key];
        }
      }
    }
  }

  if (settings.minFontSize < minFontSize) {
    // can't less than browse's min font size
    settings.minFontSize = minFontSize;
  }

  if (settings.minFontSize > settings.maxFontSize) {
    console.error('minSize cant bigger than maxSize');
    return;
  }

  let maxWeight = 0;
  for (let i = 0; i < settings.data.length; i++) {
    if (maxWeight < settings.data[i].weight) {
      maxWeight = settings.data[i].weight;
    }
  }

  var getRealFontSize = function getRealFontSize(weight) {
    const fontSize = Math.min(
      Math.max(settings.minFontSize, (settings.maxFontSize * weight) / maxWeight),
      settings.maxFontSize
    );
    if (twiceRender) {
      return fontSize * settings.fontScale;
    }
    return fontSize;
  };

  var isCardioid = false;
  /* Convert shape into a function */
  if (typeof settings.shape !== 'function') {
    switch (settings.shape) {
      case 'circle':
      /* falls through */
      default:
        // 'circle' is the default and a shortcut in the code loop.
        settings.shape = 'circle';
        break;

      case 'cardioid':
        // https://baike.baidu.com/item/%E5%BF%83%E8%84%8F%E7%BA%BF/10323843?fromtitle=%E5%BF%83%E5%BD%A2%E7%BA%BF&fromid=10018818
        settings.shape = function shapeCardioid(theta) {
          return 1 - Math.sin(theta);
        };
        isCardioid = true;
        break;

      /*
      To work out an X-gon, one has to calculate "m",
      where 1/(cos(2*PI/X)+m*sin(2*PI/X)) = 1/(cos(0)+m*sin(0))
      http://www.wolframalpha.com/input/?i=1%2F%28cos%282*PI%2FX%29%2Bm*sin%28
      2*PI%2FX%29%29+%3D+1%2F%28cos%280%29%2Bm*sin%280%29%29
      Copy the solution into polar equation r = 1/(cos(t') + m*sin(t'))
      where t' equals to mod(t, 2PI/X);
      */

      case 'diamond':
        settings.shape = function shapeSquare(theta) {
          const thetaPrime = theta % ((2 * Math.PI) / 4);
          return 1 / (Math.cos(thetaPrime) + Math.sin(thetaPrime));
        };
        break;
      case 'square':
        // http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+
        // %28t%2C+PI%2F2%29%29%2Bsin%28mod+%28t%2C+PI%2F2%29%29%29%2C+t+%3D
        // +0+..+2*PI
        settings.shape = function shapeSquare(theta) {
          const thetaPrime = (theta + Math.PI / 4) % ((2 * Math.PI) / 4);
          return 1 / (Math.cos(thetaPrime) + Math.sin(thetaPrime));
        };
        break;

      case 'triangle-forward':
        // http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+
        // %28t%2C+2*PI%2F3%29%29%2Bsqrt%283%29sin%28mod+%28t%2C+2*PI%2F3%29
        // %29%29%2C+t+%3D+0+..+2*PI
        settings.shape = function shapeTriangle(theta) {
          const thetaPrime = theta % ((2 * Math.PI) / 3);
          return 1 / (Math.cos(thetaPrime) + Math.sqrt(3) * Math.sin(thetaPrime));
        };
        break;

      case 'triangle-backward':
        settings.shape = function shapeTriangle(theta) {
          const thetaPrime = (theta + Math.PI) % ((2 * Math.PI) / 3);
          return 1 / (Math.cos(thetaPrime) + Math.sqrt(3) * Math.sin(thetaPrime));
        };
        break;

      case 'triangle':
      case 'triangle-up':
        settings.shape = function shapeTriangle(theta) {
          const thetaPrime = (theta + (Math.PI * 3) / 2) % ((2 * Math.PI) / 3);
          return 1 / (Math.cos(thetaPrime) + Math.sqrt(3) * Math.sin(thetaPrime));
        };
        break;
      case 'triangle-down':
        settings.shape = function shapeTriangle(theta) {
          const thetaPrime = (theta + (Math.PI * 5) / 2) % ((2 * Math.PI) / 3);
          return 1 / (Math.cos(thetaPrime) + Math.sqrt(3) * Math.sin(thetaPrime));
        };
        break;

      case 'pentagon':
        settings.shape = function shapePentagon(theta) {
          const thetaPrime = (theta + 0.955) % ((2 * Math.PI) / 5);
          return 1 / (Math.cos(thetaPrime) + 0.726543 * Math.sin(thetaPrime));
        };
        break;

      case 'star':
        settings.shape = function shapeStar(theta) {
          const thetaPrime = (theta + 0.955) % ((2 * Math.PI) / 10);
          if (((theta + 0.955) % ((2 * Math.PI) / 5)) - (2 * Math.PI) / 10 >= 0) {
            return (
              1 / (Math.cos((2 * Math.PI) / 10 - thetaPrime) + 3.07768 * Math.sin((2 * Math.PI) / 10 - thetaPrime))
            );
          } else {
            return 1 / (Math.cos(thetaPrime) + 3.07768 * Math.sin(thetaPrime));
          }
        };
        break;
    }
  }

  /* Make sure gridSize is a whole number and is not smaller than 4px */
  settings.gridSize = Math.max(Math.floor(settings.gridSize), 4);

  /* shorthand */
  var g = settings.gridSize;
  var maskRectWidth = g - settings.maskGapWidth;

  /* normalize rotation settings */
  var rotationRange = Math.abs(settings.maxRotation - settings.minRotation);
  var minRotation = Math.min(settings.maxRotation, settings.minRotation);
  var rotationSteps = settings.rotationSteps;

  /* information/object available to all functions, set when start() */
  var grid, // 2d array containing filling information
    ngx,
    ngy, // width and height of the grid
    center, // position of the center of the cloud
    maxRadius;

  /* timestamp for measuring each putWord() action */
  var escapeTime;

  /* function for getting the color of the text */
  var getTextColor;
  function random_hsl_color(min, max) {
    return (
      'hsl(' +
      (Math.random() * 360).toFixed() +
      ',' +
      (Math.random() * 30 + 70).toFixed() +
      '%,' +
      (Math.random() * (max - min) + min).toFixed() +
      '%)'
    );
  }
  switch (settings.color) {
    case 'random-dark':
      getTextColor = function getRandomDarkColor() {
        return random_hsl_color(10, 50);
      };
      break;

    case 'random-light':
      getTextColor = function getRandomLightColor() {
        return random_hsl_color(50, 90);
      };
      break;

    default:
      if (typeof settings.color === 'function') {
        getTextColor = settings.color;
      }
      break;
  }

  /* function for getting the classes of the text */
  var getTextClasses = null;
  if (typeof settings.classes === 'function') {
    getTextClasses = settings.classes;
  }

  /* Interactive */
  var interactive = false;
  var infoGrid = [];
  var hovered;

  var getInfoGridFromMouseTouchEvent = function getInfoGridFromMouseTouchEvent(evt) {
    var canvas = evt.currentTarget;
    var rect = canvas.getBoundingClientRect();
    var clientX;
    var clientY;
    /** Detect if touches are available */
    if (evt.touches) {
      clientX = evt.touches[0].clientX;
      clientY = evt.touches[0].clientY;
    } else {
      clientX = evt.clientX;
      clientY = evt.clientY;
    }
    var eventX = clientX - rect.left;
    var eventY = clientY - rect.top;

    var x = Math.floor((eventX * (canvas.width / rect.width || 1)) / g);
    var y = Math.floor((eventY * (canvas.height / rect.height || 1)) / g);

    return infoGrid && infoGrid[x] && infoGrid[x][y];
  };

  var defaultHoverAction = function defaultHoverAction(item, dimension, evt, start) {
    if (item) {
      start(item.id);
    } else {
      start(-1);
    }
  };

  var wordcloudhover = function wordcloudhover(evt) {
    var info = getInfoGridFromMouseTouchEvent(evt);
    if (hovered === info) {
      return;
    }

    if (twiceRender && info && info.item && !get(info, ['item', 'twiceRender'])) {
      return;
    }
    if (!info) {
      settings.onWordCloudHover(undefined, undefined, evt, start);
      if (settings.active) {
        defaultHoverAction(undefined, undefined, evt, start);
      }
      return;
    }

    settings.onWordCloudHover(info.item, info.dimension, evt, start);
    if (settings.active) {
      defaultHoverAction(info.item, info.dimension, evt, start);
    }
    hovered = info;
  };

  var wordcloudclick = function wordcloudclick(evt) {
    var info = getInfoGridFromMouseTouchEvent(evt);
    if (!info) {
      return;
    }

    settings.onWordCloudClick(info.item, info.dimension, evt);
    evt.preventDefault();
  };

  /* Get points on the grid for a given radius away from the center */
  var pointsAtRadius = [];
  var getPointsAtRadius = function getPointsAtRadius(radius) {
    if (pointsAtRadius[radius]) {
      return pointsAtRadius[radius];
    }

    // Look for these number of points on each radius
    var T = radius * 8;

    // Getting all the points at this radius
    var t = T;
    var points = [];

    if (radius === 0) {
      points.push([center[0], center[1], 0]);
    }

    while (t--) {
      // distort the radius to put the cloud in shape
      var rx = 1;
      if (settings.shape !== 'circle') {
        rx = settings.shape((t / T) * 2 * Math.PI); // 0 to 1
      }

      // Push [x, y, t]; t is used solely for getTextColor()
      points.push([
        center[0] + radius * rx * Math.cos((-t / T) * 2 * Math.PI),
        center[1] + radius * rx * Math.sin((-t / T) * 2 * Math.PI) * settings.ellipticity,
        (t / T) * 2 * Math.PI,
      ]);
    }

    pointsAtRadius[radius] = points;
    return points;
  };

  /* Return true if we had spent too much time */
  var exceedTime = function exceedTime() {
    return settings.abortThreshold > 0 && new Date().getTime() - escapeTime > settings.abortThreshold;
  };

  /* Get the deg of rotation according to settings, and luck. */
  var getRotateDeg = function getRotateDeg() {
    if (settings.rotateRatio === 0) {
      return 0;
    }

    if (Math.random() > settings.rotateRatio) {
      return 0;
    }

    if (rotationRange === 0) {
      return minRotation;
    }

    // return minRotation + Math.round(Math.random() * rotationRange / rotationSteps) * rotationSteps;

    if (rotationSteps > 0) {
      // Min rotation + zero or more steps * span of one step
      return minRotation + (Math.floor(Math.random() * rotationSteps) * rotationRange) / rotationSteps;
    } else {
      return minRotation + Math.random() * rotationRange;
    }
  };

  var getTextInfo = function getTextInfo(word, weight, rotateDeg) {
    // calculate the acutal font size
    // fontSize === 0 means wants the text skipped,
    // and size < minSize means we cannot draw the text
    var debug = false;
    var fontSize = getRealFontSize(weight);
    if (fontSize <= 0) {
      return false;
    }

    // Scale factor here is to make sure fillText is not limited by
    // the minium font size set by browser.
    // It will always be 1 or 2n.
    var mu = 1;
    if (fontSize < minFontSize) {
      mu = (function calculateScaleFactor() {
        var mu = 2;
        while (mu * fontSize < minFontSize) {
          mu += 2;
        }
        return mu;
      })();
    }

    var fcanvas = document.createElement('canvas');
    var fctx = fcanvas.getContext('2d', { willReadFrequently: true });

    fctx.font = settings.fontWeight + ' ' + (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;

    // Estimate the dimension of the text with measureText().
    var fw = fctx.measureText(word).width / mu;
    var fh = Math.max(fontSize * mu, fctx.measureText('m').width, fctx.measureText('\uFF37').width) / mu;

    // Create a boundary box that is larger than our estimates,
    // so text don't get cut of (it sill might)
    var boxWidth = fw + fh * 2;
    var boxHeight = fh * 3;
    var fgw = Math.ceil(boxWidth / g);
    var fgh = Math.ceil(boxHeight / g);
    boxWidth = fgw * g;
    boxHeight = fgh * g;

    // Calculate the proper offsets to make the text centered at
    // the preferred position.

    // This is simply half of the width.
    var fillTextOffsetX = -fw / 2;
    // Instead of moving the box to the exact middle of the preferred
    // position, for Y-offset we move 0.4 instead, so Latin alphabets look
    // vertical centered.
    var fillTextOffsetY = -fh * 0.4;

    // Calculate the actual dimension of the canvas, considering the rotation.
    var cgh = Math.ceil((boxWidth * Math.abs(Math.sin(rotateDeg)) + boxHeight * Math.abs(Math.cos(rotateDeg))) / g);
    var cgw = Math.ceil((boxWidth * Math.abs(Math.cos(rotateDeg)) + boxHeight * Math.abs(Math.sin(rotateDeg))) / g);
    var width = cgw * g;
    var height = cgh * g;

    fcanvas.setAttribute('width', width);
    fcanvas.setAttribute('height', height);

    if (debug) {
      // Attach fcanvas to the DOM
      document.body.appendChild(fcanvas);
      // Save it's state so that we could restore and draw the grid correctly.
      fctx.save();
    }

    // Scale the canvas with |mu|.
    fctx.scale(1 / mu, 1 / mu);
    fctx.translate((width * mu) / 2, (height * mu) / 2);
    fctx.rotate(-rotateDeg);

    // Once the width/height is set, ctx info will be reset.
    // Set it again here.
    fctx.font = settings.fontWeight + ' ' + (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;

    // Fill the text into the fcanvas.
    // XXX: We cannot because textBaseline = 'top' here because
    // Firefox and Chrome uses different default line-height for canvas.
    // Please read https://bugzil.la/737852#c6.
    // Here, we use textBaseline = 'middle' and draw the text at exactly
    // 0.5 * fontSize lower.
    fctx.fillStyle = '#000';
    fctx.textBaseline = 'middle';
    fctx.fillText(word, fillTextOffsetX * mu, (fillTextOffsetY + fontSize * 0.5) * mu);

    // Get the pixels of the text
    var imageData;
    try {
      imageData = fctx.getImageData(0, 0, width, height).data;
    } catch (e) {
      // data not long type
      return false;
    }

    if (exceedTime()) {
      return false;
    }

    if (debug) {
      // Draw the box of the original estimation
      fctx.strokeRect(fillTextOffsetX * mu, fillTextOffsetY, fw * mu, fh * mu);
      fctx.restore();
    }

    // Read the pixels and save the information to the occupied array
    var occupied = [];
    var gx = cgw,
      gy,
      x,
      y;
    var bounds = [cgh / 2, cgw / 2, cgh / 2, cgw / 2];
    while (gx--) {
      gy = cgh;
      while (gy--) {
        y = g;
        singleGridLoop: {
          while (y--) {
            x = g;
            while (x--) {
              if (imageData[((gy * g + y) * width + (gx * g + x)) * 4 + 3]) {
                occupied.push([gx, gy]);

                if (gx < bounds[3]) {
                  bounds[3] = gx;
                }
                if (gx > bounds[1]) {
                  bounds[1] = gx;
                }
                if (gy < bounds[0]) {
                  bounds[0] = gy;
                }
                if (gy > bounds[2]) {
                  bounds[2] = gy;
                }

                if (debug) {
                  fctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                  fctx.fillRect(gx * g, gy * g, g - 0.5, g - 0.5);
                }
                break singleGridLoop;
              }
            }
          }
          if (debug) {
            fctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
            fctx.fillRect(gx * g, gy * g, g - 0.5, g - 0.5);
          }
        }
      }
    }

    if (debug) {
      // real bounds
      fctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
      fctx.fillRect(bounds[3] * g, bounds[0] * g, (bounds[1] - bounds[3] + 1) * g, (bounds[2] - bounds[0] + 1) * g);
    }

    // Return information needed to create the text on the real canvas
    return {
      mu: mu,
      occupied: occupied,
      bounds: bounds,
      gw: cgw,
      gh: cgh,
      fillTextOffsetX: fillTextOffsetX,
      fillTextOffsetY: fillTextOffsetY,
      fillTextWidth: fw,
      fillTextHeight: fh,
      fontSize: fontSize,
    };
  };

  /* Determine if there is room available in the given dimension */
  var canFitText = function canFitText(gx, gy, gw, gh, occupied) {
    // Go through the occupied points,
    // return false if the space is not available.
    var i = occupied.length;
    while (i--) {
      var px = gx + occupied[i][0];
      var py = gy + occupied[i][1];

      if (px >= ngx || py >= ngy || px < 0 || py < 0) {
        if (!settings.drawOutOfBound) {
          return false;
        }
        continue;
      }

      if (!grid[px][py]) {
        return false;
      }
    }
    return true;
  };

  /* Actually draw the text on the grid */
  var drawText = function drawText(gx, gy, info, word, weight, distance, theta, rotateDeg, attributes, id, refresh) {
    var fontSize = info.fontSize;
    var color = settings.color;
    var classes = settings.classes;
    if (!refresh) {
      if (getTextColor) {
        color = getTextColor(word, weight, fontSize, distance, theta);
      } else {
        color = settings.color;
      }

      if (getTextClasses) {
        classes = getTextClasses(word, weight, fontSize, distance, theta);
      } else {
        classes = settings.classes;
      }
    } else {
      const find = getInteractionItemById(id);
      color = find ? find.color : settings.color;
    }

    var dimension;
    var bounds = info.bounds;
    dimension = {
      x: (gx + bounds[3]) * g,
      y: (gy + bounds[0]) * g,
      w: (bounds[1] - bounds[3] + 1) * g,
      h: (bounds[2] - bounds[0] + 1) * g,
    };

    elements.forEach(function (el) {
      if (el.getContext) {
        var ctx = el.getContext('2d');
        var mu = info.mu;

        // Save the current state before messing it
        ctx.save();
        const font = settings.fontWeight + ' ' + (fontSize * mu).toString(10) + 'px ' + settings.fontFamily;
        ctx.scale(1 / mu, 1 / mu);

        ctx.font = font;
        ctx.fillStyle = color;

        // Translate the canvas position to the origin coordinate of where
        // the text should be put.
        let transX = (gx + info.gw / 2) * g * mu;
        let transY = (gy + info.gh / 2) * g * mu;
        ctx.translate(transX, transY);
        if (rotateDeg !== 0) {
          ctx.rotate(-rotateDeg);
        }

        // Finally, fill the text.

        // XXX: We cannot because textBaseline = 'top' here because
        // Firefox and Chrome uses different default line-height for canvas.
        // Please read https://bugzil.la/737852#c6.
        // Here, we use textBaseline = 'middle' and draw the text at exactly
        // 0.5 * fontSize lower.
        ctx.textBaseline = 'middle';
        if (settings.selected === id) {
          ctx.shadowColor = settings.shadowColor;
          ctx.shadowBlur = settings.shadowBlur;
        }
        ctx.fillText(word, info.fillTextOffsetX * mu, (info.fillTextOffsetY + fontSize * 0.5) * mu);

        // The below box is always matches how <span>s are positioned
        // ctx.strokeRect(info.fillTextOffsetX, info.fillTextOffsetY,
        //   info.fillTextWidth, info.fillTextHeight);

        if (!refresh) {
          interactionItems.push({
            gx: gx,
            gy: gy,
            info: info,
            word: word,
            weight: weight,
            distance: distance,
            theta: theta,
            rotateDeg: rotateDeg,
            attributes: attributes,
            id: id,
            color: color,
          });
        }
        // Restore the state.
        ctx.restore();
      } else {
        // drawText on DIV element
        var span = document.createElement('span');
        var transformRule = '';
        transformRule = 'rotate(' + (-rotateDeg / Math.PI) * 180 + 'deg) ';
        if (info.mu !== 1) {
          transformRule += 'translateX(-' + info.fillTextWidth / 4 + 'px) ' + 'scale(' + 1 / info.mu + ')';
        }
        var styleRules = {
          position: 'absolute',
          display: 'block',
          font: settings.fontWeight + ' ' + fontSize * info.mu + 'px ' + settings.fontFamily,
          left: (gx + info.gw / 2) * g + info.fillTextOffsetX + 'px',
          top: (gy + info.gh / 2) * g + info.fillTextOffsetY + 'px',
          width: info.fillTextWidth + 'px',
          height: info.fillTextHeight + 'px',
          lineHeight: fontSize + 'px',
          whiteSpace: 'nowrap',
          transform: transformRule,
          webkitTransform: transformRule,
          msTransform: transformRule,
          transformOrigin: '50% 40%',
          webkitTransformOrigin: '50% 40%',
          msTransformOrigin: '50% 40%',
        };
        if (color) {
          styleRules.color = color;
        }
        span.textContent = word;
        for (var cssProp in styleRules) {
          span.style[cssProp] = styleRules[cssProp];
        }
        if (attributes) {
          for (var attribute in attributes) {
            span.setAttribute(attribute, attributes[attribute]);
          }
        }
        if (classes) {
          span.className += classes;
        }
        el.appendChild(span);
      }
    });
  };

  /* Help function to updateGrid */
  var fillGridAt = function fillGridAt(x, y, drawMask, dimension, item) {
    if (x >= ngx || y >= ngy || x < 0 || y < 0) {
      return;
    }

    grid[x][y] = false;

    if (drawMask) {
      var ctx = elements[0].getContext('2d');
      ctx.fillRect(x * g, y * g, maskRectWidth, maskRectWidth);
    }

    if (interactive) {
      infoGrid[x][y] = { item: item, dimension: dimension };
    }
  };

  /* Update the filling information of the given space with occupied points.
     Draw the mask on the canvas if necessary. */
  var updateGrid = function updateGrid(gx, gy, gw, gh, info) {
    var occupied = info.occupied;
    var drawMask = settings.drawMask;
    var ctx;
    if (drawMask) {
      ctx = elements[0].getContext('2d');
      ctx.save();
      ctx.fillStyle = settings.maskColor;
    }

    var dimension;
    if (interactive) {
      var bounds = info.bounds;
      dimension = {
        x: (gx + bounds[3]) * g,
        y: (gy + bounds[0]) * g,
        w: (bounds[1] - bounds[3] + 1) * g,
        h: (bounds[2] - bounds[0] + 1) * g,
      };
    }

    var i = occupied.length;
    while (i--) {
      var px = gx + occupied[i][0];
      var py = gy + occupied[i][1];

      if (px >= ngx || py >= ngy || px < 0 || py < 0) {
        continue;
      }

      // save item's color from info
      const find = getInteractionItemById(info.item.id);
      if (find) {
        info.item.color = find.color;
      }
      fillGridAt(px, py, drawMask, dimension, info.item);
    }

    if (drawMask) {
      ctx.restore();
    }
  };

  var tryToPutWordAtPoint = function tryToPutWordAtPoint(gxy, info, word, weight, distance, rotateDeg, attributes, id) {
    var gx = Math.floor(gxy[0] - info.gw / 2);
    var gy = Math.floor(gxy[1] - info.gh / 2);
    var gw = info.gw;
    var gh = info.gh;

    // If we cannot fit the text at this position, return false
    // and go to the next position.
    if (!canFitText(gx, gy, gw, gh, info.occupied)) {
      return false;
    }

    // Actually put the text on the canvas
    drawText(gx, gy, info, word, weight, distance, gxy[2], rotateDeg, attributes, id, false);

    // Mark the spaces on the grid as filled
    updateGrid(gx, gy, gw, gh, info);

    return {
      gx: gx,
      gy: gy,
      rot: rotateDeg,
      info: info,
    };
  };

  /* putWord() processes each item on the list,
     calculate it's size and determine it's position, and actually
     put it on the canvas. */
  var putWord = function putWord(item) {
    var word, weight, attributes, id;
    if (Array.isArray(item)) {
      word = item[0];
      weight = item[1];
    } else {
      word = item.word;
      weight = item.weight;
      attributes = item.attributes;
      id = item.id;
    }
    var rotateDeg = isNil(item.rotateDeg) ? getRotateDeg() : item.rotateDeg;

    // get info needed to put the text onto the canvas
    var info = getTextInfo(word, weight, rotateDeg);
    if (info) {
      info['item'] = item;
    }

    // not getting the info means we shouldn't be drawing this one.
    if (!info) {
      return false;
    }

    if (exceedTime()) {
      return false;
    }

    // If drawOutOfBound is set to false,
    // skip the loop if we have already know the bounding box of
    // word is larger than the canvas.
    if (!settings.drawOutOfBound) {
      var bounds = info.bounds;
      if (bounds[1] - bounds[3] + 1 > ngx || bounds[2] - bounds[0] + 1 > ngy) {
        return false;
      }
    }

    // Determine the position to put the text by
    // start looking for the nearest points
    var r = maxRadius + 1;
    while (r--) {
      var points = getPointsAtRadius(maxRadius - r);

      if (settings.shuffle) {
        points = [].concat(points);
        shuffleArray(points);
      }

      // Try to fit the words by looking at each point.
      // array.some() will stop and return true
      // when putWordAtPoint() returns true.
      for (var i = 0; i < points.length; i++) {
        var res = tryToPutWordAtPoint(points[i], info, word, weight, maxRadius - r, rotateDeg, attributes, id);
        if (res) {
          return res;
        }
      }

      // var drawn = points.some(tryToPutWordAtPoint);
      // if (drawn) {
      //   // leave putWord() and return true
      //   return true;
      // }
    }
    // we tried all distances but text won't fit, return null
    return null;
  };

  /* Send DOM event to all elements. Will stop sending event and return
     if the previous one is canceled (for cancelable events). */
  var sendEvent = function sendEvent(type, cancelable, detail) {
    if (cancelable) {
      return !elements.some(function (el) {
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(type, true, cancelable, detail || {});
        return !el.dispatchEvent(evt);
      }, this);
    } else {
      elements.forEach(function (el) {
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(type, true, cancelable, detail || {});
        el.dispatchEvent(evt);
      }, this);
    }
  };

  var getInteractionItemById = function getInteractionItemById(id) {
    for (let i = 0; i < interactionItems.length; i++) {
      const find = interactionItems[i];
      if (interactionItems[i].id === id) {
        return find;
      }
    }
    return undefined;
  };
  var twiceRender;
  /* Start drawing on a canvas */
  var start = function start(selected?) {
    if (selected !== undefined) {
      // re-refresh canvas with selected
      // work in canvas only for now
      if (settings.selected !== selected && elements[0].getContext) {
        settings.selected = selected;
        const ctx = elements[0].getContext('2d');
        // draw background
        ctx.fillStyle = settings.backgroundColor;
        ctx.clearRect(0, 0, elements[0].width, elements[0].height);
        ctx.fillRect(0, 0, elements[0].width, elements[0].height);
        // draw text
        for (let i = 0; i < interactionItems.length; i++) {
          const find = interactionItems[i];
          if (!twiceRender || (twiceRender && get(find, ['info', 'item', 'twiceRender']))) {
            /**
             * 词云图词量较少的时候，重新渲染一次词汇，放大词云图效果
             * 这里先临时解决，后续还是需要优化词云图算法来解决
             */
            drawText(
              find.gx,
              find.gy,
              find.info,
              find.word,
              find.weight,
              find.distance,
              find.theta,
              find.rotateDeg,
              find.attributes,
              find.id,
              true
            );
          }
        }
      }
      return;
    }
    // For dimensions, clearCanvas etc.,
    // we only care about the first element.
    var canvas = elements[0];

    if (canvas.getContext) {
      ngx = Math.ceil(canvas.width / g);
      ngy = Math.ceil(canvas.height / g);
    } else {
      var rect = canvas.getBoundingClientRect();
      ngx = Math.ceil(rect.width / g);
      ngy = Math.ceil(rect.height / g);
    }

    // Sending a wordcloudstart event which cause the previous loop to stop.
    // Do nothing if the event is canceled.
    if (!sendEvent('wordcloudstart', true)) {
      return;
    }

    // Determine the center of the word cloud
    center = settings.origin ? [settings.origin[0] / g, settings.origin[1] / g] : [ngx / 2, ngy / (isCardioid ? 4 : 2)];

    // Maxium radius to look for space
    maxRadius = Math.floor(Math.sqrt(ngx * ngx + ngy * ngy));

    /* Clear the canvas only if the clearCanvas is set,
       if not, update the grid to the current canvas state */
    grid = [];

    var gx, gy, i;
    if (!canvas.getContext || settings.clearCanvas) {
      elements.forEach(function (el) {
        if (el.getContext) {
          var ctx = el.getContext('2d');
          ctx.fillStyle = settings.backgroundColor;
          ctx.clearRect(0, 0, ngx * (g + 1), ngy * (g + 1));
          ctx.fillRect(0, 0, ngx * (g + 1), ngy * (g + 1));
        } else {
          el.textContent = '';
          el.style.backgroundColor = settings.backgroundColor;
          el.style.position = 'relative';
        }
      });

      /* fill the grid with empty state */
      gx = ngx;
      while (gx--) {
        grid[gx] = [];
        gy = ngy;
        while (gy--) {
          grid[gx][gy] = true;
        }
      }
    } else {
      /* Determine bgPixel by creating
         another canvas and fill the specified background color. */
      var bctx = document.createElement('canvas').getContext('2d');

      bctx.fillStyle = settings.backgroundColor;
      bctx.fillRect(0, 0, 1, 1);
      var bgPixel = bctx.getImageData(0, 0, 1, 1).data;

      /* Read back the pixels of the canvas we got to tell which part of the
         canvas is empty.
         (no clearCanvas only works with a canvas, not divs) */
      var imageData = canvas.getContext('2d').getImageData(0, 0, ngx * g, ngy * g).data;

      gx = ngx;
      var x, y;
      while (gx--) {
        grid[gx] = [];
        gy = ngy;
        while (gy--) {
          y = g;
          singleGridLoop: while (y--) {
            x = g;
            while (x--) {
              i = 4;
              while (i--) {
                if (imageData[((gy * g + y) * ngx * g + (gx * g + x)) * 4 + i] !== bgPixel[i]) {
                  grid[gx][gy] = false;
                  break singleGridLoop;
                }
              }
            }
          }
          if (grid[gx][gy] !== false) {
            grid[gx][gy] = true;
          }
        }
      }

      imageData = bctx = bgPixel = undefined;
    }

    // fill the infoGrid with empty state if we need it
    if (settings.onWordCloudHover || settings.onWordCloudClick) {
      interactive = true;

      /* fill the grid with empty state */
      gx = ngx + 1;
      while (gx--) {
        infoGrid[gx] = [];
      }

      if (settings.onWordCloudHover) {
        canvas.addEventListener('mousemove', wordcloudhover);
      }

      if (settings.onWordCloudClick) {
        canvas.addEventListener('click', wordcloudclick);
        canvas.addEventListener('touchstart', wordcloudclick);
        canvas.addEventListener('touchend', function (e) {
          e.preventDefault();
        });
        canvas.style.webkitTapHighlightColor = 'rgba(0, 0, 0, 0)';
      }

      canvas.addEventListener('wordcloudstart', function stopInteraction() {
        canvas.removeEventListener('wordcloudstart', stopInteraction);

        canvas.removeEventListener('mousemove', wordcloudhover);
        canvas.removeEventListener('click', wordcloudclick);
        hovered = undefined;
      });
    }

    if (!settings.animatable) {
      if (options.maskImage) {
        /** 修复颜色透明，还留有 maskImage 的情况 */
        elements.forEach(function (el) {
          if (el.getContext) {
            var ctx = el.getContext('2d');
            ctx.fillStyle = settings.backgroundColor;
            ctx.clearRect(0, 0, ngx * (g + 1), ngy * (g + 1));
            ctx.fillRect(0, 0, ngx * (g + 1), ngy * (g + 1));
          }
        });
      }
      const renderedWords = [];
      for (let i = 0; i < settings.data.length; i++) {
        const response = putWord(settings.data[i]);
        if (response) {
          renderedWords.push(response);
        }
      }
      if (renderedWords.length === settings.data.length) {
        if (!twiceRender) {
          elements.forEach(function (el) {
            if (el.getContext) {
              var ctx = el.getContext('2d');
              ctx.fillStyle = settings.backgroundColor;
              ctx.clearRect(0, 0, ngx * (g + 1), ngy * (g + 1));
              ctx.fillRect(0, 0, ngx * (g + 1), ngy * (g + 1));
            }
          });
          /* fill the grid with empty state */
          gx = ngx;
          while (gx--) {
            grid[gx] = [];
            gy = ngy;
            while (gy--) {
              grid[gx][gy] = true;
            }
          }
          twiceRender = true;
          for (let i = 0; i < settings.data.length; i++) {
            putWord({
              ...settings.data[i],
              twiceRender,
            });
          }
        }
      }
    } else {
      i = 0;
      var loopingFunction, stoppingFunction;
      if (settings.wait !== 0) {
        loopingFunction = window.setTimeout;
        stoppingFunction = window.clearTimeout;
      } else {
        loopingFunction = window.setImmediate;
        stoppingFunction = window.clearImmediate;
      }

      var addEventListener = function addEventListener(type, listener) {
        elements.forEach(function (el) {
          el.addEventListener(type, listener);
        }, this);
      };

      var removeEventListener = function removeEventListener(type, listener) {
        elements.forEach(function (el) {
          el.removeEventListener(type, listener);
        }, this);
      };

      var anotherWordCloudStart = function anotherWordCloudStart() {
        removeEventListener('wordcloudstart', anotherWordCloudStart);
        stoppingFunction(timer);
      };

      addEventListener('wordcloudstart', anotherWordCloudStart);

      var timer = loopingFunction(function loop() {
        if (i >= settings.data.length) {
          stoppingFunction(timer);
          sendEvent('wordcloudstop', false);
          removeEventListener('wordcloudstart', anotherWordCloudStart);

          return;
        }
        escapeTime = new Date().getTime();
        var drawn = putWord(settings.data[i]);
        var canceled = !sendEvent('wordclouddrawn', true, {
          item: settings.data[i],
          drawn: drawn,
        });
        if (exceedTime() || canceled) {
          stoppingFunction(timer);
          settings.abort();
          sendEvent('wordcloudabort', false);
          sendEvent('wordcloudstop', false);
          removeEventListener('wordcloudstart', anotherWordCloudStart);
          return;
        }
        i++;
        timer = loopingFunction(loop, settings.wait);
      }, settings.wait);
    }
  };

  // All set, start the drawing
  start();
};

WordCloud.isSupported = isSupported;
WordCloud.minFontSize = minFontSize;

export default WordCloud;
