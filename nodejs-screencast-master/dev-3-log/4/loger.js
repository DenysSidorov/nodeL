/**
*  Module for writing in console node warnings, info-messages, errors
* */

/**
* @see https://en.wikipedia.org/wiki/Transaction_log
* @param {object} module, where file was started
* @param {boolean} shortname or full path to file
* @return {function} for using in short form 'log()'
* */
module.exports = function (module, shortname) {

    var colors = require('colors');
    var name = module.filename;

    // if shortname  -> find simple file name
    if (shortname) {
        name = module.filename.split('\\').find((el, ind, arr) => {
            if (ind === arr.length - 1) {
                return el
            }
        });
    }

    function loger(mes) {
        console.log(('FILE - ' + '| ' + name + ' | ' + (mes.toUpperCase())).green);
    }

    loger.warn = function (mes) {
        console.warn(('WARNING ' + '| ' + 'FILE - ' + name + ' | ' + mes.toUpperCase()).yellow)
    };
    loger.info = function (mes) {
        console.info(('INFO ' + '| ' + 'FILE - ' + name + ' | ' + mes.toUpperCase()).blue)
    };
    loger.error = function (mes) {
        console.error(('ERROR ' + '| ' + 'FILE - ' + name + ' | ' + mes.toUpperCase()).red)
    };

    return loger
}

