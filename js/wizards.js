'use strict';

(function () {
  const wizards = [];

  const populateWizards = function (arr, quantity) {
    for (let i = 0; i < quantity; i++) {
      arr.push({
        name: window.util.getRandomUsername(window.data.NAMES, window.data.SURNAMES),
        coatColor: window.util.getRandomItem(window.data.COATS),
        eyesColor: window.util.getRandomItem(window.data.EYES)
      });
    }
  };

  populateWizards(wizards, window.data.QUANTITY);

  const similarListElement = window.setup.userDialog.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

  const renderWizard = function (wizard) {
    let wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
    return wizardElement;
  };

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
}());
