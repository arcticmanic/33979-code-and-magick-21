'use strict';

(function () {
  const userDialog = document.querySelector(`.setup`);
  const setupForm = userDialog.querySelector(`.setup-wizard-form`);
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

  const setupInputColorHandler = function (input, arr, isBackground) {
    return function (evt) {
      let color = window.util.getRandomItem(arr);
      let itemStyle = evt.currentTarget.style;
      if (isBackground) {
        itemStyle.background = color;
      } else {
        itemStyle.fill = color;
      }
      input.value = color;
    };
  };

  setupCoat.addEventListener(`click`, setupInputColorHandler(setupCoatInput, window.data.COATS));
  setupEyes.addEventListener(`click`, setupInputColorHandler(setupEyesInput, window.data.EYES));
  setupFireball.addEventListener(`click`, setupInputColorHandler(setupFireballInput, window.data.FIREBALLS, true));

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

  const submitErrorHandler = function (errorMessage) {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const submitHandler = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(setupForm), submitSuccessHandler, submitErrorHandler);
  };

  setupForm.addEventListener(`submit`, submitHandler);

  window.setup = {
    userDialog,
    setupOpen,
    setupClose
  };
}());
