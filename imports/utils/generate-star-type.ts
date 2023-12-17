export function generateStarType(starTypes) {
  let num = Math.random() * 100.0;
  let pct = starTypes.percentage;
  for (let i = 0; i < pct.length; i++) {
    num -= pct[i];
    if (num < 0) {
      return i;
    }
  }
  return 0;
}
