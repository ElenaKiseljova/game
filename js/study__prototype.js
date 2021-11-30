(function () {
  'use strict';

  // Чтобы не пересоздавать МЕТОДЫ внутри ф-й-конструктороы -
  // придется ОБЪЯВЛЯТЬ их ВНЕ и использовать внутри
  // Такой подход чреват целым рядом НЕДОСТАТКОВ:
  // - потеря контекста
  // - мешанина ф-й, которые используются фнутри ф-и-конст-ра и вне
  // - явное присваивание ф-и в конструкторе
  // - прочее
  /*var fire = function () {
    console.log(this.name + ': стреляет файрболом!');
  };*/

  // Ф-я кон-р может создавать объекты по образу и подобию
  // и записывать свой тип в служебное поле prototype
  var Wizard  = function (name, age) {
    this.name = name;
    // this.fire = fire;

    if (age > 0) {
      this.age = age;
    }
  };

  // Для того, чтобы все методы конструктора находились вместе, и у них всегда
  // был правильный контекст, существует спец. поле - prototype у ф-и-кон-ра.
  // Эти методы будут доступны при создании объекта из ф-и-к-ра автоматически
  /*Wizard.prototype.fire = function () {
    console.log(this.name + ': стреляет файрболом!');
  };

  Wizard.prototype.greet = function () {
    console.log('Приветствую! Меня зовут ' + this.name );
  };*/
  // Существует 2 стиля записи методов в протитип:
  //  1 - явное добавдение методов по одному (см.выше)
  // 2 - собирать всё в 1 объект и записывать его в прототип (см.ниже)
  Wizard.prototype = {
    // Помимо методов в прототип можно записывать значения и константы
    STANDART_HEIGHT: 100, // px
    age: 32,
    fire : function () {
      console.log(this.name + ': стреляет файрболом!');
    },
    greet : function () {
      console.log('Приветствую! Меня зовут ' + this.name );
    },
    getAge: function () {
      return this.age;
    }
  };



  var pendalf = new Wizard('Пендальф');
  pendalf.fire();
  pendalf.greet();
  console.log(pendalf.getAge());

  var saruman = new Wizard('Сарумян', 40);
  saruman.fire();
  console.log(saruman.getAge());

  console.log(pendalf.fire === saruman.fire); // true

  // Существуют спец. соглашения по именованию методов и переменных:
  // --- переменные, которы НЕ СЛЕДУЕТ модифицировать или менять напрямую,
  // начинаются с нижнего подчеркивания _
  // --- методы, которые что-то возвращают, называются getters (геттеры)
  // и начинаются со слова GET в имени
  // --- методы, которые принимают одно значение и ничего не возвращают,
  //  называются setters (сеттеры) и начинаются со слова SET в имени
  var DEFAULT_VELOCITY = 5; // kmh
  var ONE_HOUR = 60 * 60 * 1000; // ms

  var Wizard = function (name, velocity) {
    this.name = name;
    this.setVelocity(velocity);
    this._distance = 0;
  };

  Wizard.prototype = {
    go: function (time) { // ms
      this._distance += this._velocity * (time / ONE_HOUR);
    },
    getDistance: function () {
      return this._distance;
    },
    setVelocity: function (velocity) {
      if (typeof velocity === 'undefined') {
        throw new Error('Укажите скорость мага');
      }

      if (velocity <= 0) {
        throw new Error('Маг не сможет ходить с такой скоростью: ' + velocity);
      }

      this._velocity = velocity;
    }
  };

  var pendalf = new Wizard('Пендальф', DEFAULT_VELOCITY);
  pendalf.go(3 * ONE_HOUR);
  console.log(pendalf.getDistance());

  // У каждого объекта в JS существует метод toString
  // По умолчанию он выводит в квадратных скобках р-т работы typeof на объекте и
  // конструктор, которым был создан объект
  console.log(pendalf.toString());

  // ПОЛИМОРФИЗМ - один и тот же метод в разных объектах может работать
  // соответственно особенностям объекта
  console.log({}.toString());
  console.log(new Date().toString());
  console.log([1, 2, 3].toString());

  // Каждый раз, когда JS создает новый объект, он создает в каждом из объектов
  // служебное слово __proto__, в которое записывает ССЫЛКУ на объект, являющийся
  // протитипом конструктора
  var Pet = function (name) {
    this.name = name;
  };

  // ? - чо-т не работает __proto__, если prototype задать объектом
  Pet.prototype.say = function (sound) {
    return ' - ' + sound + '!';
  };
  Pet.prototype.toString = function () {
    return 'Cat ' + this.say('Мрмяя!');
  };

  var myKitty = new Pet('Миха');
  // НАСЛЕДОВАНИЕ - использование одними объектами методов и св-в других объектов
  // ЦЕПОЧКА ПРОТОТИПОВ
  console.log(myKitty.__proto__.constructor.name);
  console.log(myKitty.__proto__.__proto__.constructor.name);
  console.log(myKitty.__proto__.__proto__.__proto__);

  // JS - прототипно-ориентированный яз.програм.
  // Т.к.в отличие от ООП - в JS всё записывается в протитипы, а не классы
  // В JS некоторые св-ва можно ПЕРЕОПРЕДЕЛЯТЬ - в св-во с тем же названием, что и
  // в прототипе или выше, записывать ДРУГОЕ значение
  /*myKitty.toString = function () {
    return 'Cat ' + this.say('Мрмяя!');
  };*/
  console.log(myKitty.toString());

  // Удлинение цепочки прототипов

  // Конструктор должен работать так же, как и Pet, поэтому он просто вызывается внутри
  var Dog = function (name) {
    Pet.call(this, name)
  };

  // В прототипе Dog запишем объект, созданный конструктором Pet
  /*Dog.prototype = new Pet();*/


  // Чтобы продлить цепочку протитипов без вызова уонструктора:
  // 1 - воспользоваться "ПУСТЫМ КОНСТРУКТОРОМ"
  // (ф-ей, которая ссылается но тот же прототип, но заведомо не выполняет никаких действий)
  /*var emptyConstructor = function () {};
  emptyConstructor.prototype = Pet.prototype;

  Dog.prototype = new emptyConstructor();*/

  // 2 - Начиная с IE9+ можно использовать св-во Object.create, которое умеет генерировать
  // объект с заданным прототипом

  Dog.prototype = Object.create(Pet.prototype);

  // Теперь переопределяем метод toString в прототипе Dog
  Dog.prototype.toString = function () {
    return 'Dog ' + this.say('Вуфф!');
  };

  var myDoggy = new Dog('Иван');
  console.log(myDoggy.toString());
})();
