import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import styled from "styled-components";
import { COLOR } from "../styles/colors";
import { Card } from "./Card";

type Props = {
  menu: { name: string }[];
  index: number;
};

export const MenuItem: FC<Props> = ({ menu, index }) => {
  return (
    <>
      {menu.map(({ name }) => (
        <Card name={name} key={name} />
      ))}
    </>
  );
};
