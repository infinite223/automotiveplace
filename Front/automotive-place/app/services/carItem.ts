import { TCarItemCreate } from "../utils/types";

export const getAllCarItems = async (limit = 10) => {
    const response = await fetch(`/api/carItem/get-carItem?limit=${limit}`);
    if (!response.ok) {
        throw new Error('Failed to fetch car items');
    }
    const result = await response.json();
    return result;
}

export const removeCarItem = async (id: string) => {
    const response = await fetch(`/api/carItem/delete-carItem?id=${id}`, {method: "DELETE"});
    if (!response.ok) {
        throw new Error('Failed to remove car items');
    }
    const result = await response.json();
    return result;
}

export const createCarItem = async (carItem: TCarItemCreate) => {
    const response = await fetch(`/api/carItem/add-carItem`, {method: "POST", body: JSON.stringify(carItem), headers: {"Content-Type": "application/json"}});
    if (!response.ok) {
        throw new Error('Failed to add car items');
    }
    
    const result = await response.json();
    return result;
}
