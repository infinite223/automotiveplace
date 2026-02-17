import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { FaRegImage } from "react-icons/fa";

interface AMPImageProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string | null;
  alt?: string;
  className?: string;
  iconSize?: number;
}

export const AMPImage: React.FC<AMPImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  iconSize = 22,
  ...rest
}) => {
  const hasSrc = !!src && src.toString().trim().length > 0;
  const [failed, setFailed] = useState(false);

  const showPlaceholder = !hasSrc || failed;

  const imageAlt = alt ?? "Image";

  return (
    <div
      className={`relative flex items-center justify-center bg-gray-100 dark:bg-amp-50 rounded-sm overflow-hidden ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width ?? undefined,
        height:
          typeof height === "number" ? `${height}px` : height ?? undefined,
      }}
    >
      {showPlaceholder ? (
        <FaRegImage size={iconSize} className="text-gray-400" />
      ) : (
        <Image
          src={src!}
          alt={imageAlt}
          width={width as any}
          height={height as any}
          onError={() => setFailed(true)}
          className="object-cover"
          {...rest}
        />
      )}
    </div>
  );
};

export default AMPImage;
