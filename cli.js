const { parseCsv, convertForCSV } = require('./utils');

const rotateRows = (listOfRows) => {
  const numOfRows = listOfRows.length;
  let lastPopped;
  for (let i = 0; i < numOfRows; i++) {
    // For the first (n-2) rows
    //   The last number will move to the next row
    if (i !== (numOfRows - 1)) {
      const tempPop = listOfRows[i].pop();
      // lastPopped is undefined only when initialized.
      // So, if it has a value, it needs to be assigned to the current row
      if (lastPopped !== undefined) {
        listOfRows[i].push(lastPopped)
      }
      // Set the lastPopped value to the most recent popped value
      lastPopped = tempPop;
    }

    // From the second to (n-1) rows
    //  The first number moves to the previous row.
    if (i > 0) {
      // Extract the first number and move up
      const lastShifted = listOfRows[i].shift();
      // If a number was shifted, it needs to be added to the prev row
      listOfRows[i - 1].unshift(lastShifted)
    }
  }
  // Push the last popped number to the last row
  listOfRows[numOfRows - 1].push(lastPopped);

  // Check if it may have another rotate-able set within
  if((numOfRows-2) > 1) {
    const fullRows = [];
    for(let j = 1; j< (numOfRows -1); j++) {
      fullRows.push(listOfRows[j].splice(1, (numOfRows - 2)))
    }
    // Shed the first and last elements of each row
    const subRotated = rotateRows(fullRows)
    // After the rotation, add them back to where they were extracted from
    for(let j = 0; j< subRotated.length; j++) {
      listOfRows[j+1].splice(1,0,...subRotated[j]);
    }    
  }

  return listOfRows;
}

const rotate = (data) => {
  const numOfElements = data.length;
  // If the length is 1, no need to process further as the data is valid
  if(numOfElements === 1) {
    return {
      json: data,
      isValid: true
    }
  }

  const sqRootOfLength = Math.sqrt(numOfElements);
    // If the length is not a perfect sqaure, return invalid json
    if ((sqRootOfLength % 1) !== 0) {
      return {
        json: [],
        isValid: false
      };
    }

    // Break the data into small chunks of n elems where n=sqRootOfLength
    const rowsList = []
    for (let i = 0; i < numOfElements; i += sqRootOfLength) {
      const initRow = data.slice(i, i + sqRootOfLength);

      rowsList.push(initRow)
    }
    const processedRows = rotateRows(JSON.parse(JSON.stringify(rowsList)))  // Sending a copy of original matrix
    return {
      json: [].concat(...processedRows),
      isValid: true
    }
}

const initialize = async () => {
  const inputCSVPath = process.argv[2]; // The 2nd argument will hold the path to the csv file
  const incomingData = await parseCsv(inputCSVPath)
  const incomingDataAsMap = new Map(incomingData)
  const obj = {};
  incomingDataAsMap.forEach((v, k) => {
    // Create a custom dictionary with the available values
    obj[k] = {
      json: JSON.parse(v),
      isValid: false
    }
  })

  const finalOutput = [];
  for(let id in obj) {
    const data = obj[id].json;
    const { json, isValid } = rotate(data)
    finalOutput.push({ id, json, is_valid: isValid })
  }
  console.log(convertForCSV(finalOutput))
}

initialize()