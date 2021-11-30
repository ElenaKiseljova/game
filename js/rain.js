'use strict';

(function () {
  /*let snowflakesDraw = function (size, x, y) {
    this.size = size;
    this.x = x;
    this.y = y;

    let half = this.size / 2;
    let small = Math.round(this.size * (17 / 20));
    let draft = this.size - small;

    let snowflakes = document.querySelector('#snowflakes');
    let ctxsnowflakes = snowflakes.getContext('2d');

    ctxsnowflakes.strokeStyle = 'white';
    ctxsnowflakes.beginPath();
    ctxsnowflakes.moveTo(this.x + draft,  this.y + draft);
    ctxsnowflakes.lineTo(this.x + small, this.y + small);
    ctxsnowflakes.moveTo(this.x + half, this.y);
    ctxsnowflakes.lineTo(this.x + half, this.y + this.size);
    ctxsnowflakes.moveTo(this.x + small, this.y + draft);
    ctxsnowflakes.lineTo(this.x + draft, this.y + small);
    ctxsnowflakes.moveTo(this.x, this.y + half);
    ctxsnowflakes.lineTo(this.x + this.size, this.y + half);
    ctxsnowflakes.closePath();
    ctxsnowflakes.stroke();
  };

  let hhh = new snowflakesDraw(30, 5, 5);*/

  var ScreenSize = {
    WIDTH : window.innerWidth ?? 800,
    HEIGHT : window.innerHeight ?? 600
  };

  var getRandomValue = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  var Raindrop = function () {
    this._reset();
  };

  Raindrop.prototype.render = function (ctx) {
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(this.x,  this.y);
    ctx.lineTo(this.x + this.size, this.y - this.size);
    ctx.closePath();
    ctx.stroke();
  };

  Raindrop.prototype.update = function () {
    this.x += this.horisontalVelocity;
    this.y += this.verticalVelocity;

    if (this.isOffScreen()) {
      this._reset();
    }
  };

  Raindrop.prototype.isOffScreen = function () {
    return this.y > ScreenSize.HEIGHT + this.size ||
           this.x > ScreenSize.WIDTH + this.size ||
           this.x < -this.size;
  };

  Raindrop.prototype._reset = function () {
    this.size = getRandomValue(1, 6);

    this.x = getRandomValue(-ScreenSize.WIDTH * 0.3, ScreenSize.WIDTH * 1.6);
    this.y = getRandomValue(0, ScreenSize.HEIGHT);

    this.horisontalVelocity = -this.size / 3;
    this.verticalVelocity = this.size;
  };

  var Cucumber = function () {
    Raindrop.call(this);
  };

  Cucumber.prototype = Object.create(Raindrop.prototype);

  Cucumber.prototype.render = function (ctx) {
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.size, this.size * 3, this.angle, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  };

  Cucumber.prototype.update = function () {
    Raindrop.prototype.update.call(this);
    this.angle += 0.01;
  };

  Cucumber.prototype._reset = function () {
    Raindrop.prototype._reset.call(this);

    this.angle = getRandomValue(0, Math.PI * 2);
  };

  var Snowflakes = function () {
    Raindrop.call(this);
  };

  Snowflakes.prototype = Object.create(Raindrop.prototype);

  Snowflakes.prototype.render = function (ctx) {
    let half = this.size / 2;
    let small = Math.round(this.size * (17 / 20));
    let draft = this.size - small;

    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(this.x + draft,  this.y + draft);
    ctx.lineTo(this.x + small, this.y + small);
    ctx.moveTo(this.x + half, this.y);
    ctx.lineTo(this.x + half, this.y + this.size);
    ctx.moveTo(this.x + small, this.y + draft);
    ctx.lineTo(this.x + draft, this.y + small);
    ctx.moveTo(this.x, this.y + half);
    ctx.lineTo(this.x + this.size, this.y + half);
    ctx.closePath();
    ctx.stroke();
  };

  Snowflakes.prototype._reset = function () {
    Raindrop.prototype._reset.call(this);

    this.size = getRandomValue(10, 30);

    this.x = getRandomValue(-ScreenSize.WIDTH * 0.3, ScreenSize.WIDTH * 1.6);
    this.y = getRandomValue(0, ScreenSize.HEIGHT);
  };

  var cleanupFrame = function (ctx) {
    ctx.clearRect(0, 0, ScreenSize.WIDTH, ScreenSize.HEIGHT);
  };

  var renderFrame = function (ctx, elements) {
    cleanupFrame(ctx);

    elements.forEach((element, i) => {
      element.render(ctx);
      element.update();
    });

    requestAnimationFrame(renderFrame.bind(null, ctx, elements));
  }

  var setup = function () {
    var DROPS = 600;
    var CUCUMBER_RATIO = 0.005;
    var SNOWFLAKES_RATIO = 0.02;

    var canvas = document.querySelector('#rain');
    var ctx = canvas.getContext('2d');
    canvas.width = ScreenSize.WIDTH;
    canvas.height = ScreenSize.HEIGHT;

    var raindrops = new Array(DROPS)
      .fill('')
      .map(function () {
        return new Raindrop();
      })
      .concat(new Array(DROPS * CUCUMBER_RATIO)
        .fill('')
        .map(function () {
          return new Cucumber();
        })).concat(new Array(DROPS * SNOWFLAKES_RATIO)
          .fill('')
          .map(function () {
            return new Snowflakes();
          }));
    renderFrame(ctx, raindrops);
  };

  setup();
})();
