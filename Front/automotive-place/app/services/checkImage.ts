"use client";

import * as tf from "@tensorflow/tfjs";
import { load } from "nsfwjs";

export async function checkImage(img: HTMLImageElement) {
  await tf.setBackend("webgl");
  await tf.ready();

  const model = await load();
  const predictions = await model.classify(img);

  return predictions;
}
