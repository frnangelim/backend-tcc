function getDate() {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}
function getFullDate() {
  const today = new Date();
  return `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
}

export default {
  getDate,
  getFullDate,
};
