export const calculateDominantColor = (imageSrc: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const data = imageData.data;

        const colorMap: Record<string, number> = {};
        let maxCount = 0;
        let dominant = "255,255,255";

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const color = `${r},${g},${b}`;

          colorMap[color] = (colorMap[color] || 0) + 1;
          if (colorMap[color] > maxCount) {
            maxCount = colorMap[color];
            dominant = color;
          }
        }

        resolve(dominant);
      } else {
        reject(new Error("Canvas context is not available"));
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
};
