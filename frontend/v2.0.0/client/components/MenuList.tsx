import React, { FC } from "react";
import { mac_menu } from "../util/MacMenu";
import { dennys_menu } from "../util/DennysMenu";
import styled from "styled-components";
import { MenuItem } from "./MenuItems";

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
    const NUM = 6;
    if (list.length === 0) return;
    for (let i = 0; i < Math.floor(list.length); i++) {
      if (i * NUM + NUM > list.length) {
        arr.push(list.slice(i * NUM, list.length));
        break;
      }
      arr.push(list.slice(i * NUM, i * NUM + NUM));
    }
    return arr;
  };

  const menu_list = paginate(get_list());

  return (
    <>
      <List>
        {menu_list &&
          menu_list.map((menu, i) => (
            <MenuItem key={i} menu={menu} index={i} />
          ))}
      </List>
    </>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 400px;
`;
