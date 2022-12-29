const data = [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16];

const rotateRows = ([...listOfRows]) => {
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
      // if(lastShifted !== undefined) {
      listOfRows[i - 1].unshift(lastShifted)
      // }
    }
  }
  // Push the last popped number to the last row
  listOfRows[numOfRows - 1].push(lastPopped);
  return listOfRows;
}

const rotate = () => {
  const sqRootOfLength = Math.sqrt(data.length);
  // If the length is not a perfect sqaure, return invalid json
  if ((sqRootOfLength % 1) !== 0) {
    console.log([])
    return [];
  }

  // Break the data into small chunks of n elems where n=sqRootOfLength
  const rowsList = []
  for (let i = 0; i < data.length; i += sqRootOfLength) {
    const initRow = data.slice(i, i + sqRootOfLength);

    rowsList.push(initRow)
  }
  const processedRows = rotateRows(rowsList)
  // let lastPopped;
  // for (let i = 0; i < sqRootOfLength; i++) {
  //   // For the first (n-2) rows
  //   //   The last number will move to the next row
  //   if (i !== (sqRootOfLength - 1)) {
  //     const tempPop = rowsList[i].pop();
  //     // lastPopped is undefined only when initialized.
  //     // So, if it has a value, it needs to be assigned to the current row
  //     if (lastPopped !== undefined) {
  //       rowsList[i].push(lastPopped)
  //     }
  //     // Set the lastPopped value to the most recent popped value
  //     lastPopped = tempPop;
  //   }

  //   // From the second to (n-1) rows
  //   //  The first number moves to the previous row.
  //   if (i > 0) {
  //     // Extract the first number and move up
  //     const lastShifted = rowsList[i].shift();
  //     // If a number was shifted, it needs to be added to the prev row
  //     // if(lastShifted !== undefined) {
  //     rowsList[i - 1].unshift(lastShifted)
  //     // }
  //   }
  // }
  // // Push the last popped number to the last row
  // rowsList[sqRootOfLength - 1].push(lastPopped);
  console.log([].concat(...rowsList))
}

rotate()