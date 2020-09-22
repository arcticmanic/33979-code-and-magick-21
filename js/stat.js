'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 140;
const CLOUD_Y = 10;
const CLOUD_GAP = 10;
const GAP = 50;
const TEXT_Y = 240;
const TEXT_HEIGHT = 30;
const BAR_WIDTH = 40;
const BAR_HEIGHT = 150;
const BAR_COLOR_SATURATE = 20;
const LABEL_PAD = 10;
const LABEL_Y = CLOUD_Y + LABEL_PAD;
const LABEL_CENTER_X = CLOUD_X + CLOUD_WIDTH / 2;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const renderLabel = function (ctx, str, x, y, color, alignment = `start`) {
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;
  ctx.fillStyle = color;
  ctx.textAlign = alignment;
  ctx.fillText(str, x, y);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

window.renderStatistics = function (ctx, players, times) {
  let barColor;
  let barColorSaturate = BAR_COLOR_SATURATE;
  let barColorUser = `rgba(255, 0, 0, 1)`;

  renderCloud(
      ctx,
      CLOUD_X + CLOUD_GAP,
      CLOUD_Y + CLOUD_GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  renderLabel(
      ctx,
      `Ура вы победили!`,
      LABEL_CENTER_X,
      LABEL_Y,
      `#000000`,
      `center`
  );

  renderLabel(
      ctx,
      `Список результатов:`,
      LABEL_CENTER_X,
      LABEL_Y + 20,
      `#000000`,
      `center`
  );

  ctx.fillStyle = `#000000`;
  ctx.textAlign = `start`;

  let maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    barColorSaturate = getRandomInt(10) * 10;
    barColor = (players[i] === `Вы`) ? barColorUser : `hsl(215, ${barColorSaturate}%, 50%)`;

    renderLabel(
        ctx,
        players[i],
        CLOUD_X + GAP + (GAP + BAR_WIDTH) * i,
        CLOUD_Y + TEXT_Y,
        barColor
    );

    ctx.fillRect(
        CLOUD_X + GAP + (GAP + BAR_WIDTH) * i,
        CLOUD_Y + CLOUD_HEIGHT - CLOUD_GAP - TEXT_HEIGHT,
        BAR_WIDTH,
        (-BAR_HEIGHT * times[i]) / maxTime
    );
  }

  for (let j = 0; j < times.length; j++) {
    renderLabel(
        ctx,
        Math.round(times[j]),
        CLOUD_X + GAP + (GAP + BAR_WIDTH) * j,
        CLOUD_Y + CLOUD_HEIGHT - CLOUD_GAP - TEXT_HEIGHT - BAR_HEIGHT - LABEL_PAD * 2,
        `#000000`
    );
  }
};
