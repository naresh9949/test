import {getLogs,CreateLog } from "./../storageHandler";
const mockLocalStorage = (function () {
  let store = {};
  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value;
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: mockLocalStorage,
  });
});

test("getLogs returns empty array when no elements present", () => {
  expect(getLogs()).toEqual([]);
});

test("setLog & getLogs Working", () => {
  
  CreateLog({},"");
  CreateLog({},"");
  console.log(getLogs())
  expect(getLogs().length).toEqual(2);
  
});
