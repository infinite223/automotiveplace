type TProblem = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isVisible: boolean;
};

type TProblemCreate = {
  title: string;
  description: string;
  isVisible: boolean;
};

function isTProblem(data: any): data is TProblem {
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

export { isTProblem };
export type { TProblem, TProblemCreate };
