import React, { FC } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { menu_value } from "../recoil";
import Image from "next/image";

type Props = {
  name: string;
};

export const Card: FC<Props> = ({ name }) => {
  const [menu, set_menu] = useRecoilState(menu_value);
  const include = menu.includes(name);

  const handle_click = () => {
    if (include) {
      set_menu((prev) => prev.filter((el) => el !== name));
      return;
    }
    set_menu((prev) => [...prev, name]);
  };

  return (
    <Label include={include}>
      <ImgFrame>
        <Image src="/images/burger.png" height="auto" width="auto" />
      </ImgFrame>
      <TitleBox>{name}</TitleBox>
      <input type="checkbox" onClick={handle_click} checked={include} hidden />
    </Label>
  );
};

const Label = styled.label<{ include: boolean }>`
  width: 30%;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  margin: 10px 0;
  cursor: pointer;
  ${({ include }) =>
    include && `background-color: black; opacity: 0.5; color: white;`};
`;

const ImgFrame = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding-top: 20px;
`;

const TitleBox = styled.div`
  width: 100%;
  height: auto;
  padding: 20px 18px;
  box-sizing: border-box;
`;
