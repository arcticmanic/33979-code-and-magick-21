"use strict";

(function () {
  const similarListElement = window.setup.userDialog.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document
    .querySelector(`#similar-wizard-template`)
    .content.querySelector(`.setup-similar-item`);

  const renderWizard = function (wizard) {
    let wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;
    return wizardElement;
  };

  window.render = function (wizards) {
    const fragment = document.createDocumentFragment();
    const takeNumber =
      wizards.length > window.data.MAX_SIMILAR_WIZARD_COUNT
        ? window.data.MAX_SIMILAR_WIZARD_COUNT
        : wizards.length;

    similarListElement.innerHTML = ``;

    for (let i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
    window.setup.userDialog
      .querySelector(`.setup-similar`)
      .classList.remove(`hidden`);
  };
})();
