const readXlsxFile = require('read-excel-file/node');
const csv = require('csvtojson');

// Map to read the Excel file into
const map = {
    "Name": "name",
    "Email": "email",
    "Event Name": "event"
};

const excelToJson = (path, dest) => {
    try {
        readXlsxFile(path, { map }).then(({ rows }) => {
            var fs = require('fs');
            fs.writeFile(dest, JSON.stringify(rows, null, 2), function(err) {
                if (err) {
                    console.log(err);
                }
            });
        })
    } catch (err) {
        console.log(err);
    }
};

const csvToJson = (path, dest) => {
    try {
        csv()
            .fromFile(path)
            .then((jsonObj) => {
                var fs = require('fs');
                fs.writeFile(dest, JSON.stringify(jsonObj, null, 2), function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            })
    } catch (err) {
        console.log(err);
    }
};

const toJson = (path, dest) => {
    if (path.includes(".xlsx")) {
        excelToJson(path, dest);
    } else if (path.includes(".csv")) {
        csvToJson(path, dest);
    } else {
        console.log("Unsupported file format for conversion");
    }
}

module.exports = toJson;