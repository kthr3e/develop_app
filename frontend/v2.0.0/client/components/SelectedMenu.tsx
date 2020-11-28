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
        <Label onClick={() => handle_click(name)}>
          <ImgFrame>
            <Image src="/images/burger.png" height="auto" width="auto" />
          </ImgFrame>
          <TitleBox>{name}</TitleBox>
        </Label>
      ))}
    </Container>
  );
};

const Label = styled.label`
  width: 30%;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  margin: 10px 0;
  cursor: pointer;
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 300px;
  overflow-x: auto;
  background: rgba(0, 0, 0, 0.05);
  margin-bottom: 50px;
`;
