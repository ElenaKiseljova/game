'use strict';

(function () {
  let COLORS = ['red', 'green', 'blue'];

  let getRandomColor = function () {
    return COLORS[Math.floor(COLORS.length * Math.random())]
  };

  window.colorize = function (element) {
    element.addEventListener('click', function () {
      let color = getRandomColor();

      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
    });
  };
})();
