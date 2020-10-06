'use strict';

// Data

const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COATS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALLS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const QUANTITY = 4;
const KEY_ENTER = `Enter`;
const KEY_ESCAPE = `Escape`;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;
const wizards = [];

const getRandomIntInRange = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomItem = function (arr) {
  let randomElement = getRandomIntInRange(0, arr.length - 1);
  let randomElementItem = arr[randomElement];
  return randomElementItem;
};

const getRandomItemNoRepeat = function (arr) {
  let randomElement = getRandomIntInRange(0, arr.length - 1);
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

populateWizards(wizards, QUANTITY);

// Template

const userDialog = document.querySelector(`.setup`);
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

// Events

const setupOpen = document.querySelector(`.setup-open`);
const setupClose = userDialog.querySelector(`.setup-close`);
const setupUsername = userDialog.querySelector(`.setup-user-name`);
const setupCoat = userDialog.querySelector(`.setup-wizard .wizard-coat`);
const setupEyes = userDialog.querySelector(`.setup-wizard .wizard-eyes`);
const setupFireball = userDialog.querySelector(`.setup-fireball-wrap`);
const setupCoatInput = userDialog.querySelector(`[name=coat-color]`);
const setupEyesInput = userDialog.querySelector(`[name=eyes-color]`);
const setupFireballInput = userDialog.querySelector(`[name=fireball-color]`);

const openPopup = function () {
  userDialog.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = function () {
  userDialog.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const onPopupEscPress = function (evt) {
  if (evt.key === KEY_ESCAPE && (document.activeElement !== setupUsername)) {
    evt.preventDefault();
    closePopup();
  }
};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === KEY_ENTER) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === KEY_ENTER) {
    closePopup();
  }
});

const setupInputColorHandler = function (input, arr, isBackground) {
  return function (evt) {
    let color = getRandomItem(arr);
    let itemStyle = evt.currentTarget.style;
    if (isBackground) {
      itemStyle.background = color;
    } else {
      itemStyle.fill = color;
    }
    input.value = color;
  };
};

setupCoat.addEventListener(`click`, setupInputColorHandler(setupCoatInput, COATS));
setupEyes.addEventListener(`click`, setupInputColorHandler(setupEyesInput, EYES));
setupFireball.addEventListener(`click`, setupInputColorHandler(setupFireballInput, FIREBALLS, true));

// Validation

setupUsername.addEventListener(`invalid`, function () {
  if (setupUsername.validity.valueMissing) {
    setupUsername.setCustomValidity(`Обязательное поле`);
  } else {
    setupUsername.setCustomValidity(``);
  }
});

setupUsername.addEventListener(`input`, function () {
  let valueLength = setupUsername.value.length;
  if (valueLength < MIN_NAME_LENGTH) {
    setupUsername.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` симв.`);
    setupUsername.reportValidity();
  } else if (valueLength > MAX_NAME_LENGTH) {
    setupUsername.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` симв.`);
  } else {
    setupUsername.setCustomValidity(``);
  }
});
