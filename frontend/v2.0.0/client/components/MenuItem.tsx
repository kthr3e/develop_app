import React, { FC } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { menu_value } from "../recoil";
import { sp } from "../styles/media";

type Props = {
  name: string;
};

export const MenuItem: FC<Props> = ({ name }) => {
  const [menu, set_menu] = useRecoilState(menu_value);
  const contain = menu.includes(name);
  const handle_click = () => {
    if (contain) {
      set_menu((prev) => prev.filter((el) => el !== name));
      return;
    }
    set_menu((prev) => [...prev, name]);
  };

  return (
    <Label>
      <StyledCard>
        <p>{name}</p>
        <input type="checkbox" onClick={handle_click} checked={contain} />
      </StyledCard>
    </Label>
  );
};

const StyledCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  scroll-snap-align: start;
  p {
    font-size: 10px;
    font-weight: bold;
  }
`;

const Label = styled.label`
  width: 25%;
  ${sp`
    width: 50%;
  `}
`;
