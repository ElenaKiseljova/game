var nonStrictMode = function () {
  console.log(this === window);
};

var strictMode = function () {
  'use strict';
  console.log(this === window);
};

// Переменная this внутри ф-и есть всегда даже, когда ф-я не является методом объекта
nonStrictMode(); // true
// Но, если код выполняется в строгом режиме, то по умолчанию - this === undefine
strictMode(); // false

// ----------------------------------------------------------------------------//

(function () {
  'use strict';

  // Если вынести ф-ю из объекта в отдельную переменную - программа продолжает работать корректно
  var greet = function () {
    console.log('Привет! Меня зовут: ' + this.name);
  };

  // Переменная this - содержит объект, на котором была вызвана ф-я
  var wizard = {
    name: 'Пендальф',
    greet: greet
  }

  var wizardFriend = {
    name: 'Фродо',
    greet: greet
  }

  // При вызове ф-и напрямую - получается ошибка, т.к.контекст задается только в момент вызова ф-и на объекте
  try {
    // Важно помнить, что метод bind создает новую ф-ю
    var greetBind = greet.bind({name: 'Пендальф Бaйнд'});

    greetBind();

    // Поэтому исходная не изменяется
    greet();
  } catch (e) {
    console.error(e);
  }

  // Контекст известен только в момент вызова ф-и на объекте, поэтому одна и та же ф-я может иметь разный
  // контекст в зависимости от того, на каком объекте её вызвали
  wizard.greet();
  wizardFriend.greet();


  // Если ф-я объявлена в качестве значения с-ва объекта, то контекстом такой ф-и
  // скорее всего будет объект, в котором эта ф-я объявлена, но это не гарантия, т.к.
  // эту ф-ю можно передать в др. об.
  var wizardNew = {
    name: 'Пендальф',
    greet: function () {
      console.log('Привет! Меня зовут: ' + this.name);
    }
  }

  var wizardNewFriend = {
    name: 'Фродо',
    greet: wizardNew.greet
  }

  wizardNew.greet();
  wizardNewFriend.greet();

  // Контекст можно явно подменить во время вызова ф-и
  wizardNew.name = 'Новое имя';

  wizardNew.greet();

  // Это принципиальное отличие контекста от замыкания. Если воспользоваться замыканием -
  // поведение ф-и будет более ожидаемым
  var wizardClose = {
    name: 'Пендальф',
    greet: function () {
      console.log('Привет! Меня зовут: ' + wizardClose.name);
    }
  }

  var wizardCloseFriend = {
    name: 'Фродо',
    greet: wizardClose.greet
  }

  wizardClose.greet();
  wizardCloseFriend.greet();

  // Но замыкание тоже не гарантирует сохранность исходного объекта, т.к.
  // значение переменной, используемой в замыкании, также м.б. переопределено
  wizardClose = {
    name: 'Саурон',
    greet: wizardClose.greet
  }

  wizardClose.greet();

  // Методы ф-и call и apply (для подмены контекста)
  var greetCA = function (playerName = 'Я') {
    console.log('Привет, ' + playerName + '! Меня зовут: ' + this.name);
  };

  var goodWizard = {
    name: 'Пендальф'
  };

  var badWizard = {
    name: 'Саурон'
  };

  // Оба этих метода принимают первым аргументом объект, который будет назначен в качестве
  // контекста this внутри ф-и
  greetCA.call(badWizard);
  greetCA.apply(goodWizard);

  // Вторым/последующими аргументами передаются параметры ф-и
  // call - мнемоника COMMA
  //  apply - мнемоника ARRAY
  greetCA.call(badWizard, 'Лена');
  greetCA.apply(goodWizard, ['Алина']);

  // Методы call и apply возвращают то значение, которое вернула ф-я
  var greetReturnCA = function (playerName = 'Я') {
    return 'Привет, ' + playerName + '! Меня зовут: ' + this.name;
  };

  console.log(greetReturnCA.call(badWizard, 'Евгений'));
  console.log(greetReturnCA.apply(goodWizard, ['Николай']));

  // call можно использовать для подмены контекста в случае, когда параметры можно
  // перечислить по одному, чтобф не создавать лишний массив
  var greetMultiCA = function (player1Name, player2Name) {
    console.log('Привет, ' + player1Name + ' и ' + player2Name + '! Меня зовут: ' + this.name);
  };

  greetMultiCA.call(badWizard, 'Лена', 'Алина');
  greetCA.apply(goodWizard, ['Лена', 'Алина']);

  // apply полезен, когда надо вызвать ф-ю, в которой есть много параметров, но она
  // не принимает на вход массив, а только параметры через запятую.
  // Например - ф-я поиска максимума Math.max
  console.log(Math.max(1, 85, 99, 6, 4, 15, 21));

  var numbers = [101, 85, 99, 6, 4, 15, 21];
  console.log(Math.max.apply(Math, numbers));

  // Контекст в Обработчиках всегда соответствует элементу, на который повешен обработчик
  /*document.body.addEventListener('click', function (evt) {
    console.log(this === document.body);
    console.log(this === evt.target);
    console.log(this === evt.curentTarget);
  });*/

  var createWizard = function (name) {
    return {
      name: name,
      selectHandler: function (evt) {
        evt.target.textContent += ': ' + this.name;
      }
    };
    // При создании обработчика сразу запомнить правильную ссылку в обработчике
    /*var newWizard = {
      name: name,
      selectHandler: function (evt) {
        evt.target.textContent += ': ' + newWizard.name;
      }
    };

    return newWizard;*/
  };

  var wizards = [
    createWizard('Саурон'),
    createWizard('Пендальф'),
    createWizard('Радагаст'),
  ];

  var headers =  document.querySelectorAll('h2');

  // Чтобы обойти проблему потери окружения, можно создать ф-ю, которая бы запоминала
  // параметры в момент создания обработчика и возвращала бы правильное замыкание
  /*var listen = function (element, wizard) {
    element.addEventListener('click', function (evt) {
      wizard.selectHandler(evt);

      //console.log(this, evt.target);
    });
  };*/


  headers.forEach((header, i) => {
    // Не работает
    /*header.addEventListener('click', wizards[i].selectHandler);*/

    // Потеря окружения
    /*header.addEventListener('click', function (evt) {
      wizards[i].selectHandler(evt);
      console.log(this, evt.target);
    });*/

    /*listen(header, wizards[i]);*/

    // При создании обработчика сразу запомнить правильную ссылку в обработчике
    /*header.addEventListener('click', wizards[i].selectHandler);*/

    // Метод bind возвращает новую ф-ю, к которой жестко прикрепляет в качестве контекста
    // объект, который был передан первым аргументом
    header.addEventListener('click', wizards[i].selectHandler.bind(wizards[i]));
  });

  /*document.addEventListener('click', function (evt) {
    console.log('Документ: ' + (this === evt.target));
    console.log(this, evt.target);
  });*/

  // Ф-ю bind можно реализовать самому. Напривер, таким образом:
  var bind = function (originalFunction, ctx) {
    return function () {
      return originalFunction.call(ctx);
    }
  };

  var greetWizard = bind(greet, { name: 'Пендальф' });
  greetWizard();

  // bind не переопределить call или apply
  greetWizard.call( {name: 'Лена'} );
  greetWizard.apply( {name: ['Алина']} );

  // bind так же позволяет фиксировать параметры. Второй арзумент

})();
