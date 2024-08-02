"use strict";

(function () {
  var URL = "https://29.javascript.pages.academy/code-and-magick/";

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = "json";

    xhr.addEventListener("load", function (evt) {
      onSuccess(xhr.response);
    });

    xhr.open("POST", URL);

    xhr.send(data);
  };
})();
