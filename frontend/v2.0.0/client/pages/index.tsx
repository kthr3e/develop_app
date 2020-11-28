import styled from "styled-components";
import { UserDataForm } from "../components/UserDataForm";
import { Menu } from "../components/Menu";
import { SelectedMenu } from "../components/SelectedMenu";
import { MethodRadio } from "../components/MethodRadio";
import { faPersonBooth } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { LabelText } from "../styles/common";

export default function Home() {
  const [method, set_method] = useState<"menu" | "shop">("menu");

  return (
    <Container>
      <LabelText>1日に必要な栄養を取るためのメニューを診断！</LabelText>
      <LabelText>
        あなたに必要な1日の栄養のうち、選んだメニューがどれだけ補えるか（充足率）をチェックすることができます。
      </LabelText>
      <div
        css={`
          display: flex;
          justify-content: center;
        `}>
        <MethodRadio
          icon={faPersonBooth}
          label="メニューから選択"
          checked={method === "menu"}
          handle_click={() => set_method("menu")}
        />
        <MethodRadio
          icon={faPersonBooth}
          label="店から選択"
          checked={method === "shop"}
          handle_click={() => set_method("shop")}
        />
      </div>
      <Menu />
      <p>選択したメニュー</p>
      <SelectedMenu />
      <UserDataForm method={method} />
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  width: 80%;
  margin: 0 auto;
`;
