'use strict';

(function () {
  var URL = 'http://game.webraido.space/user.php';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function (evt) {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);

    xhr.send(data);
  };
})();
