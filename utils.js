function lookUpValue(name, lookUpObj) {
  for (const obj in lookUpObj) {
    if (obj === name) {
      return lookUpObj[obj];
    }
  }
}

function createLookUpObj(list, name1, name2) {
  const lookUpObj = {};
  list.forEach((item) => {
    lookUpObj[item[name1]] = item[name2];
  });
  return lookUpObj;
}

module.exports = { lookUpValue, createLookUpObj };
