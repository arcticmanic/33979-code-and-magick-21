'use strict';

// Data

const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];

const SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];

const COATS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];

const EYES = [`black`, `red`, `blue`, `yellow`, `green`];

const wizards = [];

const getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomItem = function (arr) {
  let randomElement = getRandomIntInclusive(0, arr.length - 1);
  let randomElementItem = arr[randomElement];
  return randomElementItem;
};

const getRandomItemNoRepeat = function (arr) {
  let randomElement = getRandomIntInclusive(0, arr.length - 1);
  let randomElementItem = arr[randomElement];
  arr.splice(randomElement, 1);
  return randomElementItem;
};

const getRandomUsername = function (names, surnames) {
  let randomName = getRandomItemNoRepeat(names);
  let randomSurname = getRandomItemNoRepeat(surnames);
  return (typeof randomName === `undefined` || typeof randomSurname === `undefined`) ? `Безымянный` : (randomName + ` ` + randomSurname);
};

const populateWizards = function (arr, quantity) {
  for (let i = 0; i < quantity; i++) {
    arr.push({
      name: getRandomUsername(NAMES, SURNAMES),
      coatColor: getRandomItem(COATS),
      eyesColor: getRandomItem(EYES)
    });
  }
};

populateWizards(wizards, 4);

// Template

const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

const similarListElement = userDialog.querySelector(`.setup-similar-list`);

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

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
