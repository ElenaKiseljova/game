'use strict';

(function () {
  var DATA_URI_PREFIX = 'data:image/svg+xml;charset=utf-8;base64,';

  window.svg2base64 = function (svgElement) {
    // Превратить элемент в текст
    var xml = new XMLSerializer().serializeToString(svgElement);

    // Закодировать текст в base64 форму
    var svg64 = window.btoa(xml);

    // Добавить заголовок
    return DATA_URI_PREFIX + svg64;
  };
})();
