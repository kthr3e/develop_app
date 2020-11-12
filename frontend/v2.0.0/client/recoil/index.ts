import { atom } from "recoil";

export type ResultType = {
  data: { [name: string]: string[] };
};

export const result_value = atom<ResultType>({
  key: "result_value",
  default: {} as ResultType,
});
