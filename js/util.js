'use strict';

window.util = {
  getRandomIntInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  getRandomElement(array) {
    const randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
  },

  getRandomItemNoRepeat(array) {
    const randomElementIndex = Math.floor(Math.random() * array.length);
    array.splice(array[randomElementIndex], 1);
    return array[randomElementIndex];
  },

  getRandomUsername(names, surnames) {
    let randomName = window.util.getRandomItemNoRepeat(names);
    let randomSurname = window.util.getRandomItemNoRepeat(surnames);
    return (typeof randomName === `undefined` || typeof randomSurname === `undefined`) ? `Безымянный` : (randomName + ` ` + randomSurname);
  },

  createErrorMessage(message) {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, node);
  }
};
