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
  <StyledTableContainer>
    <table>
      <StyledTableHead>
        <tr>
          {headers.map((header) => (
            <td align="center" key={String(header)}>
              {header}
            </td>
          ))}
        </tr>
      </StyledTableHead>
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
  </StyledTableContainer>
);

const StyledTableContainer = styled.div<any>`
  margin-bottom: 30px;
`;
const StyledTableHead = styled.thead`
  background-color: ${COLOR.SMOKE};
`;
