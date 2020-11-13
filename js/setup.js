'use strict';

const userDialog = document.querySelector(`.setup`);
const setupForm = userDialog.querySelector(`.setup-wizard-form`);
const setupOpen = document.querySelector(`.setup-open`);
const setupClose = userDialog.querySelector(`.setup-close`);
const setupUsername = userDialog.querySelector(`.setup-user-name`);
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
  if (evt.key === window.data.KEY_ESCAPE && (document.activeElement !== setupUsername)) {
    evt.preventDefault();
    closePopup();
  }
};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === window.data.KEY_ENTER) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === window.data.KEY_ENTER) {
    closePopup();
  }
});

setupUsername.addEventListener(`invalid`, function () {
  if (setupUsername.validity.valueMissing) {
    setupUsername.setCustomValidity(`Обязательное поле`);
  } else {
    setupUsername.setCustomValidity(``);
  }
});

setupUsername.addEventListener(`input`, function () {
  let valueLength = setupUsername.value.length;
  if (valueLength < window.data.MIN_NAME_LENGTH) {
    setupUsername.setCustomValidity(`Ещё ` + (window.data.MIN_NAME_LENGTH - valueLength) + ` симв.`);
    setupUsername.reportValidity();
  } else if (valueLength > window.data.MAX_NAME_LENGTH) {
    setupUsername.setCustomValidity(`Удалите лишние ` + (valueLength - window.data.MAX_NAME_LENGTH) + ` симв.`);
  } else {
    setupUsername.setCustomValidity(``);
  }
});

const submitSuccessHandler = function () {
  userDialog.classList.add(`hidden`);
};

const submitHandler = function (evt) {
  evt.preventDefault();
  window.backend.save(new FormData(setupForm), submitSuccessHandler, window.createErrorMessage);
};

setupForm.addEventListener(`submit`, submitHandler);

window.setup = {
  userDialog,
  setupOpen,
  setupClose,
  setupCoatInput,
  setupEyesInput,
  setupFireballInput
};
