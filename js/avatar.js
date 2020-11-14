'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const fileChooser = document.querySelector(`.upload input[type=file]`);
const preview = document.querySelector(`.setup-user-pic`);

fileChooser.addEventListener(`change`, function () {
  let file = fileChooser.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, function () {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});
