'use strict';

(function () {
  var URL = 'http://game.webraido.space/data.json';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseTyte = 'json';

    //console.log(xhr.readyState);

    // Сработает, когда сервер вернет отмет
    xhr.addEventListener('load', function (evt) {
      var error;

      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
      /*
      console.log(xhr.response); // данные в формате JSON
      console.log(evt.target === xhr);

      console.log(xhr.readyText); // Текст ответа

      try {
        console.log(JSON.parse(xhr.readyText)); // Текст ответа в формате JSON
      } catch (e) {
        console.error(e.message);
      }
      */
      console.log(xhr.status + ' ' + xhr.statusText);
    });

    // Ошибка соединения (нет интернета)

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    // Превышен таймаут

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = 10000; // 10 с

    xhr.open('GET', URL);

    //console.log(xhr.readyState);

    xhr.send();
  };
})();
