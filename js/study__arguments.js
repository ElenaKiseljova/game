'use strict';

let greet = function () {
  let username = arguments[0] || 'Незнакомец';

  if (arguments[1]) {
    username += ' ' + arguments[1];
  }

  console.log('Привет, ' + username + '!');
};

greet();
greet('Лена');
greet('Лена', 'Киселёва');


// Промисы (вывод картинок с гита)
let response;
let when = window.backend.load('https://api.github.com/users', function (x) {
  // Объект Promise используется для отложенных и асинхронных вычислений.
  response = new Promise((resolve, reject) => {
    resolve(x);
  });

  response.then(function (users) {
    return users.map(function (user) {
      let node = document.createElement('img');
        node.src = user.avatar_url;
        node.width = 80;
        return node;
    });
  })
  .then(function (nodes) {
    return nodes.forEach((node) => {
      document.body.insertAdjacentElement('afterbegin', node);
    });
    ;
  });
}, function (x) {
  console.log('Error load: ' + x);
});
