'use strict';

(function () {
  var COLOR_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var СOLOR_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var COLOR_FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var Wizard = function (data) {
    this.name = data.name;
    this.coatColor = data.coatColor;
    this.eyesColor = data.eyesColor;
    this.fireballColor = data.fireballColor;
  };

  Wizard.prototype = {
    setName: function (name) {
      if (!name) {
        throw new Error('Имя не задано');
      }

      if (name.length > 30) {
        throw new Error('Недопустимое имя мага: ' + name);
      }

      this.name = name;
      this.onChange(this);

      return name;
    },
    changeColorCoat: function () {
      let newColor = window.getRandomElement(COLOR_COATS);

      this.coatColor = newColor;

      this.onChange(this);

      return newColor;
    },
    changeColorEyes: function () {
      let newColor = window.getRandomElement(СOLOR_EYES);

      this.eyesColor = newColor;

      this.onChange(this);

      return newColor;
    },
    changeColorFireball: function () {
      let newColor = window.getRandomElement(COLOR_FIREBALLS);

      this.fireballColor = newColor;

      this.onChange(this);

      return newColor;
    },
    onChange: function (wizard) {
      return wizard;
    }
  };

  window.Wizard = Wizard;
})();
