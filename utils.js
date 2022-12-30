const fs = require('fs');
const { parse } = require('csv-parse');

/**
 * The method reads the content of the CSV file and returns the rows with data.
 * The first row (index 0 or line 1) is ignored as they are assumed to be headers 
 * @param {String} csvPath - Path to the CSV file
 * @returns {Promise} - A Promise that resolves with CSV rows in the form of Array of Arrays.
 */
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
    } catch (exc) {
      reject(exc);
    }
  })
}

/**
 * Takes in an input and transforms it to its corresponding CSV content.
 * The keys of the object within are considered as column headers for the CSV translation.
 * @param {Array} arr - An array of objects to be transformed into csv content
 * @returns {String} - Transformed Array in String format.
 */
const convertForCSV = (arr) => {
  const output = []
  output.push(Object.keys(arr[0])); // First row should be headers/ Title
  arr.forEach(({ id, json, is_valid: isValid }) => {
    const rowArr = [];
    rowArr.push(id, JSON.stringify(json), isValid)
    output.push(rowArr)
  })

  return output.join('\n')
}

/**
 * The method takes in an array input and beaks it into chunks of desired size 
 * @param {Array} arr - The array from which needs to be broken into chunks
 * @param {Number} chunkSize - The size of each chunk 
 * @returns {Array} An array containing chunks as arrays.
 */
const createChunksFromArray = (arr, chunkSize) => {
  const rowsList = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    const initRow = arr.slice(i, i + chunkSize);

    rowsList.push(initRow)
  }
  return rowsList;
}

module.exports = { parseCsv, convertForCSV, createChunksFromArray }