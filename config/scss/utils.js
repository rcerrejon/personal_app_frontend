const path = require("path");
const fs = require("fs");
var sass = require('node-sass');

const resources = ["variables.scss"];
let innerRes;

// innerRes = resources.reduce((summaryFile, currentFile) => {
//   fs.readFile("./"+currentFile,'utf8', (err, data) => {
//     if (err) throw err;
//     summaryFile += data;
//     console.log(summaryFile)
//   })
//   return summaryFile;
// })

// innerRes = fs.readFileSync(path.resolve(__dirname, "./variables.scss"));
//
// fs.writeFile('./test.txt', innerRes, (err) => {
//   // if (err) throw err;
//   console.log('It\'s saved! ' + innerRes);
// });

module.exports = innerRes;
// module.exports = resources.map(file => path.resolve(__dirname, file));
