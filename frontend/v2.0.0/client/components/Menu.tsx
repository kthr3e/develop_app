import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { MenuList } from "./MenuList";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { shop_state } from "../recoil";
import { COLOR } from "../styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const Menu = () => {
  const shop = useRecoilValue(shop_state);

  return (
    <>
      <IconButton>
        <FontAwesomeIcon icon={faAngleLeft} />
      </IconButton>
      {shop.map((label, i) => (
        <MenuList key={label} label={label} />
      ))}
      <IconButton>
        <FontAwesomeIcon icon={faAngleRight} />
      </IconButton>
    </>
  );
};

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.BLACK};
  color: ${COLOR.WHITE};
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
