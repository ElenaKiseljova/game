'use strict';

(function () {
  var FIRST_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COLOR_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var СOLOR_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var COLOR_FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;


  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupFieldName = setup.querySelector('.setup-user-name');
  var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
  var setupForm = setup.querySelector('.setup-wizard-form');
  var setupSubmit = setupForm.querySelector('.setup-submit');
    setupOpenIcon.tabIndex = 0;
    setupClose.tabIndex = 0;

  var openPopup = function () {
    setup.classList.remove('hidden');

    document.removeEventListener('keydown', onEnterPress, true);

    document.addEventListener('keydown', onEscPress, true);
  }

  var closePopup = function () {
    setup.classList.add('hidden');

    document.removeEventListener('keydown', onEscPress, true);
    document.removeEventListener('keydown', onEnterPress, true);
  }

  var onEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      if (evt.target === setupOpenIcon) {
        openPopup();
      }
      if (evt.target === setupClose) {
        closePopup();
      }
      if (evt.target === setupSubmit) {
        setupForm.submit();
      }
    }

    return false;
  }

  var onEscPress = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      closePopup();
    }

    return false;
  }

  setupOpenIcon.addEventListener('focus', function () {
    document.addEventListener('keydown', onEnterPress, true);
  });

  setupFieldName.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEscPress, true);
  });

  setupFieldName.addEventListener('blur', function () {
    document.addEventListener('keydown', onEscPress, true);
  });

  setupClose.addEventListener('focus', function () {
    document.addEventListener('keydown', onEnterPress, true);
  });

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupSubmit.addEventListener('focus', function () {
    document.addEventListener('keydown', onEnterPress, true);
  });

  setupSubmit.addEventListener('blur', function () {
    document.removeEventListener('keydown', onEnterPress, true);
  });

})();
