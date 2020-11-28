import React from "react";
import styled from "styled-components";
import { old_options } from "../util/OldOptions";

export const OldSelect = () => {
  return (
    <Label>
      年齢
      <SelectContainer>
        <select>
          {old_options.map(({ value, text, hidden }) => (
            <option value={value} hidden={hidden}>
              {text}
            </option>
          ))}
        </select>
      </SelectContainer>
    </Label>
  );
};

const Label = styled.label`
  display: flex;
  grid-area: old;
`;

const SelectContainer = styled.label`
  grid-area: old;
  overflow: hidden;
  width: 40%;
  margin: 2em auto;
  text-align: center;
  position: relative;
  border: 1px solid #bbbbbb;
  border-radius: 2px;
  background: #000;
  &::before {
    position: absolute;
    top: 0.8em;
    right: 0.9em;
    width: 0;
    height: 0;
    padding: 0;
    content: "";
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #fff;
    pointer-events: none;
  }
  &::after {
    position: absolute;
    top: 0;
    right: 2.5em;
    bottom: 0;
    width: 1px;
    content: "";
    border-left: 1px solid #fff;
  }
  select {
    width: 100%;
    padding: 8px 38px 8px 8px;
    color: #fff;
    padding-right: 1em;
    cursor: pointer;
    text-indent: 0.01px;
    text-overflow: ellipsis;
    border: none;
    outline: none;
    background: transparent;
    background-image: none;
    box-shadow: none;
    -webkit-appearance: none;
    appearance: none;
    &::-ms-expand {
      display: none;
    }
  }
`;
