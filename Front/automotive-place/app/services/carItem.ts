import { ICreateNotification } from "../components/logger/Notification";
import { TCarItemCreate } from "../utils/types/carItem";

export const getAllCarItems = async (limit = 10) => {
  const response = await fetch(`/api/carItem/get-carItem?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch car items");
  }
  const result = await response.json();
  return result;
};

interface IRemoveCarItemResponse {
  result: any;
  notification: ICreateNotification | null;
}

export const removeCarItem = async (
  id: string
): Promise<IRemoveCarItemResponse> => {
  const response = await fetch(`/api/carItem/delete-carItem?id=${id}`, {
    method: "DELETE",
  });

  const result: IRemoveCarItemResponse = await response.json();
  console.log(result);
  return result;
};

interface ICreateCarItemResponse {
  carItem: any;
  notification: ICreateNotification | null;
}

export const createCarItem = async (
  carItem: TCarItemCreate
): Promise<ICreateCarItemResponse> => {
  const response = await fetch(`/api/carItem/add-carItem`, {
    method: "POST",
    body: JSON.stringify(carItem),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to add car items");
  }

  const result: ICreateCarItemResponse = await response.json();
  console.log(result);
  return result;
};
