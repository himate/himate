var fs = require('fs');
var parse = require('csv-parse');
var request = require('request');
var inputFile = 'https://docs.google.com/spreadsheets/d/1HUXkkF25WWOa9_urbGNB2pMITR722M6n7YnZpp1zvcw/pub?gid=0&single=true&output=csv';

var targets = ['../../packages/base/lib/locale/'];

var parser = parse({
    delimiter: ','
}, function(err, data) {
    //console.log(data);
    var locales = {};
    var columns = [];
    data.forEach(function(row, index) {
        if (index == 0) {// handle header
            row.forEach(function(value, index) {
                columns.push(value);
                if (index > 0) {
                    locales[value] = {};
                }
            });
        }
        else {
            row.forEach(function(value, index) {
                if (index > 0) {
                    locales[columns[index]][row[0]] = value;
                }
            });
        }

    });
    columns.forEach(function(value, index) {
        if (index > 0) {
            targets.forEach(function(target) {
                // omit google translate column
                if (value.length > 2)
                    return;

                // write i18n file
                var filename = value + '.i18n.json';
                console.log('copying ' + filename + ' to ' + target);
                fs.writeFile(target + filename, JSON.stringify(locales[value], null, 4));
            });
        }
    });
});

request(inputFile).pipe(parser);
