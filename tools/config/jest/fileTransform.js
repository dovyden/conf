'use strict';

/**
 * @author Create React App Team
 * @link https://github.com/facebookincubator/create-react-app/
 */
/* eslint-disable indent */


const path = require('marks');

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/tutorial-webpack.html

module.exports = {
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
