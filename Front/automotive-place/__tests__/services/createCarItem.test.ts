import { createCarItem, ICreateCarItemResponse } from "@/app/services/carItem";
import { ItemTypes, TCarItemCreate } from "@/app/utils/types/carItem";
import { generateRandomCarItemsToCreate } from "@/app/utils/data/carItem";

describe("createCarItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return response data when API call is successful", async () => {
    const mockResponse: ICreateCarItemResponse = {
      carItem: { id: 1, name: "Test Car" },
      notification: {
        log: { date: new Date(), status: "Success", title: "" },
        timer: 3000,
      },
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const carItem: TCarItemCreate = generateRandomCarItemsToCreate(1)[0];
    const result = await createCarItem(carItem);

    expect(global.fetch).toHaveBeenCalledWith(`/api/carItem/add-carItem`, {
      method: "POST",
      body: JSON.stringify(carItem),
      headers: { "Content-Type": "application/json" },
    });

    expect(result).toEqual(mockResponse);
    expect(result.notification?.log.status).toBe("Success");
  });

  it("should throw an error when API call fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    const carItem: TCarItemCreate = generateRandomCarItemsToCreate(1)[0];
    await expect(createCarItem(carItem)).rejects.toThrow(
      "Failed to add car items"
    );
  });
});
