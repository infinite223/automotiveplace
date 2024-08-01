import React, { createContext, useContext, useState } from "react";

interface BeforeCloseContextType {
  setBeforeCloseHandler: (handler: () => boolean) => void;
}

const BeforeCloseContext = createContext<BeforeCloseContextType | undefined>(
  undefined
);

export const BeforeCloseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [beforeCloseHandler, setBeforeCloseHandler] = useState<() => boolean>(
    () => () => true
  );

  return (
    <BeforeCloseContext.Provider value={{ setBeforeCloseHandler }}>
      {children}
    </BeforeCloseContext.Provider>
  );
};

export const useBeforeClose = () => {
  const context = useContext(BeforeCloseContext);
  if (!context) {
    throw new Error("useBeforeClose must be used within a BeforeCloseProvider");
  }
  return context;
};
