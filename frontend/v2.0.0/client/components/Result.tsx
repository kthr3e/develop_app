import React from "react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { result_value } from "../recoil";
import { Row } from "../styles/common";
import { Table } from "./Table";

type Props = {};

/**
 * 診断結果表示
 */
export const Result: FC<Props> = () => {
  const value = useRecoilValue(result_value);
  return (
    <>
      <Container>
        <h1>診断結果</h1>
        <Row>
          <Table
            headers={["メニュー", "個数"]}
            value={Object.entries(value.data[0])}
          />
          <Table
            headers={["栄養素", "量"]}
            value={Object.entries(value.data[1])}
          />
        </Row>
        <button>
          TOPに戻る
        </button>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 80px auto 20px auto;
  width: 80%;
  text-align: center;
`;
