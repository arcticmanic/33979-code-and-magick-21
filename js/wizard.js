'use strict';

(function () {
  let wizard = {
    onEyesChange(color) {},
    onCoatChange(color) {},
    onFireballChange(color) {}
  };

  const wizardElement = document.querySelector(`.setup-wizard`);
  const wizardCoatElement = wizardElement.querySelector(`.wizard-coat`);
  const wizardEyesElement = wizardElement.querySelector(`.wizard-eyes`);
  const wizardFireballElement = document.querySelector(`.setup-fireball-wrap`);

  wizardFireballElement.addEventListener(`click`, function (evt) {
    const newColor = window.util.getRandomElement(window.data.FIREBALLS);
    evt.currentTarget.style.background = newColor;
    window.setup.setupFireballInput.value = newColor;
    wizard.onCoatChange(newColor);
  });

  wizardCoatElement.addEventListener(`click`, function (evt) {
    const newColor = window.util.getRandomElement(window.data.COATS);
    evt.currentTarget.style.fill = newColor;
    window.setup.setupCoatInput.value = newColor;
    wizard.onCoatChange(newColor);
  });

  wizardEyesElement.addEventListener(`click`, function (evt) {
    const newColor = window.util.getRandomElement(window.data.EYES);
    evt.currentTarget.style.fill = newColor;
    window.setup.setupEyesInput.value = newColor;
    wizard.onEyesChange(newColor);
  });


  window.wizard = {
    setCoatChangeHandler(cb) {
      wizard.onCoatChange = cb;
    },

    setEyesChangeHandler(cb) {
      wizard.onEyesChange = cb;
    }
  };
})();
