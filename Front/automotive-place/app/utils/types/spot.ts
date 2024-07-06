type TSpot = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isVisible: boolean;
};

type TSpotCreate = {
  title: string;
  description: string;
  isVisible: boolean;
};

function isTSpot(data: any): data is TSpot {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.id === "string" &&
    // data.createdAt instanceof Date &&
    // data.updatedAt instanceof Date &&
    typeof data.isVisible === "boolean" &&
    typeof data.title === "string" &&
    typeof data.description === "string"
  );
}

export { isTSpot };
export type { TSpot, TSpotCreate };
