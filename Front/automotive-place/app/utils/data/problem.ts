import { TProblem } from "../types/problem";
import { generateRandomDate, generateRandomString } from "./randomData";

export function generateRandomProblems(count: number) {
  const problems = [];
  for (let i = 0; i < count; i++) {
    const _problem: TProblem = {
      id: generateRandomString(10),
      createdAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      updatedAt: generateRandomDate(new Date(2020, 0, 1), new Date()),
      isVisible: Math.random() < 0.5,
      description: "",
      title: "Random post",
    };

    problems.push(_problem);
  }
  return problems;
}
