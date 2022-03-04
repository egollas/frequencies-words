const fs = require('fs');
var path = require('path');
const readline = require('readline');

const {InvalidFileExt} = require("../errors/index");

const generateCountWords = (result, lines) => {
  // Remove all the characters from lines
  // lowercase all the characters and create an array with results
  // filter only for valid content
  const words = lines.replace(/\s+/g, " ")
  .replace(/[.,?!;()"'-]/g,"")
  .toLowerCase()
  .split(" ")
  .filter(Boolean);

  // init word count for list
  words.forEach(c => {
    result[c]||=0;
    result[c]++;
  });

  return result;
}

function getAllIndexes(arr, val) {
  let indexes = [], i;
  for(i = 0; i < arr.length; i++)
  if (arr[i] === val)
    indexes.push(i);
  return indexes;
}

const formatResults = (result, topN) => {
  const values = Object.values(result)
  const keys = Object.keys(result)
  //remove repeted count values and sort them for highhest ones
  const topValues = [...new Set(values)].sort((a,b) => b - a ).slice(0, topN);

  const formattedInformation = topValues.reduce((total, value) => {
    if(total.length >= topN) return total;

    const indexes = getAllIndexes(values, value);
    const words = indexes.map(index => ({
      "word": keys[index],
      "count": value,
    }))

    return [
      ...total,
      ...words,
    ];
  }, []);

  // some other new information was fet from the indexes, list needs to be slice again
  return formattedInformation.slice(0, topN);
}

/**
 * Function getHighFrecuencyWords, count the highhest frecuency words.
 */
async function getHighFrecuencyWords(file, topN) {
    if(path.extname(file)!==".txt") throw new InvalidFileExt("Invalid document");
    // console.time('codezup')
    let result = {};
    const rl = readline.createInterface({
      input: fs.createReadStream(file),
      crlfDelay: Infinity
    });

    let lineBlock = "";
    let lineMax = 0;

    for await (const line of rl) {
      if(lineMax++ === 10000){
        generateCountWords(result, lineBlock)
        lineMax = 0;
        lineBlock = "";
      }else{
        lineMax += 1;
        lineBlock += ` ${line}`;
      }
    }

    if(lineMax > 0){
      generateCountWords(result, lineBlock)
    }

    const formmattedResult = formatResults(result, topN);

    // console.log('Reading file line by line with readline done.');
    // const used = process.memoryUsage().heapUsed / 1024 / 1024;
    // console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    // console.timeEnd('codezup')

    return formmattedResult;
};

module.exports =  getHighFrecuencyWords;
