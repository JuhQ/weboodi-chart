import { expect } from "chai";
import "mocha";
import { notEmpty, notEmptyList } from "./listUtils";

describe("List utils", () => {
  describe("notEmpty()", () => {
    it("Should return false if a string is empty", () => {
      const result = notEmpty("");
      expect(result).to.equal(false);
    });
    it("Should return true if a string is not empty", () => {
      const result = notEmpty("Hello");
      expect(result).to.equal(true);
    });
  });
  describe("notEmptyList()", () => {
    it("Should return false if a list is empty", () => {
      const result = notEmptyList([]);
      expect(result).to.equal(false);
    });
    it("Should return true if a list is not empty", () => {
      const result = notEmptyList(["a"]);
      expect(result).to.equal(true);
    });
  });
});
