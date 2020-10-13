'use strict';

(function () {
  window.util = {
    getRandomIntInRange(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getRandomItem(arr) {
      let randomElement = window.util.getRandomIntInRange(0, arr.length - 1);
      let randomElementItem = arr[randomElement];
      return randomElementItem;
    },

    getRandomItemNoRepeat(arr) {
      let randomElement = window.util.getRandomIntInRange(0, arr.length - 1);
      let randomElementItem = arr[randomElement];
      arr.splice(randomElement, 1);
      return randomElementItem;
    },

    getRandomUsername(names, surnames) {
      let randomName = window.util.getRandomItemNoRepeat(names);
      let randomSurname = window.util.getRandomItemNoRepeat(surnames);
      return (typeof randomName === `undefined` || typeof randomSurname === `undefined`) ? `Безымянный` : (randomName + ` ` + randomSurname);
    }
  };
}());
