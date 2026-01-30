const { lookupValue, createLookupObj } = require("../utils");

describe("lookupValue(name, lookupObj)", () => {
  test("takes a string and a lookup object, return the value that belong to the key that equals the input string", () => {
    const idLookup = { title1: 1, title2: 2 };
    const name = "title1";
    const id = lookupValue(name, idLookup);
    expect(id).toBe(1);
  });
});

describe("createLookupObj(list, var1, var2)", () => {
  test("doesn't mutate original array", () => {
    const list = [
      { title: "title1", id: 1, stuff: "blab" },
      { title: "title2", id: 2, stuff: "bfdskghb" },
      { title: "title3", id: 3, stuff: "bloop" },
    ];
    const listDup = [...list];
    const lookupStuff = createLookupObj(list, "title", "stuff");
    expect(list).toEqual(listDup);
  });
  test("returns an empty object when passed an empty array", () => {
    const lookupStuff = createLookupObj([], "blip", "blop");
    expect(lookupStuff).toEqual({});
  });
  test("returns an object with a single key-value pair when passed an array containing a single object", () => {
    const shoppingList = [{ item: "sausage", price: 5 }];
    const lookupPrice = createLookupObj(shoppingList, "item", "price");
    expect(lookupPrice).toEqual({ sausage: 5 });
  });
  test("returns an object with multiple key-value pairs when passed an array containing multiple objects", () => {
    const list = [
      { title: "title1", id: 1, someOtherStuff: "some random strings" },
      { title: "title2", id: 2, someOtherStuff: "randome strings" },
    ];
    const name1 = "title";
    const name2 = "id";
    const lookupObj = createLookupObj(list, name1, name2);
    expect(lookupObj).toEqual({ title1: 1, title2: 2 });
  });
});
