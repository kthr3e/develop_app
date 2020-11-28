import styled from "styled-components";
import { UserDataForm } from "../components/UserDataForm";
import { Menu } from "../components/Menu";
import { SelectedMenu } from "../components/SelectedMenu";
import { Radio } from "../components/Radio";
import { faPersonBooth } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Home() {
  const [method, set_method] = useState("menu");
  

  return (
    <Container>
      <h2>1日に必要な栄養を取るためのメニューを診断！</h2>
      <p>
        あなたに必要な1日の栄養のうち、選んだメニューがどれだけ補えるか（充足率）をチェックすることができます。
      </p>
      <div
        css={`
          display: flex;
          justify-content: center;
        `}>
        <Radio icon={faPersonBooth} label="メニューから選択" />
        <Radio icon={faPersonBooth} label="店から選択" />
      </div>
      <Menu />
      <p>選択したメニュー</p>
      <SelectedMenu />
      <UserDataForm />
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
`;
