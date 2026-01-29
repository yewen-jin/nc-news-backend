function lookUpValue(name, lookUpObj) {
  for (const obj in lookUpObj) {
    // console.log(obj);
    if (obj === name) {
      //   console.log(lookUpObj[obj]);
      return lookUpObj[obj];
    }
  }
}

function createLookUpObj(list, name1, name2) {
  //list is an array containing objects that look something like: { name2: 1, name1:"some string"}
  //both name1 and name2 are strings, and are keys in obj
  const lookUpObj = {};
  list.forEach((item) => {
    lookUpObj[item[name1]] = item[name2];
  });
  //   console.log(lookUpObj);
  return lookUpObj;
}
module.exports = { lookUpValue, createLookUpObj };
