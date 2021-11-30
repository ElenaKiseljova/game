'use strict';

(function () {
  // Миниигра, где гангстеры борятся за деньги из банка

  var PISTOL = '\u{1F52B}';
  var OFFICER = '\u{1F46E}';

  var Gangster = function (nickname) {
    this.nickname = nickname;
    this.weapon = PISTOL;
    this.check = function () {
      return this.weapon;
    };
  };

  var isPoliceman = function (gangster) {
    //return gangster.check() === OFFICER;
    return !(gangster instanceof Gangster)
  };

  var startFirefight = function (gang) {
    // Гангстеры убивают друг друга, пока не останется один
    do {
      var random  =  Math.floor(Math.random() * gang.length);

      var gangster = gang.splice(random, 1)[0];

      if (isPoliceman(gangster)) {
        console.log('«' + gangster.nickname + '» оказался полицейским');

        return;
      }

      console.log('Проверяем «' + gangster.nickname + '»: ' + gangster.check());

      //console.log('Убит «' + gangster.nickname + '»: ' + gangster.check());
    } while (gang.length > 1);

    console.log('Полицейский не был обнаружен, гангстеры проиграли!');

    //console.log('«' + gang[0].nickname + '» сорвал банк!');
  };

  var mrBlond = new Gangster('Мистер Блондин');
  var mrPink = new Gangster('Мистер Розовый');
  var mrOrange = new Gangster('Мистер Оранжевый');
  var mrWhite = new Gangster('Мистер Белый');
  var mrBlue = new Gangster('Мистер Голубой');


  // Офицер под прикрытием
  var mrRed = {
    nickname: 'Мистер Красный',
    weapon: OFFICER,
    check: function () {
      return PISTOL;//this.weapon;
    }
  };

  // Старт
  startFirefight([mrBlond, mrPink, mrOrange, mrWhite, mrBlue, mrRed]);

  // Когда ф-я вызывается с ключевым словом new - то для нее автоматически создается новый объект
  // и подставляется в качестве контекства this. И этот объект будет возвращен в результате вызова ф-ции
  /*var createGangsterLikeNew = function (nickname) {
    var context = {};

    (function () {
      console.log(this);

      this.nickname = nickname;
    }).call(context);

    return context;
  };

  console.log(createGangsterLikeNew('Мистер Нью Блонд'));*/

  var Gangster = function (nickname) {
    /*console.log(this);*/

    this.nickname = nickname;

    this.fire = function () {
      console.log(this.nickname + ' выстрелил!');
    }

    // Если из ф-и конструктора мы вернем return какой-то другой объект, то вместо
    // нового объекта мы получим то, что вернули. Что будет, скорее всего, свидетельствовать об ошибке в программе
    /*return {
      nickname: 'Мистер Красный шлёт вам привет!'
    }*/
  };

  var mrBlondConstruct = new Gangster('Мистер Нью Блонд');

  // В скрытом поле prototype ф-и конструкторы содержат инф. о ф-и от которой они были созданы.
  // Доступа из кода программы к этой переменной - нет. Поэтому тип объекта (ф-я, из которой был создан наш объект) защищен от подмены
  console.log(Object.getPrototypeOf(mrBlondConstruct));

  // Конструкция instanceof позволяет проверить: был ли объект создан из той, либо иной ф-и конструктора
  console.log(mrBlondConstruct instanceof Gangster);

  // Если мы создаём ф-ю внутри ф-и конструктора - она будет пересоздаваться каждый раз
  var mrAnotherBlondConstruct = new Gangster('Мистер Новейший Блонд');

  console.log(mrBlondConstruct.fire === mrAnotherBlondConstruct.fire); // false
})();
