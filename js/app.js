var fireballSize = 22;

var getFireballSpeed = function (isMovingLeft) {
  return isMovingLeft ? 2 : 5;
}

var wizardWidth = 70;

var getWizardHeight = function () {
  return 1.337 * wizardWidth;
}

var wizardSpeed = 3;

var getWizardX = function (gameFieldWidth) {
  return (gameFieldWidth - wizardWidth) / 2;
}

var getWizardY = function (gameFieldHeight) {
  return gameFieldHeight / 3;
}
