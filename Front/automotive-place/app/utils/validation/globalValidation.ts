import { TPerformanceType, TValidResult } from "../types";

export const priceValidation = (
  price: number,
  type: "CarItem" | "Project" | "Stage"
) => {
  let validResults: TValidResult[] = [];

  if (typeof price !== "number") {
    validResults.push({
      error: " Błąd walidacji ceny, sporóbuj ponownie",
      valid: false,
    });
  }

  if (type === "CarItem") {
    if (price > 200000) {
      validResults.push({
        error: " Czy na pewno podałeś dobrą cene elemento?",
        valid: true,
      });
    }
  }

  if (type === "Project") {
    if (price > 2000000) {
      validResults.push({
        error: "Czy na pewno podałeś dobrą cene projektu?",
        valid: true,
      });
    }
  }

  if (type === "Stage") {
    if (price > 1000000) {
      validResults.push({
        error: "Czy na pewno podałeś dobrą cene etapu modyfikacji?",
        valid: true,
      });
    }
  }

  if (price < 5) {
    validResults.push({
      error: "Etap nie może kosztować tak mało",
      valid: false,
    });
  }

  return validResults;
};

export const performanceValidation = (data: TPerformanceType) => {
  let validResults: TValidResult[] = [];

  if (data.hp > 3000 || data.hp < 5) {
    validResults.push({ error: "Moc pojazdu nie jest poprawna", valid: false });
  }

  if (data.nm > 4000 || data.nm < 5) {
    validResults.push({
      error: " oment obrotowy pojazdu nie jest poprawny",
      valid: false,
    });
  }

  if (data.acc_0_100 && (data.acc_0_100 > 100 || data.acc_0_100 < 0.5)) {
    validResults.push({
      error: "Przyśpieszenie od 0 do 100 pojazdu nie jest poprawne",
      valid: false,
    });
  }

  if (data.acc_100_200 && (data.acc_100_200 > 100 || data.acc_100_200 < 2)) {
    validResults.push({
      error: "Przyśpieszenie od 0 do 100 pojazdu nie jest poprawne",
      valid: false,
    });
  }

  if (data.acc_50_150 && (data.acc_50_150 > 100 || data.acc_50_150 < 1)) {
    validResults.push({
      error: "Przyśpieszenie od 0 do 100 pojazdu nie jest poprawne",
      valid: false,
    });
  }

  if (data.sl_100_0 && (data.sl_100_0 > 300 || data.sl_100_0 < 10)) {
    validResults.push({
      error: "Droga hamowania od 100 do 0 pojazdu nie jest poprawna",
      valid: false,
    });
  }

  if (data.sl_150_50 && (data.sl_150_50 > 300 || data.sl_150_50 < 10)) {
    validResults.push({
      error: "Droga hamowania od 150 do 50 pojazdu nie jest poprawna",
      valid: false,
    });
  }

  return validResults;
};
