import React, { FC } from "react";
import { mac_menu } from "../util/MacMenu";
import { dennys_menu } from "../util/DennysMenu";
import styled from "styled-components";
import { MenuItems } from "./MenuItems";

type Props = {
  label: string;
};

export const MenuList: FC<Props> = ({ label }) => {
  const get_list = () => {
    switch (label) {
      case "macdonalds":
        return mac_menu;
      case "dennys":
        return dennys_menu;
      default:
        return [];
    }
  };

  const paginate = (list: { name: string }[]) => {
    const arr = [];
    const NUM = 5;
    if (list.length === 0) return;
    for (let i = 0; i < Math.floor(list.length); i++) {
      if (list.length > i * NUM + NUM) {
        arr.push(list.slice(i * NUM, list.length));
      }
      arr.push(list.slice(i * NUM, i * NUM + NUM));
    }
    return arr;
  };

  const menu_list = paginate(get_list());

  return (
    <List>
      {menu_list &&
        menu_list.map((menu,i) => <MenuItems key={i} menu={menu} />)}
    </List>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 400px;
`;
