import { ICreateNotification } from "../utils/types";
import { TCarItemCreate } from "../utils/types/carItem";
import { apiEndpoints } from "./api.endpoints";

export const getAllCarItems = async (locale: string = "en", limit = 10) => {
  const response = await fetch(`/api/carItem/get-carItem?limit=${limit}`, {
    headers: { "Accept-Language": locale },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch car items");
  }
  const result = await response.json();
  return result;
};

export interface IRemoveCarItemResponse {
  result: any;
  notification: ICreateNotification | null;
}

export const removeCarItem = async (
  id: string,
  locale: string = "en"
): Promise<IRemoveCarItemResponse> => {
  const response = await fetch(`/api/carItem/delete-carItem?id=${id}`, {
    method: "DELETE",
    headers: { "Accept-Language": locale },
  });

  const result: IRemoveCarItemResponse = await response.json();
  console.log(result);
  return result;
};

export interface ICreateCarItemResponse {
  carItem: any;
  notification: ICreateNotification | null;
}

export const createCarItem = async (
  carItem: TCarItemCreate
): Promise<ICreateCarItemResponse> => {
  const response = await fetch(apiEndpoints.createCarItem, {
    method: "POST",
    body: JSON.stringify(carItem),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to add car items");
  }

  const result: ICreateCarItemResponse = await response.json();
  return result;
};
