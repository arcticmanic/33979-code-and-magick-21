'use strict';

const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COATS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALLS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const MAX_SIMILAR_WIZARD_COUNT = 4;
const KEY_ENTER = `Enter`;
const KEY_ESCAPE = `Escape`;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;

window.data = {
  NAMES,
  SURNAMES,
  COATS,
  EYES,
  FIREBALLS,
  MAX_SIMILAR_WIZARD_COUNT,
  KEY_ENTER,
  KEY_ESCAPE,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
};
