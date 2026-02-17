import { checkText } from "./textModeration";

describe("checkText", () => {
  it("should allow clean text", () => {
    const result = checkText("Uwielbiam tuning silnika i klasyczne auta");
    expect(result.ok).toBe(true);
    expect(result.word).toBeUndefined();
  });

  it("should detect banned word in Polish", () => {
    const result = checkText("Chcę kupić marihuanę");
    expect(result.ok).toBe(false);
    expect(result.word).toBe("marihuanę");
  });

  it("should detect banned word in English", () => {
    const result = checkText("This post contains porn content");
    expect(result.ok).toBe(false);
    expect(result.word).toBe("porn");
  });

  it("should detect banned word regardless of case", () => {
    const result = checkText("This contains Sex content");
    expect(result.ok).toBe(false);
    expect(result.word).toBe("sex");
  });

  it("should detect banned word inside a sentence", () => {
    const result = checkText("I think gambling is bad for society");
    expect(result.ok).toBe(false);
    expect(result.word).toBe("gambling");
  });

  it("should detect first banned word if multiple present", () => {
    const result = checkText("This is porn and violence");
    expect(result.ok).toBe(false);
    expect(result.word).toBe("porn");
  });

  it("should allow text with words that are not banned", () => {
    const result = checkText("Auto jest szybkie i czerwone");
    expect(result.ok).toBe(true);
    expect(result.word).toBeUndefined();
  });
});
