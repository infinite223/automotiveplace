"use client";

import React from "react";

export const HomeMainContent = () => {
  return (
    <div className="flex w-[1000px] items-center h-full max-h-screen overflow-y-auto flex-col scroll-smooth">
      <div className="flex flex-col text-[12px] w-[600px]">
        <Content name="Post" />
        <Content name="Wydarzenie" />
        <Content name="Problem" />
        <Content name="Problem" />
        <Content name="Projekt" />
        <Content name="Projekt" />
        <Content name="Post" />
      </div>
    </div>
  );
};

const Content = ({ name }: { name: string }) => {
  return (
    <div className="flex w-full h-[400px] border-zinc-900 border-b-[1px] border-t-2 items-center justify-center">
      <h2 className="opacity-40">{name}</h2>
    </div>
  );
};
