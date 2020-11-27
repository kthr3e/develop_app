import { relative } from "path";
import React, { FC } from "react";
import styled from "styled-components";

type Props = {
  type?: "button" | "submit";
};

export const Button: FC<Props> = ({ children, type }) => {
  return (
    <StyledButton type={type}>
      <span>{children}</span>
    </StyledButton>
  );
};

const StyledButton = styled.button`
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