'use strict';

(function () {
  window.backend = {
    load : function (url, onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      //console.log(xhr.readyState);

      // Сработает, когда сервер вернет ответ
      xhr.addEventListener('load', function (evt) {
        var error;

        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
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

      xhr.open('GET', url);

      //console.log(xhr.readyState);

      xhr.send();
    },
    save : function (data, onLoad) {
      var URL = 'http://game/user.php';//'http://game.webraido.space/user.php';

      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function (evt) {
        onLoad(xhr.response);
      });

      xhr.open('POST', URL);

      xhr.send(data);
    }
  };
})();
