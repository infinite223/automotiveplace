import React from "react";

interface IAMPTag {
  name: string;
}

export const AMPTag = ({ name }: IAMPTag) => {
  const handleSearchByTag = () => {
    // todo search by tag
    console.log(name);
  };

  return (
    <div
      className="text-xs opacity-80 cursor-pointer"
      onClick={handleSearchByTag}
    >
      #{name}
    </div>
  );
};
