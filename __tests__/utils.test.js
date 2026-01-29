const { lookUpValue, createLookUpObj } = require("../utils");

describe("lookUpValue(name, lookUpObj)", () => {
  test("takes a string and a lookup object, return the value that belong to the key that equals the input string", () => {
    const idLookUp = { title1: 1, title2: 2 };
    const name = "title1";
    const id = lookUpValue(name, idLookUp);
    expect(id).toBe(1);
  });
});

describe("createLookUpObj(list, var1, var2)", () => {
  test("takes an array of objects, 2 string arguments matching 2 of the object keys, and returns a lookup object with key-value pairs where each var1 value is the new key and each var2 value is the new value", () => {
    const list = [
      { title: "title1", id: 1, someOtherStuff: "some random strings" },
      { title: "title2", id: 2, someOtherStuff: "randome strings" },
    ];
    const var1 = "title";
    const var2 = "id";
    const lookUpObj = createLookUpObj(list, var1, var2);
    expect(lookUpObj).toEqual({ title1: 1, title2: 2 });
  });
});
