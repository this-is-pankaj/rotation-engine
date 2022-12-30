# Rotation Engine

A sample program to rotate all the elements in a n x n array that form square edges. For instance: `[1,2,3,4]` will be treated as a matrix of 2x2 and will be rotated to output `[3,1,4,2]`. This matrix had possibly no sub-square, but the likes of 5x5 that do hold a sub-square matrix of 3x3 will be rotated and transformed accrodingly.

## How to execute
### Pre-requisites
- Node
- Npm/ Yarn
- CSV file with data (example below)

### Steps
- Install the package dependencies by running `npm i` or `yarn install`
- Build using `npm run build` or `yarn build`
- Execute - `node .\cli.js input.csv > output.csv`

On successful execution you could see the output.csv file with result.

## Help and Troubleshooting
- The program expects input in the form of a csv file. The content should be in the following format:
```
id,json
0,"[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]"
56,"[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]"
1,"[1,2,3,4,5,6,7,8,9]"
2,"[40,20,90,10]"
3,[-5]
9,"[2, -0]"
5,"[2,-5,-5]"
8,"[1,1,1,1,1]"
```

You can expect the output to be like:
```
id,json,is_valid
0,[5,1,2,3,9,10,6,4,13,11,7,8,14,15,16,12],true
56,[6,1,2,3,4,11,12,7,8,5,16,17,13,9,10,21,18,19,14,15,22,23,24,25,20],true
1,[4,1,2,7,5,3,8,9,6],true
2,[90,40,10,20],true
3,[-5],true
9,[],false
5,[],false
8,[],false
```

- The build command might possibly fail due to presence of old build files. In that case simply delete the `cli.js` and `util.js` files in the root and re-run the build command.
