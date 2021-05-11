'use strict';

(function () {
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
  };

  var closePopup = function () {
    setup.classList.add('hidden');

    document.removeEventListener('keydown', onEscPress, true);
    document.removeEventListener('keydown', onEnterPress, true);
  };

  var onEnterPress = function (evt) {
    if (evt.target === setupOpenIcon) {
      window.util.isEnterEvent(evt, openPopup);
    }
    if (evt.target === setupClose) {
      window.util.isEnterEvent(evt, closePopup);
    }

    return false;
  }

  var onEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);

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

  });
})();
