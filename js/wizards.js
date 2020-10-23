'use strict';

(function () {
  const IS_DATA_MOCK = false;
  const similarListElement = window.setup.userDialog.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

  const getMockWizards = function (quantity) {
    let arr = [];
    for (let i = 0; i < quantity; i++) {
      arr.push({
        name: window.util.getRandomUsername(window.data.NAMES, window.data.SURNAMES),
        colorCoat: window.util.getRandomItem(window.data.COATS),
        colorEyes: window.util.getRandomItem(window.data.EYES),
        colorFireball: window.util.getRandomItem(window.data.FIREBALLS)
      });
    }
    return arr;
  };

  const renderWizard = function (wizard) {
    let wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;
    return wizardElement;
  };

  const renderAllWizards = function (wizards) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < window.data.QUANTITY; i++) {
      fragment.appendChild(renderWizard(window.util.getRandomItemNoRepeat(wizards)));
    }
    similarListElement.appendChild(fragment);
    window.setup.userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  const successHandler = function (wizards) {
    renderAllWizards(wizards);
  };

  const errorHandler = function (errorMessage) {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  if (IS_DATA_MOCK) {
    renderAllWizards(getMockWizards(window.data.QUANTITY));
  } else {
    window.backend.load(successHandler, errorHandler);
  }
}());
