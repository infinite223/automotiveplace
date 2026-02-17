export const bucketId = "67a125f200369445f106";

export const getProjectImageSrcByFileId = (fileId?: string) => {
  if (!fileId) return null;

  return (
    `${process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ENDPOINT}` +
    `/${bucketId}/files/${fileId}/view` +
    `?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`
  );
};
