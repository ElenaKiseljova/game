'use strict';

(function () {
  // Может отменить какой-то не тот таймер случайно
  let lastTimeout;

  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      fun();
    }, 300);
  };
  // Исправленная версия (но пока не понятно, как она работать должна :( )
  /*let DEBOUNCE_INTERVAL = 300; //ms

  window.debounce = function (fun) {
    let lastTimeout = null;

    return function () {
      var args = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };*/
})();
