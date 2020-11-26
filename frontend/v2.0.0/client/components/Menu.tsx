import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { MenuList } from "./MenuList";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { shop_state } from "../recoil";

export const Menu = () => {
  const [value, setValue] = useState(0);
  const shop = useRecoilValue(shop_state);

  const handle_change = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handle_change_index = (index: number) => {
    setValue(index);
  };

  return (
    <>
      {shop.map((label, i) => (
        <MenuList
          key={label}
          value={value}
          index={i}
          label={label}
        />
      ))}
    </>
  );
};
