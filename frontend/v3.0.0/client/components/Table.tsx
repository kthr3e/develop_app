import React from "react";
import { FC } from "react";
import styled from "styled-components";
import { COLOR } from "../styles/colors";

type Props = {
  value?: string[][];
  headers: string[];
};

/**
 * 受け取ったvalueを基にテーブルで表示
 */
export const Table: FC<Props> = ({ value, headers }) => {
  return (
    <>
      <table>
        <thead>
          <tr>{headers.map((header) => ({ header }))}</tr>
        </thead>
        <tbody>
          {value &&
            value
              .filter((el) => el[1] !== "0個")
              .map((el) => (
                <tr key={String(el)}>
                  {el[0]}
                  {el[1]}
                </tr>
              ))}
        </tbody>
      </table>
    </>
  );
};
