/**
 * WIP....
 * Create By Bruce Too
 * On 2020-01-02
 * Typescript version of wordCloud2.js
 */

export interface WordCloudConfig {
  data: [];
  fontFamily: string;
  fontWeight: string;
  color: string | Function;
  minSize: number; // 0 to disable
  weightFactor: number | Function;
  clearCanvas: boolean;
  backgroundColor: string; // opaque white = rgba(255, 255, 255, 1)
  gridSize: number;
  drawOutOfBound: boolean;
  shrinkToFit: boolean;
  origin: null;
  drawMask: boolean;
  maskColor: string;
  maskGapWidth: number;
  wait: number;
  abortThreshold: number;
  abort: Function;
  minRotation: number;
  maxRotation: number;
  rotationSteps: number;
  shuffle: boolean;
  rotateRatio: number;
  shape: string | Function;
  ellipticity: number;
  classes: string;
  hover: Function;
  click: Function;
}

export interface InfoGrid {
  item: [];
  dimension: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export default class WordCloud {
  // Check if WordCloud can run on this browser
  public static isSupported(): boolean {
    const canvas = document.createElement('canvas');
    if (!canvas || !canvas.getContext) {
      return false;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return false;
    }
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
  }

  /**
   * Find out if the browser impose minium font size by
   * drawing small texts on a canvas and measure it's width.
   */
  public static minFontSize(): number {
    if (!this.isSupported()) {
      return 0;
    }

    const ctx = document.createElement('canvas').getContext('2d');

    // start from 20
    let size = 20,
      hanWidth = 0,
      mWidth = 0;

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
  }

  // Based on http://jsfromhell.com/array/shuffle
  public static shuffleArray(arr: any[]) {
    for (let j = 0, x, i = arr.length; i; j = Math.floor(Math.random() * i)) {
      x = arr[--i];
      arr[i] = arr[j];
      arr[j] = x;
    }
    return arr;
  }

  protected elements: any;
  protected settings: WordCloudConfig;
  protected maskRectWidth: number;
  protected rotationRange: number;
  protected rotationSteps: number;
  protected minRotation: number;
  protected g: number;

  /* information/object available to all functions, set when start() */
  protected grid; // 2d array containing filling information
  protected ngx: number;
  protected ngy: number; // width and height of the grid
  protected center; // position of the center of the cloud
  protected maxRadius: number;

  /* timestamp for measuring each putWord() action */
  protected escapeTime;

  protected getTextColor: Function;
  protected getTextFontWeight: Function;
  protected getTextClasses: Function;

  /* Interactive */
  protected interactive = false;
  protected infoGrid = [];
  protected hovered: InfoGrid;

  /* Get points on the grid for a given radius away from the center */
  protected pointsAtRadius = [];
  constructor(elements, options) {
    if (!WordCloud.isSupported()) {
      return;
    }
    if (!Array.isArray(elements)) {
      elements = [elements];
    }

    elements.forEach(function(el, i) {
      if (typeof el === 'string') {
        elements[i] = document.getElementById(el);
        if (!elements[i]) {
          throw 'The element id specified is not found.';
        }
      } else if (!el.tagName && !el.appendChild) {
        throw 'You must pass valid HTML elements, or ID of the element.';
      }
    });

    this._handleSettings(options);
    this._handleWeightFactor();
    this._handleShape();

    /* Make sure gridSize is a whole number and is not smaller than 4px */
    this.settings.gridSize = Math.max(Math.floor(this.settings.gridSize), 4);
    this.g = this.settings.gridSize;

    this.maskRectWidth = this.settings.gridSize - this.settings.maskGapWidth;

    /* normalize rotation settings */
    this.rotationRange = Math.abs(this.settings.maxRotation - this.settings.minRotation);
    this.rotationSteps = Math.abs(Math.floor(this.settings.rotationSteps));
    this.minRotation = Math.min(this.settings.maxRotation, this.settings.minRotation);

    this._handleTextColor();
    this._handleTextFontWeight();
    this._handleTextClasses();
  }

  /* Determine if there is room available in the given dimension */
  private _canFitText(gx, gy, gw, gh, occupied) {
    // Go through the occupied points,
    // return false if the space is not available.
    let i = occupied.length;
    while (i--) {
      const px = gx + occupied[i][0];
      const py = gy + occupied[i][1];

      if (px >= this.ngx || py >= this.ngy || px < 0 || py < 0) {
        if (!this.settings.drawOutOfBound) {
          return false;
        }
        continue;
      }

      if (!this.grid[px][py]) {
        return false;
      }
    }
    return true;
  }

  private _getTextInfo(word, weight, rotateDeg) {
    // calculate the acutal font size
    // fontSize === 0 means weightFactor function wants the text skipped,
    // and size < minSize means we cannot draw the text.
    const debug = false;
    // @ts-ignore
    const fontSize: number = this.settings.weightFactor(weight);
    if (fontSize <= this.settings.minSize) {
      return false;
    }

    // Scale factor here is to make sure fillText is not limited by
    // the minium font size set by browser.
    // It will always be 1 or 2n.
    let mu = 1;
    if (fontSize < WordCloud.minFontSize()) {
      mu = (function calculateScaleFactor() {
        let mu = 2;
        while (mu * fontSize < WordCloud.minFontSize()) {
          mu += 2;
        }
        return mu;
      })();
    }

    // Get fontWeight that will be used to set fctx.font
    let fontWeight;
    if (this.getTextFontWeight) {
      fontWeight = this.getTextFontWeight(word, weight, fontSize);
    } else {
      fontWeight = this.settings.fontWeight;
    }

    const fcanvas = document.createElement('canvas');
    const fctx = fcanvas.getContext('2d', { willReadFrequently: true });
    // @ts-ignore
    fctx.font = fontWeight + ' ' + (fontSize * mu).toString(10) + 'px ' + this.settings.fontFamily;

    // Estimate the dimension of the text with measureText().
    // @ts-ignore
    const fw = fctx.measureText(word).width / mu;
    // @ts-ignore
    const fh = Math.max(fontSize * mu, fctx.measureText('m').width, fctx.measureText('\uFF37').width) / mu;

    // Create a boundary box that is larger than our estimates,
    // so text don't get cut of (it sill might)
    let boxWidth = fw + fh * 2;
    let boxHeight = fh * 3;
    const fgw = Math.ceil(boxWidth / this.g);
    const fgh = Math.ceil(boxHeight / this.g);
    boxWidth = fgw * this.g;
    boxHeight = fgh * this.g;

    // Calculate the proper offsets to make the text centered at
    // the preferred position.

    // This is simply half of the width.
    const fillTextOffsetX = -fw / 2;
    // Instead of moving the box to the exact middle of the preferred
    // position, for Y-offset we move 0.4 instead, so Latin alphabets look
    // vertical centered.
    const fillTextOffsetY = -fh * 0.4;

    // Calculate the actual dimension of the canvas, considering the rotation.
    const cgh = Math.ceil(
      (boxWidth * Math.abs(Math.sin(rotateDeg)) + boxHeight * Math.abs(Math.cos(rotateDeg))) / this.g
    );
    const cgw = Math.ceil(
      (boxWidth * Math.abs(Math.cos(rotateDeg)) + boxHeight * Math.abs(Math.sin(rotateDeg))) / this.g
    );
    const width = cgw * this.g;
    const height = cgh * this.g;

    fcanvas.setAttribute('width', String(width));
    fcanvas.setAttribute('height', String(height));

    if (debug) {
      // Attach fcanvas to the DOM
      document.body.appendChild(fcanvas);
      // Save it's state so that we could restore and draw the grid correctly.
      // @ts-ignore
      fctx.save();
    }

    // Scale the canvas with |mu|.
    // @ts-ignore
    fctx.scale(1 / mu, 1 / mu);
    // @ts-ignore
    fctx.translate((width * mu) / 2, (height * mu) / 2);
    // @ts-ignore
    fctx.rotate(-rotateDeg);

    // Once the width/height is set, ctx info will be reset.
    // Set it again here.
    // @ts-ignore
    fctx.font = fontWeight + ' ' + (fontSize * mu).toString(10) + 'px ' + this.settings.fontFamily;

    // Fill the text into the fcanvas.
    // XXX: We cannot because textBaseline = 'top' here because
    // Firefox and Chrome uses different default line-height for canvas.
    // Please read https://bugzil.la/737852#c6.
    // Here, we use textBaseline = 'middle' and draw the text at exactly
    // 0.5 * fontSize lower.
    // @ts-ignore
    fctx.fillStyle = '#000';
    // @ts-ignore
    fctx.textBaseline = 'middle';
    // @ts-ignore
    fctx.fillText(word, fillTextOffsetX * mu, (fillTextOffsetY + fontSize * 0.5) * mu);

    // Get the pixels of the text
    // @ts-ignore
    const imageData = fctx.getImageData(0, 0, width, height).data;

    if (this._exceedTime()) {
      return false;
    }

    if (debug) {
      // Draw the box of the original estimation
      // @ts-ignore
      fctx.strokeRect(fillTextOffsetX * mu, fillTextOffsetY, fw * mu, fh * mu);
      // @ts-ignore
      fctx.restore();
    }

    // Read the pixels and save the information to the occupied array
    const occupied = [];
    let gx = cgw,
      gy,
      x,
      y;
    const bounds = [cgh / 2, cgw / 2, cgh / 2, cgw / 2];
    while (gx--) {
      gy = cgh;
      while (gy--) {
        y = this.g;
        singleGridLoop: {
          while (y--) {
            x = this.g;
            while (x--) {
              if (imageData[((gy * this.g + y) * width + (gx * this.g + x)) * 4 + 3]) {
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
                  // @ts-ignore
                  fctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                  // @ts-ignore
                  fctx.fillRect(gx * this.g, gy * this.g, this.g - 0.5, g - 0.5);
                }
                break singleGridLoop;
              }
            }
          }
          if (debug) {
            // @ts-ignore
            fctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
            // @ts-ignore
            fctx.fillRect(gx * this.g, gy * this.g, this.g - 0.5, this.g - 0.5);
          }
        }
      }
    }

    if (debug) {
      // @ts-ignore
      fctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
      // @ts-ignore
      fctx.fillRect(
        bounds[3] * this.g,
        bounds[0] * this.g,
        (bounds[1] - bounds[3] + 1) * this.g,
        (bounds[2] - bounds[0] + 1) * this.g
      );
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
  }

  /* Get the deg of rotation according to settings, and luck. */
  private _getRotateDeg() {
    if (this.settings.rotateRatio === 0) {
      return 0;
    }

    if (Math.random() > this.settings.rotateRatio) {
      return 0;
    }

    if (this.rotationRange === 0) {
      return this.minRotation;
    }

    if (this.rotationSteps > 0) {
      // Min rotation + zero or more steps * span of one step
      return (
        this.minRotation +
        (Math.floor(Math.random() * this.rotationSteps) * this.rotationRange) / (this.rotationSteps - 1)
      );
    } else {
      return this.minRotation + Math.random() * this.rotationRange;
    }
  }

  /* Return true if we had spent too much time */
  private _exceedTime() {
    return this.settings.abortThreshold > 0 && new Date().getTime() - this.escapeTime > this.settings.abortThreshold;
  }

  private _getPointsAtRadius(radius) {
    if (this.pointsAtRadius[radius]) {
      return this.pointsAtRadius[radius];
    }

    // Look for these number of points on each radius
    const T = radius * 8;

    // Getting all the points at this radius
    let t = T;
    const points = [];

    if (radius === 0) {
      points.push([this.center[0], this.center[1], 0]);
    }

    while (t--) {
      // distort the radius to put the cloud in shape
      let rx = 1;
      if (this.settings.shape !== 'circle') {
        // @ts-ignore
        rx = this.settings.shape((t / T) * 2 * Math.PI); // 0 to 1
      }

      // Push [x, y, t]; t is used solely for getTextColor()
      points.push([
        this.center[0] + radius * rx * Math.cos((-t / T) * 2 * Math.PI),
        this.center[1] + radius * rx * Math.sin((-t / T) * 2 * Math.PI) * this.settings.ellipticity,
        (t / T) * 2 * Math.PI,
      ]);
    }

    this.pointsAtRadius[radius] = points;
    return points;
  }

  private _wordCloudClick(evt) {
    const info = this._getInfoGridFromMouseTouchEvent(evt);
    if (!info) {
      return;
    }
    this.settings.click(info.item, info.dimension, evt);
    evt.preventDefault();
  }

  private _wordCloudHover(evt) {
    const info = this._getInfoGridFromMouseTouchEvent(evt);
    if (this.hovered === info) {
      return;
    }
    this.hovered = info;
    if (!info) {
      this.settings.hover(undefined, undefined, evt);

      return;
    }
    this.settings.hover(info.item, info.dimension, evt);
  }

  private _getInfoGridFromMouseTouchEvent(evt): InfoGrid {
    const canvas = evt.currentTarget;
    const rect = canvas.getBoundingClientRect();
    let clientX;
    let clientY;
    /** Detect if touches are available */
    if (evt.touches) {
      clientX = evt.touches[0].clientX;
      clientY = evt.touches[0].clientY;
    } else {
      clientX = evt.clientX;
      clientY = evt.clientY;
    }
    const eventX = clientX - rect.left;
    const eventY = clientY - rect.top;

    const x = Math.floor((eventX * (canvas.width / rect.width || 1)) / this.settings.gridSize);
    const y = Math.floor((eventY * (canvas.height / rect.height || 1)) / this.settings.gridSize);

    return this.infoGrid[x][y] as InfoGrid;
  }

  private _handleTextClasses() {
    /* function for getting the classes of the text */
    if (typeof this.settings.classes === 'function') {
      this.getTextClasses = this.settings.classes;
    }
  }

  private _handleTextFontWeight() {
    /* function for getting the font-weight of the text */
    if (typeof this.settings.fontWeight === 'function') {
      this.getTextFontWeight = this.settings.fontWeight;
    }
  }

  private _handleTextColor() {
    /* function for getting the color of the text */
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

    switch (this.settings.color) {
      case 'random-dark':
        this.getTextColor = function getRandomDarkColor() {
          return random_hsl_color(10, 50);
        };
        break;

      case 'random-light':
        this.getTextColor = function getRandomLightColor() {
          return random_hsl_color(50, 90);
        };
        break;

      default:
        if (typeof this.settings.color === 'function') {
          this.getTextColor = this.settings.color;
        }
        break;
    }
  }

  private _handleShape() {
    /* Convert shape into a function */
    if (typeof this.settings.shape !== 'function') {
      switch (this.settings.shape) {
        case 'circle':
        /* falls through */
        default:
          // 'circle' is the default and a shortcut in the code loop.
          this.settings.shape = 'circle';
          break;

        case 'cardioid':
          this.settings.shape = function shapeCardioid(theta) {
            return 1 - Math.sin(theta);
          };
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
          // http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+
          // %28t%2C+PI%2F2%29%29%2Bsin%28mod+%28t%2C+PI%2F2%29%29%29%2C+t+%3D
          // +0+..+2*PI
          this.settings.shape = function shapeSquare(theta) {
            const thetaPrime = theta % ((2 * Math.PI) / 4);
            return 1 / (Math.cos(thetaPrime) + Math.sin(thetaPrime));
          };
          break;

        case 'square':
          // http://www.wolframalpha.com/input/?i=plot+r+%3D+min(1%2Fabs(cos(t
          // )),1%2Fabs(sin(t)))),+t+%3D+0+..+2*PI
          this.settings.shape = function shapeSquare(theta) {
            return Math.min(1 / Math.abs(Math.cos(theta)), 1 / Math.abs(Math.sin(theta)));
          };
          break;

        case 'triangle-forward':
          // http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+
          // %28t%2C+2*PI%2F3%29%29%2Bsqrt%283%29sin%28mod+%28t%2C+2*PI%2F3%29
          // %29%29%2C+t+%3D+0+..+2*PI
          this.settings.shape = function shapeTriangle(theta) {
            const thetaPrime = theta % ((2 * Math.PI) / 3);
            return 1 / (Math.cos(thetaPrime) + Math.sqrt(3) * Math.sin(thetaPrime));
          };
          break;

        case 'triangle':
        case 'triangle-upright':
          this.settings.shape = function shapeTriangle(theta) {
            const thetaPrime = (theta + (Math.PI * 3) / 2) % ((2 * Math.PI) / 3);
            return 1 / (Math.cos(thetaPrime) + Math.sqrt(3) * Math.sin(thetaPrime));
          };
          break;

        case 'pentagon':
          this.settings.shape = function shapePentagon(theta) {
            const thetaPrime = (theta + 0.955) % ((2 * Math.PI) / 5);
            return 1 / (Math.cos(thetaPrime) + 0.726543 * Math.sin(thetaPrime));
          };
          break;

        case 'star':
          this.settings.shape = function shapeStar(theta) {
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
  }

  private _handleWeightFactor() {
    /* Convert weightFactor into a function */
    if (typeof this.settings.weightFactor !== 'function') {
      const factor = this.settings.weightFactor;
      this.settings.weightFactor = function weightFactor(pt) {
        return pt * factor; //in px
      };
    }
  }

  private _handleSettings(options) {
    this.settings = {
      data: [],
      fontFamily:
        '"Trebuchet MS", "Heiti TC", "微軟正黑體", ' + '"Arial Unicode MS", "Droid Fallback Sans", sans-serif',
      fontWeight: 'normal',
      color: 'random-dark',
      minSize: 0, // 0 to disable
      weightFactor: 1,
      clearCanvas: true,
      backgroundColor: '#fff', // opaque white = rgba(255, 255, 255, 1)

      gridSize: 8,
      drawOutOfBound: false,
      shrinkToFit: false,
      origin: null,

      drawMask: false,
      maskColor: 'rgba(255,0,0,0.3)',
      maskGapWidth: 0.3,

      wait: 0,
      abortThreshold: 0, // disabled
      abort: function noop() {},

      minRotation: -Math.PI / 2,
      maxRotation: Math.PI / 2,
      rotationSteps: 0,

      shuffle: true,
      rotateRatio: 0.1,

      shape: 'circle',
      ellipticity: 0.65,

      classes: null,

      hover: null,
      click: null,
    } as WordCloudConfig;

    if (options) {
      for (const key in options) {
        if (key in this.settings) {
          this.settings[key] = options[key];
        }
      }
    }
  }
}
