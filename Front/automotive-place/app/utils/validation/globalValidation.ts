import { TPerformanceType, TValidResult } from "../types";
import { TCarItem } from "../types/carItem";

export const priceValidation = (
  price: number,
  type: "CarItem" | "Project" | "Stage"
) => {
  let validResult: TValidResult = { error: "", valid: true };

  if (typeof price === "number") {
    validResult.error += " Błąd walidacji ceny, sporóbuj ponownie";
    validResult.valid = false;
  }

  if (type === "CarItem") {
    if (price > 200000) {
      validResult.error += " Czy na pewno podałeś dobrą cene elemento?";
    }
  }

  if (type === "Project") {
    if (price > 2000000) {
      validResult.error += " Czy na pewno podałeś dobrą cene projektu?";
    }
  }

  if (type === "Stage") {
    if (price > 1000000) {
      validResult.error +=
        " Czy na pewno podałeś dobrą cene etapu modyfikacji?";
    }
  }

  if (price < 5) {
    validResult.error += " Etap nie może kosztować tak mało";
    validResult.valid = false;
  }

  return validResult;
};

export const performanceValidation = (data: TPerformanceType) => {
  let validResult: TValidResult = { error: "", valid: true };

  if (data.hp > 3000 || data.hp < 5) {
    validResult.error += " Moc pojazdu nie jest poprawna";
  }

  if (data.nm > 4000 || data.nm < 5) {
    validResult.error += " Moment obrotowy pojazdu nie jest poprawny";
  }

  if (data.acc_0_100 && (data.acc_0_100 > 100 || data.acc_0_100 < 0.5)) {
    validResult.error +=
      " Przyśpieszenie od 0 do 100 pojazdu nie jest poprawne";
  }

  if (data.acc_100_200 && (data.acc_100_200 > 100 || data.acc_100_200 < 2)) {
    validResult.error +=
      " Przyśpieszenie od 0 do 100 pojazdu nie jest poprawne";
  }

  if (data.acc_50_150 && (data.acc_50_150 > 100 || data.acc_50_150 < 1)) {
    validResult.error +=
      " Przyśpieszenie od 0 do 100 pojazdu nie jest poprawne";
  }

  if (data.sl_100_0 && (data.sl_100_0 > 300 || data.sl_100_0 < 10)) {
    validResult.error +=
      " Droga hamowania od 100 do 0 pojazdu nie jest poprawne";
  }

  if (data.sl_150_50 && (data.sl_150_50 > 300 || data.sl_150_50 < 10)) {
    validResult.error +=
      " Droga hamowania od 150 do 50 pojazdu nie jest poprawne";
  }

  if (validResult.error.length > 0) {
    validResult.valid = false;
  }

  return validResult;
};
