import React from "react";
import styled from "styled-components";

export const Radio = () => {
  return (
    <RadioContainer>
      <RadioGroup>
        <InputContainer>
          <RadioButton type="radio" name="radio" />
          <RadioTile>
            <Icon>男 </Icon>
            <RadioLabel htmlFor="walk">Walk</RadioLabel>
          </RadioTile>
        </InputContainer>

        <InputContainer>
          <RadioButton type="radio" name="radio" />
          <RadioTile>
            <Icon>女</Icon>
            <RadioLabel htmlFor="bike">Bike</RadioLabel>
          </RadioTile>
        </InputContainer>
      </RadioGroup>
    </RadioContainer>
  );
};

const RadioContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const InputContainer = styled.div`
  position: relative;
  height: 7rem;
  width: 7rem;
  margin: 0.5rem;
`;

const RadioButton = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  margin: 0;
  cursor: pointer;
  &:checked {
    color: white;
    transform: scale(1.1, 1.1);
    background-color: black;
  }
`;

const RadioTile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 2px solid black;
  border-radius: 5px;
  padding: 1rem;
  transition: transform 300ms ease;
`;

const Icon = styled.div`
  fill: black;
  width: 3rem;
  height: 3rem;
`;

const RadioLabel = styled.label`
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: black;
`;
