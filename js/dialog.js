'use strict';

(function () {
  const setupDialogElement = document.querySelector(`.setup`);
  const dialogHandle = setupDialogElement.querySelector(`.upload`);

  dialogHandle.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    let mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + `px`;
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + `px`;

    };

    let mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, mouseMoveHandler);
      document.removeEventListener(`mouseup`, mouseUpHandler);

      if (dragged) {
        let clickPreventDefaultHandler = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener(`click`, clickPreventDefaultHandler);
        };
        dialogHandle.addEventListener(`click`, clickPreventDefaultHandler);
      }
    };

    document.addEventListener(`mousemove`, mouseMoveHandler);
    document.addEventListener(`mouseup`, mouseUpHandler);
  });

  window.setup.setupOpen.addEventListener(`click`, function () {
    setupDialogElement.style.removeProperty(`top`);
    setupDialogElement.style.removeProperty(`left`);
  });
}());
