'use strict';

(function () {
  /*var Coordinate = function (x, y, minX, minY, maxX, maxY) {
    this.x = x;
    this.y = y;

    this._minX = minX;
    this._minY = minY;
    this._maxX = maxX;
    this._maxY = maxY;
  };

  Coordinate.prototype.setX = function (x) {
    if (x >= this._minX && x < this._maxX) {
      this.x = x;
    }
  };

  Coordinate.prototype.setY = function (y) {
    if (y >= this._yMin && y < this._maxY) {
      this.y = y;
    }
  };

  console.log(new Coordinate(100, 100, 0, 0, 640, 640));*/

  // Инкапсулированный вариант конструктора
  var Rect = function (left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  };

  var Coordinate = function (x, y, constraints) {
    this.x = x;
    this.y = y;
    this._shiftX = 0;
    this._shiftY = 0;
    this._movingX = true;
    this._movingY = true;
    this._constraints = constraints;
  };

  Coordinate.prototype.setX = function (x) {
    if (x >= this._constraints.left && x <= this._constraints.right) {
      this._shiftX = this.x - x;
      this.x = x;
      this._movingX = true;
    } else {
      this._movingX = false;
    }
  };

  Coordinate.prototype.setY = function (y) {
    if (y >= this._constraints.top && y <= this._constraints.bottom) {
      this._shiftY = this.y - y;
      this.y = y;
      this._movingY = true;
    } else {
      this._movingY = false;
    }
  };

  // console.log(new Coordinate(100, 100, new Rect(0, 0, 640, 640)));

  var setup = document.querySelector('.setup');
  var dialogHandler = setup.querySelector('.upload');

  let bodyRect = document.body.getBoundingClientRect();

  var startCoords = new Coordinate(0, 0, new Rect(60, 30, (bodyRect.right - 800), (bodyRect.bottom - 100)));

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    startCoords.setX(evt.clientX);
    startCoords.setY(evt.clientY);

    var dragget = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragget = true;

      startCoords.setX(moveEvt.clientX);
      startCoords.setY(moveEvt.clientY);

      if (startCoords._movingX) {
        setup.style.left = (setup.offsetLeft - startCoords._shiftX) + 'px';
      }
      if (startCoords._movingY) {
        setup.style.top = (setup.offsetTop - startCoords._shiftY) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragget) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();

          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };

        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
