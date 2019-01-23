import { expect } from "chai";
import "mocha";
import { isString } from "./validators";

describe("Validators", () => {
  describe("isString", () => {
    it("Should return true if the parameter is a string", () => {
      const result = isString("Hello");
      expect(result).to.equal(true);
    });
    it("Should return false if the parameter is not a string #1", () => {
      const result = isString(42);
      expect(result).to.equal(false);
    });
    it("Should return false if the parameter is not a string #2", () => {
      const result = isString({});
      expect(result).to.equal(false);
    });
    it("Should return false if the parameter is not a string #3", () => {
      const result = isString(undefined);
      expect(result).to.equal(false);
    });
  });
});
