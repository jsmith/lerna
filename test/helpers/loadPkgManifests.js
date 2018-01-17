"use strict";

const globby = require("globby");
const loadJsonFile = require("load-json-file");

module.exports = loadPkgManifests;

function loadPkgManifests(cwd) {
  return globby(
    [
      // all child packages, at any level
      "**/package.json",
      // but not the root
      "!package.json",
      // and not installed
      "!**/node_modules",
    ],
    {
      cwd,
      absolute: true,
    },
  ).then(files => Promise.all(files.map(fp => loadJsonFile(fp))));
}
