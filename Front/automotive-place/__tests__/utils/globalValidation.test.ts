import { TPerformanceType } from "@/app/utils/types";
import {
  performanceValidation,
  priceValidation,
} from "@/app/utils/validation/globalValidation";

describe("priceValidation", () => {
  test("should return error for price greater than 2000000 for Project", () => {
    const result = priceValidation(2500000, "Project");
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          error: "Czy na pewno podałeś dobrą cene projektu?",
          valid: true,
        }),
      ])
    );
  });

  test("should return error for price greater than 1000000 for Stage", () => {
    const result = priceValidation(1500000, "Stage");
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          error: "Czy na pewno podałeś dobrą cene etapu modyfikacji?",
          valid: true,
        }),
      ])
    );
  });

  test("should return error for price less than 5", () => {
    const result = priceValidation(3, "CarItem");
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          error: "Etap nie może kosztować tak mało",
          valid: false,
        }),
      ])
    );
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
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          error: "Moc pojazdu nie jest poprawna",
          valid: false,
        }),
      ])
    );
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
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          error: " oment obrotowy pojazdu nie jest poprawny",
          valid: false,
        }),
      ])
    );
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
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          error: "Przyśpieszenie od 0 do 100 pojazdu nie jest poprawne",
          valid: false,
        }),
      ])
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
    expect(result).toEqual([]);
  });
});
