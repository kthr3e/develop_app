import { atom } from "recoil";

export type ResultType = {
  data: { [name: string]: string[] };
};

export const result_value = atom<ResultType>({
  key: "result_value",
  default: {} as ResultType,
});

export type ToastType = [string, ("error" | "info" | "success" | "warning")?];

export const toast_value = atom<ToastType>({
  key: "toast_value",
  default: [""],
});

export const menu_value = atom<string[]>({
  key: "menu_value",
  default: [],
});
