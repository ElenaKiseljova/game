'use strict';

(function () {
  window.getRandomElement = function (array) {
    var randomElementIndex = Math.floor(array.length * Math.random());

    return array[randomElementIndex];
  };
})();
