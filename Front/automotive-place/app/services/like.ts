import { ICreateNotification, TContentTypes } from "../utils/types";

export const createLike = async (contentId: string, type: TContentTypes) => {
  try {
    const response = await fetch(`/api/like/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likeableId: contentId,
        likeableType: type.toUpperCase(),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Coś poszło nie tak");
    }

    const result = await response.json();
    return result as { notification: ICreateNotification };
  } catch (error) {
    console.error("Błąd podczas dodawania lajka:", error);
    throw error;
  }
};

export const deleteLike = async (likeableId: string) => {
  try {
    const response = await fetch(`/api/like/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likeableId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Coś poszło nie tak");
    }

    const result = await response.json();
    return result as { message: string };
  } catch (error) {
    console.error("Błąd podczas usuwania lajka:", error);
    throw error;
  }
};
