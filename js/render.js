'use strict';

(function () {
  var wizardTemplate = document.querySelector('#similar-wizard-template');

  window.render = function (wizard) {
    var element = wizardTemplate.content.cloneNode(true);
    element.querySelector('.setup-similar-label').textContent = wizard.name;
    element.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    element.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return element;
  };
})();
