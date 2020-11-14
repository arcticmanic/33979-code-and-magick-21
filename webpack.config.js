const path = require("path");

module.exports = {
  entry: [
    "./js/game.js",
    "./js/util.js",
    "./js/data.js",
    "./js/debounce.js",
    "./js/setup.js",
    "./js/backend.js",
    "./js/wizard.js",
    "./js/wizards.js",
    "./js/render.js",
    "./js/dialog.js",
    "./js/stat.js",
    "./js/avatar.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
