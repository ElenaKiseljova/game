"use strict";

(function () {
  // Setap window
  var userDialog = document.querySelector(".setup");

  // List for similar wizards
  var similarListElement = document.querySelector(".setup-similar-list");

  var wizards = [];
  var wizardsSimilar = [];

  // Function for range wizards
  let getRank = function (wizard) {
    let rank = 0;

    if (wizard.colorCoat === window.myWizard.coatColor) {
      rank += 3;
    }

    if (wizard.colorEyes === window.myWizard.eyesColor) {
      rank += 2;
    }

    if (wizard.colorFireball === window.myWizard.fireballColor) {
      rank += 1;
    }

    return rank;
  };

  // Additional Function for range wizards by name
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var wizardsComparator = function (left, right) {
    let rankDiff = getRank(right) - getRank(left);

    return rankDiff === 0 ? namesComparator(left.name, right.name) : rankDiff;
  };

  // Fynction for update list of wizards
  let updateWizards = function () {
    wizardsSimilar = wizards.slice().sort(wizardsComparator);

    // Cleaning space list of similar wizards before adding new elements
    similarListElement.innerHTML = "";

    for (var i = 0; i < 4; i++) {
      //console.log(wizardsSimilar[i]);
      var fragment = document.createDocumentFragment();

      fragment.appendChild(window.render(wizardsSimilar[i]));

      similarListElement.appendChild(fragment);

      userDialog.querySelector(".setup-similar").classList.remove("hidden");
    }
  };

  window.myWizard.onChange = function () {
    window.debounce(updateWizards);
  };

  // Get object with data wizards
  var successHandler = function (data) {
    //console.log(data);
    //wizards = JSON.parse(data);
    wizards = data;

    updateWizards();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement("div");
    node.style =
      "z-index: 100; margin: 0 auto; text-align: center; background-color: red;";
    node.style.position = "absolute";
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = "30px";

    node.textContent = errorMessage;

    document.body.insertAdjacentElement("afterbegin", node);
  };

  // Global function loading data wizards on the server
  window.backend.load(successHandler, errorHandler);
})();
