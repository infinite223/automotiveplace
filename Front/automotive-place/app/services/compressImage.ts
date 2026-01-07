import imageCompression from "browser-image-compression";

export const compressImageIfNeeded = async (
  file: File,
  fileName: string
): Promise<File> => {
  const maxSizeMB = 0.5;

  if (file.size / 1024 / 1024 <= maxSizeMB) {
    return new File([file], fileName, {
      type: file.type,
      lastModified: Date.now(),
    });
  }

  const compressedBlob = await imageCompression(file, {
    maxSizeMB,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  });

  return new File([compressedBlob], fileName, {
    type: compressedBlob.type,
    lastModified: Date.now(),
  });
};
