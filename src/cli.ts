import { parseCsv, convertForCSV, createChunksFromArray } from './utils';

const rotateRows = (listOfRows: Array<Array<number>>) => {
  const numOfRows = listOfRows.length;
  let lastPopped: number | undefined;
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
      const lastShifted: number | undefined = listOfRows[i].shift();
      // If a number was shifted, it needs to be added to the prev row
      listOfRows[i - 1].unshift(lastShifted as number)
    }
  }
  // Push the last popped number to the last row
  listOfRows[numOfRows - 1].push(lastPopped as number);

  // Check if it may have another rotate-able set within
  if ((numOfRows - 2) > 1) {
    const fullRows: Array<Array<number>> = [];
    for (let j = 1; j < (numOfRows - 1); j++) {
      fullRows.push(listOfRows[j].splice(1, (numOfRows - 2)))
    }
    // Shed the first and last elements of each row
    const subRotated = rotateRows(fullRows)
    // After the rotation, add them back to where they were extracted from
    for (let j = 0; j < subRotated.length; j++) {
      listOfRows[j + 1].splice(1, 0, ...subRotated[j]);
    }
  }

  return listOfRows;
}

const rotate = (data: Array<number>) => {
  const numOfElements = data.length;
  // If the length is 1, no need to process further as the data is valid
  if (numOfElements === 1) {
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
  const rowsList = createChunksFromArray(data, sqRootOfLength)
  const processedRows: Array<Array<number>> = rotateRows(JSON.parse(JSON.stringify(rowsList)))  // Sending a copy of original matrix
  return {
    json: processedRows.flat(),
    isValid: true
  }
}

const initialize = async () => {
  try {
    const inputCSVPath = process.argv[2]; // The 2nd argument will hold the path to the csv file
    const parsedIncomingData: Array<Array<string>> = await parseCsv(inputCSVPath)

    const listOfTables = parsedIncomingData.map(([id, arr]) => ({ id, json: JSON.parse(arr as string), isValid: false }))

    const finalOutput: Array<OutPutRowObject> = listOfTables.map((row) => {
      const { json, isValid } = rotate(row.json)
      return {
        id: row.id as string,
        json,
        is_valid: isValid
      }
    });
    const finalOutputForCSV = convertForCSV(finalOutput)
    process.stdout.write(finalOutputForCSV)
    return finalOutputForCSV;
  } catch (exc) {
    throw exc;
  }
}

initialize()