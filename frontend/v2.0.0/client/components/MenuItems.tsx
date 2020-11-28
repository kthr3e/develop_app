import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import styled from "styled-components";
import { COLOR } from "../styles/colors";
import { Card } from "./Card";

type Props = {
  menu: { name: string }[];
  active: boolean;
};

export const MenuItem: FC<Props> = ({ menu, active }) => {
  return (
    <Page active={active}>
      {menu.map(({ name }) => (
        <Card name={name} key={name} />
      ))}
    </Page>
  );
};

const Page = styled.div<{ active: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 1000px;
  ${({ active }) => !active && `display: none;`};
`;
