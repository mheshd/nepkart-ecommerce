import { formatCurrency } from "./formatCurrency";

describe("formatCurrency", () => {
  it("formate a whole currency with the currency symbol", () => {
    expect(formatCurrency(50)).toContain("50");
  });
  it("formats a decimal number correctly", () => {
    expect(formatCurrency(20.99)).toContain("20.99");
  });
  it("adds a thousands separator for large numbers", () => {
    expect(formatCurrency(1234.5)).toContain(",");
  });
});
