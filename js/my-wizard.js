'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupForm = setup.querySelector('form');

  /* Default values */
  var inputColorCoat = setup.querySelector('input[name="coat-color"]');
  var inputColorEyes = setup.querySelector('input[name="eyes-color"]');
  var inputColorFireball = setup.querySelector('input[name="fireball-color"]');

  /* Elements */
  var wizardElement = document.querySelector('.setup-wizard');
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');

  var wizardFireballElement = setup.querySelector('.setup-fireball-wrap');

  var wizardName = document.querySelector('.setup-user-name');

  /* Create new object Wizard */
  var wizard = new window.Wizard({
    name: wizardName.value,
    eyesColor: inputColorEyes.value,
    fireballColor: inputColorFireball.value,
    coatColor: inputColorCoat.value
  });

  /* Events */
  wizardEyesElement.addEventListener('click', function () {
    inputColorEyes.value = wizard.changeColorEyes();
    wizardEyesElement.style.fill = inputColorEyes.value;
  });

  wizardCoatElement.addEventListener('click', function () {
    inputColorCoat.value = wizard.changeColorCoat();
    wizardCoatElement.style.fill = inputColorCoat.value;
  });

  wizardFireballElement.addEventListener('click', function () {
    inputColorFireball.value = wizard.changeColorFireball();
    wizardFireballElement.style.background = inputColorFireball.value;
  });

  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    let formHiddenFields = setupForm.querySelectorAll('input[type="hidden"]');
    let data = {};

    formHiddenFields.forEach((formHiddenField, i) => {
      data[i] = {
        name: formHiddenField.name,
        value: formHiddenField.value
      };
    });

    data = JSON.stringify(data);

    window.backend.save(data, function (response) {
      console.log(response);

      setup.classList.add('hidden');
    });

    var wizardCopy = document.querySelector('svg').cloneNode(true);
    console.log(wizardCopy);
    wizardCopy.querySelector('#wizard-coat').style.fill = inputColorCoat.value;
    wizardCopy.querySelector('#wizard-eyes').style.fill = inputColorEyes.value;

    var wizardBase64Right = window.svg2base64(wizardCopy);

    wizardCopy.querySelector('#wizard').setAttribute('transform', 'translate(62, 0) scale(-1, 1)');
    var wizardBase64Left = window.svg2base64(wizardCopy);

    window.restartGame(wizardBase64Right, wizardBase64Left);
  });

  window.myWizard = wizard;
})();
