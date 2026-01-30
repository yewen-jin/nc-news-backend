function createLookupObj(list, name1, name2) {
  const lookupObj = {};
  list.forEach((item) => {
    lookupObj[item[name1]] = item[name2];
  });
  return lookupObj;
}

module.exports = { createLookupObj };
