import React, { FC } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { menu_value } from "../recoil";
import { sp } from "../styles/media";

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
    <Label>
      <Container>
        <ImgFrame></ImgFrame>
        <TitleBox>{name}</TitleBox>
      </Container>
      <input type="checkbox" onClick={handle_click} checked={include} hidden />
    </Label>
  );
};

const Container = styled.div`
  width: 150px;
  height: auto;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
`;

const ImgFrame = styled.div`
  width: 100%;
  height: auto;
  padding-top: 56.25%;
  background: url(https://placehold.jp/640x360.png) no-repeat center;
  background-size: cover;
  box-sizing: border-box;
`;

const TitleBox = styled.div`
  width: 100%;
  height: auto;
  padding: 20px 18px;
  background: #ffffff;
  box-sizing: border-box;
`;

const Label = styled.label`
  width: 33%;
`;
