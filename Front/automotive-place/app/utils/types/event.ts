type TEvent = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isVisible: boolean;
};

type TEventCreate = {
  title: string;
  description: string;
  isVisible: boolean;
};

function isTEvent(data: any): data is TEvent {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.id === "string" &&
    data.createdAt instanceof Date &&
    data.updatedAt instanceof Date &&
    typeof data.isVisible === "boolean" &&
    typeof data.title === "string" &&
    typeof data.description === "string"
  );
}

export { isTEvent };
export type { TEvent, TEventCreate };
