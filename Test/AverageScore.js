function getAverage(array) {
    let result = 0;
    for(let i = 0; i <= array.length-1; i++){
      result = array[i] + result;
    }
      return result/(array.length);
  }
  
  console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
  console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]));


// return 71.7.
// return 85.4.