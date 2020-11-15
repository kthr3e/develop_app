import styled from "styled-components";
import { UserDataForm } from "../components/UserDataForm";
import { Menu } from "../components/Menu";
import { SelectedMenu } from "../components/SelectedMenu";
import { SelectShop } from "../components/SelectShop";
import { Result } from "../components/Result";

export default function Home() {
  return (
    <Container>
      <h3>1日に必要な栄養を取るためのメニューを診断！</h3>
      <p>
        あなたに必要な1日の栄養のうち、選んだメニューがどれだけ補えるか（充足率）をチェックすることができます。
      </p>
      <SelectShop />
      <Menu />
      <p>選択したメニュー</p>
      <SelectedMenu />
      <UserDataForm />
      <Result />
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
`;
