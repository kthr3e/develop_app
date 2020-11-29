import styled from "styled-components";
import { UserDataForm } from "../components/UserDataForm";
import { Menu } from "../components/Menu";
import { SelectedMenu } from "../components/SelectedMenu";
import { MethodRadio } from "../components/MethodRadio";
import { faPersonBooth } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Text } from "../styles/common";
import { Shop } from "../components/Shop";

export default function Home() {
  const [method, set_method] = useState<"menu" | "shop">("menu");

  return (
    <Container>
      <Text>1日に必要な栄養を取るためのメニューを診断！</Text>
      <Text>
        あなたに必要な1日の栄養のうち、選んだメニューがどれだけ補えるか（充足率）をチェックすることができます。
      </Text>
      <div
        css={`
          display: flex;
          justify-content: center;
          margin: 50px 0;
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
      {method === "menu" ? <Menu /> : <Shop />}
      {method === "menu" && (
        <>
          <Text>選択したメニュー</Text>
          <SelectedMenu />
        </>
      )}
      <UserDataForm method={method} />
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  width: 80%;
  margin: 0 auto;
`;
