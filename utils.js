const fs = require('fs');
const { parse } = require('csv-parse');

const parseCsv = (csvPath) => {
  return new Promise((resolve, reject) => {
    try {
      const streamedData = [];
      fs.createReadStream(csvPath)
        .pipe(parse({ delimiter: ",", from_line: 2 })) // No need to get the headers from csv
        .on("data", (row) => {
          streamedData.push(row)
        })
        .on('end', () => {
          resolve(streamedData)
        })
    } catch(exc) {
      reject(exc);
    }
  })
}

const convertForCSV = (arr) => {
  const output = []
  output.push(Object.keys(arr[0])); // First row should be headers/ Title
  arr.forEach(({id, json, is_valid: isValid}) => {
    const rowArr = [];
    rowArr.push(id, JSON.stringify(json), isValid)
    output.push(rowArr)
  })

  return output.join('\n')
}

module.exports = {parseCsv, convertForCSV}