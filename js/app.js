'use strict';

let fireballSize = 22;

const getFireballSpeed = function (isMovingLeft) {
  return isMovingLeft ? 2 : 5;
};

let wizardWidth = 70;

const getWizardHeight = function () {
  return 1.337 * wizardWidth;
};

let wizardSpeed = 3;

const getWizardX = function (gameFieldWidth) {
  return (gameFieldWidth - wizardWidth) / 2;
};

const getWizardY = function (gameFieldHeight) {
  return gameFieldHeight / 3;
};
