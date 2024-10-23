const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomIntInc = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomNumbersWithFixedSum = (quantity: number, sum: number): number[] => {
  if (quantity === 1) {
    return [sum];
  }
  const randomNum = randomIntInc(0, sum);
  return [
    randomNum,
    ...randomNumbersWithFixedSum(quantity - 1, sum - randomNum),
  ];
};



function randomArrayFromSum(len: number, sum: number, diff: number) {
  let _sum = 0;
  const arr = [];
  var n, i;

  if (!diff && diff !== 0) {
    diff = 100;
  }

  for (i = 0; i < len; i++) {
    var from = (100 - diff) * 1000;
    var to = (100 + diff) * 1000;
    n = Math.floor(Math.random() * (to - from + 1) + from); //random integer between from..to
    _sum += n;
    arr.push(n);
  }

  var x = sum / _sum;

  _sum = 0; //count sum (again)
  for (let i = 0; i < len; i++) {
    arr[i] = Math.round(arr[i] * x);
    _sum += arr[i];
  }

  var diff = sum - _sum;

  // Correct the array if its sum does not match required sum (usually by a small bit)
  if (diff) {
    x = diff / Math.abs(diff); //x will be 1 or -1
    var j = 0;
    while (diff && j < 1000) { //limit to a finite number of 'corrections'
      i = Math.floor(Math.random() * (len + 1)); //random index in the array
      if (arr[i] + x >= 0) {
        arr[i] += x;
        diff -= x;
      }
      j++;
    }
  }

  return arr;
}

export default randomInt;
export { randomIntInc, randomNumbersWithFixedSum, randomArrayFromSum };
