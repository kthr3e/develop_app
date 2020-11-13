import React, { FC } from "react";
import { mac_menu } from "../util/MacMenu";
import { MenuItem } from "./MenuItem";
import { dennys_menu } from "../util/DennysMenu";
import styled from "styled-components";

type Props = {
  dir?: string;
  index: number;
  value: number;
  label: string;
};

export const MenuList: FC<Props> = ({ dir, index, value, label }) => {
  const menu_list = label === "マクドナルド" ? mac_menu : dennys_menu;

  return (
    <List
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      dir={dir}>
      {value === index &&
        menu_list.map((menu) => <MenuItem name={menu.name} key={menu.name} />)}
    </List>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 400px;
  scroll-snap-type: mandatory;
`;
