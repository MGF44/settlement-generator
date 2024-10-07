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

export default randomInt;
export { randomIntInc, randomNumbersWithFixedSum };
