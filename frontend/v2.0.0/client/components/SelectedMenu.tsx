import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { menu_value } from "../recoil";
import Image from "next/image";

export const SelectedMenu = () => {
  const [menu, set_menu] = useRecoilState(menu_value);
  const handle_click = (name: string) => {
    set_menu((prev) => prev.filter((el) => el !== name));
  };

  return (
    <Container>
      {menu.map((name) => (
        <Label onClick={() => handle_click(name)} key={name}>
          <ImgFrame>
            <Image src="/images/burger.png" height="50px" width="auto" />
          </ImgFrame>
          <TitleBox>{name}</TitleBox>
        </Label>
      ))}
    </Container>
  );
};

const Label = styled.div`
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  margin: 10px;
  cursor: pointer;
  height: 130px;
  min-width: 130px;
  width: 130px;
  border-radius: 5px;
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
  padding: 15px;
  box-sizing: border-box;
  font-size: 12px;
`;

const Container = styled.div`
  display: flex;
  height: 200px;
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 50px;
  border: 1px solid #bbbbbb;
  border-radius: 5px;
  padding: 20px;
`;
