import React from "react";
import styled from "styled-components";

export const Select = () => {
  return (
    <SelectContainer>
      <select required>
        <option value="" hidden>
          Choose
        </option>
        <option value="1">cat</option>
        <option value="2">dog</option>
        <option value="3">rabbit</option>
        <option value="4">squirrel</option>
      </select>
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  overflow: hidden;
  width: 90%;
  margin: 2em auto;
  text-align: center;
  position: relative;
  border: 1px solid #bbbbbb;
  border-radius: 2px;
  background: #ffffff;
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
    border-top: 6px solid #666666;
    pointer-events: none;
  }
  &::after {
    position: absolute;
    top: 0;
    right: 2.5em;
    bottom: 0;
    width: 1px;
    content: "";
    border-left: 1px solid #bbbbbb;
  }
  select {
    width: 100%;
    padding: 8px 38px 8px 8px;
    color: #666666;
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
