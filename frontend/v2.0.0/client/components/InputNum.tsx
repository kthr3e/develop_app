import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

export const InputNum = () => {
  const { register } = useFormContext();
  return (
    <Label>
      上限
      <InputBox>
        <input type="number" name="up_value" ref={register} min={1} max={30} />
      </InputBox>
    </Label>
  );
};

const Label = styled.label`
  display: flex;
  grid-area: up_value;
`;

const InputBox = styled.div`
  width: 150px;
  margin: auto;
  height: 60px;
  position: relative;
  pointer-events: none;

  &:before {
    position: absolute;
    top: 8px;
    right: 20px;
    color: #eceff1;
    font-size: 20px;
    content: "▲";
    pointer-events: none; // 当たり判定をなくす
  }

  &:after {
    position: absolute;
    bottom: 8px;
    right: 20px;
    color: #eceff1;
    font-size: 20px;
    content: "▼";
    pointer-events: none; // 当たり判定をなくす
  }

  input {
    box-sizing: border-box;
    display: block;
    margin: 0 auto 40px;
    border: none;
    border-radius: 10px;
    padding: 20px 60px 20px 20px;
    width: 100%;
    height: 60px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5) inset;
    -webkit-appearance: none;

    &:focus {
      outline: none;
    }

    &::-webkit-inner-spin-button {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0; // 右端に固定
      margin: auto;
      transform: scale(5); // 当たり判定を大きくする
      transform-origin: right center;
      opacity: 0; // 透明にして見えなくする
    }

    &::-webkit-contacts-auto-fill-button {
      opacity: 0; // Safariのオートフィルボタンを透明にして見えなくする
    }
  }
`;
