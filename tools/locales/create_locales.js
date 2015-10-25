var fs = require('fs');
var parse = require('csv-parse');

var inputFile = 'locale.csv';

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
                var filename = value + '.i18n.json';
                console.log('copying ' + filename + ' to ' + target);
                fs.writeFile(target + filename, JSON.stringify(locales[value], null, 4));
            });
        }
    });
});
fs.createReadStream(inputFile).pipe(parser); 