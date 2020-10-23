'use strict';

(function () {
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  function load(onLoad, onError) {
    let URL = `https://21.javascript.pages.academy/code-and-magick/data`;
    let xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.open(`GET`, URL);
    xhr.send();
  }

  function save(data, onLoad, onError) {
    let URL = `https://21.javascript.pages.academy/code-and-magick`;
    let xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener(`load`, function () {
      onLoad(xhr.response);
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  }

  window.backend = {
    save,
    load
  };
}());
