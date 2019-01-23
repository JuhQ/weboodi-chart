import { expect } from "chai";
import "mocha";
import { isArray, isFloat, isString, isTruthy } from "./validators";

describe("Validators", () => {
  describe("isString()", () => {
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
  describe("isFloat()", () => {
    it("Should return true if the parameter is a float", () => {
      const result = isFloat(0.25);
      expect(result).to.equal(true);
    });
    it("Should return false if the parameter is not a float #1", () => {
      const result = isString(42);
      expect(result).to.equal(false);
    });
    it("Should return false if the parameter is not a float #2", () => {
      const result = isFloat(3);
      expect(result).to.equal(false);
    });
    it("Should return false if the parameter is not a float #3", () => {
      const result = isString(undefined);
      expect(result).to.equal(false);
    });
  });
  describe("isArray()", () => {
    it("Should return true if the parameter is an array #1", () => {
      const result = isArray([1, 2, 3, 4]);
      expect(result).to.equal(true);
    });
    it("Should return true if the parameter is an array #2", () => {
      const result = isArray([]);
      expect(result).to.equal(true);
    });
    it("Should return false if the parameter is not an array #1", () => {
      const result = isArray(42);
      expect(result).to.equal(false);
    });
    it("Should return false if the parameter is not an array #3", () => {
      const result = isArray(undefined);
      expect(result).to.equal(false);
    });
  });
  describe("isTruthy()", () => {
    it("Should return true if the parameter is truthy #1", () => {
      const result = ["jee"].filter(isTruthy);
      expect(result.length).to.equal(1);
      expect(result[0]).to.equal("jee");
    });
    it("Should return true if the parameter is truthy #2", () => {
      const result = [true].filter(isTruthy);
      expect(result.length).to.equal(1);
      expect(result[0]).to.equal(true);
    });
    it("Should return false if the parameter is not truthy #1", () => {
      const result = [false].filter(isTruthy);
      expect(result.length).to.equal(0);
    });
    it("Should return false if the parameter is not truthy #2", () => {
      const result = [undefined].filter(isTruthy);
      expect(result.length).to.equal(0);
    });
    it("Should return false if the parameter is not truthy #3", () => {
      const result = [0].filter(isTruthy);
      expect(result.length).to.equal(0);
    });
  });
});
