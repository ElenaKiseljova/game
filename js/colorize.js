'use strict';

(function () {
  var COLOR_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var СOLOR_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var COLOR_FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  let onColorChange = function (element, inputForElement, array, colorHandler) {
    element.addEventListener('click', function () {
      let newColor = window.getRandomElement(array);

      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = newColor;
      } else {
        element.style.fill = newColor;
      }

      inputForElement.value = newColor;

      colorHandler(newColor);
    });
  };

  window.colorize = {
    coat : function (element, inputForElement) {
      onColorChange(element, inputForElement, COLOR_COATS, window.similar.onCoatChange);
    },
    eyes :  function (element, inputForElement) {
      onColorChange(element, inputForElement, СOLOR_EYES, window.similar.onEyesChange);
    },
    fireball :  function (element, inputForElement) {
      onColorChange(element, inputForElement, COLOR_FIREBALLS, window.similar.onFireballChange);
    }
  };

})();
