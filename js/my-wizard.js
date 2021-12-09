'use strict';

(function () {
  var userDialog = document.querySelector('.setup');

  /* Default values */
  var inputColorCoat = userDialog.querySelector('input[name="coat-color"]');
  var inputColorEyes = userDialog.querySelector('input[name="eyes-color"]');
  var inputColorFireball = userDialog.querySelector('input[name="fireball-color"]');

  /* Elements */
  var wizardElement = document.querySelector('.setup-wizard');
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');

  var wizardFireballElement = userDialog.querySelector('.setup-fireball-wrap');

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

  window.myWizard = wizard;
})();
