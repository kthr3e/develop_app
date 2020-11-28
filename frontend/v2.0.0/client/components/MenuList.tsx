import React, { FC } from "react";
import styled from "styled-components";
import { MenuItem } from "./MenuItems";

type Props = {
  menu: { name: string }[][];
  page: number;
};

export const MenuList: FC<Props> = ({ menu, page }) => {
  return (
    <List>
      {menu.map((menu, i) => (
        <MenuItem key={i} menu={menu} active={page === i + 1} />
      ))}
    </List>
  );
};

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 400px;
`;
