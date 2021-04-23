'use strict';

(function () {
  // XMLHttpRequest
  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    var animals = data;

    console.log(animals);
  };

  window.load('https://htmlacademy.ru/assets/javascript/demo/8-xhr/data.json', onSuccess, onError);

  // JSONP

  var CALLBACK_NAME = '__jsonpCallback';
  var DATA_URL = '//1510.dump.academy/code-and-magick/data'

  var renderItem = function(item) {
    var dataDiv = document.createElement('div');
    dataDiv.textContent = item.name;
    document.body.appendChild(dataDiv);
  };

  // Объявление функции
  window[CALLBACK_NAME] = function(data) {
    for (var i = 0; i < data.length; i++) {
      renderItem(data[i]);
    }
  };

  let loader = document.createElement('script');
  loader.src = DATA_URL + '?callback=' + CALLBACK_NAME;//'js/data.js';

  loader.addEventListener('error', function () {
    document.body.textContent = 'Произошла ошибка при загрузке данных';
  });

  document.body.appendChild(loader);

})();
