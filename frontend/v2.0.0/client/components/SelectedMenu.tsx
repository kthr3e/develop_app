import { Chip } from "@material-ui/core";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { menu_value } from "../recoil";

export const SelectedMenu = () => {
  const [values, set_values] = useRecoilState(menu_value);

  return (
    <Container>
      {values.map((value) => (
        <StyledChip
          key={value}
          label={value}
          color='primary'
          onDelete={() =>
            set_values((prev) => prev.filter((el) => el !== value))
          }
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 200px;
  overflow-x: auto;
  background: rgba(0,0,0,0.05);
  margin-bottom: 50px;
`;

const StyledChip = styled(Chip)`
    width: 180px;
    display: flex;
    justify-content: space-between;
    margin: 5px;
    font-size: 10px;
    font-weight: bold;
`;