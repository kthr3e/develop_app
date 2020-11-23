import React from "react";
import styled from "styled-components";

export const Radio = () => {
  return (
    <RadioContainer>
      <RadioGroup>
        <InputContainer>
          <RadioButton id="walk" type="radio" name="radio" />
          <RadioTile>
            <Icon>
              <svg
                fill="#000000"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
              </svg>
            </Icon>
            <RadioLabel htmlFor="walk">Walk</RadioLabel>
          </RadioTile>
        </InputContainer>

        <InputContainer>
          <RadioButton id="bike" type="radio" name="radio" />
          <RadioTile>
            <Icon>
              <svg
                fill="#000000"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" />
              </svg>
            </Icon>
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
