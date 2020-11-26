import { relative } from "path";
import React from "react";
import styled from "styled-components";

export const Button = () => {
  return (
    <StyledButton>
      <span>PUSH！</span>
    </StyledButton>
  );
};

const StyledButton = styled.a`
  text-decoration: none;
  overflow: hidden;
  padding: 1.5rem 6rem;
  border-radius: 0;
  background: #fff;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  &:hover {
    color: #fff;
  }
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-transform: translateX(-96%);
    transform: translateX(-96%);
    background: #000;
  }
  &:hover:before {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
  }
  > span {
    position: relative;
  }
`;
