import { describe, it, expect } from "vitest";
import { DUTCH_PHONE_PATTERN, formatDutchPhone } from "@/lib/phone";

describe("formatDutchPhone", () => {
  it("formats a mobile number typed with the national leading zero", () => {
    expect(formatDutchPhone("0612345678")).toBe("+31 6 1234 5678");
    expect(DUTCH_PHONE_PATTERN.test(formatDutchPhone("0612345678"))).toBe(true);
  });
  it("formats a mobile number typed without the zero and with the country code", () => {
    expect(formatDutchPhone("612345678")).toBe("+31 6 1234 5678");
    expect(formatDutchPhone("+31612345678")).toBe("+31 6 1234 5678");
    expect(formatDutchPhone("0031612345678")).toBe("+31 6 1234 5678");
  });
  it("formats an Amsterdam landline", () => {
    expect(formatDutchPhone("0201234567")).toBe("+31 20 123 4567");
  });
  it("clears when the prefix is deleted", () => {
    expect(formatDutchPhone("+31")).toBe("");
    expect(formatDutchPhone("")).toBe("");
  });
});
