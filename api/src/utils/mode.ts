const mode = <T extends number | string>(array: Array<T>) => {
  if (array.length == 0) return null;
  const modeMap = {};
  let maxEl = array[0],
    maxCount = 1;
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    if (modeMap[el.toString()] == null) modeMap[el.toString()] = 1;
    else modeMap[el.toString()]++;
    if (modeMap[el.toString()] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el.toString()];
    }
  }
  return maxEl;
};

export default mode;
