"use client";

import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";

const Services = () => {
  const data = useSelector((store: RootState) => store.stepData);
  console.log(data, "data");
  return (
    <section className="flex h-screen flex-col items-center gap-8 justify-center">
      <h1 className="text-3xl font-bold">Co oferuje AMP?</h1>
    </section>
  );
};

export default Services;
