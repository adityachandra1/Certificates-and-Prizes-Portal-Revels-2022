const readXlsxFile = require('read-excel-file/node')

// Map to read the Excel into
const map = {
    "Name": "name",
    "Email": "email",
    "Event Name": "event"
}

const excelToJson = (path) => {
    try {
        readXlsxFile(path, { map }).then(({ rows }) => {
            var fs = require('fs');
            fs.writeFile("./uploads/email_list.json", JSON.stringify(rows, null, 2), function(err) {
                if (err) {
                    console.log(err);
                }
            });
        })
    } catch (err) {
        console.log(err)
    }
};

module.exports = excelToJson;