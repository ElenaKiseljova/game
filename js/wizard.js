'use strict';

(function () {
  var userDialog = document.querySelector('.setup');

  var inputColorCoat = userDialog.querySelector('input[name="coat-color"]');
  var inputColorEyes = userDialog.querySelector('input[name="eyes-color"]');
  var inputColorFireball = userDialog.querySelector('input[name="fireball-color"]');

  var setupColorCoat = userDialog.querySelector('.wizard-coat');
  var setupColorEyes = userDialog.querySelector('.wizard-eyes');
  var setupColorFireball = userDialog.querySelector('.setup-fireball-wrap');

  window.colorize.coat(setupColorCoat, inputColorCoat);
  window.colorize.eyes(setupColorEyes, inputColorEyes);
  window.colorize.fireball(setupColorFireball, inputColorFireball);
})();
