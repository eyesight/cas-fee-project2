"use strict";
const fs = require('fs');

/**
 * Abstract helper to asyncly read a bulk of files
 * Note that `callback` will receive an array of errors for each file as an array of files data objects
 * Keys in resulting arrays will be the same as in `paths`
 *
 * @param {Array} paths - file paths array
 * @param {Function} cb
 *   @param {Array} errors - a list of file reading error
 *   @param {Array} data - a list of file content data
 */
function readManyFiles (path, files, emails, callback) {
  let result = [], errors = [], l = files.length;

  files.forEach(function (file, k) {
    console.log('in readFiles:' + files.length);
    fs.readFile(path + file, function (err, data) {
      // decrease waiting files
      --l;
      // just skip non-npm packages and decrease valid files count
      err && (errors[k] = err);
      if( !err ) {
        let fileinfo = {data: data, email: emails[k], filename : file};
        console.log('data:' + data.length);
        result[k] = fileinfo;
     //   result[k].email = emails[k];
     //   result[k].filename = file
      }
      // invoke callback if all read
      !l && callback (errors.length? errors : 0, result);
    });

  });
}

module.exports = {

  readManyFiles: readManyFiles
}
;
