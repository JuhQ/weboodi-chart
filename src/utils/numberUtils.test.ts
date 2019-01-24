import { expect } from "chai";
import "mocha";
import { average, sum } from "./numberUtils";

describe("Number utils", () => {
  describe("sum()", () => {
    it("Should return correct sum #1", () => {
      const result = sum(1, 2);
      expect(result).to.equal(3);
    });
    it("Should return correct sum #2", () => {
      const result = sum(0, 2);
      expect(result).to.equal(2);
    });
    it("Should return correct sum #2", () => {
      const result = sum(2, 0);
      expect(result).to.equal(2);
    });
  });
  describe("average()", () => {
    it("Should return correct average #1", () => {
      const result = average([1, 2, 3]);
      expect(result).to.equal(2);
    });
    it("Should return correct average #2", () => {
      const result = average([1, 0, 0]);
      expect(result).to.equal(1 / 3);
    });
  });
});
