const format = require("pg-format");
const NotFoundError = require("./errors/not-found-error");

const checkExists = (table, column, value) => {
  const queryStr = format("SELECT * FROM %I WHERE %I = $1", table, column);
  return db.query(queryStr, [value]).then(({ rows }) => {
    if (rows.length === 0) {
      throw new NotFoundError("resource not found!");
    }
  });
};

function createLookupObj(list, name1, name2) {
  const lookupObj = {};
  list.forEach((item) => {
    lookupObj[item[name1]] = item[name2];
  });
  return lookupObj;
}

module.exports = { createLookupObj, checkExists };
