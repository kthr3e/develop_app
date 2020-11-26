import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { MenuList } from "./MenuList";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { shop_state } from "../recoil";

export const Menu = () => {
  const shop = useRecoilValue(shop_state);

  return (
    <>
      {shop.map((label, i) => (
        <MenuList
          key={label}
          label={label}
        />
      ))}
    </>
  );
};
