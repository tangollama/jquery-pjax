const S = require('string');
const child_process = require('child_process');
const fs = require('fs');

const git = child_process.exec('git log --format=%ae', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  let counts = new Array();
  let sortedcounts = new Array();
  var dataArray = S(stdout).split('\n');
  for(var i=0; i<dataArray.length; i++) {
    var j = (counts[dataArray[i]]) ? counts[dataArray[i]] : 0;
    j++;
    counts[dataArray[i]] = j;
  }  
  for(var key in counts) {
    if(counts.hasOwnProperty(key)) {
      if (key != null && S(key).trim() != "") {        
        sortedcounts.push({
          key: key,
          count: counts[key]
        });
      }
    }
  }
  sortedcounts.sort(function(a,b) {
    if (a.count < b.count) {
      return 1;
    }
    if (a.count > b.count) {
      return -1;
    }
    return 0;
  });
  for (var k = 0; k < sortedcounts.length; k++) {
    console.log(`\t${sortedcounts[k].count}\t${sortedcounts[k].key}`);
  }
});