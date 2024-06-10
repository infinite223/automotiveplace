import { TPerformanceType } from "@/app/utils/types";
import {
  performanceValidation,
  priceValidation,
} from "@/app/utils/validation/globalValidation";

describe("priceValidation", () => {
  test("should return error for price greater than 200000 for CarItem", () => {
    const result = priceValidation(250000, "CarItem");
    expect(result.valid).toBe(false);
    expect(result.error).toContain("Czy na pewno podałeś dobrą cene elemento?");
  });

  test("should return error for price greater than 2000000 for Project", () => {
    const result = priceValidation(2500000, "Project");
    expect(result.valid).toBe(false);
    expect(result.error).toContain("Czy na pewno podałeś dobrą cene projektu?");
  });

  test("should return error for price greater than 1000000 for Stage", () => {
    const result = priceValidation(1500000, "Stage");
    expect(result.valid).toBe(false);
    expect(result.error).toContain(
      "Czy na pewno podałeś dobrą cene etapu modyfikacji?"
    );
  });

  test("should return error for price less than 5", () => {
    const result = priceValidation(3, "CarItem");
    expect(result.valid).toBe(false);
    expect(result.error).toContain("Etap nie może kosztować tak mało");
  });
});

describe("performanceValidation", () => {
  test("should return error for invalid hp", () => {
    const data: TPerformanceType = {
      hp: 4000,
      nm: 500,
      acc_0_100: 5,
      acc_100_200: 10,
      acc_50_150: 15,
      sl_100_0: 50,
      sl_150_50: 50,
    };
    const result = performanceValidation(data);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("Moc pojazdu nie jest poprawna");
  });

  test("should return error for invalid nm", () => {
    const data: TPerformanceType = {
      hp: 500,
      nm: 5000,
      acc_0_100: 5,
      acc_100_200: 10,
      acc_50_150: 15,
      sl_100_0: 50,
      sl_150_50: 50,
    };
    const result = performanceValidation(data);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("Moment obrotowy pojazdu nie jest poprawny");
  });

  test("should return error for invalid acc_0_100", () => {
    const data: TPerformanceType = {
      hp: 500,
      nm: 500,
      acc_0_100: 200,
      acc_100_200: 10,
      acc_50_150: 15,
      sl_100_0: 50,
      sl_150_50: 50,
    };
    const result = performanceValidation(data);
    expect(result.valid).toBe(false);
    expect(result.error).toContain(
      "Przyśpieszenie od 0 do 100 pojazdu nie jest poprawne"
    );
  });

  test("should return valid for correct data", () => {
    const data: TPerformanceType = {
      hp: 500,
      nm: 500,
      acc_0_100: 5,
      acc_100_200: 10,
      acc_50_150: 15,
      sl_100_0: 50,
      sl_150_50: 50,
    };
    const result = performanceValidation(data);
    expect(result.valid).toBe(true);
    expect(result.error).toBe("");
  });
});
