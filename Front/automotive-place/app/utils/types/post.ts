type TPost = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isVisible: boolean;
};

function isTPost(data: any): data is TPost {
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

export { isTPost };
export type { TPost };
