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

  let formSubmit = function () {
    setupForm.submit();
  };

  var onEnterPress = function (evt) {
    /*if (evt.keyCode === ENTER_KEY_CODE) {
      if (evt.target === setupOpenIcon) {
        openPopup();
      }
      if (evt.target === setupClose) {
        closePopup();
      }
      if (evt.target === setupSubmit) {
        setupForm.submit();
      }
    }*/

    if (evt.target === setupOpenIcon) {
      window.util.isEnterEvent(evt, openPopup);
    }
    if (evt.target === setupClose) {
      window.util.isEnterEvent(evt, closePopup);
    }
    if (evt.target === setupSubmit) {
      window.util.isEnterEvent(evt, formSubmit);
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

})();
