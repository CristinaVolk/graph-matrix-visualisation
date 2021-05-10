import { layouts } from "./appData";

export const assending = (current, next) =>
  current.d.frequency - next.d.frequency;

export const descending = (current, next) =>
  next.d.frequency - current.d.frequency;

export const validateLayoutName = (layoutName) =>
  layouts.find((item) => item === layoutName);
