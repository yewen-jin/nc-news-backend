//this file is the endpoint of where everything joins forces
const devData = require("../data/development-data/index.js");
const seed = require("./seed.js");
const db = require("../connection.js");

const runSeed = () => {
  console.log("devData: ", devData);
  // console.log("seed: ", seed());
  // console.log("db: ", db);
  return seed(devData).then(() => {
    db.end();
  });
};

runSeed();
