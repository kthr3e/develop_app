import React, { FC } from "react";
import { MenuItem } from "./MenuItem";

type Props = {
  menu: { name: string }[];
};

export const MenuItems: FC<Props> = ({ menu }) => {
  return (
    <div>
      {menu.map(({ name }) => (
        <MenuItem name={name} key={name} />
      ))}
    </div>
  );
};
