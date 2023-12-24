export function getRepetionNumber(arrInput) {
  const obj = {};

  arrInput.forEach((e) => {
    if (obj[e.userId] === undefined) {
      obj[e.userId] = 1;
    } else {
      obj[e.userId]++;
    }
  });

  return obj;
}
