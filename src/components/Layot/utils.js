export function percentDiff(asset, coin) {
  return +(100 * Math.abs((asset - coin) / ((asset + coin) / 2))).toFixed(2);
}
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}
