export const getMainContentDataForUser = async () => {
  // get auth user on backend
  const response = await fetch(`/api/content/main/contentdata`);
  if (!response.ok) {
    throw new Error("Failed to get data");
  }

  const result = await response.json();
  return result;
};
