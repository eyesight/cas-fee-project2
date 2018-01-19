"use strict";
const fs = require('fs');

/**
 * read many Files
 * path => '/blablabla/'
 * files => array
 * email => array of emails used as a reference for the called
 * callback => callback function to be called after all
 *      errors => a list of file reading errors
 *      result => a list of files content data, emails, filename
 *          result[].data: the file data
 *          result[].email: the email which can be used as reference
 *          result[].filename: filename of the file from where the data is from
 * Keys in resulting arrays will be the same as in `files`
 *
 */
function readManyFiles (path, files, emails, callback) {
  let result = [], errors = [], l = files.length;

  files.forEach(function (file, k) {
    fs.readFile(path + file, function (err, data) {
      // decrease waiting files
      --l;
      // just skip errors and decrease valid files count
      err && (errors[k] = err);
      if( !err ) {
        let fileinfo = {data: data, email: emails[k], filename : file};
        result[k] = fileinfo;
      }
      // invoke callback if all read (l is 0)
      !l && callback (errors.length? errors : 0, result);
    });

  });
}

module.exports = {

  readManyFiles: readManyFiles
}
;
