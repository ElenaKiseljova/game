'use strict';

(function () {
  var FIRST_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COLOR_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var СOLOR_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var COLOR_FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var randomCoefficient = function (parameter) {
    var coefficient = Math.trunc(Math.random() * parameter.length);

    return coefficient;
  };

  var setup = document.querySelector('.setup');

  var inputColorCoat = setup.querySelector('input[name="coat-color"]');
  var inputColorEyes = setup.querySelector('input[name="eyes-color"]');
  var inputColorFireball = setup.querySelector('input[name="fireball-color"]');

  var setupColorCoat = setup.querySelector('.wizard-coat');
  var setupColorFireball = setup.querySelector('.setup-fireball-wrap');
  var setupColorEyes = setup.querySelector('.wizard-eyes');

  window.colorize(setupColorCoat);
  window.colorize(setupColorFireball);
  window.colorize(setupColorEyes);

  setupColorCoat.addEventListener('click', function () {
    let color = COLOR_COATS[randomCoefficient(COLOR_COATS)];
    //setupColorCoat.style.fill = color;

    inputColorCoat.value = color;
  });

  setupColorFireball.addEventListener('click', function () {
    let color = COLOR_FIREBALLS[randomCoefficient(COLOR_FIREBALLS)];
    //setupColorFireball.style.backgroundColor = color;
    inputColorFireball.value = color;
  });

  setupColorEyes.addEventListener('click', function () {
    let color = СOLOR_EYES[randomCoefficient(СOLOR_EYES)];
    //setupColorEyes.style.fill = color;
    inputColorEyes.value = color;
  });

  var similarListElement = document.querySelector('.setup-similar-list');
  var templateGamer = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var similarGamers = [];

  for (var i = 0; i < 4; i++) {
    similarGamers[i] = {
      name: FIRST_NAMES[randomCoefficient(FIRST_NAMES)] + ' ' + LAST_NAMES[randomCoefficient(LAST_NAMES)],
      coatColor: COLOR_COATS[randomCoefficient(COLOR_COATS)],
      eyesColor: СOLOR_EYES[randomCoefficient(СOLOR_EYES)],
    };
  }

  var renderWizard = function (wizard) {
    var gamerItem = templateGamer.cloneNode(true);
    gamerItem.querySelector('.setup-similar-label').textContent = wizard.name;
    gamerItem.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    gamerItem.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return gamerItem;
  };

  var fragment = document.createDocumentFragment();

  for (var j = 0; j < similarGamers.length; j++) {
    fragment.appendChild(renderWizard(similarGamers[j]));
  }

  similarListElement.appendChild(fragment);

  document.querySelector('.setup-similar').classList.remove('hidden');

})();
