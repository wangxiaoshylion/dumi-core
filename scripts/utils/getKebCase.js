// 驼峰转横杠
module.exports = function getKebabCase(str) {
  let temp = str.replace(/[A-Z]/g, function (i) {
    return '-' + i.toLowerCase();
  });
  if (temp.slice(0, 1) === '_') {
    temp = temp.slice(1);
  }
  return temp;
};
