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
export const Table: FC<Props> = ({ value, headers }) => (
  <TableContainer>
    <table>
      <TableHead>
        <tr>
          {headers.map((header) => (
            <td align="center" key={String(header)}>
              {header}
            </td>
          ))}
        </tr>
      </TableHead>
      <tbody>
        {value &&
          value
            .filter((el) => el[1] !== "0個")
            .map((el) => (
              <tr key={String(el)}>
                <td align="center">{el[0]}</td>
                <td align="center">{el[1]}</td>
              </tr>
            ))}
      </tbody>
    </table>
  </TableContainer>
);

const TableContainer = styled.div<any>`
  margin-bottom: 30px;
`;
const TableHead = styled.thead`
  background-color: ${COLOR.SMOKE};
`;
