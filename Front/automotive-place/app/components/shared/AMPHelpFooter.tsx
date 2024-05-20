import Link from "next/link";
import React, {FC, useState} from "react";
import {GrHelpBook} from "react-icons/gr";
interface IAMPHelpFooter {
  footerText?: string;
  fontSize?: number;
}

export const AMPHelpFooter: FC<IAMPHelpFooter> = ({
  footerText,
  fontSize = 10,
}) => {
  const [showHelpInfo, setShowHelpInfo] = useState(false);

  return (
    <div
      onClick={() => setShowHelpInfo(true)}
      style={{fontSize}}
      className="p-3 text-custom-secend opacity-55 text-center self-center flex items-center gap-2"
    >
      <GrHelpBook />
      {footerText}
    </div>
  );
};
